# Use an official Node.js runtime as a parent image
FROM node:latest
# Set the working directory to /app
WORKDIR /app
# Copy the current directory contents into the container at /app
COPY . /app
# Install any needed packages
RUN npm install --force
# Build the app
RUN npm run build
# Set the environment variable
ENV PORT=3000
# Expose port 3000
EXPOSE 3000
# Run the command to start the server
CMD ["npm", "start"]