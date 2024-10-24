# Requirements

## Functional

1. Users can send and receive messages in real-time in text and voice channels.
2. Users can create and join servers (groups) with multiple channels.
3. Voice and video chat functionality.
4. Users can manage roles and permissions in servers.
5. Notifications for new messages, mentions, and server events.
6. Media file sharing (images, videos, etc.).
7. User status (online, offline, do not disturb).

## Non-functional

- **# of Users**: Millions of active users, and hundreds of millions of registered users.
- **Data Sizes and Rates**: Handle millions of messages, thousands of media uploads per second.
- **Availability**: 99.99% uptime, highly available with global coverage.
- **Horizontal Scalability**: The system must be able to scale horizontally to accommodate more users and servers.

## Assumptions or Out of Scope

- **Verified Authentication**: Assume authentication is handled externally by OAuth or Auth0.
- **Analytics**: Out of scope, though data can be collected for monitoring and analytics.
- **Latency**: Real-time communication must have low latency for a good user experience.

# API

## Endpoints with use case

### 1. Create a Server

**Method**: `POST /servers`  
**Use Case**: Create a new server.

### 2. Send Message

**Method**: `POST /channels/{channelId}/messages`  
**Use Case**: Send a message to a channel.

### 3. Join Voice Channel

**Method**: `POST /voice/{channelId}/join`  
**Use Case**: Join a voice channel for real-time communication.

## Object structures

- **Server**:

```json
{
  "serverId": "server123",
  "name": "Gaming Community",
  "ownerId": "user123",
  "channels": ["channel1", "channel2"]
}
```

- **Channel**:

```json
{
  "channelId": "channel1",
  "serverId": "server123",
  "type": "text",
  "messages": ["msg1", "msg2"]
}
```

- **Message**:

```json
{
  "messageId": "msg1",
  "channelId": "channel1",
  "senderId": "user456",
  "content": "Hello, World!",
  "timestamp": 1633036800
}
```

# High-level Design

## Clients

- **Web**: React.js for the web client with WebSocket connections for real-time messaging.
- **Mobile**: Native mobile apps (iOS/Android) that support WebSockets and push notifications.
- **Desktop**: Electron-based desktop app for a consistent cross-platform experience.

## Load Balancer/API Gateway/CDN

- **API Gateway**: Handles traffic routing to different microservices and manages WebSocket connections.
- **Load Balancer**: Distributes incoming traffic across multiple servers to prevent overloading.
- **CDN**: Distributes static content like user avatars, media files, and server icons.

## Services (Queues if necessary)

1. **Message Service**: Manages message sending, receiving, and persistence.
2. **Voice/Video Service**: Manages voice and video chat sessions.
3. **Notification Service**: Push notifications for messages and mentions.
4. **Moderation Service**: Handles user bans, mutes, and other moderation tasks.

## Tradeoffs

- **Consistency vs. Availability**: Prioritize availability, with eventual consistency in message delivery. Real-time features like user presence should be strongly consistent.
- **Latency vs. Scalability**: For real-time messaging and voice, low-latency systems are required, but at a cost of increased complexity in managing network traffic and real-time data processing.

# SQL and NoSQL DBs and Schemas

- **SQL (Postgres)**: For relational data like users, servers, roles, and permissions.
- **NoSQL (DynamoDB/Cassandra)**: For storing high-velocity message data with quick reads and writes.

### NoSQL Schema Example

- **Table**: `Messages`

```json
{
  "channelId": "channel1",
  "messageId": "msg1",
  "senderId": "user456",
  "content": "Hello, World!",
  "timestamp": 1633036800
}
```

## DB Caching Performance

- **Redis/Memcached**: For frequently accessed data like user status or recent messages to reduce database load.

### Inconsistency/Resource/Complexity Tradeoffs

- **Inconsistency**: Caching introduces potential inconsistency, but improves performance.
- **Resource Usage**: Caching requires memory and careful management to ensure updates are synchronized.

## Search Indexes

- **Elasticsearch**: For full-text search on messages, allowing users to search by keyword, user, or timestamp.
