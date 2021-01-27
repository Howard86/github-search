
ARG NODE_IMAGE_TAG=14.4.0

# Stage 1: Building the code
FROM node:${NODE_IMAGE_TAG}-alpine AS builder

WORKDIR /

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm prune --production

# Stage 2: copy over node_modules, etc from that stage to the smaller base image

FROM node:${NODE_IMAGE_TAG}-alpine as production

WORKDIR /

COPY --from=builder /public ./public
COPY --from=builder /.next ./.next
COPY --from=builder /node_modules ./node_modules

ENV NODE_ENV production
CMD ["node_modules/.bin/next", "start"]
