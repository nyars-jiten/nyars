# Build Stage 1

FROM node:24-alpine AS build
WORKDIR /app

RUN corepack enable

# Copy package.json and your lockfile, here we add pnpm-lock.yaml for illustration
COPY package.json pnpm-lock.yaml .npmrc ./

# Install dependencies
RUN pnpm i

# Copy the entire project
COPY . ./

# Build the project
RUN pnpm run build

# Build Stage 2

FROM node:24-alpine
WORKDIR /app

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output/ ./

# Change the port and host
ENV PORT=8080
ENV HOST=0.0.0.0
ENV NODE_ENV=production

CMD ["node", "/app/server/index.mjs"]
