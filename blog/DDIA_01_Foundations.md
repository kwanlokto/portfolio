# DDIA Part I — Foundations of Data Systems
## Chapters 1–4

---

## Chapter 1 — Reliable, Scalable, and Maintainable Applications

### The Core Challenge

Modern applications don't just crunch numbers — they store data, cache results, search full text, send messages asynchronously, process analytics, and do all of this while remaining available to millions of users. These are fundamentally *data* problems, not compute problems.

The challenge is that no single tool handles all of these needs well. A typical application might use PostgreSQL for the primary data store, Redis for caching, Elasticsearch for full-text search, Kafka for event streaming, and Spark for analytics. The application code is responsible for keeping these systems in sync and presenting a coherent API to the outside world.

### Reliability

Reliability means: **the system does what it is supposed to do, even when things go wrong.**

Things that can go wrong are called *faults*. A system that can handle faults gracefully is called *fault-tolerant* or *resilient*.

**Types of faults:**

- **Hardware faults** — Hard drives fail (mean time to failure of ~10–50 years per disk, but at scale you have thousands of disks). Power outages. Network switches die. The traditional response was redundancy (RAID, dual power supplies, hot-swap components). Modern cloud systems instead use software fault-tolerance techniques that allow entire machines to die.

- **Software errors** — Bugs that lie dormant for years until triggered by unusual input. A process consuming all CPU or memory. A cascading failure where one slow service causes others to time out. These are often harder to handle than hardware faults because hardware fails randomly, but software bugs can affect all instances simultaneously.

- **Human errors** — Configuration errors cause a large fraction of outages. Humans are unreliable. The best systems make it easy to do the right thing, provide good monitoring and rollback mechanisms, use sandboxed environments for testing, and design for recovery not just prevention.

**Reliability vs. availability:** Reliability is broader. Availability is about uptime. A system can be reliable without being 100% available (it might be down for maintenance). A system can be available without being reliable (it responds to requests, but gives wrong answers).

### Scalability

Scalability means: **as the system grows, there are reasonable ways to deal with that growth.**

The first step is to define what "growth" means for your system. Kleppmann uses Twitter as a case study. Twitter's challenge is not storing tweets (the data volume is manageable) — it is the *fan-out* problem: when a user with 30 million followers posts a tweet, do you push the tweet into each follower's home timeline cache immediately, or do you compute the timeline on read? The right answer depends on the distribution of follower counts. Twitter ended up with a hybrid approach.

**Describing load with load parameters:**
- Requests per second
- Ratio of reads to writes in a database
- Number of simultaneously active users
- Cache hit rate

**Describing performance:**
- *Throughput* — number of records processed per second (batch jobs)
- *Response time* — the time between sending a request and receiving a response (online systems)

Response time should be measured as a *distribution*, not just an average. The 99th percentile (p99) is often more important than the median because the slowest requests often hit your most valuable users (who make the most requests). High percentiles are called *tail latencies*.

Head-of-line blocking: a few slow requests can block all subsequent requests waiting behind them. This is why even if only 1% of your requests are slow, a user making 100 requests in parallel will almost always hit at least one slow request.

**Scaling approaches:**
- *Vertical scaling* (scaling up) — more powerful machine
- *Horizontal scaling* (scaling out) — more machines
- *Elastic scaling* — automatically add/remove machines based on load

Most systems use a pragmatic mix. Shared-nothing architectures (each node handles a subset of the work) are common but introduce new complexity around data distribution and consistency.

### Maintainability

Most of the cost of software is in ongoing maintenance, not initial development. Three design principles help:

**Operability** — Make it easy for operations teams to keep the system running. This means good observability (metrics, logs, tracing), easy ways to apply patches, documentation, and predictable behavior.

**Simplicity** — Manage complexity. Complexity comes from state explosion, tight coupling, tangled dependencies, inconsistent naming, hacks. Good abstractions hide implementation detail and allow reasoning at a higher level. SQL is a good abstraction for relational data — you don't need to know about B-trees to write queries.

**Evolvability** — Make it easy to change the system in the future. Requirements will change. The system must be able to accommodate new use cases, new data models, new business rules — without a full rewrite.

---

## Chapter 2 — Data Models and Query Languages

Data models are perhaps the most important choice you make when building a system. They determine how you think about the problem and what operations are easy or hard.

### The Relational Model

Edgar Codd proposed the relational model in 1970. Data is organized into *relations* (tables), each of which is an unordered collection of *tuples* (rows). The relational model's power comes from:

