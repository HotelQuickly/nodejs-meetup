FROM node:5.5.0

RUN apt-get update && apt-get install -y netcat

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN chmod +x ./docker-start.sh

RUN npm install --loglevel error

EXPOSE 3000
CMD ./docker-start.sh
