# Image Hub

## Installation
* Please install Docker https://docs.docker.com/desktop/

## Clone the repository locally
```
git clone https://github.com/sharvy/image-hub
cd image-hub
```

## Run
```
docker build -t image-hub .
docker volume create --name=pgdata
docker-compose up
open http://localhost:3000
```