- **Normalization** — data appears in one place, avoiding duplication and update anomalies
- **Joins** — data from multiple tables can be combined at query time
- **Declarative queries** — SQL describes *what* you want, not *how* to compute it, allowing the query optimizer to find an efficient execution plan
- **Schema enforcement** — invalid data is rejected at write time

The relational model dominated for ~25 years. Object-relational impedance mismatch — the friction between the relational model and object-oriented application code — led to ORM frameworks, which help but don't fully solve the problem.

### The Document Model

JSON/document databases (MongoDB, CouchDB, RethinkDB) store self-contained documents. This works well when your data has a tree-like structure and the data you need is usually in one document.

**Advantages of documents:**
- Better *locality* — one query fetches everything you need
- Flexible schema (schema-on-read vs. schema-on-write)
- Natural mapping to object-oriented code for certain data shapes

**Disadvantages:**
- Joins are hard — you either embed data (duplication) or use application-level joins (multiple queries)
- Many-to-many relationships are awkward
- Cannot refer to a nested item directly; must load the entire document

**The document model works well when:** your data has a tree structure, you rarely need to join across documents, and the schema is highly variable.

**The relational model works well when:** your data has many-to-many relationships, you need complex queries, and data consistency across entities matters.

### The Network Model (CODASYL)

A historical model from the 1970s. Records are linked via pointers, forming a graph. Queries work by following pointers along access paths — like navigating a linked list. Very efficient for its time but required application code to know the physical structure of the data. Schema changes were painful. Largely abandoned.

### The Graph Data Model

For highly connected data where many-to-many relationships are the norm. Two main models:

**Property graphs** (Neo4j, Titan) — vertices and edges, each with a map of key-value properties. Expressive query languages like Cypher can traverse paths of arbitrary length.

**Triple-stores / RDF** — (subject, predicate, object) triples. Enables the semantic web vision. SPARQL is the query language.

Graphs are powerful for social networks, fraud detection, recommendation engines, routing problems, and knowledge graphs.

### Query Languages

**Declarative (SQL, Cypher, SPARQL):** Describe the result you want. The database engine decides how to compute it. This makes optimization easier and allows the interface to remain stable even as the engine changes.

**Imperative:** Describe exactly how to compute the result. Most programming languages are imperative. You have more control but are responsible for optimization.

**MapReduce** — a programming model for bulk processing distributed data. Somewhere between declarative and imperative. The user writes `map` and `reduce` functions (pure functions with no side effects), and the framework handles parallelization, fault tolerance, and data movement. MongoDB's aggregation pipeline is a more declarative take on MapReduce.

---

## Chapter 3 — Storage and Retrieval

This chapter is about how databases work internally. Understanding this helps you choose the right database and tune it appropriately.

### The World's Simplest Database

```bash
#!/bin/bash
db_set () { echo "$1,$2" >> database; }
db_get () { grep "^$1," database | last | cut -d',' -f2; }
```

This works! But `db_get` is O(n) — linear scan. For real performance, you need an *index*.

An index is an additional data structure derived from the primary data. It speeds up reads at the cost of slower writes (every write must also update the index) and more storage. This is the fundamental trade-off of indexing.

### Hash Indexes

The simplest index: a hash map in memory mapping each key to the byte offset of its value on disk. This is essentially what Bitcask (the default storage engine in Riak) does.

**Log-structured storage with compaction:** Append new key-value pairs to a log. To avoid infinite log growth, periodically run *compaction*: discard duplicate keys, keeping only the most recent value. Merge multiple segments into one. This can run in a background thread while serving reads/writes from the old segments.

**Why append-only?** Sequential writes are much faster than random writes on spinning disks. Crash recovery is simpler — partial writes are easy to detect. Concurrency and crash recovery are much simpler with immutable data.

**Limitations of hash indexes:**
- The hash table must fit in memory. You can't have more keys than RAM.
- Range queries are inefficient — you can't scan a range without reading every key.

### SSTables and LSM-Trees

**Sorted String Tables (SSTables):** Like a log segment, but sorted by key. Benefits:
- Merging segments is efficient (merge sort)
- You don't need an index of all keys in memory — a sparse index (one key per few kilobytes) works because you can scan to the right position
- Blocks between index entries can be compressed

**How to maintain sorted order for writes?** Use an in-memory sorted structure (a *memtable* — typically a red-black tree or AVL tree). When it gets large enough, flush it to disk as an SSTable segment. This is the **LSM-Tree (Log-Structured Merge-Tree)** approach, used by LevelDB, RocksDB, Cassandra, HBase, and many others.

