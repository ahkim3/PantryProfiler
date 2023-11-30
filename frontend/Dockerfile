# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Set environment variables


# Bundle app source
COPY . .

# Expose the port the frontend runs on
#EXPOSE 3100 
EXPOSE 80
EXPOSE 443

# Command to run application
CMD ["npm", "start"]