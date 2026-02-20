# DDIA Part III — Derived Data
## Chapters 10–12

---

## Chapter 10 — Batch Processing

Batch processing is about running jobs that process large volumes of data to produce some output. Unlike online (OLTP) systems that respond to requests in milliseconds, batch jobs process accumulated data over minutes, hours, or days.

The key defining characteristic: **batch jobs know when they're done** — they process a bounded input and produce a bounded output. This contrasts with stream processing, which processes unbounded, ongoing data.

---

### Unix Philosophy and Pipelines

Before distributed batch systems, Unix pipes demonstrated the core ideas:

```bash
cat /var/log/nginx/access.log \
  | awk '{print $7}' \
  | sort \
  | uniq -c \
  | sort -rn \
  | head -5
```

This pipeline counts the five most popular URLs in a web server log. Each tool does one thing well. Tools communicate via stdin/stdout. The interface is simple and uniform.

Unix philosophy principles:
1. Make each program do one thing well
2. Expect the output of every program to become the input of another
3. Design and build software to be tried early, ideally within weeks
4. Use tools in preference to unskilled help

These principles translate directly to distributed batch processing. MapReduce applied the Unix philosophy at scale.

---

### MapReduce and Distributed Filesystems

**Distributed File Systems:** HDFS (Hadoop Distributed File System) is modeled on GFS (Google File System). Files are split into blocks (128MB), replicated across multiple machines, managed by a NameNode (metadata) and DataNodes (data). HDFS enables MapReduce to bring computation to data (rather than moving data to computation).

**MapReduce model:**

1. **Map:** A mapper function is called once for each input record. The mapper can emit zero or more key-value pairs.

2. **Sort (shuffle):** All key-value pairs with the same key are gathered together and sorted by key. This is the most expensive step — data moves across the network.

3. **Reduce:** A reducer function is called once for each distinct key, with all values for that key. The reducer emits output records.

**Example — counting words:**
- Map: for each word in the document, emit (word, 1)
- Reduce: for each word, sum all the 1s

**Example — joining datasets:**
A job joining user activity log with user records:
- Map over log: emit (user_id, activity_record)
- Map over user DB: emit (user_id, user_record)
- Reduce: for each user_id, you have one user record and many activity records — join them

This is a *sort-merge join*: both sides are sorted by the join key before reaching the reducer.

**Handling hot keys:** If one user_id has vastly more events than others, one reducer will be overwhelmed. *Skewed joins* / *sharded hash joins* distribute the large party across reducers.

**Map-side joins:** If one dataset is small enough to fit in memory, broadcast it to all mappers. No reducer needed. Much faster.

---

### Beyond MapReduce

MapReduce is simple and robust but has significant limitations:

1. **Writes to HDFS between every step:** A complex job requires chaining multiple MapReduce steps. Each step writes its output to HDFS. This is extremely slow — reading and writing from/to disk for every intermediate result.

2. **No support for iteration:** Machine learning algorithms require iterating over data many times. MapReduce requires a new job for each iteration.

3. **Dataflow APIs are low-level:** Writing joins, aggregations, and filtering in raw MapReduce is verbose and error-prone.

**Higher-level frameworks:**
- **Pig, Hive:** SQL-like query languages compiled to MapReduce
- **Spark:** Keeps intermediate data in memory, supports DAG workflows (not just map + reduce), has a high-level DataFrame API, and supports iterative algorithms (ML)
- **Flink:** True streaming + batch unification (see Chapter 11)
- **Tez:** Allows arbitrary DAGs of tasks (used by Hive and Pig)
- **Crunch:** High-level pipeline API

**Spark's key insight:** Intermediate results don't need to be materialized to disk between stages if the entire job can be expressed as a *Directed Acyclic Graph (DAG)*. Spark tracks the lineage of each RDD (Resilient Distributed Dataset) — if a partition is lost, it can be recomputed from its sources.

---

### The Output of Batch Jobs

