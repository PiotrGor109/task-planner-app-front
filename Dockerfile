# build angulara
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# nginx
FROM nginx:alpine
COPY --from=build /app/dist/task-planner-app-front /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
