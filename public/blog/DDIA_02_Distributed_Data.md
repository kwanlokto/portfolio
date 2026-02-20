# DDIA Part II — Distributed Data
## Chapters 5–9

---

## Chapter 5 — Replication

Replication means keeping a copy of the same data on multiple machines connected via a network. Why replicate?

- **Geographic distribution** — keep data close to users to reduce latency
- **Fault tolerance** — if one machine fails, another can serve requests
- **Read scalability** — spread read load across multiple machines

The hard part of replication is handling *changes* to data over time. Every write needs to be processed by every replica. This chapter covers three main replication architectures.

---

### Single-Leader Replication (Active/Passive)

One replica is designated the *leader* (also called master or primary). Writes go to the leader. The leader sends a *replication log* (also called change stream) to *followers* (replicas, secondaries).

Reads can be served by any replica. This is the most common architecture for relational databases (PostgreSQL, MySQL) and some NoSQL databases (MongoDB, RethinkDB, Espresso).

#### Synchronous vs. Asynchronous Replication

**Synchronous:** The leader waits for the follower to acknowledge the write before reporting success. Guarantees the follower has an up-to-date copy. But if the follower is slow or unavailable, the leader must block — one slow follower can slow all writes. Impractical to make all followers synchronous.

**Semi-synchronous:** One follower is synchronous, the rest are asynchronous. If the synchronous follower fails, another takes its place. Guarantees at least two up-to-date copies.

**Asynchronous:** The leader sends writes and continues without waiting. High throughput, but a follower may lag arbitrarily far behind. If the leader fails, any un-replicated writes are lost even if confirmed to the client.

#### Setting Up New Followers

