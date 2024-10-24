# Requirements

## Functional

- User Registration and Authentication.
- Product Catalog Browsing and Search.
- Product Recommendations (Based on Purchases and Searches).
- Shopping Cart and Checkout Functionality.
- Payment Processing.
- Order Management (Tracking, Returns, and Refunds).
- User Reviews and Ratings.
- Wishlist Management.
- Seller Platform for Product Listings and Sales.
- Shipping and Delivery Tracking.
- Notifications for Orders and Delivery Status.

## Non-functional

- **# of Users:** Support for hundreds of millions of active users.
- **Data Sizes and Rates:** Handle millions of product listings, transactions, and searches per day.
- **Availability:** Target 99.999% uptime.
- **Horizontal Scalability:** Scale dynamically to handle peak loads (e.g., Black Friday).
- **Security:** Ensure PCI-DSS compliance for handling payments.
- **Low Latency:** Provide near real-time search results and fast page load times for users globally.
- **Globalization:** Multi-language and multi-currency support with localized content.

## Assumptions or Out of Scope

- External authentication services such as Auth0 could be used for user login and identity management.
- Advanced features like Amazon Prime Video or AWS services are out of scope.
- Detailed analytics and machine learning for recommendation systems are not included in this scope.

# API

## Endpoints with Use Case

- **POST /register:** Register a new user.
- **POST /login:** Authenticate a user.
- **GET /products:** Browse or search products based on filters.
- **GET /product/{productId}:** Retrieve details of a specific product.
- **POST /add-to-cart:** Add a product to the shopping cart.
- **GET /cart:** Retrieve the user's shopping cart.
- **POST /checkout:** Proceed to checkout and payment.
- **GET /order/{orderId}:** Retrieve details of a user's order.
- **POST /review:** Submit a review for a purchased product.
- **GET /wishlist:** Retrieve or modify the user's wishlist.

## Real-time Feedback (If Any)

- Real-time stock updates during checkout to ensure product availability.
- Real-time notifications on order status updates (e.g., shipped, delivered).

## Object structures (in a List and in JSON Format)

- **User:**

  ```json
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "postalCode": "string",
      "country": "string"
    },
    "createdAt": "string"
  }
  ```

- **Product:**

  ```json
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "category": "string",
    "stock": "number",
    "sellerId": "string",
    "rating": "number",
    "reviews": [
      {
        "userId": "string",
        "rating": "number",
        "comment": "string",
        "createdAt": "string"
      }
    ]
  }
  ```

- **Order:**
  ```json
  {
    "id": "string",
    "userId": "string",
    "products": [
      {
        "productId": "string",
        "quantity": "number"
      }
    ],
    "totalPrice": "number",
    "shippingAddress": {
      "street": "string",
      "city": "string",
      "state": "string",
      "postalCode": "string",
      "country": "string"
    },
    "status": "string", // "Processing", "Shipped", "Delivered", etc.
    "createdAt": "string"
  }
  ```

# High-level Design

## Clients

- **Mobile Apps:** Android and iOS apps for product browsing, purchasing, and order tracking.
- **Web Application:** A responsive web interface for browsing products, managing orders, and interacting with sellers.
- **Seller Platform:** Web and mobile interfaces for sellers to list products, manage orders, and view analytics.

## Load Balancer/API Gateway/CDN (Include Any Image/Video Compression Services)

- **Load Balancer:** Distributes requests to multiple backend servers for handling high traffic.
- **API Gateway:** Manages routing, rate-limiting, and security between clients and backend services.
- **CDN (Content Delivery Network):** Ensures low latency and high availability by caching static resources (product images, CSS, JavaScript) globally.
- **Media Compression Services:** Compresses images and videos uploaded by sellers to optimize load times and bandwidth usage (e.g., using services like AWS Lambda for image processing).

## Services

- **User Service:** Handles user registration, authentication, and profile management.
- **Product Service:** Manages the catalog of products, including categories, stock, pricing, and recommendations.
- **Order Service:** Manages order placement, payment processing, and order status updates.
- **Cart Service:** Handles adding/removing products from the shopping cart and persisting the cart across devices.
- **Review and Rating Service:** Manages user reviews and ratings for products.
- **Notification Service:** Sends notifications for order status changes, delivery tracking, and promotions.
- **Seller Service:** Enables sellers to list products, manage stock, and track sales analytics.
- **Search Service:** Handles product search and filtering, leveraging full-text search for speed and accuracy.
- **Recommendation Service:** Provides personalized product recommendations based on browsing and purchase history.

## Services Communication (Such As Topics and Queues)

- **Event-Driven Architecture:** Use Kafka or RabbitMQ for inter-service communication.
  - **Order Created Event:** Notify relevant services (e.g., Payment, Shipping, Notifications) when an order is created.
  - **Product Stock Updated Event:** Notify the Product and Cart Services when the stock of a product changes.
  - **Review Submitted Event:** Notify the Product Service to recalculate product ratings after a new review is submitted.
  - **Delivery Status Update Event:** Trigger notifications to the user when a package is shipped or delivered.

## Tradeoffs

- **Consistency vs. Availability:** Eventual consistency can be tolerated for product reviews, ratings, and recommendations to ensure high availability.
- **Latency vs. Accuracy:** Recommendation algorithms may sacrifice some accuracy for the sake of fast, real-time suggestions.
- **Scalability vs. Complexity:** Breaking down services into microservices increases scalability but adds complexity in terms of service orchestration and data management.
- **Performance vs. Resource Usage:** Balancing media quality (images/videos) with compression and fast loading times for user convenience.

# SQL and NoSQL DBs

## Databases Used (SQL and/or NoSQL Databases)

- **SQL Database (Relational):** PostgreSQL or MySQL for structured data like user profiles, orders, and transactions.
- **NoSQL Database (Document-based):** MongoDB or DynamoDB for unstructured data like product listings, reviews, and shopping cart information.
- **Data Warehouse:** Redshift or BigQuery for aggregating transactional data and analyzing customer behavior.

## Schemas

- **User Table:**

  - id **(Primary Key)**
  - name
  - email
  - address
  - createdAt

- **Product Table:**

  - id **(Primary Key)**
  - name
  - description
  - price
  - category
  - stock
  - sellerId **(Foreign Key)**
  - rating

- **Order Table:**

  - id **(Primary Key)**
  - userId **(Foreign Key)**
  - products
  - totalPrice
  - shippingAddress
  - status
  - createdAt

- **Review Table:**
  - id **(Primary Key)**
  - productId **(Foreign Key)**
  - userId **(Foreign Key)**
  - rating
  - comment
  - createdAt

## DB Caching Performance and Cache Invalidation Strategies

- **Caching Layer:** Use Redis or Memcached to cache frequently accessed data, such as product listings, categories, and user carts.
- **Cache Invalidation:** Use TTL (Time-to-Live) on cached data to ensure freshness, or invalidate caches when products are updated or when stock levels change.

### Inconsistency/Resource/Complexity Tradeoffs

- **Inconsistency:** Eventual consistency is acceptable for non-critical data like recommendations, product ratings, and reviews to ensure fast updates and high availability.
- **Resource Usage:** Storing large datasets, such as user orders and product listings, requires careful optimization of database and caching resources.
- **Complexity:** The architecture becomes more complex as different services, databases, and caching mechanisms are introduced to scale efficiently across a global user base.

```​⬤

```
