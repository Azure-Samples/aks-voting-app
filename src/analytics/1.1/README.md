# AKS Voting App - Analytics Component (1.1)

## Overview

Provides the `analytics` component for the Azure Voting App. This is a REST API that returns voting analytics (raw counts and formatted text) for the votes cast.

## Dependencies

Version `1.x` of this component leverages a `Redis` backend for storage. This version of the `analytics` component is used by version `1.x` of the `app` component.

## Configuration

The analytics component can be configured via the following environment variables:

|Environment Variable  |Default Value    |Description                                                    |
|----------------------|-----------------|---------------------------------------------------------------|
|PORT                  | 8080            | The port that the analytics component REST API is exposed on. |
|VOTE1VALUE            | Cats            | The value of the 1st voting category.                         |
|VOTE2VALUE            | Dogs            | The value of the 2nd voting category.                         |
|REDIS_HOST            | voting-storage  | The host name of the Redis instance.                          |
|REDIS_PORT            | 6379            | The port that the Redis instance is exposed on.               |

## Response

The REST API returns a voting analytics response. Here is an example:

```json
"category1": {
  "name": "Cats",
  "count": 10
},
"category2": {
  "name": "Dogs",
  "count": 5
},
"text": "Cats: 10/15 (67%) | Dogs: 5/15 (33%)"
```

## Docker image

This component is available as a Docker image via:

- mcr.microsoft.com/aks/samples/voting/analytics:1.1

## Build Dockerfile

Powershell

```powershell
PS> docker build --no-cache --build-arg IMAGE_VERSION="1.1" --build-arg IMAGE_CREATE_DATE="$(Get-Date((Get-Date).ToUniversalTime()) -UFormat '%Y-%m-%dT%H:%M:%SZ')" --build-arg IMAGE_SOURCE_REVISION="$(git rev-parse HEAD)" -f Dockerfile -t "mcr.microsoft.com/aks/samples/voting/analytics:1.1" .
```

Bash

```bash
$ docker build --no-cache --build-arg IMAGE_VERSION="1.1" --build-arg IMAGE_CREATE_DATE="`date -u +"%Y-%m-%dT%H:%M:%SZ"`" --build-arg IMAGE_SOURCE_REVISION="`git rev-parse HEAD`" -f Dockerfile -t "mcr.microsoft.com/aks/samples/voting/analytics:1.1" .
```