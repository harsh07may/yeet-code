output "instance_id" {
  value = aws_instance.worker.id
}

output "public_ip" {
  value = aws_instance.worker.public_ip
}

