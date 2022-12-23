FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
EXPOSE 3000
COPY . .
RUN npm run build
RUN npm run populatedb
ENTRYPOINT [ "npm", "run", "start:prod" ]
