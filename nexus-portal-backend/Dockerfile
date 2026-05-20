FROM node:alpine AS init

WORKDIR /app
RUN mkdir src

COPY ./src /app/src/
COPY ./sheets/ /app/sheets/
COPY ./package.json /app/
COPY ./*config*.json /app/

RUN npm i
RUN npm run build

FROM init AS start

# Automatically run the seed script if NODE_ENV is development
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then node dist/seed.js; fi && npm run watch"]