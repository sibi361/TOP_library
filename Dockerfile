FROM node:slim

RUN /usr/sbin/useradd --no-create-home -u 2000 user

WORKDIR /home/user

COPY package.json package-lock.json .

RUN npm install

ADD src .

USER user

CMD node main.js 8080