Batch jobs typically produce:
- Reports and analytics (aggregated statistics, cohort analysis)
- Search indexes (Lucene inverted indexes built in batch, deployed to search servers)
- Machine learning models (train models on historical data, deploy for online inference)
- Precomputed results in a database (e.g., recommendations, popularity scores)
- Graph computation results (PageRank, community detection)

The *Unix philosophy* insight: batch jobs should not have side effects on the input data or external services. Output is written to a new location. If the job fails midway, restart from the beginning — idempotent outputs.

---

## Chapter 11 — Stream Processing

Stream processing is about processing data *as it arrives*, rather than in batch. The key distinction: **the input is unbounded** — you don't know when the stream will end.

Many of the same principles apply — similar processing patterns, joins, aggregations, outputs. The difference is the timing model.

---

### Event Streams

An *event* is a small, immutable record of something that happened: a user clicked a button, a sensor recorded a temperature, a transaction was completed.

Events flow through the system as a *stream*. The components:
- **Producers (publishers/senders):** Generate events and publish them
- **Consumers (subscribers/recipients):** Process events
- **Message broker/event log:** The conduit between producers and consumers

**Why decouple producers and consumers?**
- A producer doesn't need to know who will consume its events
- Consumers can be added independently
- Consumers can process at their own pace
- If a consumer crashes, it can replay events

### Message Brokers vs. Databases

Message brokers are optimized for ephemeral data flow. They differ from databases:
- Brokers typically delete messages once delivered; databases retain until deleted
- Brokers assume their working set is small; databases can handle much larger datasets
- Brokers don't support secondary indexes
- Brokers notify consumers of new messages; databases require polling

**AMQP/JMS brokers** (RabbitMQ, ActiveMQ): Messages are pushed to consumers, deleted on acknowledgment. If multiple consumers, messages are distributed (load balanced). Not designed for replay.

**Log-based brokers** (Apache Kafka, Amazon Kinesis, Azure Event Hubs): Messages are appended to a log, consumers track their *offset* (position in the log). Messages are retained for a configurable period. Supports replay. Multiple consumer groups can each read independently at their own offset. Partitioned for parallelism — each partition is an ordered log.

**Kafka architecture:**
- Topics are divided into partitions (typically 10–100 per topic)
- Each partition is replicated across multiple brokers
- Producers write to the leader of a partition
- Consumers in a consumer group each own some partitions
- Consumer position (offset) is stored in Kafka itself or ZooKeeper
- Retention period: days to weeks (or by size)

**Kafka as an event log:** The retention of all events enables replaying history — reprocessing old events with new code. This is powerful: it means you can add new derived views of data without touching the original data.

---

### Databases and Streams

The connection between databases and streams is deeper than it appears.

**Change Data Capture (CDC):** Treating the database's write-ahead log as a stream of events. Every write to the database generates an event. Downstream systems can consume this stream to maintain derived data stores — search indexes, caches, analytics databases — in sync with the primary database. Examples: Debezium (Kafka connector), Maxwell, LinkedIn's Databus.

**Event sourcing:** A design pattern where the application state is derived from a log of events. Instead of storing the current state and updating it in place, store every event that led to the current state. The state can be reconstructed by replaying events. Inspired by accounting (a ledger is append-only; balances are derived from the ledger).

Benefits:
- Complete audit log of everything that happened
- Can reconstruct state at any point in time
- Can derive multiple views from the same event log

