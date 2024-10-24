# Requirements

## Functional

- User Registration and Authentication.
- Posting Tweets (text, images, videos).
- Following and Unfollowing other users.
- Real-time Feed of Tweets from followed users.
- Retweeting and Liking Tweets.
- Hashtags for topic-based discovery.
- Search for Tweets, Users, and Hashtags.
- Notifications for Likes, Retweets, Mentions, and New Followers.
- Direct Messaging between users.
- Trending Topics based on user location or globally.
- Tweet Replies and Threaded Conversations.

## Non-functional

- **# of Users:** Support hundreds of millions of active users daily.
- **Data Sizes and Rates:** Handle millions of tweets, likes, retweets, and searches per minute.
- **Availability:** Target 99.99% uptime to ensure users can post and access content at all times.
- **Horizontal Scalability:** Scale horizontally to handle massive concurrent user activity and low-latency real-time feeds.
- **Low Latency:** Ensure near-instant updates for real-time interactions such as likes, retweets, and replies.
- **Security:** Secure user data, especially for private messaging.

## Assumptions or Out of Scope

- External authentication services (e.g., Auth0) could be used for handling user logins.
- Advanced analytics and ad-targeting features are out of scope.
- Live-streaming services (like Periscope) are not included.

# API

## Endpoints with Use Case

- **POST /register:** Register a new user.
- **POST /login:** Authenticate a user.
- **POST /tweet:** Create a new tweet (with text, images, videos).
- **GET /feed:** Retrieve the real-time feed of followed users' tweets.
- **POST /follow:** Follow a user.
- **POST /unfollow:** Unfollow a user.
- **POST /like:** Like a tweet.
- **POST /retweet:** Retweet an existing tweet.
- **GET /hashtag/{hashtag}:** Search for tweets by hashtag.
- **POST /reply:** Reply to a tweet.
- **POST /message:** Send a direct message to a user.
- **GET /trending:** Get trending topics (global or based on location).

## Real-time Feedback (If Any)

- Real-time notifications for likes, retweets, mentions, replies, and new followers.
- Real-time feed updates with new tweets from followed users.
- Direct messaging with read receipts.

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

- **Tweet:**

  ```json
  {
    "id": "string",
    "userId": "string",
    "content": "string",
    "mediaUrls": ["string"], // optional, can be images or videos
    "likeCount": "number",
    "retweetCount": "number",
    "replyCount": "number",
    "createdAt": "string",
    "hashtags": ["string"]
  }
  ```

- **DirectMessage:**
  ```json
  {
    "id": "string",
    "senderId": "string",
    "recipientId": "string",
    "message": "string",
    "mediaUrl": "string", // optional
    "readStatus": "boolean",
    "createdAt": "string"
  }
  ```

# High-level Design

## Clients

- **Mobile Apps:** Native Android and iOS apps that support tweeting, retweeting, following, real-time notifications, and direct messaging.
- **Web Application:** A responsive web interface for accessing Twitter-like features such as tweeting, viewing trends, and messaging.
- **API Clients:** Third-party developers can use API clients to access, create, and interact with tweets.

## Load Balancer/API Gateway/CDN (Include Any Image/Video Compression Services)

- **Load Balancer:** Distributes incoming requests across multiple backend servers, ensuring high availability and fault tolerance.
- **API Gateway:** Manages routing, authentication, rate-limiting, and security for the API endpoints.
- **CDN (Content Delivery Network):** Ensures fast access to static resources such as images, profile pictures, and videos by caching them globally.
- **Image/Video Compression Service:** Compress uploaded media (e.g., using AWS Lambda or FFmpeg) to reduce bandwidth and storage usage while maintaining media quality.

## Services

- **User Service:** Manages user profiles, registration, authentication, and follow/unfollow operations.
- **Tweet Service:** Handles creating, updating, deleting, and retrieving tweets, retweets, and replies.
- **Feed Service:** Builds the real-time feed based on the user’s followers and interests (timeline generation).
- **Notification Service:** Sends notifications for likes, retweets, replies, new followers, and mentions.
- **Search Service:** Allows users to search for tweets by hashtags, keywords, and usernames.
- **Messaging Service:** Manages direct messaging between users, including read receipts.
- **Trending Service:** Tracks and ranks trending topics based on global and local trends.
- **Media Service:** Handles the storage and retrieval of images and videos, along with compression and optimization.

## Services Communication (Such As Topics and Queues)

- **Event-Driven Architecture:** Use a message broker (e.g., Kafka or RabbitMQ) to handle asynchronous communication between services.
  - **Tweet Created Event:** Notifies the Feed Service and Notification Service when a new tweet is created.
  - **User Follow Event:** Notifies the Feed Service to update the follower’s timeline when a user follows another.
  - **Like/Retweet Event:** Triggers updates to the Notification and Tweet Services when a tweet is liked or retweeted.
  - **Direct Message Event:** Updates the recipient's inbox and notifies them in real-time.

## Tradeoffs

- **Consistency vs. Availability:** Eventual consistency is acceptable for features like likes, retweets, and replies to ensure high availability and scalability.
- **Performance vs. Storage:** Storing all media and tweets for a long time requires significant storage resources, but it's necessary to maintain the platform’s performance.
- **Real-time vs. Batch Processing:** Real-time notifications and feed updates improve user experience, but batch processing may be used for less time-sensitive data like trends analysis.

# SQL and NoSQL DBs

## Databases Used (SQL and/or NoSQL Databases)

- **SQL Database (Relational):** Use PostgreSQL or MySQL for structured data such as user profiles, followers, and relationships.
- **NoSQL Database:** Use Cassandra or MongoDB for unstructured data such as tweets, retweets, likes, replies, and messages (high volume and real-time interactions).
- **Time-Series Database:** Consider using a time-series database (e.g., InfluxDB) to store and analyze trending data and tweets over time.

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

- **Tweet Table:**

  - id **(Primary Key)**
  - userId **(Foreign Key)**
  - content
  - mediaUrls
  - likeCount
  - retweetCount
  - replyCount
  - createdAt

- **DirectMessage Table:**

  - id **(Primary Key)**
  - senderId **(Foreign Key)**
  - recipientId **(Foreign Key)**
  - message
  - mediaUrl
  - readStatus
  - createdAt

- **Follow Table:**
  - id **(Primary Key)**
  - followerId **(Foreign Key)**
  - followingId **(Foreign Key)**

## DB Caching Performance and Cache Invalidation Strategies

- **Caching Layer:** Use Redis or Memcached to cache frequently accessed data like tweets, trending topics, and user profiles.
- **Cache Invalidation:** Use TTL (Time-to-Live) or event-driven cache invalidation to remove outdated cached data when tweets are deleted or when trends change.

### Inconsistency/Resource/Complexity Tradeoffs

- **Inconsistency:** Eventual consistency for retweets, likes, and notifications may be acceptable to ensure fast responses and high availability.
- **Resource Usage:** Storing massive amounts of tweets, images, and videos requires significant storage and network resources but is necessary for performance and scalability.
- **Complexity:** Real-time feed generation, search, and notifications increase architectural complexity but are essential for creating a responsive and interactive user experience.
