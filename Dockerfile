FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y build-essential python

COPY . .

RUN npm rebuild bcrypt --build-from-source

EXPOSE 3000

CMD ["npm", "start"]