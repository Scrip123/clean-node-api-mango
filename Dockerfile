FROM node:20
WORKDIR /usr/clean_node_api_mango
COPY package*.json ./
RUN npm install
COPY dist ./dist
CMD npm start
