#! /bin/bash

# meal-order
kubectl delete all --all -n meal-order
kubectl delete configmap --all -n meal-order
kubectl delete secret --all -n meal-order