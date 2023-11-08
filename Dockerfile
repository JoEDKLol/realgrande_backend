FROM node
WORKDIR /app
COPY ./app
RUN npm install
EXPOSE 3022
CMD ["npm","start"]