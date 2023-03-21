# 基础镜像
FROM node:18-alpine AS build

# 设置工作目录
WORKDIR /app

# 安装依赖
COPY package.json package-lock.json ./
RUN npm ci

# 复制源代码并构建
COPY . .
RUN npm run build

# 使用 Nginx 镜像
FROM node:18-alpine

# 复制构建好的 React 应用程序到 Nginx 容器中
COPY --from=build /app/build /app/build

RUN npm install -g serve

CMD ["serve", "-s", "/app/build", "-l", "80"]