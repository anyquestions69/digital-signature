FROM node:lts-alpine
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /client

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

RUN apk update
RUN npm install --force
RUN npm install @vue/cli@3.7.0 -g

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

EXPOSE 443
CMD [ "npm", "run", "dev" ]