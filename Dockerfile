FROM node:22

RUN mkdir /opt/app
WORKDIR /opt/app
COPY app.js service.js package.json package-lock.json middlewares.js db.js .env ./

RUN npm install

ENTRYPOINT ["node", "service.js"]