Trade-offs:
- Replaying the entire event log from scratch is expensive; use snapshots
- Immutable events makes debugging and reasoning easier but requires care with sensitive data (GDPR's right to be forgotten is tricky with immutable logs)

**Immutability:** Append-only logs are simpler to reason about than mutable state. Concurrent writes don't conflict. You can always add a compensating event (a reversal) rather than modifying history.

---

### Processing Streams

Stream processors apply transformations to a stream of events. The processing patterns are similar to batch:

**Stateless transformations:**
- *Filter*: emit events matching some condition
- *Map/transform*: emit a transformed version of each event
- *Enrichment*: join with a reference dataset (database lookup)

**Stateful transformations** (require keeping state):
- *Aggregations*: count, sum, average over a window
- *Joins*: join two streams
- *Deduplication*: suppress duplicate events

**Stream-stream joins:** Join two event streams (e.g., search queries joined with the subsequent click). For each search event, buffer it, and if a click event with the same session ID arrives within a time window, emit a joined record. Requires buffering state.

**Stream-table joins:** Enrich stream events with data from a database (e.g., look up user profile for each activity event). The database can be loaded into memory as a local index on each stream processor node. When the database changes (e.g., user updates profile), the change is propagated via CDC.

**Table-table joins:** Maintain a materialized view that is kept up to date as both tables change. Both input tables are viewed as streams of changes.

---

### Time in Stream Processing

Time is the central challenge in stream processing. Events have:
- **Event time:** When the event actually occurred (from the event itself)
- **Processing time:** When the event is processed by the stream processor

These differ because events can be delayed in transit, arrive out of order, or be replayed from an archive.

**Windows:** Aggregate operations over a time range.
- *Tumbling window*: fixed-size, non-overlapping (events in 9:00–9:01, 9:01–9:02, etc.)
- *Hopping window*: fixed-size, overlapping (5-minute window advancing every 1 minute)
- *Sliding window*: all events within a duration of each other (not fixed to clock boundaries)
- *Session window*: groups events with no gap larger than some timeout between them

**The watermark:** A stream processor needs to know when it can close a window and emit results. A *watermark* is a threshold below which the processor assumes no more events will arrive — it declares that all events up to time T have been received. Events arriving after the watermark is passed are "late".

**Handling late data:**
- Ignore late events (simplest, potentially misleading)
- Re-emit corrected results when late events arrive
- Buffer for a bounded amount of time (slack), then emit

**Exactly-once processing:** Ensuring each event is processed exactly once, even when processors fail and events are replayed. Options:
- *Idempotent operations*: safe to apply multiple times (e.g., set a value rather than increment)
- *Distributed transactions*: ensure writes to output and offset commit are atomic (expensive)
- *Micro-batching*: process events in small batches, commit atomically (Apache Spark Streaming)
- *Checkpointing*: Flink's approach — periodically snapshot all state, replay from last checkpoint on failure

**Flink's approach to exactly-once:** Asynchronous distributed snapshots using Chandy-Lamport algorithm. Stream processing operators checkpoint their state. If a node fails, restart from last checkpoint and replay events from the source (e.g., Kafka offset). Consistent snapshots across operators are achieved by injecting barrier messages into the stream.

---

### Stream Processing Frameworks

**Apache Kafka Streams:** A Java library (not a cluster) for building stream processing applications that consume from and produce to Kafka. Runs inside your application process. Supports stateful processing with state stores backed by Kafka topics (for fault tolerance).

**Apache Flink:** A true streaming engine (not micro-batch). Processes events one at a time with low latency. Unified batch + stream API. Excellent support for event time, watermarks, and complex event patterns. Used at Alibaba, Netflix.

**Apache Spark Streaming / Structured Streaming:** Spark's streaming extension. Structured Streaming (Spark 2.0+) provides a continuous query model — the streaming query is described as if it were a batch query on an unbounded table. Micro-batch by default (100ms latency), but supports continuous mode.

**Apache Storm:** An early stream processing framework. Lower-level than Flink or Spark; doesn't natively support event time or windowing.

**Google Cloud Dataflow / Apache Beam:** Dataflow is Google's managed streaming/batch service. Apache Beam is the open-source SDK. The Beam model (based on Google's MillWheel and the "Dataflow Model" paper) is the most sophisticated treatment of time, windows, and watermarks.

---

## Chapter 12 — The Future of Data Systems

The final chapter steps back from individual technologies to ask: what are the right principles for building data systems, and where is the field going?

