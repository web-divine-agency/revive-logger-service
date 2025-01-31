FROM node:20.18.0-alpine

WORKDIR /var/www/revive-logger-service

COPY package.json /

RUN rm -rf node_modules \
  && rm -rf package-lock.json \
  && npm install -g nodemon \
  && npm install

COPY . .

EXPOSE 8804 4404

CMD ["npm", "start"]