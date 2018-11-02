# AKS Voting App - App Component (1.0)

## Overview

Provides the `app` component for the Azure Voting App. This is a web ui that allows users to vote for one of the two categories and observe the results.

## Dependencies

Version `1.x` of this component leverages a `Redis` backend for storage and version `1.x` of the `analytics` component to provide voting analytics.

## Configuration

The app component can be configured via the following environment variables:

|Environment Variable  |Default Value      |Description                                                                |
|----------------------|-------------------|---------------------------------------------------------------------------|
|PORT                  | 8080              | The port that the app component web ui is exposed on.                     |
|TITLE                 | AKS Voting App    | The title displayed by the web ui.                                        |
|VOTE1VALUE            | Cats              | The value of the 1st voting category.                                     |
|VOTE2VALUE            | Dogs              | The value of the 2nd voting category.                                     |
|SHOWDETAILS           | false             | A switch to display the container/pod name and the storage (Redis/MySQL). |
|FEATUREFLAG           | false             | A switch to enable feature flag capabilities.                             |
|REDIS_HOST            | voting-storage    | The host name of the Redis instance.                                      |
|REDIS_PORT            | 6379              | The port that the Redis instance is exposed on.                           |
|ANALYTICS_HOST        | voting-analytics  | The host name of the analytics component.                                 |
|ANALYTICS_PORT        | 8080              | The port that the analytics component is exposed on.                      |

## Docker image

This component is available as a Docker image via:

- mcr.microsoft.com/aks/samples/voting/app:1.0

## Build Dockerfile

Powershell

```powershell
PS> docker build --no-cache --build-arg IMAGE_VERSION="1.0" --build-arg IMAGE_CREATE_DATE="$(Get-Date((Get-Date).ToUniversalTime()) -UFormat '%Y-%m-%dT%H:%M:%SZ')" --build-arg IMAGE_SOURCE_REVISION="$(git rev-parse HEAD)" -f Dockerfile -t "mcr.microsoft.com/aks/samples/voting/app:1.0" .
```

Bash

```bash
$ docker build --no-cache --build-arg IMAGE_VERSION="1.0" --build-arg IMAGE_CREATE_DATE="`date -u +"%Y-%m-%dT%H:%M:%SZ"`" --build-arg IMAGE_SOURCE_REVISION="`git rev-parse HEAD`" -f Dockerfile -t "mcr.microsoft.com/aks/samples/voting/app:1.0" .
```