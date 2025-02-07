# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all frontend files
COPY . .

# Build frontend with Vite
RUN npm run build

# Serve with Nginx
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /usr/src/app/dist ./

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
