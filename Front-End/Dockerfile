FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./

RUN npm install -g npm-check-updates

RUN ncu -u
RUN npm install
RUN npm install -g npm@latest


RUN npm i -D daisyui@latest
RUN npm i pikaday
RUN npm i js-cookie
RUN npm i axios

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]