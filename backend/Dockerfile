# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /api

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Grab build arguments
ARG DB_SERVER_ARG
ARG DB_NAME_ARG
ARG DB_USER_ARG
ARG DB_PASSWORD_ARG

# Set environment variables from build arguments
ENV DB_SERVER=${DB_SERVER_ARG}
ENV DB_NAME=${DB_NAME_ARG}
ENV DB_USER=${DB_USER_ARG}
ENV DB_PASSWORD=${DB_PASSWORD_ARG}

# Print environment variables (for troubleshooting)
RUN echo "DB_SERVER=${DB_SERVER}" && \
    echo "DB_NAME=${DB_NAME}"

# Bundle app source
COPY . .

# Expose the port the API runs on
EXPOSE 3000

# Command to run application
CMD ["node", "api/api.js"]
