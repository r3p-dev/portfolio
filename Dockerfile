FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/package.json ./package.json
COPY --from=prerelease /usr/src/app/dist ./dist

ENV PORT=4321
ENV HOST=0.0.0.0
ENV GUESTBOOK_DB=/app/data/guestbook.db
RUN mkdir -p /app/data && chown -R bun:bun /app/data
VOLUME /app/data

USER bun
EXPOSE 4321/tcp
ENTRYPOINT [ "bun", "run", "dist/server/entry.mjs" ]
