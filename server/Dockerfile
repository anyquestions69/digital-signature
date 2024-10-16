FROM node:lts

WORKDIR /app

COPY . .
RUN apk add --no-cache make gcc g++ python3 && \
    npm rebuild bcrypt --build-from-source && \
    apk del make gcc g++ python3
RUN npm i --force

EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]