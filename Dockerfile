FROM node:12.18.3 as builder

WORKDIR /app

COPY package.json ./

RUN yarn install && yarn cache clean

COPY . .

#RUN yarn start

# RUN yarn run build

# FROM nginx:1.17.0-alpine as pod-front

# COPY --from=builder /app/build /usr/share/nginx/html

# RUN rm /etc/nginx/conf.d/default.conf

# #COPY --from=builder /app/nginx.conf /etc/nginx/conf.d

# COPY nginx.conf /etc/nginx/conf.d

EXPOSE 3000

CMD ["yarn", "start"]