FROM alpine:latest
RUN apk add --update nodejs-current npm
WORKDIR /app
COPY . /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 9000
CMD ["node", "app.js"]