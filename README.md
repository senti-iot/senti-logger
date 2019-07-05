# Senti Logger
Senti Logger Service is a Micrologger for the Senti Microservices architecture.

The Micrologger is a logger for enforcing access to Microservices & APIs. It supports the following core features: 

- Secure and control access to APIs
- Collection of pre-built logger policies for API Key validation, authentication, and rate limiting and versioning 
- Create logger policies (security, routing, integration, etc.)

The role of the Senti Micrologger is to protect, enrich and control access to Senti Microservices API services. This includes security and rate limiting, but it also includes the ability to do message inspection. The Logger insures that the message received is properly formed JSON. In addition, the Logger can modify the payload or transform it to meet old or new interfaces for the API backend. Finally, the Logger can invoke multiple services and aggregate responses from multiple API backends.

Core features 2:
- Multi routes/paths
- Invoke multiple services / aggregate responses
- Policy
- API key validation
- Authentication
- Rate limiting
- Versioning
- Message inspection
- Check JSON
- Modify/transfor payload