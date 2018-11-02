#!/bin/bash

_append_yaml_files() {
  local file="$1"
  local files_to_append=("$@")

  local total_files=${#files_to_append[@]}
  local index=1

  echo -n > $file
  for i in "${files_to_append[@]:1}";
    do
      ((index++))
      echo "# $(basename $i)" >> $file
      cat $i >> $file
      if [ $index -lt $total_files ]
      then
        echo -e "\n---\n" >> $file
      fi
    done
  sed '/^\s*$/d' -i $file
}

# Kubernetes

path="kubernetes"

_append_yaml_files $path/step-1-create-voting-app.yaml \
  $path/voting-storage-deployment-1.0.yaml \
  $path/voting-storage-service.yaml \
  $path/voting-analytics-deployment-1.0.yaml \
  $path/voting-analytics-service.yaml \
  $path/voting-app-deployment-1.0.yaml \
  $path/voting-app-service.yaml

_append_yaml_files $path/step-2-update-voting-analytics-to-1.1.yaml \
  $path/voting-analytics-deployment-1.1.yaml

_append_yaml_files $path/step-3-update-voting-app-with-new-storage.yaml \
  $path/voting-storage-service-add-mysql.yaml \
  $path/voting-storage-secret.yaml \
  $path/voting-storage-deployment-2.0.yaml \
  $path/voting-analytics-deployment-2.0.yaml \
  $path/voting-app-deployment-2.0.yaml

# Istio

path="istio"

_append_yaml_files $path/step-1-create-voting-app-gateway.yaml \
  $path/voting-app-virtualservice.yaml \
  $path/voting-app-gateway.yaml

_append_yaml_files $path/step-2a-update-voting-app-virtualservice.yaml \
  $path/voting-app-virtualservice-1.0.yaml

_append_yaml_files $path/step-2b-add-routing-for-all-components.yaml \
  $path/voting-app-destinationrule-1.0.yaml \
  $path/voting-analytics-destinationrule-1.0-and-1.1.yaml \
  $path/voting-analytics-virtualservice-1.1.yaml \
  $path/voting-storage-destinationrule-1.0.yaml \
  $path/voting-storage-virtualservice-1.0.yaml

_append_yaml_files $path/step-3-add-routing-for-2.0-components.yaml \
  $path/voting-app-destinationrule-1.0-and-2.0.yaml \
  $path/voting-app-virtualservice-1.0-and-2.0.yaml \
  $path/voting-analytics-destinationrule-1.1-and-2.0.yaml \
  $path/voting-analytics-virtualservice-1.1-and-2.0.yaml \
  $path/voting-storage-destinationrule-1.0-and-2.0.yaml \
  $path/voting-storage-virtualservice-1.0-and-2.0.yaml