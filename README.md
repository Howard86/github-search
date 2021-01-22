# Github Search

This is another search engine to read GitHub users information

## Prerequisite

Current local version:

- [Node.js](https://nodejs.org/en/): v14.4.0 (version above v12 should be ok)
-

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
