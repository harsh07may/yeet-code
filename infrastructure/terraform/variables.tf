#########################################
# Account Details
#########################################

variable "region" {
  default     = "us-east-1"
  description = "The AWS region where Terraform will deploy resources"
  type        = string
}

variable "access_key" {
  default = "test"
  type    = string
}

variable "secret_key" {
  default = "test"
  type    = string
}

# LocalStack

variable "use_localstack" {
  description = "Set to true when using LocalStack"
  type        = bool
  default     = true
}

variable "use_path_style" {
  default = true
}

variable "skip_cred_validation" {
  default = true
}

variable "skip_metadata_api_check" {
  default = true
}

variable "skip_requesting_account_id" {
  default = true
}

#########################################
# EC2
#########################################

variable "instance_type" {
  default = "t2.micro"
  type    = string
}

variable "ami_id" {
  default = "ami-0abcdef1234567890" # Use Ubuntu/Debian AMI
  type    = string
}

variable "key_name" {
  default = "terraform-key"
}

variable "public_key_path" {
  default = "PATH_TO_PUBLIC_KEY"
}

variable "private_key_path" {
  default = "PATH_TO_PRIVATE_KEY"
}
