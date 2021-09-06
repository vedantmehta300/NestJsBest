# FROM node:12.16-alpine As development

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN yarn

# COPY . .

# RUN yarn build 


# --- ----------- LAST WORKING ----------------------
FROM node:12.16-alpine 

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn 

COPY . .

RUN yarn build
# RUN echo pwd
# COPY --from=development /usr/src/app/dist ./dist
# COPY dist ./dist

CMD ["node", "dist/main"]



# --------------- EXPEREMENTAL WORKING ---------------------
# FROM node:14

# # Create app directory

# WORKDIR /usr/src/app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./

# RUN npm install 
# # If you are building your code for production
# # RUN npm ci --only=production

# # Bundle app source
# COPY . .

# RUN npm run build

# RUN pwd
# RUN echo "$PWD"

# # RUN ls dist
# # RUN ls dist -R
# # RUN find . -print
# RUN ls dist -R


# CMD [ "node", "dist/main" ]