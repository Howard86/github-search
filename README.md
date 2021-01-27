# GitHub Search

This is another search engine to read GitHub users information

## Features

Enter GitHub username and search users matching the input like Google Search, click avatars to view more details, including repositories, followers and following.

Pages include:

- [HomePage](https://github-search.howard86.vercel.app/) **/** - A search bar to find users
- [UserPage](https://github-search.howard86.vercel.app/user/howard86) **/user/[username]** - User information on GitHub, currently showing at most 100 items in repositories, followers & following.

### Tech Stack

- [React](https://reactjs.org/): 17.0
- [Next.js](https://nextjs.org/): 10.0
- [TypeScript](https://www.typescriptlang.org/): 4.0
- [emotion](https://emotion.sh/docs/introduction): 11.1
- [Framer Motion](https://www.framer.com/motion/): 3.1
- [Chakra UI](https://chakra-ui.com/): 1.0
- [Redux Toolkit](reduxjs/toolkit): 1.5
- [jest](https://jestjs.io/): 26.6

## Prerequisite

Current local version:

### Requirements

- [Node.js](https://nodejs.org/en/): 14.4 (version above v12 should be ok)
- [npm](https://www.npmjs.com/): v6.14

### Optional

- [Redis](https://redis.io/): 3.12
- [Docker](https://www.docker.com/): 20.10
- [docker-compose](https://docs.docker.com/compose/): 1.27

After cloning the repository, please copy the sample env `.env.local.sample` and change it to `.env.local`, then update GitHub Access Token

(More info can be found [here](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token))

```bash
cp .env.local.sample .env.local
```

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production

First bundle and build the application:

```bash
npm run build
```

After a successful build, run the production server:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

For better performance and persistency, we can use Redis in docker-compose by updating `.env.local`

```bash
ENABLE_REDIS=true
REDIS_HOST=redis
```

Build and start the services by

```bash
docker-compose build
docker-compose up -d
```