**LSM-Tree read path:** Check the memtable, then the most recent SSTable, then older SSTables (most recent first). Bloom filters are used to avoid reading SSTables that don't contain a given key.

**Compaction strategies:**
- *Size-tiered*: newer smaller SSTables merged into older larger ones (used by Cassandra, HBase)
- *Leveled*: key range split into smaller SSTables, older data moved into "levels" (used by LevelDB, RocksDB). Better for read performance and space amplification.

**LSM-Trees excel at:** high write throughput, compression (no wasted space from fragmentation), sequential I/O patterns.

### B-Trees

B-Trees are the most widely used indexing structure. They underlie most relational databases (PostgreSQL, MySQL InnoDB, SQLite) and many others.

**Structure:** The database is divided into fixed-size *pages* (typically 4KB). Each page contains a range of keys and pointers to child pages. Leaf pages contain the actual values (or pointers to them). The branching factor (number of references per page) is typically several hundred.

**Properties:**
- Balanced: all leaves at the same depth
- Height grows logarithmically: a 4-level B-Tree can store up to 256TB of data (branching factor 500, 4KB pages)
- In-place updates: to change a value, find the leaf page, overwrite it, write to disk

**Write-ahead log (WAL):** Before modifying a B-Tree page, every modification is first written to a WAL (also called a redo log). If the database crashes, the WAL is replayed to restore the B-Tree to a consistent state.

**B-Tree optimizations:**
- Copy-on-write instead of WAL (used by LMDB): instead of overwriting pages, write a new copy and swap the root pointer atomically
- Abbreviated keys in interior nodes to pack more into a page
- Sibling page pointers for efficient sequential scans
- Fractal tree indexes

**B-Trees vs. LSM-Trees:**

| Aspect | B-Trees | LSM-Trees |
|--------|---------|-----------|
| Write amplification | Higher (WAL + random writes) | Lower (sequential) |
| Read performance | Generally better | Generally worse (multiple SSTables) |
| Write throughput | Lower | Higher |
| Space efficiency | Some fragmentation | Better (compaction) |
| Compaction interference | None | Can affect p99 latency |
| Transactional semantics | Easy (key exists once) | Harder (duplicate keys) |

### Other Indexing Structures

**Clustered index:** The row data is stored in the index itself (not a separate heap file). In MySQL InnoDB, the primary key is always a clustered index.

**Covering index:** A non-clustered index that includes the values of additional columns, allowing some queries to be answered from the index alone ("index-only scan").

**Multi-column indexes:** Concatenated indexes cover multiple columns in a defined order. Good for queries that filter by prefix columns. *Multi-dimensional indexes* (R-trees, k-d trees) enable efficient range queries in multiple dimensions simultaneously — e.g., geo-spatial queries.

**Full-text search indexes:** Inverted indexes mapping words to the documents/positions they appear in. Allows searching for words within text, handling synonyms, stemming, etc. Used by Lucene (underlying Elasticsearch and Solr).

**In-memory databases:** As RAM gets cheaper, keeping the entire dataset in memory becomes viable. VoltDB, MemSQL, TimesTen are in-memory relational databases. Redis stores data in-memory but can persist to disk. Redis's speed advantage isn't just about avoiding disk I/O — it's also because it avoids the overhead of encoding data into a disk format.

### Transaction Processing vs. Analytics (OLTP vs. OLAP)

**OLTP (Online Transaction Processing):** Low latency, small number of records per query, random access by key, frequent writes. Used by end-user-facing applications. Examples: customer records, orders, payments.

**OLAP (Online Analytical Processing):** High latency acceptable, aggregate over many records, read-only or infrequent writes, scans large portions of data. Used for business intelligence. Examples: total sales this month, user retention by cohort.

These workloads have very different access patterns and are usually served by different systems. The separation between OLTP databases and data warehouses emerged in the 1980s–90s.

**ETL (Extract-Transform-Load):** The process of copying data from OLTP systems into a data warehouse, transforming it into an analysis-friendly schema.

**Data warehouse schemas:**
- *Star schema*: A central fact table (individual events: sales, page views, orders) surrounded by dimension tables (who, what, when, where). Simple and query-friendly.
- *Snowflake schema*: Dimensions are normalized into sub-dimensions. More normalized but harder to query.

### Column-Oriented Storage

OLAP queries typically access a few columns across millions or billions of rows. Row-oriented storage (the default in most databases) must load entire rows even when only a few columns are needed.

**Column storage:** Store all values for each column together. A query that accesses 3 columns only reads 3 column files, ignoring the other 100.

