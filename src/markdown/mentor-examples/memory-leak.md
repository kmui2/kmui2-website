### 3. **Memory Leaks in Java**

**Junior Dev**: "My Java application is running out of memory after processing large datasets. How can I track down memory leaks?"

**You**: "Memory leaks in Java often happen when objects are unintentionally retained in memory. It’s like leaving the lights on in every room of your house, even when you’re not using them. Eventually, the electricity bill becomes overwhelming."

**Junior Dev**: "How can I pinpoint where it’s happening?"

**You**: "You can use tools like **VisualVM** or **Eclipse Memory Analyzer** to inspect memory usage. Alternatively, you can enable JVM garbage collection logs to identify memory issues. Here's how you can turn on GC logging:"

```bash
java -Xlog:gc* -XX:+PrintGCDetails -XX:+PrintGCTimeStamps -XX:+PrintHeapAtGC -jar trading-app.jar
```

**Junior Dev**: "What should I look for in the logs?"

**You**: "Look for memory spikes that aren’t being cleared during garbage collection. If certain objects or classes keep getting retained in memory—just like leaving the lights on—you need to figure out what’s holding onto them unnecessarily."
