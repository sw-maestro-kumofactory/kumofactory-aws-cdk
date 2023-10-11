FROM node:20-alpine
LABEL authors="wook"

WORKDIR /usr/src/app

RUN apt-get install -y python3-pip
RUN pip3 install awscli

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
