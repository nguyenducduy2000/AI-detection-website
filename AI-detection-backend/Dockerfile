FROM node:20-alpine3.17

WORKDIR /app

COPY src/* .
COPY package*.json .
COPY tsconfig.json .
COPY jsconfig.json .

RUN npm install
RUN npm run build

ENTRYPOINT [ "echo hello!" ]