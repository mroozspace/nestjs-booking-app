FROM node:alpine as development

WORKDIR /user/src/app

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /user/src/app

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY --from=development /user/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]