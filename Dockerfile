FROM node:21-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

ENTRYPOINT npm run migrate && npm start