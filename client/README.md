# Yeetcode Client

Built with:

- NextJS
- TailwindCSS
- ShadCN

## Running Locally

- Run the following commands:

```bash
pnpm install
pnpm dev
```

- Run [http://localhost:3000](http://localhost:3000) with your browser.

## Tech Stack

### Front-end

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework with reusable classes.out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

Find out more: [Yeetcode | Eraser.io](https://app.eraser.io/workspace/PnG5Yluj9dpLTMZpRY2X).
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Using Docker

1. Install Docker on your machine.
2. Build your container: `docker build -t yeetcode-client .`.
3. Run your container: `docker run -p 3000:3000 yeetcode-client`.
4. Make sure you add the following to your `next.config.js`.

```js
// next.config.js
module.exports = {
  // ... rest of the configuration.
  output: "standalone",
};
```

This will build the project as a standalone app inside the Docker image.
