# Requirements

## Functional

- Shorten long URLs.
- Redirect to the original URL when accessing the shortened URL.
- Track click statistics (optional).
- Custom short URL support (optional).
- Expiry date for short URLs (optional).
- Simple user interface for URL shortening.

## Non-functional

- **# of Users:** Support millions of users generating billions of shortened URLs.
- **Data Sizes and Rates:** Handle millions of URL shortening requests and redirection operations daily.
- **Availability:** Target 99.99% uptime to ensure that shortened URLs are always accessible.
- **Horizontal Scalability:** Scale horizontally to support high request throughput and low-latency redirects.
- **Low Latency:** Ensure that URL redirection happens in milliseconds.
- **Security:** Prevent misuse by malicious actors (e.g., URL spamming or phishing).

## Assumptions or Out of Scope

- Advanced features like user accounts and URL history tracking are out of scope.
- Detailed analytics (beyond simple click counts) is also out of scope.
- Authentication is optional and can be handled externally (e.g., Auth0).

# API

## Endpoints with Use Case

- **POST /shorten:** Shorten a long URL and return the shortened URL.
- **GET /{shortURL}:** Redirect the user to the original URL.
- **GET /stats/{shortURL}:** Retrieve statistics about a shortened URL (e.g., click counts) (optional).
- **POST /custom:** Shorten a long URL with a custom alias (optional).
- **POST /expire:** Set an expiration time for a short URL (optional).

## Real-time Feedback (If Any)

- Real-time click tracking for statistics.
- Instant feedback on shortened URL generation.

## Object structures (in a List and in JSON Format)

- **URL Mapping:**

  ```json
  {
    "shortURL": "string",
    "originalURL": "string",
    "createdAt": "string",
    "expirationTime": "string", // optional
    "clickCount": "number" // optional
  }
  ```

- **Shorten Request:**

  ```json
  {
    "originalURL": "string",
    "customAlias": "string", // optional
    "expirationTime": "string" // optional
  }
  ```

- **Stats Response:**
  ```json
  {
    "shortURL": "string",
    "clickCount": "number",
    "createdAt": "string",
    "expirationTime": "string" // optional
  }
  ```

# High-level Design

## Clients

- **Web Interface:** Allows users to shorten URLs, customize aliases, and retrieve statistics.
- **Mobile Application (Optional):** An app for shortening URLs and viewing stats on the go.
- **API Clients:** Developers can integrate the URL shortening service into their own applications.

## Load Balancer/API Gateway/CDN (Include Any Image/Video Compression Services)

- **Load Balancer:** Distribute incoming requests (shorten and redirect operations) across multiple backend servers.
- **API Gateway:** Manages routing and rate-limiting for API endpoints.
- **CDN (Content Delivery Network):** Serve static assets (e.g., the website UI) globally with low latency.

## Services

- **URL Shortening Service:** Generates shortened URLs from long URLs and stores them in the database.
- **Redirection Service:** Redirects users to the original URL when they access a shortened link.
- **Statistics Service:** Tracks and reports click counts for each shortened URL.
- **Expiration Service:** Removes or disables expired URLs from the system (optional).
- **Custom Alias Service:** Allows users to specify a custom alias for their shortened URL (optional).

## Services Communication (Such As Topics and Queues)

- **Event-Driven Architecture:** Use Kafka or RabbitMQ to handle internal communication.
  - **URL Created Event:** Notifies the statistics and redirection services when a new URL is shortened.
  - **URL Expired Event:** Notifies the expiration service to disable or delete the expired URL.
  - **URL Click Event:** Updates click counts in the database whenever a shortened URL is accessed.

## Tradeoffs

- **Hashing vs. Custom Alias:** Using hashing for short URL generation is simple but doesn’t allow custom aliases, which increases user flexibility but adds complexity.
- **Consistency vs. Availability:** For URL redirection, high availability is critical. Eventual consistency may be acceptable for click tracking and statistics.
- **Performance vs. Storage:** Tracking every click for every URL can use significant storage and processing resources, but provides valuable insights for users.

# SQL and NoSQL DBs

## Databases Used (SQL and/or NoSQL Databases)

- **SQL Database (Relational):** Use PostgreSQL or MySQL to store URL mappings, custom aliases, and metadata (e.g., creation time, expiration).
- **NoSQL Database:** Use MongoDB or DynamoDB for high-speed read/writes on click tracking and URL lookups.

## Schemas

- **URL Mapping Table:**

  - shortURL **(Primary Key)**
  - originalURL
  - createdAt
  - expirationTime **(Optional)**
  - clickCount **(Optional)**

- **Click Tracking Table:**
  - shortURL **(Primary Key, Foreign Key)**
  - clickTimestamp

## DB Caching Performance and Cache Invalidation Strategies

- **Caching Layer:** Use Redis to cache URL mappings for frequently accessed short URLs, reducing lookup time.
- **Cache Invalidation:** Use TTL (Time-to-Live) for caching entries or invalidate caches when URLs expire or are updated.

### Inconsistency/Resource/Complexity Tradeoffs

- **Inconsistency:** Eventual consistency for click counts is acceptable to ensure fast redirection.
- **Resource Usage:** Storing click data for every access can become resource-intensive but provides value for analytics.
- **Complexity:** Keeping both a SQL database for URL mappings and a NoSQL database for fast click tracking increases architectural complexity but is necessary for scaling.
