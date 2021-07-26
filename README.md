# reCAPTCHA v3 with Next.js

This repository shows how to implement reCAPTCHA v3 with Next.js without using a library. More details on the implementation can be found in the article [reCAPTCHA v3 with Next.js](http://www.kpadenou.net/blogs/post/recaptcha_v3_with_nextjs). 

## Getting Started

First, clone this repository:

```bash
git clone https://github.com/kokou2kpadenou/recaptcha3-nextjs.git
```

After cloning, go to the project directory and install the packages:

```bash
npm install
or 
yarn install
```

Second, create the .env.local file in the project root directory. You will need to [sign up](https://www.google.com/recaptcha/admin) for an API key pair for the project. Use the following template to complete the .env.local file.

```env
NEXT_PUBLIC_RECAPTCHA_SITEKEY=<replace-with-your-site-key>
RECAPTCHA_SECRETKEY=<replace-with-your-secret-key>
```

Third, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
