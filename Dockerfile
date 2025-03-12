FROM node:22

RUN mkdir /opt/app
WORKDIR /opt/app
COPY app.js servicio.js package.json package-lock.json .env ./

RUN npm install

ENTRYPOINT ["node", "servicio.js"]