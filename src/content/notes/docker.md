---
title: docker
---

CLI Reference - https://docs.docker.com/engine/reference/run/

### IMAGE BASICS

    docker build -t <name> .           # build a new image from Dockerfile
    docker images                      # list the most recently created images
    docker image prune                 # delete dangling images
    docker run -it <image> sh          # create and start shell in interactive mode
    docker commit <containerID>        # create an image out of a container

### RUN A CONTAINER

    docker run <image>
    docker run -d <image>              # run in the background
    docker run —name <name> <image>    # to give a custom name

### CONTAINER NETWORKING

    docker run —p 3000:3000 <image>    # to publish a port HOST:CONTAINER
    docker run —P <image>              # to map all ports
    docker run --hostname <hostname> <image>    # assign an hostname
    docker run --add-host <hostname:ip> <image> # add a dns entry
    docker port <containerID>          # show mapped ports of a container

### STOPPING & STARTING CONTAINERS

    docker stop <containerID>
    docker start <containerID>        # start a stopped container

### LISTING CONTAINERS

    docker ps                          # to list running containers
    docker ps -a                       # to list all containers

### EXECUTING COMMANDS IN RUNNING CONTAINERS

    docker exec <containerID> <cmd>
    docker exec -it <containerID> sh   # to start a shell

### VIEWING THE LOGS

    docker logs <containerID>
    docker logs -f <containerID>       # to follow the log
    docker logs —t <containerID>       # to add timestamps
    docker logs —n 10 <containerID>    # to view the last 10 lines

### REMOVING CONTAINERS

    docker container rm <containerID>
    docker rm <containerID>
    docker rm -f <containerID>         # to force the removal
    docker container prune             # to remove stopped containers

### VOLUMES

    docker volume ls
    docker volume create app-data
    docker volume inspect app-data
    docker run -v app-data:/app-data <image> ls /app-data

### COPYING FILES BETWEEN HOST AND CONTAINERS

    docker cp <containerID>:/app/log.txt .
    docker cp secret.txt <containerID>:/app

### SHARING SORUCE CODE WITH CONTAINERS

    docker run -v $(pwd):/app <image>

### MULTI-CONTAINER APPS

    docker-compose build
    docker-compose build --no-cache
    docker-compose updocker-compose up -d
    docker-compose up —build
    docker-compose down
    docker-compose ps
    docker-compose logs
