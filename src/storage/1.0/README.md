# AKS Voting App - Storage Component (1.0)

## Overview

Provides the `storage` component for the Azure Voting App. This is a Redis backend that is used by the `app` component to store votes and by the `analytics` component to count votes.

## Dependencies

The `1.x` versions of the `app` and `analytics` components utilise this version of the `storage` component to store and count votes.

## Configuration

The `redis` image exposes Redis via port `6379`.

## Docker image

This component is available on DockerHub as a Docker image via:

- redis:4.0.11
