FROM node:13.0.1-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "deploy" ]