---

### Data Integration

The central problem: in a complex system, data flows through many different stores and processors (OLTP databases, caches, search indexes, data warehouses, stream processors). How do you keep them all in sync?

**The "unbundled" database:** Instead of one monolithic database doing everything, modern systems use specialized tools stitched together. Each tool is best-in-class for its use case: Postgres for OLTP, Elasticsearch for search, Redis for caching, Kafka for streaming, Spark for analytics. The application (and the event log / CDC stream) is the integration layer.

**The event log as a backbone:** If all writes to the primary database are captured as an event log (via CDC or event sourcing), derived data stores can be kept in sync by consuming that log. This gives a coherent model for data integration: the event log is the "source of truth," and all other views are derived.

**Derived views vs. primary data:** A key insight: everything in a data system can be viewed as a *derived view* of some underlying data. A search index is a derived view of the documents. A cache is a derived view of the database. A reporting database is a derived view of operational data. Derived views can be *rebuilt* from the source at any time (given the event log).

This changes how you think about schema migrations and data transformations: instead of a scary one-time migration, you derive a new view alongside the old one, verify it, and then switch over.

---

### Correctness and Integrity in Distributed Systems

**The end-to-end argument:** Reliability in distributed systems cannot be fully provided by the infrastructure; it must be verified end-to-end. A reliable messaging system guarantees delivery, but if the consumer processes a message twice due to a bug, the message was still "delivered reliably." Request deduplication must be implemented at the application level using idempotency keys.

**Exactly-once semantics are tricky:** Networks can duplicate messages. Processors can fail mid-operation. True exactly-once is either impossible or requires significant coordination. The practical approach is at-least-once delivery + idempotent processing = effectively once.

**Idempotency:** Making operations safe to apply multiple times. A payment deducted twice is not idempotent. A payment with a unique transaction ID that the system records and ignores duplicates of is idempotent.

**Generating unique IDs:** For distributed systems, generating globally unique identifiers without coordination is important. Options:
- UUID: 128-bit random number. Collision probability negligible. No natural ordering.
- Snowflake ID (Twitter): 64-bit ID encoding timestamp + worker ID + sequence. Sortable by time, globally unique without coordination.
- ULID, KSUID: Similar to Snowflake, lexicographically sortable.

---

### Doing the Right Thing

The final section of the book ventures into ethics, which is unusual for a technical book.

**Responsibility of data engineers:** Data systems are not neutral tools. They make decisions that affect people's lives — credit scores, hiring decisions, advertising targeting, loan approvals. The people who build these systems bear responsibility for their effects.

**Predictive analytics and discrimination:** Machine learning systems trained on historical data perpetuate historical biases. A system trained to predict creditworthiness on historical lending data will encode the discriminatory lending practices of the past. *Feedback loops* can make this worse: if a model predicts high risk for a group and lends less to them, they have fewer opportunities to build credit history, which confirms the original prediction.

**Surveillance capitalism:** Vast amounts of behavioral data are collected by tech companies and used to manipulate user behavior (advertising, content feeds). Users are rarely aware of the extent of data collection or how it's used.

**Privacy and consent:** Data collected for one purpose is often used for another. Users may consent to "collect data to improve our service" without realizing it means detailed behavioral profiling.

**Accountability:** Complex machine learning systems are often not interpretable. When they make decisions affecting people (who gets a loan, who gets an interview, who is flagged for law enforcement), there's often no clear mechanism for the affected person to understand or challenge the decision.

**Design for correctness and accountability:**
- Make it easy to understand what data you have and how it's used
- Allow users to correct their data
- Minimize data collection to what's actually needed (*data minimization*)
- Use anonymization / differential privacy techniques
- Build systems that can be audited

---

### Lambda and Kappa Architectures

