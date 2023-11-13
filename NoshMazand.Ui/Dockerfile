FROM node:alpine as build
WORKDIR /app
COPY Diamond.UI/package.json .
RUN npm i
COPY Diamond.UI/ /app

RUN npm run build
FROM nginx:latest
COPY Diamond.UI/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html