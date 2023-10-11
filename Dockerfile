FROM node:20-alpine
LABEL authors="wook"

WORKDIR /usr/src/app

RUN yum remove awscli

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
