FROM ubuntu:16.04

MAINTAINER Aapeli Vuorinen

ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

# Basic packages
RUN apt-get update -y && apt-get -y install curl git

# Node and yarn
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -y && apt-get -y install nodejs yarn

# Set up folders
RUN mkdir /app
WORKDIR /app

# Install JDK and Maven
RUN apt-get update -y && apt-get -y install maven default-jdk
RUN git clone https://github.com/aapeliv/swagger-codegen-typescript-browser /app/codegen
RUN cd /app/codegen && mvn clean package

# Codegen
RUN mkdir -p /app/src/gen
RUN curl -sLo /app/api_spec.yaml https://github.com/persephone-tools/persephone-web-API/raw/master/persephone_api/api_spec.yaml
RUN java -jar /app/codegen/target/TypescriptBrowser-swagger-codegen-shaded.jar generate -l TypescriptBrowser -i /app/api_spec.yaml -o /app/src/gen/

# Build the actual thing
COPY . /app

RUN yarn install
RUN yarn build

# Run it
RUN  npm install http-server -g

EXPOSE 8000

CMD [ "http-server", "build", "-p", "8000" ]