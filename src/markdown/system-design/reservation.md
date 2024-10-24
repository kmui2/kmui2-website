# Requirements

## Functional

- Users can search for available time slots in restaurants.
- Users can make a reservation for a selected restaurant and time slot.
- Users can modify or cancel their reservations.
- Restaurant managers can manage time slots and view reservations.
- Users can be notified via email/SMS for reservation confirmation, reminders, or cancellations.
- Support for group reservations and special requests (e.g., birthday setups, dietary restrictions).
- Restaurants can set reservation limits per time slot (e.g., max tables or seats).

## Non-functional

- **# of Users:** Support thousands of users daily making reservations.
- **Content Data Sizes:** Store details of restaurant reservations, user profiles, and restaurant data (e.g., tables, time slots).
- **Request Rates:** Handle thousands of reservation queries and updates per second during peak times (weekends, holidays).
- **Availability:** 99.99% uptime, as reservations must be available at all times.
- **Horizontal Scalability:** Scale the system dynamically based on reservation demand (e.g., during weekends and holidays).
- **Back-of-the-envelope estimates:** Handle up to 100,000 reservations per day, each containing user details, restaurant info, and time slot information.

## Assumptions or Out of Scope

- Payment processing for pre-paid reservations or cancellation fees is handled externally.
- Analytics or customer behavior tracking is out of scope.
- Authentication may be handled by external systems like OAuth (e.g., Google, Facebook).
- Advanced restaurant management (e.g., inventory, staff management) is out of scope.

# API

## Endpoints with Use Case

- **GET /restaurants:** Retrieve a list of restaurants available for reservations.
- **GET /restaurants/{restaurantId}/availability:** Retrieve available time slots for a specific restaurant.
- **POST /reservations:** Create a new reservation for a restaurant.
- **GET /reservations/{reservationId}:** Retrieve details of a specific reservation.
- **PUT /reservations/{reservationId}:** Modify an existing reservation (e.g., change time or party size).
- **DELETE /reservations/{reservationId}:** Cancel an existing reservation.
- **GET /restaurants/{restaurantId}/reservations:** Restaurant managers can retrieve reservations for their restaurant.

## Real-time Feedback (If Any)

- Real-time updates on reservation status (e.g., confirmation, modification, or cancellation).
- Notifications via SMS or email for reservation confirmations, reminders, or cancellations.
- Real-time availability updates based on changing reservation patterns.

## Object structures (in a List and in JSON Format)

- **Restaurant:**

  ```json
  {
    "restaurantId": "string",
    "name": "string",
    "address": {
      "street": "string",
      "city": "string",
      "postalCode": "string"
    },
    "totalTables": "number",
    "availableTables": "number",
    "openingHours": {
      "dayOfWeek": "string",
      "openTime": "string",
      "closeTime": "string"
    }
  }
  ```

- **Reservation:**

  ```json
  {
    "reservationId": "string",
    "restaurantId": "string",
    "userId": "string",
    "timeSlot": "string",
    "partySize": "number",
    "status": "string", // "confirmed", "modified", "canceled"
    "specialRequests": "string", // optional
    "createdAt": "string"
  }
  ```

- **TimeSlot:**
  ```json
  {
    "restaurantId": "string",
    "timeSlot": "string",
    "totalTables": "number",
    "availableTables": "number",
    "isAvailable": "boolean"
  }
  ```

# High-level Design

## Clients

- **Web Application:** A responsive interface for users to search restaurants, view availability, make reservations, and manage reservations.
- **Mobile App:** Native Android/iOS apps that allow users to search for restaurants, make reservations, and manage them on the go.
- **Restaurant Admin Panel:** Web-based interface for restaurant managers to view and manage reservations, tables, and time slots.

## Load Balancer/API Gateway/CDN (Include Any Image/Video Compression Services)

- **Load Balancer:** Distribute incoming requests for searching restaurants, making reservations, and managing tables across multiple backend servers for high availability.
- **API Gateway:** Handles routing, rate limiting, and security for API requests.
- **CDN:** Serves static resources such as restaurant images, logos, and menus globally for fast access.

## Services

- **Restaurant Service:** Manages restaurant details, including table capacity, location, and opening hours.
- **Reservation Service:** Handles creating, modifying, and canceling reservations, ensuring table availability is managed.
- **Time Slot Service:** Tracks available tables for each restaurant in real time, based on reservations.
- **Notification Service:** Sends real-time notifications (via email or SMS) to users when reservations are made, modified, or canceled.
- **User Service:** Manages user profiles, including past reservations and special requests.
- **Admin Service:** Allows restaurant managers to view, modify, or cancel reservations and manage table availability.

## Services Communication (Such As Topics and Queues)

- **Event-Driven Architecture:** Use message brokers like Kafka or RabbitMQ for asynchronous communication between services.
  - **Reservation Created Event:** Triggers table availability updates and sends confirmation notifications to users.
  - **Reservation Modified Event:** Notifies restaurant managers and updates the table count for the new time slot.
  - **Reservation Canceled Event:** Updates table availability for the affected time slot and sends cancellation notifications.

## Tradeoffs

- **Performance vs. Consistency:** For table availability, eventual consistency may be acceptable (e.g., slight delay in availability updates) to improve performance.
- **Real-time vs. Batch Processing:** Real-time updates are required for reservations, while batch processing could be used for analytics or reporting.
- **Scalability vs. Complexity:** A microservices-based architecture increases system complexity but ensures scalability for peak reservation times.

# SQL and NoSQL DBs

## Databases Used (SQL and/or NoSQL Databases)

- **SQL Database (Relational):** Use PostgreSQL or MySQL for structured data such as restaurant details, reservations, and user profiles.
- **NoSQL Database:** Use MongoDB or DynamoDB for storing high-velocity data like real-time table availability and reservation logs.

## Schemas

- **Restaurant Table:**

  - restaurantId **(Primary Key)**
  - name
  - address
  - totalTables
  - availableTables
  - openingHours

- **Reservation Table:**

  - reservationId **(Primary Key)**
  - restaurantId **(Foreign Key)**
  - userId **(Foreign Key)**
  - timeSlot
  - partySize
  - status
  - specialRequests
  - createdAt

- **TimeSlot Table:**
  - restaurantId **(Foreign Key)**
  - timeSlot
  - totalTables
  - availableTables
  - isAvailable

## DB Caching Performance and Cache Invalidation Strategies

- **Caching Layer:** Use Redis or Memcached to cache frequently accessed data, such as restaurant availability and reservation details, to reduce load on the main database.
- **Cache Invalidation:** Use TTL (Time-to-Live) for cache entries or trigger cache invalidation when reservations are created, modified, or canceled to ensure up-to-date information.

### Inconsistency/Resource/Complexity Tradeoffs

- **Inconsistency:** Eventual consistency for table availability may be acceptable during high-traffic times, but reservations themselves must remain consistent to avoid double-booking.
- **Resource Usage:** Caching restaurant and table availability reduces the load on databases, but cache invalidation must be properly handled to prevent stale data.
- **Complexity:** Managing real-time availability and reservation status increases complexity, but it's essential for a smooth user experience.
