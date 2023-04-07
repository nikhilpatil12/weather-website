# Weather Website

A simple web application that allows users to get the current weather conditions and the weather forecast for the next few days for a specific location. 

The application is built using react.js. It uses the OpenCage Geocoding API to get the longitude and latitude of the location that the user is searching for, and the OpenMeteo API to get the weather data for that location.

## Features

- User can search for the weather conditions of any location.
- User can view the current weather conditions and the weather forecast for the next few days for that location.
- The application displays the location's name, temperature, weather description, and the humidity level.
- The application uses dynamic backgrounds based on the current weather conditions.
---
## Installation

1. Clone the repository
```bash
git clone https://github.com/nikhilpatil12/weather-website.git
```
2. Install the dependencies
```bash 
npm install
```
3. Start the server
```bash
npm start
```
4. Open the application in your browser
http://localhost:3000
---

## Installation using Docker

1. Clone the repository:
```bash
git clone https://github.com/nikhilpatil12/weather-website.git
```
2. Navigate to the project directory:
```bash
cd weather-website
```

3. Build the Docker image:
```bash
docker build -t weather-website .
```

This will create a Docker image named "weather-website" using the Dockerfile provided. 

4. Run a Docker container from the Docker image:
```bash
docker run -p 80:80 weather-website
```
This will start a Docker container from the "weather-website" image and map port 80 from the container to port 80 on the host machine. 

5. Open the application in your web browser:
http://localhost

---
## Technologies Used
- Node.js
- React.js
- OpenMeteo API
- OpenCage Geocoding API
- Docker

---
## Credits
- [Node.js](https://nodejs.org/)
- [React.js](https://react.dev/)
- [OpenMeteo API](https://open-meteo.com/)
- [OpenCage Geocoding API](https://opencagedata.com/)
- [Docker](https://www.docker.com/)
