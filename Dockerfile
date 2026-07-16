FROM node:22-slim

# Install fonts and Pango for sharp's text rendering (brand overlay on GBP images)
RUN apt-get update && apt-get install -y --no-install-recommends \
    fonts-dejavu-core \
    fontconfig \
    && rm -rf /var/lib/apt/lists/* \
    && fc-cache -fv

WORKDIR /app
COPY . .
RUN npm install -g corepack@latest && corepack pnpm install && corepack pnpm run build

ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
