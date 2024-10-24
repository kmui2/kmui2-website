### 14. **Asynchronous Calls in Java**

**Junior Dev**: "Our trading app feels slow because it waits for every external API call to complete. Can we make these calls faster?"

**You**: "Yes, you can make asynchronous API calls. It’s like ordering food at a restaurant. Instead of standing in line waiting for your meal, you place your order, go sit down, and they call you when it’s ready."

**Junior Dev**: "How do I implement asynchronous calls in Java?"

**You**: "You can use Java’s `CompletableFuture` for asynchronous operations. Here’s an example for fetching stock prices asynchronously:"

\```
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;

public class StockPriceService {
private static final HttpClient httpClient = HttpClient.newHttpClient();

    public CompletableFuture<String> getStockPriceAsync(String stockSymbol) {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.trading.com/stocks/" + stockSymbol))
                .build();

        return httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body);
    }

}
\```

**Junior Dev**: "So the method returns immediately, and I can process the result when it’s ready?"

**You**: "Exactly. You send the request and continue doing other things, just like placing an order and sitting down while the kitchen prepares your food."
