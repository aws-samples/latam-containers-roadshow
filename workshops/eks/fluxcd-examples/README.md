# FluxCD Examples

## Provision EKS using eksctl

```
eksctl create cluster -f helpers/eks-workshop.yaml
```

## Install Flux on bootstrap

```sh
flux bootstrap github --owner=lusoal --repository=fluxcd-examples --path=./clusters/my-cluster/ --read-write-key --branch=main --namespace=flux-system --components-extra=image-reflector-controller,image-automation-controller
```