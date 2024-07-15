FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm i --force
#RUN npx prisma migrate dev "init"
#RUN npm run build
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]