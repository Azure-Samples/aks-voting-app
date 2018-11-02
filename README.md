# AKS Voting App sample

This repo provides the source code and scenario artefacts for the AKS Voting App sample used in the [AKS documentation](https://docs.microsoft.com/en-us/azure/aks/).

## Supported scenarios

### Intelligent routing and canary releases with Istio

The scenario artefacts are location in the `scenarios\intelligent-routing-with-istio` folder. The scenario can be followed in the AKS [Intelligent routing and canary releases with Istio](https://docs.microsoft.com/en-us/azure/aks/istio-scenario-routing) documentation.

## Docker images

The AKS Voting App components are built from the source located in the `src` folder. These are published as the following images:

- mcr.microsoft.com/aks/samples/voting/app:1.0
- mcr.microsoft.com/aks/samples/voting/app:2.0
- mcr.microsoft.com/aks/samples/voting/analytics:1.0
- mcr.microsoft.com/aks/samples/voting/analytics:1.1
- mcr.microsoft.com/aks/samples/voting/analytics:2.0
- mcr.microsoft.com/aks/samples/voting/storage:2.0

## Contributing

This project welcomes contributions and suggestions. You can read more about how to contribute in the [Contributing Guidelines](CONTRIBUTING.md)

## Code of conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

---

This replaces all previous versions of the Azure Voting App sample to provide a single configurable sample that supports multiple scenarios:

- https://github.com/Azure-Samples/azure-voting-app-redis
- https://github.com/Azure-Samples/azure-voting-app