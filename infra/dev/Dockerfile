# Build Stage
FROM node:21-alpine as build-stage

# Get the environment variables from the docker-compose
ARG VITE_API_URL
ARG VITE_URL

# Set the variables so they're available to vite
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
ENV NODE_ENV development
EXPOSE 5173
CMD ["npm", "run", "dev"]
