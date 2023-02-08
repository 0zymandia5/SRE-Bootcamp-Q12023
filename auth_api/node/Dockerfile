FROM registry.access.redhat.com/ubi8/ubi:latest

LABEL maintainer="Ivan.Warlock@outlook.com"

#Env Vars
ENV NODE_VERSION=14.17.6
ENV NODEJS_PORT=8000
RUN dnf install -y wget

############################################NodeJS#####################################################
RUN echo installing node version: $NODE_VERSION
RUN wget https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz
RUN tar --strip-components 1 -xzf node-v* -C /usr/local
RUN node --version

#from local Repository
COPY . /app

#list the files inside app folder
RUN ls -1a /app

#define work space
WORKDIR /app

RUN chgrp -R 0 /app && chmod -R g+rwX /app

# confirm installation
RUN node -v
RUN npm -v

RUN npm config set unsafe-perm true

RUN npm install --loglevel verbose

#expose app port
EXPOSE $NODEJS_PORT

#command at the starting
CMD npm start
