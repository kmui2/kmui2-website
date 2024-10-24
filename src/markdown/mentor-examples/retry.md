### 10. **Retry Mechanism in Trading API**

**Junior Dev**: "The external trading API sometimes fails, and we’re losing trade executions because of it. Should we retry the failed requests?"

**You**: "Yes, but be careful not to overwhelm the system with retries. It’s like trying to place a phone call—if the line is busy, you wait a bit before trying again. A retry mechanism with a backoff strategy is what you need."

**Junior Dev**: "How do we implement a retry with backoff?"

**You**: "You can use `Resilience4j` to implement retries with exponential backoff. Here’s an example for retrying a failed trade execution:"

```java
import io.github.resilience4j.retry.Retry;
import io.github.resilience4j.retry.RetryConfig;

import java.time.Duration;

public class TradingService {
    private Retry retry;

    public TradingService() {
        RetryConfig config = RetryConfig.custom()
                .maxAttempts(3) // Retry 3 times
                .waitDuration(Duration.ofSeconds(2)) // Wait 2 seconds between attempts
                .build();
        retry = Retry.of("tradeService", config);
    }

    public void executeTrade(String stockSymbol, int quantity) {
        Retry.decorateRunnable(retry, () -> submitTrade(stockSymbol, quantity)).run();
    }

    private void submitTrade(String stockSymbol, int quantity) {
        // Simulate API call to submit the trade, which might fail
        System.out.println("Submitting trade for " + stockSymbol + " with quantity: " + quantity);
        if (Math.random() > 0.7) {
            throw new RuntimeException("API failed");
        }
    }
}
```

**Junior Dev**: "So if the trade fails, it will retry up to 3 times with a 2-second delay between attempts?"

**You**: "Exactly, and this gives the API time to recover. It’s like waiting a few seconds to try the call again instead of spamming the line."
