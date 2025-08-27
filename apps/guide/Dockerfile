# BASE STEP
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN npm install -g pnpm
COPY . . 
ENV PNPM_HOME=/usr/local/share/pnpm
ENV PATH=${PNPM_HOME}:${PATH}
RUN corepack enable && corepack prepare pnpm@latest --activate \
  && mkdir -p "${PNPM_HOME}" \
  && pnpm config set global-bin-dir "${PNPM_HOME}"
RUN pnpm add turbo --global
RUN turbo prune --scope=guide --docker

# INSTALLER STEP
FROM node:20-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install -g pnpm
WORKDIR /app
COPY --from=base /app/out/json/ .
RUN pnpm install
COPY --from=base /app/out/full/ .
RUN pnpm run build
 
# RUNNER STEP
FROM nginx:stable-alpine
COPY --from=installer /app/apps/guide/dist /usr/share/nginx/html
COPY --from=installer /app/apps/guide/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
