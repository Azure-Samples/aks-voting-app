# Scenario - Intelligent routing and canary releases with Istio

[Istio](https://github.com/istio/istio) is an open-source service mesh that provides a key set of functionality across the microservices within your Kubernetes cluster. These include traffic management, service identity & security, policy enforcement, and observability. For a deeper conceptual understanding of Istio, see the official [What is Istio?](https://istio.io/docs/concepts/what-is-istio/) documentation.

This scenario will show you how you can use the traffic management functionality of Istio. We'll use the AKS Voting app that you have become familiar with in the Azure Kubernetes Service (AKS) documentation to explore intelligent routing and canary releases.

We'll be working through the following tasks:

- Deploy the application
- Update the application
- Roll out a canary release of the application
- Finalize the rollout

---

This scenario can be followed at: 

https://docs.microsoft.com/en-us/azure/aks/istio-scenario-routing