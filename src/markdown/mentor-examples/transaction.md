### 13. **Transaction Management in Database**

**Junior Dev**: "I’ve noticed that if an error happens during a trade transaction, it sometimes leaves the database in an inconsistent state. How can we prevent this?"

**You**: "You need to manage your database transactions properly. Think of it like making sure all the steps of a bank transfer are completed—if any part fails, the entire transaction should be rolled back to ensure nothing gets lost."

**Junior Dev**: "How would I implement transaction management in Java?"

**You**: "You can use Spring’s `@Transactional` annotation to ensure that the entire transaction succeeds or fails as one unit. Here’s how to apply it to your trade service:"

\```
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TradeService {

    @Transactional
    public void executeTrade(String stockSymbol, int quantity, double price) {
        // Step 1: Debit the user's account
        debitAccount(stockSymbol, quantity, price);

        // Step 2: Place the trade order
        placeTradeOrder(stockSymbol, quantity);

        // If any exception occurs, the entire transaction will be rolled back
    }

    private void debitAccount(String stockSymbol, int quantity, double price) {
        // Logic to debit the user's account
        System.out.println("Debited account for trade of " + stockSymbol);
    }

    private void placeTradeOrder(String stockSymbol, int quantity) {
        // Logic to place the trade order
        System.out.println("Trade order placed for " + stockSymbol);
    }

}
\```

**Junior Dev**: "So if the account debit fails, the trade won’t go through either?"

**You**: "Exactly. If any part of the transaction fails, everything is rolled back, ensuring that the database stays in a consistent state—like making sure both the debit and credit happen in a bank transfer."
