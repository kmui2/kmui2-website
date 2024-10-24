### 11. **Timeouts in HTTP Requests**

**Junior Dev**: "I’ve noticed that sometimes when I call the trading API, the response takes forever. Should we handle these long-running requests?"

**You**: "Yes, you should set a timeout. Think of it like waiting for a bus. If the bus doesn’t arrive after a certain time, you move on and make other plans instead of waiting forever. In HTTP requests, we can set a timeout to stop waiting after a certain duration."

**Junior Dev**: "How would I implement that in Java?"

**You**: "You can set timeouts using `HttpClient`. Here’s an example that sets a 5-second timeout for a trading API call:"

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class TradingService {
    private static final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(5))
            .build();

    public void getTradeData(String stockSymbol) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI("https://api.trading.com/stocks/" + stockSymbol))
                .timeout(Duration.ofSeconds(5)) // Set timeout for request
                .GET()
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("Response: " + response.body());
    }
}
```

**Junior Dev**: "So if the API doesn’t respond within 5 seconds, the request will timeout?"

**You**: "Exactly. Just like not waiting forever for a bus, we set a limit on how long we’ll wait for the API to respond. This way, your system doesn’t get stuck on slow responses."
