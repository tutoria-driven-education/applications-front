FROM node:16.13

WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

CMD ["npm", "start"]
