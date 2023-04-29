FROM mcr.microsoft.com/devcontainers/javascript-node

USER node

WORKDIR /app

RUN umask 0002

COPY . .

RUN pnpm i --verbose

EXPOSE 25565
