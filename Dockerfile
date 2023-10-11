FROM node:20-alpine
LABEL authors="wook"

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

RUN sudo yum remove awscli

CMD ["npm", "run", "start:prod"]
