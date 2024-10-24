### 2. **API Rate Limiting**

**Junior Dev**: "I’m getting errors from the API provider saying we’ve hit the rate limit. What should I do?"

**You**: "Rate limits mean the API is restricting the number of requests you can send in a certain timeframe. To handle this, you need to implement rate limiting on your side."

**Junior Dev**: "How would I do that in Java?"

**You**: "It’s like waiting in line at a coffee shop. If too many people place their orders at once, the barista can’t keep up, so customers have to pace themselves. You can use Guava’s `RateLimiter` in Java to control the flow of API requests. Here’s an example for a stock trading API:"

```java
import com.google.common.util.concurrent.RateLimiter;

public class TradingApiClient {
    private static final RateLimiter rateLimiter = RateLimiter.create(5); // 5 requests per second

    public void placeTradeOrder() {
        rateLimiter.acquire(); // Acquires permission before proceeding
        // API call logic for placing trade order
        System.out.println("Trade order placed");
    }
}
```

**Junior Dev**: "So this ensures I don’t exceed 5 API calls per second?"

**You**: "Exactly, just like pacing yourself in line. The `RateLimiter.acquire()` method will throttle requests, ensuring you don’t hit the API limit."
