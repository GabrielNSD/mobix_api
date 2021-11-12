FROM node:current-alpine3.12

WORKDIR /usr/src/mobix_api

COPY ./ ./

RUN npm install

RUN apk add --no-cache bash

CMD ["/bin/bash"]