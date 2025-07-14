# Install dependencies and build the Next.js app
ARG PORT=3000
FROM oven/bun:1.2.14 AS BUILD
WORKDIR /app

# Copy workspace files and packages from the monorepo root
COPY package.json bun.lock ./
COPY packages ./packages
COPY types ./types
COPY apps/web ./apps/web

# Install all workspace dependencies and build the application
RUN bun install --production=false
RUN bun run --cwd apps/web build

# Production image with only production dependencies
FROM oven/bun:1.2.14 AS RUNNER
ARG PORT
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --production
COPY --from=BUILD /app/apps/web/.next .next
COPY --from=BUILD /app/apps/web/public public
ENV PORT=${PORT}
EXPOSE ${PORT}
CMD ["bun", "run", "start"]
