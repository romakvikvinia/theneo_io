FROM node:14-alpine

WORKDIR /app

COPY package.json .

# RUN npm install --only=prod
ENV NODE_ENV=production
RUN npm install --omit=dev

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]