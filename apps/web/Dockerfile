# Install dependencies and build the app
FROM oven/bun:1.2.14 AS BUILD
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --production=false
COPY . .
RUN bun run build

# Production image with only production dependencies
FROM oven/bun:1.2.14 AS RUNNER
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --production
COPY --from=BUILD /app/.next .next
COPY --from=BUILD /app/public public
ENV PORT=3000
EXPOSE 3000
CMD ["bun", "run", "start"]
