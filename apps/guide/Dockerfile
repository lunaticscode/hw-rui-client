
# BASE STEP
FROM node:18-alpine AS base
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN yarn global add turbo
COPY . . 
RUN turbo prune guide --docker

# INSTALLER STEP
FROM node:18-alpine AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm
WORKDIR /app
COPY --from=base /app/out/json/ .
RUN pnpm install
COPY --from=base /app/out/full/ .
RUN pnpm run build
 
# RUNNER STEP
FROM nginx:stable-alpine as runner
COPY --from=installer /app/apps/guide/dist /usr/share/nginx/html
COPY --from=installer /app/apps/guide/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]