#########################################
# AWS Provider Configuration
#########################################

provider "aws" {
  region = var.region

  #! Use prod.tfvars on prod.
  access_key = var.access_key
  secret_key = var.secret_key

  s3_use_path_style           = true
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  #! Remove this on prod.
  endpoints {
    ec2 = "http://localhost:4566"
  }

}


#########################################
# EC2
#########################################

resource "aws_key_pair" "local" {
  key_name   = var.key_name
  public_key = file(var.public_key_path) # Ensure this exists
}

resource "aws_instance" "worker" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  associate_public_ip_address = true

  key_name = aws_key_pair.local.key_name

  tags = {
    Name = "code-executor-worker"
  }

}



