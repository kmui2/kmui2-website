# Requirements

## Functional

- User Registration and Authentication
- Ride Request and Matching
- Real-time Ride Tracking
- Payment Processing
- Rating and Feedback System
- Trip History Management
- Driver Verification Process

## Non-functional

- **# of Users:** Support up to 10 million users (5 million riders, 5 million drivers).
- **Data Sizes and Rates:** Handle 1 million ride requests per hour during peak times.
- **Availability:** Target 99.99% uptime.
- **Horizontal Scalability:** Support scaling up to 10,000 instances during peak usage.

## Assumptions or Out of Scope

- Verified Authentication managed by an external service (e.g., Auth0).
- Advanced analytics and reporting features will be handled separately.

# API

## Endpoints with Use Case

- **POST /register:** Register a new user.
- **POST /login:** Authenticate a user.
- **POST /request-ride:** Request a ride.
- **GET /ride-status/{rideId}:** Get the status of a ride.
- **POST /complete-ride:** End a ride and process payment.
- **POST /rate:** Submit a rating for a ride.

## Object structures (in a List and in JSON Format)

- **User:**
  ```json
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "role": "string", // "rider" or "driver"
    "rating": "number"
  }
  ```
- **Ride:**
  ```json
  {
    "id": "string",
    "riderId": "string",
    "driverId": "string",
    "pickupLocation": "string",
    "dropoffLocation": "string",
    "status": "string", // "requested", "in_progress", "completed"
    "fare": "number"
  }
  ```
- **Payment:**
  ```json
  {
    "id": "string",
    "rideId": "string",
    "amount": "number",
    "paymentMethod": "string",
    "status": "string" // "pending", "completed", "failed"
  }
  ```

# High-level Design

## Clients

- Mobile Apps for riders and drivers (iOS and Android).
- Web Portal for administrative tasks and user management.

## Load Balancer/API Gateway/CDN

- Load Balancer to distribute incoming requests to multiple service instances.
- API Gateway to manage routing, security, and request aggregation.
- CDN for caching static assets (images, scripts) for faster delivery.

## Services

- **User Service:** Manages user registration, authentication, and profile.
- **Ride Service:** Handles ride requests, matching riders with drivers, and tracking.
- **Payment Service:** Processes payments and manages financial transactions.
- **Notification Service:** Sends real-time notifications for ride updates.

## Services Communication (Such As Topics and Queues)

- **Event-Driven Architecture:** Use message queues (e.g., RabbitMQ or Kafka) for inter-service communication.
  - **Ride Requested Topic:** Notifies when a ride is requested.
  - **Ride Matched Topic:** Notifies when a rider is matched with a driver.
  - **Payment Processed Topic:** Notifies when a payment is successfully processed.

## Tradeoffs

- **Complexity vs. Performance:** Microservices increase complexity but allow for better performance and scalability.
- **Consistency vs. Availability:** Opting for eventual consistency to maintain high availability in a distributed system.

# SQL and NoSQL DBs

## Databases Used (SQL and/or NoSQL Databases)

- **SQL Database:** PostgreSQL for relational data (user, ride, payment).
- **NoSQL Database:** MongoDB for flexible document storage (ride metadata, logs).

## Schemas (in a Bullet Point List with Primary and/or Partition Keys Labeled and Any other Columns Unlabeled)

- **User Table:**
  - id **(Primary Key)**
  - name
  - email
  - phone
  - role
  - rating
- **Ride Table:**
  - id **(Primary Key)**
  - riderId **(Foreign Key)**
  - driverId **(Foreign Key)**
  - pickupLocation
  - dropoffLocation
  - status
  - fare
- **Payment Table:**
  - id **(Primary Key)**
  - rideId **(Foreign Key)**
  - amount
  - paymentMethod
  - status

## DB Caching Performance and Cache Invalidation Strategies

- **Caching Layer:** Use Redis for caching frequently accessed data (e.g., user profiles, ride details).
- **Cache Invalidation:** Implement TTL (Time-to-Live) and event-driven cache invalidation strategies to ensure data freshness.

### Inconsistency/Resource/Complexity Tradeoffs

- **Inconsistency:** Allow for eventual consistency in non-critical data to enhance performance.
- **Resource Usage:** Additional resources are required for caching layers, but they significantly improve read performance.
- **Complexity:** The architecture becomes more complex, necessitating careful design for cache management and invalidation.
