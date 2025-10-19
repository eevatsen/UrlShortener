FROM --platform=linux/amd64 node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build --prod


FROM nginx:alpine
COPY --from=build /app/dist/client/browser /usr/share/nginx/html
EXPOSE 80