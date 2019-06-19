FROM node
WORKDIR /app
ADD . /app
RUN npm install

ENV PORT 3000
ENV IP "172.17.0.2"
ENV USER "root"
ENV PASS "123456789"

CMD ["node","index.js"]