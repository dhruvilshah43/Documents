FROM node:10.17.0

RUN mkdir -p /usr/scr/app

RUN chown -R node:node /usr/scr/app

WORKDIR /usr/scr/app

COPY package*.json ./

USER node

RUN npm install --no-optional && npm cache clean --force && npm audit fix

COPY --chown=node:node . .

EXPOSE 3006
CMD [ "node", "app.js" ]

