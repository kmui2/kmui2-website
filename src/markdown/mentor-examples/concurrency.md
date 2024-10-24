### 4. **Concurrency in Java**

**Junior Dev**: "I’m seeing some race conditions in my Java application when multiple threads try to access the same resource. How should I handle this?"

**You**: "You’ll need to synchronize access to the shared resource. It’s like a checkout counter at a store. Only one customer can be served at a time, otherwise things get messy. Java provides the `synchronized` keyword or `ReentrantLock` for handling this."

**Junior Dev**: "How do I use `synchronized`?"

**You**: "Here’s a basic example. The `synchronized` keyword ensures that only one thread can access the `incrementOrderCount()` method at a time, like making sure only one customer is at the checkout counter:"

```java
public class OrderCounter {
    private int count = 0;

    public synchronized void incrementOrderCount() {
        count++;
    }

    public int getOrderCount() {
        return count;
    }
}
```

**Junior Dev**: "And this prevents other threads from running `incrementOrderCount()` at the same time?"

**You**: "Exactly, it locks access to the method, ensuring only one thread can modify the count at a time—just like how only one customer can check out at a time."
