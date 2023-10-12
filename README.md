---
page_type: sample
languages:
- javascript
- html
products:
- azure
description: "This repo provides the source code and scenario artefacts for the AKS Voting App sample used in the AKS documentation."
urlFragment: aks-voting-app
---

# AKS Voting App sample

This repo provides the source code and scenario artefacts for the AKS Voting App sample used in the [AKS documentation](https://docs.microsoft.com/en-us/azure/aks/).

## Container images

The AKS Voting App components are built from the source located in the `src` folder. The following options will build the components as the following containers in your local docker registry:
- voting-app:1.0
- voting-app:2.0
- voting-analytics:1.0
- voting-analytics:1.1
- voting-analytics:2.0
- voting-storage:2.0

### Build all containers

```bash
./release/build-docker-images.sh
```

### Docker compose

```bash
docker compose -f docker-compose-1.0.yaml build
docker compose -f docker-compose-1.1.yaml build
docker compose -f docker-compose-2.0.yaml build
```

## Testing

You can test the different versions of the component architecture during development using docker compose. 

Ensure that you create the following env file. Replace only the password values.

```bash
# mysql.env
MYSQL_ROOT_PASSWORD=::YOUR_ROOT_PASSWORD::
MYSQL_USER=votinguser
MYSQL_PASSWORD=::YOUR_USER_PASSWORD::
MYSQL_DATABASE=azurevote
```

```bash
# Spin up version 1.0 of architecture for local testing in docker compose
docker compose -f docker-compose-1.0.yaml up

# Spin up version 1.1 of architecture for local testing in docker compose
docker compose -f docker-compose-1.1.yaml build

# Spin up version 2.0 of architecture for local testing in docker compose
docker compose -f docker-compose-2.0.yaml build
```

You will be able to reach the main application at `http://localhost:8080`.

## Contributing

This project welcomes contributions and suggestions. You can read more about how to contribute in the [Contributing Guidelines](CONTRIBUTING.md)

## Code of conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

---

This replaces all previous versions of the Azure Voting App sample to provide a single configurable sample that supports multiple scenarios:

- https://github.com/Azure-Samples/azure-voting-app-redis
- https://github.com/Azure-Samples/azure-voting-app
