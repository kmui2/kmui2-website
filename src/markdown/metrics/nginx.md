### **Category: NGINX - API Gateway for Trade Services**

**Product Owner**: "Our trading APIs are getting inconsistent response times, especially when different endpoints are hit simultaneously. How can we make sure the APIs are balanced properly?"

**You**: "The issue is that we don’t have a centralized way to route traffic, so some endpoints get overloaded. It’s like having one checkout lane handle all the customers, while other lanes are empty. We can implement **NGINX** as an API gateway to balance the load across services."

**Product Owner**: "What does NGINX bring to the table?"

**You**: "NGINX will act as a reverse proxy, distributing API requests across multiple instances. I configured **load balancing** rules in NGINX and used **Google Cloud Monitoring** to monitor the API request distribution. As a result, we saw a 30% reduction in response time variance, ensuring smoother API performance."
