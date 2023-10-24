FROM node:alpine as build-stage

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

#
FROM nginx:stable

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=build-stage /app/dist .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]




