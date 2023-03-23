FROM node:18-alpine
WORKDIR /app
COPY ./build ./build
RUN npm install -g serve
EXPOSE 3030
CMD ["serve", "-s", "build", "-l", "3030"]
