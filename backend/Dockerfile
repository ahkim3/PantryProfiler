# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /api

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Set environment variables
ENV DB_CONFIG=$DB_CONFIG

# Bundle app source
COPY . .

# Expose the port the API runs on
EXPOSE 3000

# Command to run application
CMD ["node", "api/api.js"]
