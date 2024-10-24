One time, we were working on a project to migrate several core services to GCP at CME Group, and the project hit an unexpected roadblock. During the migration phase, we encountered performance issues with one of the key microservices that wasn’t scaling as expected under high load. This issue was critical, as it impacted the performance of our risk calculations and caused delays in processing data, which was unacceptable in a live trading environment.

To handle the situation, I immediately called for a cross-functional team meeting to assess the issue and gather input from different departments, including cloud engineers, architects, and performance experts. After investigating the logs and performance metrics, we identified that the problem was related to how the service handled concurrency and caching. The system was being bottlenecked by inefficient database calls, which weren’t optimized for the cloud environment.

I worked with the team to refactor the code, improving the multi-threading strategy and implementing distributed caching for better performance. We ran stress tests in a staging environment, and once we confirmed the issues were resolved, we redeployed the services in GCP. While the delay was unexpected, clear communication, collaboration, and a quick response allowed us to get back on track and ensure the project’s success.

The experience reinforced the importance of being adaptable and prepared for unforeseen challenges in large-scale projects.

**Scenario with a Manager:**

**Manager**: "The project didn’t meet the original deadlines. What happened?"

**You**: "It was like building a house during a storm. We faced unexpected issues, but we adapted and made sure the foundation was solid before continuing."
