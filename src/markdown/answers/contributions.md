### 1. Challenging Project:

- **What:** I led the migration of 5+ microservies
- **How:** I containerized on-prem apps and designed data pipelines in Spring Batch using Postgres and Cassandra
- **Outcome:** I improved throughput by 20% through multi-threading and distributed caching strategies
- **Proof:** I measured it from daily Argo job time improvements

#### Why did migrating to GCP improve performance?

- **Auto-Scaling:** GCP dynamically adjusted resources to handle peak loads, improving scalability without manual intervention.
- **Global Network:** Reduced latency and faster request processing using GCP’s high-performance global network and load balancing.
- **GKE (Kubernetes):** Optimized resource utilization and orchestration, improving compute efficiency for microservices.
- **Caching & Replication:** Leveraged Cloud Memorystore (Redis) and Pub/Sub for faster data access and efficient replication.

#### What were some roadblocks you encountered?

- **Service Compatibility:** Faced challenges with compatibility issues between legacy systems and GCP services. We had to adapt our architecture and use middleware to bridge the gaps.
- **Data Migration:** Migrating large volumes of data was complex and time-consuming. We used incremental migration strategies and data validation tools to ensure accuracy and minimize downtime.
- **Learning Curve:** The team encountered a steep learning curve with new GCP tools and services. I organized training sessions and hands-on workshops to accelerate the learning process and improve proficiency.
- **Network Configuration:** Configuring network settings and security rules in GCP posed initial difficulties. I collaborated with the network team to fine-tune configurations and ensure secure, efficient data flow.

### 3. Code Quality:

- **Contribution:** At CME Group, I took the initiative to introduce end-to-end testing for microservices, which reduced production bugs by 40%. I automated the testing pipeline, integrating it into the daily build process to ensure high code quality. I also led code reviews, sharing best practices with junior engineers and implementing coding standards to maintain consistency across the team.

### 4. Cloud Technologies:

- **Contribution:** I spearheaded the adoption of GCP at CME Group, leading the migration of multiple services to the cloud. I personally managed Docker and Kubernetes deployments, ensuring efficient use of cloud resources and enabling automated scaling. I was responsible for setting up cloud storage solutions and load balancing, which optimized our system for high availability and performance.

### 5. Microservices:

- **Contribution:** I architected and maintained several high-volume Java microservices for CME’s risk management platform. I personally designed the concurrency and caching mechanisms that improved data processing efficiency. I took the lead on optimizing the microservices for scalability and performance, implementing strategies to handle the system's growing data load.

### 6. Managing Large-Scale Systems:

- **Contribution:** I designed and implemented failover strategies across multiple regional zones, which led to a 30% reduction in on-call incidents. I personally configured load balancers and redundancy systems to ensure continuous availability of critical services at CME Group. I also handled the monitoring and tuning of these systems to maintain high performance during peak traffic.

### 7. Front-End Development:

- **Contribution:** At DataChat, I independently designed and developed a React-based chat app that integrated with natural language processing (NLP) algorithms. I took charge of implementing an AI-powered auto-suggestion feature that improved the app’s responsiveness by 25%. I ensured the frontend was highly optimized and scalable by using React’s best practices, Redux for state management, and TypeScript for robust typing.

### 8. Automation & CI/CD:

- **Contribution:** I introduced Infrastructure as Code (IaC) using Helm Charts and Terraform at CME Group, which increased deployment frequency from every three months to weekly. I personally automated the end-to-end testing process and integrated CI/CD pipelines, saving the team 8 hours per deployment. I also implemented continuous monitoring and logging solutions to quickly identify and resolve any issues post-deployment.

### 9. Distributed Databases (Cassandra):

- **Contribution:** I designed and implemented distributed database caching with Cassandra at CME Group. I personally configured the replication strategy to ensure fault tolerance and high availability. I also tuned Cassandra’s partitioning and compaction strategies to optimize read/write performance for large-scale data operations.

### 10. Database Sharding Using Historical Dates:

- **Contribution:** I implemented a sharding strategy based on historical dates to improve query performance and manage growing datasets at CME Group. I personally led the design of the sharding algorithm, which divided the data by date ranges, reducing query times and optimizing storage. This approach also helped to distribute load evenly across the database.
