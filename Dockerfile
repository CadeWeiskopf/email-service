FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install -g typescript && \
    apk update && \
    apk upgrade && \
    npm install && \
    cd ./src/data/shared-types && \
    npm install --prefix=../../.. && \
    cd ../../.. && \
    npx tsc && \
    mv ./src/data/email-template.html ./dist/data/email-template.html 
USER node
ARG PORT
EXPOSE $PORT
CMD ["node", "-r", "dotenv/config", "./dist/app.js"]

# FROM nginx:alpine
# # COPY --from=build /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]