**Benefits:**
- Much better compression — a column of values has high repetition, enabling bitmap encoding, run-length encoding, dictionary encoding
- Vectorized processing — modern CPUs can process compressed column data using SIMD instructions efficiently

**Column sort order:** Sorted on the most commonly filtered column. Since you can replicate the warehouse data for different use cases, different replicas can be sorted differently (useful for different query patterns).

**Materialized views and data cubes:** Pre-aggregate data for common queries. A data cube is a materialized view of aggregates along every combination of dimensions. Fast for standard reports but inflexible — can't filter on arbitrary combinations.

---

## Chapter 4 — Encoding and Evolution

### Why Encoding Matters

Data needs to be encoded when it crosses a boundary: written to disk, sent over the network, passed between processes. The encoding format determines how easy it is to evolve the schema over time.

In a large system, schema changes cannot be deployed instantaneously to all nodes. During a rolling upgrade:
- Some servers run new code, others run old code
- New code may write data with new schema
- Old code must be able to read that data (backward compatibility)
- Old code may write data with old schema
- New code must be able to read that data (forward compatibility)

### Language-Specific Formats

Java's `Serializable`, Python's `pickle`, Ruby's `Marshal` — these are convenient but have serious drawbacks:
- Tied to a specific language — can't read from another language
- Security vulnerabilities — arbitrary classes can be instantiated during deserialization
- Poor versioning — hard to evolve the schema
- Often poor performance

**Avoid these for anything beyond ephemeral, single-process use.**

### JSON, XML, and CSV

Widely used, human-readable, and language-neutral. But:
- **Type ambiguity** — JSON doesn't distinguish integers from floats, can't represent binary data without base64 encoding
- **No schema** — the format doesn't enforce that required fields are present
- **Large size** — field names are repeated with every record
- **XML verbose** — namespace handling is complicated
- **CSV** — no standard for encoding special characters, no schema

Despite these problems, they are the lingua franca of web APIs and remain excellent for interchange between organizations because of their universality.

### Binary Encoding Formats

**Thrift (Facebook) and Protocol Buffers (Google):** Schema-based binary formats. You define a schema using an IDL (Interface Definition Language), and a code generator creates classes in your language.

```protobuf
message Person {
  required string user_name = 1;
  optional int64 favorite_number = 2;
  repeated string interests = 3;
}
```

Field values are identified by **field tags** (numbers like 1, 2, 3), not field names. This is key: field names can be changed freely. Old code reading new data can skip unknown field tags. New code reading old data uses defaults for missing tags.

**Avro (Hadoop):** A different approach — the schema is separate from the data. No field tags. The writer's schema and reader's schema are reconciled at read time using schema resolution. This enables schema evolution without changing field tags. The writer's schema must be stored somewhere accessible (in a file header, in a schema registry, negotiated via connection handshake).

### Modes of Dataflow

**Through databases:** Writer encodes, reader decodes. Multiple versions of the application may be running simultaneously. Schema changes must be backward and forward compatible. Migrations can move data forward, but unknown fields in old code must be preserved to avoid data loss.

**Through services (REST and RPC):**

*REST* — not a protocol but an architectural style. Uses HTTP verbs, URLs represent resources, responses in JSON/XML. Widely used for public APIs. Compatible with web caches and firewalls.

*RPC (Remote Procedure Call)* — makes network calls look like local function calls. The fundamental problem: networks are unreliable in ways local function calls are not. Latency is variable. Calls can fail partway through. Arguments must be encoded. The local/remote abstraction *leaks*.

Modern RPC frameworks (gRPC, Thrift, Avro RPC) are explicit about being remote. gRPC uses Protocol Buffers and HTTP/2, supports streaming, is strongly typed.

**Service compatibility:** Since services are often deployed independently, the service API must evolve compatibly. The API must support both old and new clients.

**Through asynchronous message passing:**

Producers send messages to a *message broker* (also called a message queue). Consumers receive messages asynchronously. The broker decouples producers from consumers in time and availability.

Examples: RabbitMQ, ActiveMQ, Azure Service Bus, Kafka.

The producer doesn't care about the encoding of the consumer, as long as the consumer can decode the message. But this means the encoding of messages must be forward and backward compatible, since messages might sit in the queue for days.

**Actor model:** Actors communicate via asynchronous messages. Each actor processes one message at a time, maintaining private state. The actor model naturally deals with concurrency because there's no shared mutable state. Akka uses Java serialization (bad — upgrade to something like Protocol Buffers). Orleans uses custom serialization.
