# Requirements

## Functional

- User Registration and Authentication
- Code Editor with Syntax Highlighting
- Real-time Collaboration for Multiple Users
- Test Case Management and Execution
- Code Execution Environment for Multiple Languages
- Session Management for Code Pasting and Sharing
- Video and Voice Communication Integration

## Non-functional

- **# of Users:** Support up to 1 million concurrent users.
- **Data Sizes and Rates:** Handle up to 10 million code submissions per hour.
- **Availability:** Target 99.95% uptime.
- **Horizontal Scalability:** Support scaling out to 5,000 instances during peak usage.

## Assumptions or Out of Scope

- Verified Authentication managed by an external service (e.g., Auth0).
- Advanced analytics for code execution performance is out of scope.

# API

## Endpoints with Use Case

- **POST /register:** Register a new user.
- **POST /login:** Authenticate a user.
- **POST /create-session:** Create a new collaborative coding session.
- **POST /submit-code:** Submit code for execution.
- **GET /session/{sessionId}:** Retrieve session details.
- **POST /invite-user:** Invite another user to a session.
- **POST /execute-code:** Execute submitted code and retrieve results.

## Object structures (in a List and in JSON Format)

- **User:**
  ```json
  {
    "id": "string",
    "username": "string",
    "email": "string",
    "passwordHash": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```
- **Session:**
  ```json
  {
    "id": "string",
    "ownerId": "string",
    "code": "string",
    "language": "string",
    "participants": [
      {
        "userId": "string",
        "joinedAt": "string"
      }
    ],
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```
- **ExecutionResult:**
  ```json
  {
    "sessionId": "string",
    "output": "string",
    "error": "string",
    "executionTime": "number"
  }
  ```

# High-level Design

## Clients

- Web Application for users to access coding sessions and editor.
- Mobile Application for quick access to sessions and notifications.

## Load Balancer/API Gateway/CDN

- Load Balancer to distribute incoming API requests across service instances.
- API Gateway to manage routing, rate limiting, and security.
- CDN for serving static assets (like JavaScript, CSS files) efficiently.

## Services

- **User Service:** Manages user accounts, authentication, and sessions.
- **Session Service:** Handles creation and management of collaborative coding sessions.
- **Execution Service:** Manages code execution in a secure environment.
- **Notification Service:** Sends real-time notifications for session events and invitations.

## Services Communication (Such As Topics and Queues)

- **Event-Driven Architecture:** Use message queues (e.g., RabbitMQ or Kafka) for inter-service communication.
  - **Session Created Topic:** Notifies when a new coding session is created.
  - **Code Executed Topic:** Notifies when code execution is completed.

## Tradeoffs

- **Complexity vs. Performance:** Using microservices enhances scalability but increases complexity.
- **Security vs. Usability:** Balancing user data protection with easy access for developers.

# SQL and NoSQL DBs

## Databases Used (SQL and/or NoSQL Databases)

- **SQL Database:** PostgreSQL for relational data (user accounts, session details).
- **NoSQL Database:** MongoDB for storing session data and code snippets.

## Schemas (in a Bullet Point List with Primary and/or Partition Keys Labeled and Any other Columns Unlabeled)

- **User Table:**
  - id **(Primary Key)**
  - username
  - email
  - passwordHash
  - createdAt
  - updatedAt
- **Session Table:**
  - id **(Primary Key)**
  - ownerId **(Foreign Key)**
  - code
  - language
  - createdAt
  - updatedAt
- **ExecutionResult Table:**
  - sessionId **(Primary Key, Foreign Key)**
  - output
  - error
  - executionTime

## DB Caching Performance and Cache Invalidation Strategies

- **Caching Layer:** Use Redis to cache session states and recently executed code.
- **Cache Invalidation:** Implement TTL (Time-to-Live) and event-driven cache invalidation to maintain data accuracy.

### Inconsistency/Resource/Complexity Tradeoffs

- **Inconsistency:** Allow for eventual consistency for session states to enhance performance.
- **Resource Usage:** Additional resources are needed for caching, improving read performance.
- **Complexity:** The architecture's complexity increases due to multiple services and cache management.
