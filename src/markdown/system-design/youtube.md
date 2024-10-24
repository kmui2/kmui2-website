# Requirements

## Functional

- User Registration and Authentication
- Video Uploading and Processing
- Video Streaming and Playback
- Search Functionality for Videos
- User Comments and Ratings
- Playlists and Subscriptions Management
- Notifications for User Activities (likes, comments, etc.)
- Admin Panel for Content Moderation

## Non-functional

- **# of Users:** Support up to 2 billion active users.
- **Data Sizes and Rates:** Handle over 500 hours of video uploaded every minute.
- **Availability:** Target 99.99% uptime.
- **Horizontal Scalability:** Scale out to thousands of servers during peak usage.

## Assumptions or Out of Scope

- Verified Authentication managed by an external service (e.g., Auth0).
- Advanced video analytics and advertising features are out of scope.

# API

## Endpoints with Use Case

- **POST /register:** Register a new user.
- **POST /login:** Authenticate a user.
- **POST /upload:** Upload a new video.
- **GET /video/{videoId}:** Retrieve video details and streaming URL.
- **GET /search:** Search for videos based on keywords.
- **POST /comment:** Post a comment on a video.
- **POST /like:** Like or dislike a video.
- **GET /subscriptions:** Retrieve user's subscriptions and new video notifications.

## Real-time Feedback (If Any)

- WebSocket connections for real-time chat during live streams.
- Instant notifications for likes, comments, and new subscriptions.

## Object structures (in a List and in JSON Format)

- **User:**
  \```json
  {
  "id": "string",
  "username": "string",
  "email": "string",
  "passwordHash": "string",
  "createdAt": "string",
  "updatedAt": "string"
  }
  \```
- **Video:**
  \```json
  {
  "id": "string",
  "title": "string",
  "description": "string",
  "url": "string",
  "thumbnail": "string",
  "ownerId": "string",
  "createdAt": "string",
  "views": "number",
  "likes": "number",
  "dislikes": "number"
  }
  \```
- **Comment:**
  \```json
  {
  "id": "string",
  "videoId": "string",
  "userId": "string",
  "content": "string",
  "createdAt": "string"
  }
  \```

# High-level Design

## Clients

- Web Application for desktop users to access and upload videos.
- Mobile Application for on-the-go viewing and uploading.

## Load Balancer/API Gateway/CDN

- Load Balancer to distribute incoming API requests across multiple service instances.
- API Gateway to manage routing, rate limiting, and security.
- CDN for serving video content and static assets (like thumbnails).

## Services

- **User Service:** Manages user accounts, authentication, and subscriptions.
- **Video Service:** Handles video uploads, processing, and streaming.
- **Comment Service:** Manages user comments and interactions.
- **Notification Service:** Sends real-time notifications for user activities.

## Services Communication (Such As Topics and Queues)

- **Event-Driven Architecture:** Use message queues (e.g., Kafka) for inter-service communication.
  - **Video Uploaded Topic:** Notifies when a new video is uploaded for processing.
  - **Comment Posted Topic:** Notifies when a new comment is made on a video.

## Drawing

- A block diagram illustrating services, load balancers, clients, and databases can be included in actual documentation.

## Tradeoffs

- **Latency vs. Complexity:** Using microservices allows for modularity but increases complexity in deployment.
- **Data Consistency vs. Availability:** Eventual consistency model may be used for notifications to enhance performance.

# SQL and NoSQL DBs

## Databases Used (SQL and/or NoSQL Databases)

- **SQL Database:** PostgreSQL for relational data (user accounts, video metadata).
- **NoSQL Database:** MongoDB for storing comments and user interactions.

## Schemas

- **User Table:**
  - id **(Primary Key)**
  - username
  - email
  - passwordHash
  - createdAt
  - updatedAt
- **Video Table:**
  - id **(Primary Key)**
  - title
  - description
  - url
  - thumbnail
  - ownerId **(Foreign Key)**
  - createdAt
  - views
  - likes
  - dislikes
- **Comment Table:**
  - id **(Primary Key)**
  - videoId **(Foreign Key)**
  - userId **(Foreign Key)**
  - content
  - createdAt

## DB Caching Performance and Cache Invalidation Strategies

- **Caching Layer:** Use Redis to cache video metadata and trending videos.
- **Cache Invalidation:** Implement a TTL (Time-to-Live) for cache entries and invalidate caches on video uploads.

### Inconsistency/Resource/Complexity Tradeoffs

- **Inconsistency:** Use eventual consistency for comment counts and likes to improve performance.
- **Resource Usage:** Additional resources are allocated for caching, improving read performance.
- **Complexity:** The architecture complexity increases due to multiple services and cache management.
