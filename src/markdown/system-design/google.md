# Requirements

## Functional

- Web Search Engine with highly relevant results.
- PageRank and other ranking algorithms for indexing web pages.
- Crawling and Indexing of the internet.
- Auto-suggestions and spell correction.
- Query processing and search result ranking.
- Advertising system with targeted ads.
- Support for various media types (videos, images, etc.).
- Localization of search results.
- Search by voice and images.

## Non-functional

- **# of Users:** Support billions of users daily.
- **Data Sizes and Rates:** Handle petabytes of data with millions of search queries per second.
- **Availability:** Target 99.999% uptime.
- **Horizontal Scalability:** Scale up to handle fluctuating loads during peak search times.
- **Low Latency:** Return search results within milliseconds.
- **High Reliability:** Resilience against failures.

## Assumptions or Out of Scope

- Authentication and identity management is handled externally.
- Advanced features like Google Assistant, News, and Shopping are out of scope.
- Analytics and Ad Tracking are not part of this scope.

# API

## Endpoints with Use Case

- **GET /search:** Process a search query and return ranked search results.
- **GET /autocomplete:** Provide query suggestions based on input.
- **POST /index:** Index new web pages for search.
- **GET /page-rank/{url}:** Retrieve the PageRank score for a URL.
- **GET /search-history:** Retrieve user's search history.
- **POST /advertisement:** Submit an ad for processing and display.

## Real-time Feedback (If Any)

- Auto-suggestions as users type in the search bar.
- Spell correction feedback as queries are entered.
- Real-time feedback on trending searches.

## Object structures (in a List and in JSON Format)

- **Search Query:**
  ```json
  {
    "query": "string",
    "userId": "string",
    "timestamp": "string"
  }
  ```
- **Search Result:**
  ```json
  {
    "url": "string",
    "title": "string",
    "snippet": "string",
    "rank": "number",
    "metadata": {
      "pageRank": "number",
      "lastCrawled": "string"
    }
  }
  ```
- **Advertisement:**
  ```json
  {
    "adId": "string",
    "targetKeywords": ["string"],
    "clicks": "number",
    "impressions": "number"
  }
  ```

# High-level Design

## Clients

- Web browsers (Chrome, Firefox, Safari, etc.).
- Mobile Applications (iOS and Android).
- APIs for third-party integrations (smart assistants, embedded search).

## Load Balancer/API Gateway/CDN

- **Load Balancer:** Distribute incoming search requests across multiple servers.
- **API Gateway:** Handle request routing, rate limiting, and authentication.
- **CDN:** Serve static assets (such as search result previews and ads) globally with low latency.

## Services

- **Search Service:** Manages query processing, ranking, and delivering results.
- **Indexing Service:** Crawls and indexes new web pages, calculating PageRank.
- **Ad Service:** Manages targeted ads based on keywords and user data.
- **Autocomplete Service:** Provides suggestions as users type in their queries.
- **Personalization Service:** Tailors results based on user history, preferences, and location.
- **Spell Correction Service:** Suggests spell corrections for user queries.

## Services Communication (Such As Topics and Queues)

- **Event-Driven Architecture:** Use Kafka or RabbitMQ for inter-service communication.
  - **Crawling Completed Topic:** Notifies when a new batch of pages is indexed.
  - **Ad Click Event:** Triggers when a user clicks an ad to update metrics.
  - **User Query Event:** Sends user query data to personalization service for future recommendations.

## Tradeoffs

- **Complexity vs. Performance:** Using microservices makes the system more modular but introduces complexity in deployment and management.
- **Latency vs. Accuracy:** Balancing between delivering fast search results and ranking accuracy can be challenging, particularly when dealing with personalized results.
- **Consistency vs. Availability:** Eventual consistency might be acceptable for indexing and personalization to ensure high availability.

# SQL and NoSQL DBs

## Databases Used (SQL and/or NoSQL Databases)

- **SQL Database:** Use MySQL or PostgreSQL for relational data (user profiles, search history).
- **NoSQL Database:** Use Bigtable, Cassandra, or MongoDB for storing index data, ad metadata, and search results.

## Schemas

- **User Table:**

  - id **(Primary Key)**
  - username
  - email
  - searchHistory
  - preferences

- **Page Index Table:**

  - id **(Primary Key)**
  - url
  - title
  - snippet
  - pageRank
  - lastCrawled

- **Ad Table:**
  - id **(Primary Key)**
  - targetKeywords
  - clicks
  - impressions

## DB Caching Performance and Cache Invalidation Strategies

- **Caching Layer:** Use Redis or Memcached to cache frequently accessed data, such as search results for trending queries.
- **Cache Invalidation:** Implement TTL (Time-to-Live) for cache entries and invalidate caches when new pages are indexed or ads are updated.

### Inconsistency/Resource/Complexity Tradeoffs

- **Inconsistency:** Eventual consistency may be acceptable for index updates to maintain high search result availability.
- **Resource Usage:** Caching frequently searched results reduces query load but requires additional memory resources.
- **Complexity:** Managing cache invalidation and multiple database systems (SQL for structured data, NoSQL for large-scale indexing) increases system complexity.
