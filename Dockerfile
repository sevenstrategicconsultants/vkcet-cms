FROM node:22-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
RUN sed -i '/[[:space:]]mjs;/d; /application\/javascript/ s/;$/ mjs;/' /etc/nginx/mime.types
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist/ /usr/share/nginx/html/
ENV PORT=8080
ENV NGINX_ENVSUBST_FILTER=^PORT$