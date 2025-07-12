# Install dependencies and build the app
ARG PORT=3000
FROM oven/bun:1.2.14 AS BUILD
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --production=false
COPY . .
RUN bun run build

# Production image with only production dependencies
FROM oven/bun:1.2.14 AS RUNNER
ARG PORT
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --production
COPY --from=BUILD /app/.next .next
COPY --from=BUILD /app/public public
ENV PORT=${PORT}
EXPOSE ${PORT}
CMD ["bun", "run", "start"]
