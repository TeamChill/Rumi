[![Stories in Ready](https://badge.waffle.io/Ubiquitous-Marmosets/Rumi.png?label=ready&title=Ready)](https://waffle.io/Ubiquitous-Marmosets/Rumi)
# Rumi

- Create env.sh file:
  export FB_ID=YOUR FB APP ID
  export FB_SECRET=YOUR FB APP SECRET
  export SESSION_SECRET=YOUR CUSTOM SECRET
- On terminal, run:
  - source ./env.sh
  to set these variables to your local environment so that it can be accessed through process.env.(the var you want)

- create the docker image for postgresSQL:
  - docker build -t rumi .
- run the image with port 5432(default port for postgres):
  - docker run -d -p 5432:5432 rumi
- make sure the image is running:
  - docker ps
- start the server!
 

- to destroy docker containers 
  - docker rm -f $(docker ps -aq)
