# 依赖构建阶段
FROM node:18-alpine as dependencies

WORKDIR /app

COPY package*.json ./
RUN npm ci

# 构建阶段
FROM node:18-alpine as build-stage

WORKDIR /app

COPY --from=dependencies /app/node_modules /app/node_modules
COPY . .

RUN npm run build

# 部署阶段
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
