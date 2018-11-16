FROM ubuntu:16.04

MAINTAINER Aapeli Vuorinen

ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

RUN apt-get update -y && apt-get -y install curl

RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -y && apt-get -y install nodejs yarn

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN yarn install
RUN yarn build

RUN  npm install http-server -g

EXPOSE 8000

CMD [ "http-server", "build", "-p", "8000" ]