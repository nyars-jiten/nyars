FROM mcr.microsoft.com/devcontainers/javascript-node

USER node

WORKDIR /app

RUN umask 0002

COPY . .

RUN pnpm config set store-dir ~/.local/share/pnpm/store

EXPOSE 25565
