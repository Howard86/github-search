
ARG NODE_IMAGE_TAG=12.20.1

# Stage 1: Building the code
FROM node:${NODE_IMAGE_TAG}-alpine AS builder

WORKDIR /

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Yarn install in production mode
FROM node:${NODE_IMAGE_TAG}-alpine as environment

WORKDIR /

COPY --from=builder /package.json ./
COPY --from=builder /package-lock.json ./

RUN npm install --only=production

COPY --from=builder /public ./public
COPY --from=builder /.next ./.next

# Stage 3: copy over node_modules, etc from that stage to the smaller base image

FROM node:${NODE_IMAGE_TAG}-alpine as production

WORKDIR /

COPY --from=environment /public ./public
COPY --from=environment /.next ./.next
COPY --from=environment /node_modules ./node_modules

ENV NODE_ENV production
CMD ["node_modules/.bin/next", "start"]
