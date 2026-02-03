# Docker Deployment Guide

## 🐳 Build và chạy với Docker

### 1. Build Docker image:
```bash
docker build -t tic-tac-toe:latest .
```

### 2. Chạy container:
```bash
docker run -d -p 3000:80 --name tic-tac-toe-app tic-tac-toe:latest
```

### 3. Hoặc sử dụng Docker Compose:
```bash
docker-compose up -d
```

### 4. Truy cập ứng dụng:
```
http://localhost:3000
```

### 5. Dừng container:
```bash
# Nếu dùng docker run
docker stop tic-tac-toe-app
docker rm tic-tac-toe-app

# Nếu dùng docker-compose
docker-compose down
```

## 📊 Kiểm tra logs:
```bash
# Docker
docker logs tic-tac-toe-app

# Docker Compose
docker-compose logs -f
```

## 🏥 Health Check:
```bash
curl http://localhost:3000/health
```

## 🚀 CI/CD với GitHub Actions

Workflow đã được tạo tại `.github/workflows/docker-build.yml`

### Cách hoạt động:
1. Tự động build khi push code lên branch `main` hoặc `develop`
2. Build Docker image và push lên GitHub Container Registry
3. Tag image theo branch/version/commit SHA

### Setup:
1. Đảm bảo GitHub Actions được enable trong repository
2. Workflow sẽ tự động chạy khi push code
3. Image sẽ có tại: `ghcr.io/<username>/tic-tac-toe`

## 🔧 Tùy chỉnh

### Thay đổi port:
Sửa trong `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # <host-port>:<container-port>
```

### Environment variables:
1. Copy `.env.example` thành `.env.local`
2. Cấu hình các biến môi trường
3. Rebuild Docker image

### Tối ưu hóa:
- Dockerfile sử dụng multi-stage build để giảm kích thước image
- Nginx được cấu hình với gzip compression
- Static assets được cache 1 năm
- Security headers được thêm vào response

## 📦 Production Deployment

### Deploy lên cloud platforms:

**Docker Hub:**
```bash
docker tag tic-tac-toe:latest username/tic-tac-toe:latest
docker push username/tic-tac-toe:latest
```

**Azure Container Registry:**
```bash
docker tag tic-tac-toe:latest myregistry.azurecr.io/tic-tac-toe:latest
docker push myregistry.azurecr.io/tic-tac-toe:latest
```

**AWS ECR:**
```bash
aws ecr get-login-password | docker login --username AWS --password-stdin <aws-account-id>.dkr.ecr.<region>.amazonaws.com
docker tag tic-tac-toe:latest <aws-account-id>.dkr.ecr.<region>.amazonaws.com/tic-tac-toe:latest
docker push <aws-account-id>.dkr.ecr.<region>.amazonaws.com/tic-tac-toe:latest
```

## 🔐 Security Best Practices

1. ✅ Không commit file `.env` vào Git
2. ✅ Sử dụng `.dockerignore` để loại bỏ file không cần thiết
3. ✅ Regular update base images (node:20-alpine, nginx:alpine)
4. ✅ Scan image với `docker scan tic-tac-toe:latest`
5. ✅ Chạy container với non-root user (đã cấu hình trong nginx:alpine)
