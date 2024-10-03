FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm i --force
#RUN npx prisma migrate dev "init"
#RUN npm run build
EXPOSE 443

# Command to run the application
CMD ["npm", "run", "dev"]