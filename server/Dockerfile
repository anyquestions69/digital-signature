FROM node:lts-alpine

WORKDIR /app
# RUN apk update && apk upgrade && apk add --no-cache make gcc g++ python3 
RUN apk update && apk upgrade
COPY . .

RUN npm i 

EXPOSE 3000

# Command to run the application
CMD ["sh", "-c", "npx prisma migrate dev && npm run start"]