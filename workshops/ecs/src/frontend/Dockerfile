FROM public.ecr.aws/bitnami/node:14 AS builder 
RUN mkdir -p webapp 
WORKDIR /webapp 
COPY webapp/package.json /webapp 
RUN npm install 
COPY /webapp /webapp 
RUN npm run build 

FROM public.ecr.aws/nginx/nginx:latest
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY backend.conf.template  /etc/nginx/templates/backend.conf.template
COPY --from=builder /webapp/build .
RUN chmod -R 777 .
EXPOSE 80
# Containers run nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]