### 5. **Load Balancing in Microservices**

**Junior Dev**: "We’re getting inconsistent response times from our microservices. Could load balancing help?"

**You**: "Yes, load balancing can distribute incoming traffic evenly across multiple service instances. It’s like having multiple checkout lines in a store. If everyone piles into one line, it slows down, but if you balance the load across multiple lines, things run more smoothly."

**Junior Dev**: "How would we implement load balancing?"

**You**: "If you’re using Spring Cloud and Netflix’s Ribbon for load balancing, you can configure it like this in your `application.properties`:"

```java
# Enable Ribbon for load balancing
trade-service.ribbon.listOfServers=localhost:8081,localhost:8082
trade-service.ribbon.NFLoadBalancerRuleClassName=com.netflix.loadbalancer.RoundRobinRule
```

**Junior Dev**: "So this will distribute requests across instances running on ports 8081 and 8082?"

**You**: "Yes, and Ribbon will use a round-robin strategy to balance the load—just like directing customers to different checkout lines."
