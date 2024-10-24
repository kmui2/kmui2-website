# Requirements

## Functional

- Users can place buy and sell trades (market, limit orders) for various stocks.
- Users can check their available balance for placing trades.
- Users can view their current portfolio (active stock holdings) and transaction history.
- Users can cancel pending trades (if applicable).
- Trades should automatically update user balances based on the result (executed, partially executed, canceled).
- Notifications for trade placement, execution, and balance changes.

## Non-functional

- **# of Users:** Anticipate tens of thousands to millions of active users placing trades.
- **Content Data Sizes:** Store millions of trades daily with user balances and transactions.
- **Request Rates:** Support thousands of trade placements per second at peak times.
- **Availability:** 99.99% uptime, ensuring trades can be placed at all times.
- **Horizontal Scalability:** The system should scale dynamically to handle peak trading hours (e.g., during market open or major financial events).
- **Back-of-the-envelope estimates:** 1 million active users, 100,000 trades per hour during peak trading times, each trade averaging 500 bytes of data.

## Assumptions or Out of Scope

- The order matching and stock price engine is handled by an external system.
- Advanced analytics or high-frequency trading is not covered.
- Authentication and regulatory compliance (KYC, AML) are assumed to be handled externally.

# API

## Endpoints with Use Case

- **POST /trade/place:** Place a new trade order (buy or sell).
- **GET /portfolio:** Retrieve the user's current stock holdings.
- **GET /balance:** Retrieve the user’s available balance for trading.
- **GET /trade/{tradeId}:** View details of a specific trade.
- **POST /trade/{tradeId}/cancel:** Cancel a pending trade.
- **GET /transaction-history:** Retrieve the user’s trading history (executed and canceled trades).

## Real-time Feedback (If Any)

- Real-time notifications for the following:
  - Trade placed successfully.
  - Trade executed (fully or partially).
  - Trade canceled or expired.
  - Balance updates after trade execution or cancellation.

## Object structures (in a List and in JSON Format)

- **Trade:**

  ```json
  {
    "tradeId": "string",
    "userId": "string",
    "stockSymbol": "string",
    "quantity": "number",
    "pricePerShare": "number",
    "totalPrice": "number",
    "tradeType": "string", // "buy" or "sell"
    "status": "string", // "pending", "executed", "partiallyExecuted", "canceled"
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```

- **Balance:**

  ```json
  {
    "userId": "string",
    "availableBalance": "number",
    "heldForTrades": "number", // funds locked for pending trades
    "totalBalance": "number"
  }
  ```

- **Portfolio:**
  ```json
  {
    "userId": "string",
    "holdings": [
      {
        "stockSymbol": "string",
        "quantity": "number",
        "averagePurchasePrice": "number"
      }
    ],
    "totalValue": "number" // the current value of all holdings
  }
  ```

# High-level Design

## Clients

- **Mobile App:** Allows users to view balances, place trades, cancel trades, and view portfolios in real-time.
- **Web Application:** Full-featured web interface for placing trades, managing portfolios, and reviewing transaction history.
- **API Clients:** External applications and brokers can integrate using API access for placing trades and viewing balances.

## Load Balancer/API Gateway/CDN (Include Any Image/Video Compression Services)

- **Load Balancer:** Distributes incoming traffic (trade placements, balance inquiries) across multiple backend servers to ensure high availability.
- **API Gateway:** Handles routing, request throttling, rate limiting, and security for the APIs.
- **CDN:** Used for static assets like user interfaces and dashboards (if applicable). No media compression is required since this is transaction-focused.

## Services

- **Trade Service:** Handles trade placements (buy/sell), cancellations, and updates the status of pending trades.
- **Portfolio Service:** Tracks user holdings and updates portfolios based on executed trades.
- **Balance Service:** Manages user balances, ensuring that funds are available for trades and updated when trades are executed or canceled.
- **Notification Service:** Sends real-time notifications about trades and balance changes (SMS, push notifications, or emails).
- **Transaction History Service:** Stores and retrieves historical trade data for users.

## Services Communication (Such As Topics and Queues)

- **Event-Driven Architecture:** Use a message broker (e.g., Kafka, RabbitMQ) for asynchronous communication between services.
  - **Trade Placed Event:** Notifies the Portfolio and Balance Services when a trade is placed to lock funds.
  - **Trade Executed Event:** Updates the Portfolio and Balance Services when a trade is executed, unlocking funds or updating holdings.
  - **Balance Updated Event:** Triggers notifications when user balances change due to executed or canceled trades.

## Tradeoffs

- **Consistency vs. Availability:** Strong consistency is required for user balances and trades to ensure accuracy. Eventual consistency is acceptable for non-critical components like transaction history.
- **Performance vs. Data Integrity:** Performance is critical for placing trades in real-time, but data integrity must be ensured to prevent errors in balance calculation.
- **Scalability vs. Complexity:** A microservices architecture improves scalability but increases system complexity, especially with real-time updates for trades and balances.

# SQL and NoSQL DBs

## Databases Used (SQL and/or NoSQL Databases)

- **SQL Database (Relational):** Use PostgreSQL or MySQL to handle transactional data (trade records, user balances).
- **NoSQL Database:** Use MongoDB or DynamoDB to store high-velocity data like trade status changes, portfolios, and trade histories.

## Schemas

- **Trade Table:**

  - tradeId **(Primary Key)**
  - userId **(Foreign Key)**
  - stockSymbol
  - quantity
  - pricePerShare
  - totalPrice
  - tradeType
  - status
  - createdAt
  - updatedAt

- **Balance Table:**

  - userId **(Primary Key)**
  - availableBalance
  - heldForTrades
  - totalBalance

- **Portfolio Table:**
  - userId **(Primary Key)**
  - stockSymbol **(Foreign Key)**
  - quantity
  - averagePurchasePrice
  - totalValue

## DB Caching Performance and Cache Invalidation Strategies

- **Caching Layer:** Use Redis or Memcached to cache frequently accessed data, such as current balance and portfolio values, to reduce query load on the database.
- **Cache Invalidation:** Use TTL (Time-to-Live) for caches, and event-driven invalidation for immediate updates when trades are executed or balances are changed.

### Inconsistency/Resource/Complexity Tradeoffs

- **Inconsistency:** Eventual consistency for trade status updates is acceptable, but balances and portfolios must be strictly consistent.
- **Resource Usage:** Caching balance and portfolio data reduces the load on the main database, but proper invalidation strategies are essential to avoid stale data.
- **Complexity:** Real-time trade and balance updates increase system complexity, but these are essential to ensure a smooth user experience for trading.
