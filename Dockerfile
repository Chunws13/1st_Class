FROM node:18
WORKDIR /app
EXPOSE 3000
COPY package.json* ./
RUN npm install
COPY . .
CMD [ "npx", "nodemon", "app.js"]
# commit & push 필수