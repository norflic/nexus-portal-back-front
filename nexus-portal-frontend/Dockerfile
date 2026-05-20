FROM node:alpine AS init

WORKDIR /app/

COPY ./src /app/src/
COPY ./index.html /app/
COPY ./package.json /app/
COPY ./*config*.json /app/
COPY ./*config*.ts /app/

RUN npm i

FROM init AS watch

ENTRYPOINT ["npm", "run", "watch"]

FROM init AS start

ENTRYPOINT ["npm", "run", "dev"]