**Lambda architecture** (Nathan Marz): Run both a batch layer (reprocesses all historical data to get accurate results) and a speed layer (processes recent data in real-time for low latency). Merge results from both layers for queries. The idea is that batch processing is accurate but slow; stream processing is fast but may be inaccurate; combining them gives both.

Problems: Maintaining two separate codebaths (batch and streaming) for the same logic is complex and error-prone. Keeping them in sync is hard.

**Kappa architecture** (Jay Kreps): Use only the streaming layer. Keep a long retention Kafka topic. To reprocess, run a new version of the stream processor from the beginning of the log. This avoids maintaining two separate systems. Works when your streaming system is powerful enough for reprocessing (Flink, Kafka Streams).

Kleppmann argues the distinction is becoming less relevant as streaming systems become more powerful and unified batch/stream frameworks (Flink, Beam) mature.

---

### Towards a Unified Data Model

The book's final vision: **treat the entire organization's data as a single distributed database**, where:
- Different storage systems (OLTP DB, cache, search index, warehouse) are **specialized indexes** optimized for different query patterns
- The **event log** is the source of truth, and all other stores are derived
- **Dataflow** between systems is made explicit and reliable (via CDC, event sourcing, stream processing)
- **Schema changes** become creating new derived views, verified in parallel with old views

This is fundamentally about *making data systems more like Unix pipes*: composable, with clean interfaces, and explicit about data movement — rather than monolithic systems that try to do everything internally.

---

## Conclusion and Key Takeaways

**Across all parts of the book, several themes recur:**

**1. No silver bullet.** Every storage, processing, and replication technology involves trade-offs. Understanding those trade-offs — and matching them to your requirements — is the core skill.

**2. Immutability is powerful.** Append-only logs, event sourcing, MVCC, and functional programming all leverage immutability to simplify reasoning about concurrent and distributed systems.

**3. Derive everything.** Cache, search index, analytics database, stream processing output — all of these are derived views that can be rebuilt from a source of truth. This frees you from the fear of irreversible transformation.

**4. Eventual consistency is a trade-off, not a bug.** Stronger consistency (linearizability) requires coordination, which costs availability and performance. Weaker consistency (eventual consistency) is often acceptable and enables greater scalability.

**5. Failures are normal.** Networks partition. Disks fail. Processes pause. Nodes crash. A well-designed system expects these and handles them gracefully, not as exceptional cases.

**6. Data has an ethical dimension.** The systems you build affect real people. Minimizing data collection, enabling correction and challenge, building for auditability, and thinking about feedback loops and bias are not optional add-ons but core engineering responsibilities.

---

## Quick Reference: Key Concepts

| Concept | Brief definition |
|---------|-----------------|
| LSM-Tree | Log-Structured Merge Tree: write-optimized storage using in-memory buffer + sorted disk files |
| B-Tree | Balanced tree for read-optimized storage; ubiquitous in relational databases |
| MVCC | Multi-Version Concurrency Control: maintain multiple versions of data to allow non-blocking reads |
| WAL | Write-Ahead Log: write changes to a log before applying to storage, enabling crash recovery |
| 2PC | Two-Phase Commit: atomic commit protocol for distributed transactions |
| SSI | Serializable Snapshot Isolation: optimistic concurrency control for full serializability |
| Paxos/Raft | Consensus algorithms for agreeing on a value across distributed nodes |
| CDC | Change Data Capture: stream database changes as an event log |
| Event sourcing | Store a log of events as the source of truth; derive state from events |
| Watermark | In stream processing, a threshold declaring that all events before time T have been received |
| Exactly-once | Processing guarantee: each event affects the output exactly once despite failures |
| Linearizability | Consistency model: reads always see the latest write; system appears to have one copy |
| Causal consistency | Weaker model: causally related operations seen in order; concurrent operations can vary |
| Quorum | Majority of nodes that must agree for a write/read to be valid (w + r > n) |
| Fencing token | Monotonically increasing number to prevent stale leaders from making writes |
| Serializability | Isolation level: result equivalent to some sequential transaction execution |
