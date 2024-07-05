# FROM node:alpine3.18 as build

# # build app
# FROM build AS builder
# WORKDIR /app
# COPY package.json ./
# RUN npm install
# COPY . .
# RUN npm run build


# # declared build time variables
# ARG REACT_APP_NODE_ENV
# ARG REACT_APP_SERVER_BASE_URL

# # set the default values of env variables
# ENV REACT_APP_NODE_ENV=$REACT_APP_NODE_ENV
# ENV REACT_APP_SERVER_BASE_URL=$REACT_APP_SERVER_BASE_URL

# # serve with nginx
# FROM nginx:1.23-alpine

# # nginx always severs form the particular directory
# WORKDIR /usr/share/nginx/html

# # removed the all directories from the from the current directory
# RUN rm -rf *

# #copy the existing build to nginx directory, from=build d /app/build is the source directory, . is the current directory
# COPY --from=builder /app/.next .

# # nginx always serves the 80 port only
# EXPOSE 80
# ENTRYPOINT [ "nginx", "-g", "daemon off;" ]


# ---------------------------------


FROM node:20-alpine3.18 as builder
WORKDIR /app
COPY .package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", 'run', 'start' ]