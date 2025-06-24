# Infrastructure

## Terraform

This project uses [Terraform](https://www.terraform.io/) to provision cloud infrastructure.

### 💡 Recommended Workflow

1. **Test with LocalStack (mock AWS) first**
2. **Deploy to real AWS after verification**

```bash
cd /infrastructure/terraform
terraform init
terraform plan
terraform apply # If Local
terraform apply -var-file="prod.tfvars" # If AWS
```

## Localstack | Local cloud service emulator

**LocalStack** is a fully functional mock AWS cloud environment that runs locally. It lets you develop and test AWS-dependent applications without touching real AWS, saving time and money.

### Start LocalStack (via Docker Compose)

```bash
cd /infrastructure/localstack
docker-compose up -d
```

### Alternative (if docker-compose fails)

```bash
    docker run --rm -it -d --name localstack-container \
    -p 127.0.0.1:4566:4566 \
    -p 127.0.0.1:4510-4559:4510-4559 \
    -v /var/run/docker.sock:/var/run/docker.sock \
    localstack/localstack
```

### Resources

- [Localstack](https://docs.localstack.cloud/getting-started/)
- [AWS | Configuring settings for the AWS CLI](https://docs.aws.amazon.com/cli/v1/userguide/cli-chap-configure.html)
- [Localstack | Configuring settings for the AWS CLI](https://docs.localstack.cloud/user-guide/integrations/aws-cli/)
