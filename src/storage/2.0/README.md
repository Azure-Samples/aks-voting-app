# AKS Voting App - Storage Component (2.0)

## Overview

Provides the `storage` component for the Azure Voting App. This is a MySQL backend that is used by the `app` component to store votes and by the `analytics` component to count votes.

## Dependencies

The `2.x` versions of the `app` and `analytics` components utilise this version of the `storage` component to store and count votes.

## Configuration

The storage component is based on the `mysql:5.7.23` image and can be configured via the following environment variables:

|Environment Variable  |Default Value      |Description                                                                      |
|----------------------|-------------------|---------------------------------------------------------------------------------|
|MYSQL_ROOT_PASSWORD   | -                 | The password that will be set for the MySQL root superuser account - mandatory. |
|MYSQL_USER            | -                 | The username to connect to the database on the MySQL instance.                  |
|MYSQL_PASSWORD        | -                 | The password to connect to the database on the MySQL instance.                  |
|MYSQL_DATABASE        | -                 | The database on the MySQL instance.                                             |

The `mysql:5.7.23` image exposes MySQL via port `3306`.

## Docker image

This component is available as a Docker image via:

- mcr.microsoft.com/aks/samples/voting/storage:2.0

## Build Dockerfile

Powershell

```powershell
PS> docker build --no-cache --build-arg IMAGE_VERSION="2.0" --build-arg IMAGE_CREATE_DATE="$(Get-Date((Get-Date).ToUniversalTime()) -UFormat '%Y-%m-%dT%H:%M:%SZ')" --build-arg IMAGE_SOURCE_REVISION="$(git rev-parse HEAD)" -f Dockerfile -t "mcr.microsoft.com/aks/samples/voting/storage:2.0" .
```

Bash

```bash
$ docker build --no-cache --build-arg IMAGE_VERSION="2.0" --build-arg IMAGE_CREATE_DATE="`date -u +"%Y-%m-%dT%H:%M:%SZ"`" --build-arg IMAGE_SOURCE_REVISION="`git rev-parse HEAD`" -f Dockerfile -t "mcr.microsoft.com/aks/samples/voting/storage:2.0" .
```