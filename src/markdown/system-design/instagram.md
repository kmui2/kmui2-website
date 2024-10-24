# Requirements

## Functional

- User Registration and Authentication.
- Uploading, Storing, and Sharing Photos and Videos.
- Real-time Photo and Video Feed.
- Comments, Likes, and Tagging on Posts.
- Stories (temporary posts).
- Search for Users, Posts, and Hashtags.
- Direct Messaging between users.
- Notifications for Likes, Comments, and New Followers.
- Explore Feed with Recommended and Trending Posts.
- Profile Customization and Bio Editing.

## Non-functional

- **# of Users:** Support for billions of active users.
- **Data Sizes and Rates:** Handle millions of image and video uploads per minute.
- **Availability:** Target 99.99% uptime.
- **Horizontal Scalability:** Must be able to scale horizontally across multiple data centers.
- **Low Latency:** Instant feedback for likes, comments, and real-time feed updates.
- **Security and Privacy:** Ensure proper encryption and secure access to personal data.

## Assumptions or Out of Scope

- Verified Authentication could be handled by an external service like Auth0.
- Features like IGTV, Reels, and e-commerce are out of scope.
- Advanced analytics and detailed ad-tracking are not included.

# API

## Endpoints with Use Case

- **POST /register:** Register a new user.
- **POST /login:** Authenticate a user.
- **POST /upload:** Upload a new photo or video.
- **GET /feed:** Retrieve the user’s photo/video feed.
- **POST /like:** Like or unlike a post.
- **POST /comment:** Add a comment on a post.
- **POST /follow:** Follow another user.
- **GET /profile/{userId}:** Retrieve a user's profile details.
- **GET /search:** Search for posts, users, or hashtags.
- **POST /message:** Send a direct message to another user.
- **GET /story:** View stories of followed users.

## Real-time Feedback (If Any)

- Real-time notifications for likes, comments, and new followers.
- Live feed updates as new content is posted by users.
- Real-time messaging with read receipts.

## Object structures (in a List and in JSON Format)

- **User:**

  ```json
  {
    "id": "string",
    "username": "string",
    "email": "string",
    "profilePictureUrl": "string",
    "bio": "string",
    "followerCount": "number",
    "followingCount": "number",
    "createdAt": "string"
  }
  ```

- **Post:**

  ```json
  {
    "id": "string",
    "userId": "string",
    "imageUrl": "string",
    "caption": "string",
    "likeCount": "number",
    "commentCount": "number",
    "tags": ["string"],
    "createdAt": "string"
  }
  ```

- **Comment:**

  ```json
  {
    "id": "string",
    "postId": "string",
    "userId": "string",
    "content": "string",
    "createdAt": "string"
  }
  ```

- **Story:**
  ```json
  {
    "id": "string",
    "userId": "string",
    "mediaUrl": "string",
    "expirationTime": "string",
    "createdAt": "string"
  }
  ```

# High-level Design

## Clients

- **Mobile Apps:** Native Android and iOS apps that support image and video uploads, real-time notifications, and browsing feeds.
- **Web Application:** Responsive web version for user access from browsers with core features (uploading, feed browsing, notifications).

## Load Balancer/API Gateway/CDN (Include Any Image/Video Compression Services)

- **Load Balancer:** Distributes incoming requests across multiple instances of the application services for high availability.
- **API Gateway:** Manages routing, rate-limiting, and authentication.
- **CDN:** Content Delivery Network to serve media (photos, videos) globally with low latency.
- **Image/Video Compression Service:** Media (images, videos) are compressed and optimized before being served to clients, leveraging services like FFmpeg or ImageMagick for video/image processing.

## Services

- **User Service:** Handles user registration, login, profile management, and following relationships.
- **Post Service:** Manages image and video uploads, along with captions, tags, and post metadata.
- **Feed Service:** Fetches and updates users’ feeds based on who they follow.
- **Story Service:** Manages temporary media (stories) that expire after a set time.
- **Comment and Like Service:** Tracks and manages comments and likes for posts.
- **Messaging Service:** Handles direct messaging between users.
- **Notification Service:** Sends real-time notifications for user activities.
- **Search Service:** Enables search by users, posts, and hashtags.
- **Explore Service:** Generates recommendations for posts and users based on user interactions.

## Services Communication (Such As Topics and Queues)

- **Event-Driven Architecture:** Use a message broker (e.g., Kafka or RabbitMQ) to handle communication between services.
  - **New Post Event:** When a user uploads a new post, notify the feed service to update followers' feeds.
  - **Like Event:** When a user likes a post, update the post's metadata and trigger a notification.
  - **Comment Event:** When a comment is added, update the post’s comment count and notify the post owner.
  - **Message Sent Event:** Notify the recipient when a new direct message is sent.

## Tradeoffs

- **Performance vs. Storage:** Storing and serving high-resolution images and videos requires significant storage and bandwidth. Compression and optimization need to balance quality and performance.
- **Consistency vs. Availability:** To ensure high availability, eventual consistency for likes, comments, and notifications may be acceptable.
- **Complexity vs. Scalability:** Breaking services into microservices improves scalability but adds complexity to service management, especially with real-time communications like notifications and messaging.

# SQL and NoSQL DBs

## Databases Used (SQL and/or NoSQL Databases)

- **SQL Database:** Use PostgreSQL or MySQL for structured data like user profiles, followers, and comments.
- **NoSQL Database:** Use MongoDB or Cassandra to store large-scale unstructured data like posts, stories, and direct messages.
- **Media Storage:** Use cloud storage (e.g., Amazon S3, Google Cloud Storage) for storing large media files (photos, videos).

## Schemas

- **User Table:**

  - id **(Primary Key)**
  - username
  - email
  - profilePictureUrl
  - bio
  - followerCount
  - followingCount
  - createdAt

- **Post Table:**

  - id **(Primary Key)**
  - userId **(Foreign Key)**
  - imageUrl
  - caption
  - likeCount
  - commentCount
  - tags
  - createdAt

- **Comment Table:**

  - id **(Primary Key)**
  - postId **(Foreign Key)**
  - userId **(Foreign Key)**
  - content
  - createdAt

- **Story Table:**
  - id **(Primary Key)**
  - userId **(Foreign Key)**
  - mediaUrl
  - expirationTime
  - createdAt

## DB Caching Performance and Cache Invalidation Strategies

- **Caching Layer:** Use Redis or Memcached to cache frequently accessed data like user profiles, popular posts, trending hashtags, and feed data.
- **Cache Invalidation:** Implement TTL (Time-to-Live) for cached entries or use an event-driven approach to invalidate the cache when posts are created, updated, or deleted.

### Inconsistency/Resource/Complexity Tradeoffs

- **Inconsistency:** Eventual consistency for likes, comments, and follow counts is acceptable to maintain low latency and high availability.
- **Resource Usage:** Caching popular posts and user data reduces read load on databases but requires memory allocation, which must be balanced against other resources.
- **Complexity:** Managing large-scale databases, media storage, and caching layers introduces complexity but is essential for performance and scalability.