1. Take a consistent snapshot of the leader (without locking if possible, e.g., PostgreSQL's `pg_basebackup`)
2. Copy the snapshot to the new follower
3. The follower requests all changes since the snapshot (using the log sequence number or binlog position)
4. The follower catches up and joins the replication stream

#### Handling Node Outages

**Follower failure (catch-up recovery):** The follower knows the last transaction it processed. On restart, it requests all changes since that point.

**Leader failure (failover):** One of the followers must be promoted to leader, clients must be reconfigured to send writes to the new leader, other followers must start replicating from the new leader. This can go wrong in many ways:
- If async replication is used, the new leader may be missing writes the old leader acknowledged. Usually those writes are discarded — violating durability guarantees.
- Two nodes might both think they're the leader (*split brain*). If both accept writes, data diverges.
- What's the right timeout to decide the leader has died? Too short: unnecessary failovers during slow responses. Too long: long downtime.

These problems mean some operations teams prefer to do failovers manually.

#### Implementation of Replication Logs

**Statement-based replication:** The leader logs every write statement (INSERT, UPDATE, DELETE) and sends it to followers. Simple, but problematic for non-deterministic functions (NOW(), RAND()), auto-increment columns, and side effects. Used by MySQL before version 5.1.

**Write-ahead log (WAL) shipping:** The exact same WAL used for crash recovery is sent to followers. Very tight coupling to storage engine internals — followers must run the same version of the database. Used by PostgreSQL and Oracle.

**Logical (row-based) log replication:** A separate log format describing changes at the row level (row inserted with these column values; row with this primary key was deleted). Decoupled from storage engine internals. Can be consumed by external systems (change data capture). Used by MySQL binlog row format.

**Trigger-based replication:** Application-level replication using database triggers that fire on changes and write to a separate log table. Very flexible but high overhead.

---

### Replication Lag and Consistency Problems

With asynchronous replication, followers may lag behind the leader. Reading from a follower might return stale data — this is called *eventual consistency*.

**Read-your-writes (read-after-write) consistency:** After submitting data, the user should always see that data on reload. When reading something the user may have modified, read from the leader; otherwise read from a follower. Or track the timestamp of the user's last write and ensure reads go to followers that have caught up to that point.

**Monotonic reads:** A user shouldn't read data and then read older data on a second read (e.g., seeing a comment appear and then disappear). Achieved by always routing a user to the same replica, or checking that the replica is at least as current as the user's last read.

**Consistent prefix reads:** If a sequence of writes happens in a certain order, readers should see them in that order. Difficult in sharded databases where different partitions may have different replication lag.

**Bounded staleness:** Ensure replicas are no more than a bounded time behind the leader. Useful for time-sensitive applications.

---

### Multi-Leader Replication (Active/Active)

Allow more than one leader to accept writes. Each leader is also a follower of the other leaders. Useful for:

- **Multi-datacenter operation** — one leader per datacenter, faster writes within each datacenter
- **Offline operation** — each device has its own local database (leader), and they sync when connected (CouchDB)
- **Collaborative editing** — each user's local change is applied immediately, and changes are replicated to other users

**The fundamental problem: write conflicts.** If two leaders accept conflicting writes to the same key, those writes must be reconciled. Options:

- **Conflict avoidance** — route all writes for a given record to the same leader. Works well unless that datacenter fails.
- **Last write wins (LWW)** — use timestamps to pick a winner. Prone to data loss (the losing write is discarded) and clock skew issues.
- **Merge** — combine the values somehow (e.g., concatenate strings, merge sets)
- **Custom conflict resolution logic** — application-defined logic, either on write (e.g., CRDTs) or on read (return all conflicting versions; let user or application choose)

**Operational transformation (OT)** and **CRDTs (Conflict-free Replicated Data Types)** are principled approaches to automatic conflict resolution, used in collaborative editing applications (Google Docs uses OT).

**Multi-leader topologies:**
- *All-to-all*: every leader sends writes to every other leader. Most fault-tolerant, but ordering issues (one write may arrive before a write it depended on)
- *Circular topology*: each leader sends to next in circle. Single node failure can interrupt flow
- *Star topology*: one central root node relays writes

---

### Leaderless Replication (Dynamo-Style)

Amazon's Dynamo paper introduced an architecture where any replica can accept writes. Used by Riak, Cassandra, Voldemort.

**Quorum reads and writes:** With `n` replicas, a write must succeed on `w` replicas, a read must query `r` replicas. As long as `w + r > n`, at least one of the `r` replicas will have the latest value.

Common configuration: `n=3, w=2, r=2`. This tolerates one unavailable node for both reads and writes.

**Read repair:** When a client reads from multiple replicas and detects a stale value on one, it writes the new value back. Works well for frequently read values.

**Anti-entropy:** Background process comparing replicas and copying missing data. No guarantee of ordering.

**Limitations of quorum consistency:**
- With sloppy quorums (accepting writes on non-designated nodes during network partition), `w + r > n` doesn't guarantee overlap
- Concurrent writes with LWW: data loss
- Read-repair only works if data is read frequently
- Not linearizable

**Sloppy quorums and hinted handoff:** During a network partition, a write that can't reach the designated `w` nodes can be accepted by *other* nodes with a hint about where to forward the write when the designated nodes recover. Increases write availability but weakens consistency guarantees.

**Detecting concurrent writes:** Two writes are concurrent if neither knows about the other. Kleppmann explains the *happens-before* relationship: event A happens before B if B knows about A. Otherwise they're concurrent.

To capture causality without synchronized clocks, use *version vectors* (a counter per replica per key). On every write, the server increments its version number. Clients must send the version number they read when overwriting — the server can then merge concurrent values and discard values that are causally superseded.

---

## Chapter 6 — Partitioning

For very large datasets or very high throughput, replication alone isn't enough. Data must be *partitioned* (also called *sharding*): each record belongs to exactly one partition, and each partition is stored on a separate node.

The goal of partitioning is to spread data and query load *evenly* across nodes (avoid *hot spots*). If 90% of requests go to one partition, that node is a bottleneck and the other nodes are wasted.

---

### Partitioning of Key-Value Data

**Partitioning by key range:** Each partition gets a contiguous range of keys (like encyclopedia volumes A–C, D–F, etc.). Supports efficient range queries. But can lead to hot spots if the access pattern is not uniform across the key space. Example: if the key is a timestamp, all recent writes go to the most recent partition.

**Partitioning by hash of key:** Apply a hash function to the key; the hash range is divided among partitions. Evenly distributes data. But range queries require querying all partitions — can't do efficient range scans.

**Consistent hashing:** A specific hashing scheme where nodes are assigned to positions on a circle (hash ring). When a node is added or removed, only a small fraction of keys need to move. Used in Dynamo, Cassandra, Riak.

**Compound keys:** Use one part of the key for partitioning, another for sorting within a partition. Example: Cassandra allows range queries on the sort key within a single partition.

---

### Partitioning and Secondary Indexes

Secondary indexes complicate partitioning because they don't map neatly to partitions.

**Document-based partitioning (local indexes):** Each partition maintains its own secondary index covering only documents in that partition. Writing only updates the local index. Reading requires a *scatter/gather* query: query all partitions in parallel and combine results. This is expensive and can be slow if any partition is slow (tail latency amplification).

**Term-based partitioning (global indexes):** A global secondary index is itself partitioned — different terms in the index are stored on different partitions. Writing is more complex (must update the index partition for each indexed term). Reading is efficient — query only the index partitions containing your search terms. Updates to global indexes are often asynchronous.

---

### Rebalancing Partitions

As you add or remove nodes, partitions must be moved between nodes (*rebalancing*). Goals:
- Load should be evenly distributed after rebalancing
- During rebalancing, reads and writes should continue
- Minimize data movement

**Fixed number of partitions:** Create many more partitions than nodes (e.g., 1000 partitions for 10 nodes). Assign multiple partitions to each node. When adding a node, move some partitions to it. The partition-to-node assignment changes, but partitions themselves don't change. Used by Riak, Elasticsearch, Couchbase, Voldemort.

**Dynamic partitioning:** When a partition grows beyond a configured size, split it. When it shrinks, merge it with a neighbor. This automatically adapts the number of partitions to the data volume. Used by HBase and MongoDB. Problem: starts with one partition, all writes go to one node until the first split.

**Partitioning proportionally to nodes:** Cassandra's approach — a fixed number of partitions per node. When you add nodes, partitions get split and some halves are moved.

**Automatic vs. manual rebalancing:** Automatic is convenient but can interact badly with failure detection (the cluster thinks a node is dead and starts rebalancing, adding more load to already stressed nodes). Many systems allow manual triggering.

---

### Request Routing (Service Discovery)

How does a client know which node to contact for a given key?

1. **Partition-unaware routing:** Client contacts any node. The node routes to the correct partition (gossip protocol, e.g., Cassandra).
2. **Routing tier:** A separate routing tier (load balancer) knows the partition-to-node mapping.
3. **Client-side routing:** The client directly knows which node to contact.

All approaches require the routing tier to stay updated when partitions are reassigned. This is often done using a coordination service like ZooKeeper, which maintains the authoritative partition-to-node mapping.

---

## Chapter 7 — Transactions

Transactions are a way of grouping multiple reads and writes into a *logical unit*. Either the entire transaction succeeds (*commit*) or it fails (*abort/rollback*). On failure, the application can safely retry.

The purpose of transactions is to simplify the programming model in the face of failures, concurrency, and partial failures.

---

### ACID

**Atomicity:** All writes in the transaction succeed, or none do. Not about concurrency (that's the C in ACID); about being able to abort and discard partial writes on error.

**Consistency:** (The weakest and most overloaded of the four.) The application maintains invariants (e.g., debits equal credits in a ledger). The database cannot enforce arbitrary application-level invariants; it can enforce constraints like foreign keys and uniqueness. Consistency is really a property of the application, not the database. The C in ACID was included to make a catchy acronym.

**Isolation:** Concurrently executing transactions shouldn't interfere with each other. The idealized form is *serializability*: the result is the same as if transactions ran one at a time. In practice, weaker isolation levels are common due to performance costs.

**Durability:** Once committed, data is not lost even if the database crashes. In a single-node database: WAL. In a distributed database: replication. Perfect durability doesn't exist — it's a matter of risk reduction.

---

### Weak Isolation Levels

**Read Committed:** Two guarantees:
1. You only read data that has been committed (no *dirty reads*)
2. You only overwrite data that has been committed (no *dirty writes*)

Most databases default to read committed or stronger. Dirty writes are prevented by row-level locks (a transaction must acquire a lock on each row it writes). Dirty reads are prevented not by holding the lock until commit (which would block other reads) but by remembering the old committed value and serving it to reads while a write lock is held.

**Snapshot Isolation / Repeatable Read:** The transaction sees a *consistent snapshot* of the database at the start of the transaction. Read-only transactions are never blocked. Writes only conflict if they affect the same row. This solves the *read skew* (nonrepeatable read) anomaly: seeing two different values for the same data within one transaction.

Implementation uses MVCC (Multi-Version Concurrency Control): when a transaction writes a value, the old version is retained. A transaction sees the version that was current when it started. Rows are never updated in place — updates are `delete_old + insert_new`. Garbage collection removes old versions no longer needed by any transaction.

**Anomalies that persist under snapshot isolation:**
- *Dirty reads* — prevented
- *Dirty writes* — prevented
- *Read skew* — prevented
- *Lost updates* — NOT prevented (two concurrent transactions read-modify-write the same row; one clobbers the other)
- *Write skew* — NOT prevented (each transaction reads something, makes a decision, writes, but the combined result violates an invariant — neither write individually violates anything)
- *Phantom reads* — NOT fully prevented (a transaction reads a set of rows matching some condition; another transaction inserts rows matching that condition; the first transaction would see different rows if it re-ran the query)

**Preventing lost updates:**
- Atomic compare-and-set operations (UPDATE ... WHERE value = old_value)
- Explicit locking (SELECT ... FOR UPDATE)
- Application-level checks

---

### Serializable Isolation

The strongest isolation level. Guarantees that the result is equivalent to some sequential execution of the transactions. Prevents all concurrency anomalies.

**Actual serial execution:** Execute one transaction at a time in a single thread. Modern hardware has fast RAM and SSDs; if all data fits in memory and transactions are short, serial execution can have surprisingly high throughput. Used by VoltDB, Redis, and H-Store. Works only if transactions are short and the dataset fits in memory.

Stored procedures make serial execution practical: send the entire transaction logic to the database as a single round trip, avoiding interactive transactions (multiple back-and-forth requests).

**Two-Phase Locking (2PL):** Writers block readers *and* readers block writers (unlike snapshot isolation where readers and writers don't block each other). Two phases:
1. *Growing phase*: locks are acquired, not released
2. *Shrinking phase*: locks are released, no new locks acquired

*Predicate locks* lock all rows matching a condition (even future rows), preventing phantoms. Expensive to manage.

*Index-range locks*: a practical approximation of predicate locks. Lock an entire index range rather than a precise predicate. Less precise, more overhead, but practical.

2PL has serious performance problems: *deadlocks* (two transactions each waiting for the other to release a lock), and high tail latency as transactions queue waiting for locks.

**Serializable Snapshot Isolation (SSI):** A relatively new approach (2008, PostgreSQL 9.1). Optimistic: transactions proceed without blocking. At commit time, check whether isolation was violated. If so, abort and retry. Tracks "read-something-that-was-later-written" patterns that could indicate serialization violations.

Better performance than 2PL under typical workloads. Scales well on multi-core systems. Used in PostgreSQL (since 9.1) and FoundationDB.

---

## Chapter 8 — The Trouble with Distributed Systems

This chapter is a catalogue of everything that can go wrong in distributed systems. It establishes the adversarial environment that chapters 9 and beyond must deal with.

### Faults and Partial Failures

In a single computer, operations are deterministic: if the hardware works, they succeed or fail, and you know which. In a distributed system, *partial failures* are possible: some nodes work, some fail, some respond slowly, and you can't always tell the difference.

This is the fundamental distinction between distributed systems and single-machine software. Distributed systems must be designed to tolerate partial failures.

### Unreliable Networks

The internet and most data center networks are *asynchronous packet networks*: variable delay, packets can be lost, reordered, or duplicated. If you send a request and don't get a response, you cannot tell whether:
- The request was lost
- The remote node crashed
- The response was lost
- The remote node is slow

**Timeouts** are the fundamental mechanism for detecting failures. But there's no "right" timeout value: too short causes false positives (unnecessary retries, treating slow nodes as failed), too long causes slow failure detection. Kleppmann notes that some systems dynamically adjust timeouts based on observed response time distribution.

**Network congestion:** TCP flow control throttles the sender, leading to variable latency even over reliable links. Within a datacenter, networks are typically more reliable (99.99%+ uptime) than wide-area networks, but they're still unreliable.

**Physical time limits:** The speed of light imposes a minimum round-trip time between distant datacenters (~150ms between US and Europe). This is a fundamental constraint that no software can overcome.

### Unreliable Clocks

Time is surprisingly hard in distributed systems. Two types of clocks:

**Time-of-day clocks:** Return the current date and time. Synchronized with NTP (Network Time Protocol). Can jump forward or backward. Not suitable for measuring elapsed time.

**Monotonic clocks:** Always move forward. Suitable for measuring elapsed durations. Not synchronized across machines — the absolute value is meaningless.

**Clock skew:** Even with NTP, clocks on different machines can differ by tens of milliseconds (more if NTP sync is lost). This creates problems for distributed databases that use timestamps to resolve conflicts.

**Last-write-wins with LWW:** If two nodes each have a slightly off clock, the node with the "later" clock wins even if it actually made the write earlier. Data is silently lost.

**Logical clocks:** Count events, not real time. Can establish causality (A happened before B) without requiring synchronized clocks. Lamport timestamps, vector clocks.

**Process pauses:** A running process can be paused for arbitrary durations: garbage collection pause, virtual machine migration, OS context switching, paging to disk. After the pause, the process doesn't know time passed. This invalidates any reasoning about "my lease is valid because I acquired it 5 seconds ago."

### Knowledge, Truth, and Lies

A node in a distributed system cannot know anything with certainty. It can only make inferences from messages it has received.

**The truth is defined by the majority:** If a node sends messages claiming to be the leader, but a quorum of other nodes disagrees, the quorum's view defines reality. This is how leader election works.

**Byzantine faults:** A node that behaves in arbitrarily malicious or inconsistent ways (sends different messages to different nodes, lies about its state). Byzantine fault-tolerant systems can tolerate some fraction of Byzantine nodes. Very rare in practice outside of blockchain systems or adversarial environments.

**Fencing tokens:** When a lock/lease expires, any work done by the old lock holder must be invalidated. A *fencing token* is a monotonically increasing number returned when a lock is acquired. Any write to a storage system includes the token; writes with stale (lower) tokens are rejected. Prevents multiple nodes from both believing they're the leader.

**System models:**
- *Synchronous*: bounded message delays and process pauses. Unrealistic for most practical systems.
- *Partially synchronous*: synchronous most of the time, with occasional unbounded delays. Realistic model for most systems.
- *Asynchronous*: no timing assumptions at all. Algorithms must work regardless of timing.

**Node models:**
- *Crash-stop*: nodes crash and stay crashed. Fail silently.
- *Crash-recovery*: nodes can crash and restart, but lose in-memory state.
- *Byzantine*: nodes can lie or behave arbitrarily.

Most distributed systems assume partially synchronous, crash-recovery nodes. Algorithms for this model: multi-Paxos, Raft, Viewstamped Replication, ZAB (Zookeeper's protocol).

---

## Chapter 9 — Consistency and Consensus

Having catalogued all the ways distributed systems can fail, this chapter describes how to reason about and provide strong guarantees despite those failures.

### Linearizability

Linearizability (also called *strong consistency* or *atomic consistency*) is the strongest consistency model for single-object operations. Informally: once a write completes, all reads see the new value. The system appears to have a single global copy of the data, even though it's replicated.

More precisely: every operation appears to take effect atomically at some point between when it was started and when it completed, and the ordering of those "effect points" is consistent with the real time ordering of operations.

**Where linearizability is useful:**
- *Leader election*: only one node can be leader at a time (need an atomic compare-and-set on the leader identifier)
- *Unique constraint enforcement*: only one user can register a username
- *Cross-channel timing dependencies*: a file upload completes, then an image processing job starts — the job must be able to read the uploaded file

**Is linearizability expensive?** Yes. It requires coordination. Under network partitions (CAP theorem), you must choose between linearizability and availability.

**CAP theorem:** In the presence of a network partition, you must choose between Consistency (linearizability) and Availability. Not linearizability vs. performance, not consistency vs. eventual consistency — specifically linearizability vs. availability under partition.

Kleppmann argues CAP is narrowly stated and often misapplied. "Consistent" in CAP means linearizable, which is just one of many consistency models. The theorem applies only during network partitions, which are rare but unavoidable.

### Ordering Guarantees

Linearizability *implies* a total ordering of operations. If the system is linearizable, we can assign a sequence number to every operation such that everyone agrees on the order.

**Causal consistency:** A weaker model. Causally related operations (A happened-before B) must be seen in that order. Concurrent operations may be seen in any order by different nodes. Causal consistency is the *strongest consistency model that doesn't require coordination* — it's possible to implement without sacrificing availability.

**Sequence numbers / Lamport timestamps:** A simple mechanism for causal ordering. Each node has a counter. Each message includes the sender's counter. On receiving a message, take the max of local counter and message counter, then increment. This gives a total order consistent with causality. But this doesn't help if you need to know which write was the latest without waiting to hear from every node.

**Total order broadcast (atomic broadcast):** A protocol for delivering messages to all nodes in the same order, exactly once. Important properties:
1. *Reliable delivery*: no messages are lost; if delivered to one node, delivered to all
2. *Total ordering*: delivered in the same order to all nodes

Total order broadcast is equivalent to consensus in distributed systems theory. It can be used to implement:
- Database replication (all replicas process writes in the same order)
- Serializable transactions (transactions are processed in the order they are broadcast)
- Lock services with fencing tokens (sequence number = fencing token)
- Uniqueness constraints

### Distributed Transactions and Consensus

**Consensus problem:** Get multiple nodes to agree on a value such that:
1. *Uniform agreement*: no two nodes decide differently
2. *Integrity*: no node decides twice
3. *Validity*: the decided value was proposed by some node
4. *Termination*: every non-crashed node eventually decides

Consensus is impossible if there's any chance of a node crashing (*FLP impossibility result*). In practice, consensus algorithms use timeouts to identify crashed nodes and achieve consensus in the non-crash case.

**Two-Phase Commit (2PC):** The classic protocol for atomic commit across multiple nodes.

Phase 1 (prepare): The coordinator sends a "prepare" message to all participants. Each participant responds with a vote to commit or abort. If a participant votes to commit, it must honor that vote even if the coordinator crashes.

Phase 2 (commit or abort): If all participants voted to commit, the coordinator sends "commit" to all. If any voted to abort, the coordinator sends "abort". Participants execute accordingly.

**Problem with 2PC:** If the coordinator crashes after some participants have voted to commit but before sending the commit message, those participants are *stuck* — they've voted to commit and can't unilaterally abort or commit. They must wait for the coordinator to recover. 2PC is sometimes called a "blocking" atomic commit protocol.

**Three-Phase Commit (3PC):** Adds a non-blocking phase, but requires synchronous networks with bounded delays — unrealistic in practice.

**Consensus algorithms in practice:**

*Paxos*: The foundational consensus algorithm (Lamport, 1989). Single-decree Paxos reaches agreement on a single value. Multi-Paxos sequences proposals to agree on a log of values. Complex to understand and implement correctly.

*Raft*: A consensus algorithm designed for understandability (Ongaro & Ousterhout, 2014). Used in etcd, CockroachDB, TiKV, CockroachDB.

*ZAB*: ZooKeeper's consensus protocol, used in ZooKeeper (which is used by Kafka, HDFS, and others for leader election and distributed coordination).

*Viewstamped Replication (VSR)*: Another consensus protocol, similar to Paxos.

All these algorithms have the same fundamental structure: nodes elect a leader, and the leader proposes values. If a leader fails, a new leader is elected. The key insight: a new leader needs at least a majority quorum to be elected, and a write needs at least a majority quorum to be committed — so there's always at least one node in the overlap that knows the latest committed value.

**Epoch numbers / terms / ballot numbers:** Each leader election increments a counter. Any message with a stale leader epoch is rejected. This prevents a previous leader who recovered from causing split-brain.

**Limitations of consensus:**
- Requires at least 2n+1 nodes to tolerate n failures
- Requires a majority of nodes to be available
- Fixed membership — adding/removing nodes requires a membership change protocol
- Sensitive to network partitions and disk latency (can cause timeouts and unnecessary re-elections)
- Not suitable for high-throughput operations due to multiple round trips per decision

### Membership and Coordination Services

ZooKeeper and etcd are "distributed key-value stores" but are really coordination services built on consensus. Use cases:
- Leader election
- Distributed locks
- Service discovery
- Configuration management
- Membership management

These services are not meant to be used as primary data stores (they're designed for small amounts of slowly changing coordination data). They're the foundation on which higher-level distributed systems are built.

ZooKeeper features:
- Linearizable atomic operations (compare-and-set)
- Sequential ordering guarantees (monotonic version numbers)
- Failure detection via sessions and ephemeral nodes
- Change notifications via watches
