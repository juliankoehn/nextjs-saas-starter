<p align="center">
  <a href="https://nextjs-postgres-auth.vercel.app/">
    <img src="/public/next.svg" height="96">
    <h3 align="center">Next.js SaaS Prisma PostgreSQL Auth Starter</h3>
  </a>
</p>


<p align="center">
This is a <a href="https://nextjs.org/">Next.js</a> starter kit that uses <a href="https://next-auth.js.org/">Lucia</a> for simple email + password login<br/>
<a href="https://www.prisma.io/">Prisma</a> as the ORM, and a <a href="https://vercel.com/postgres">Prisma</a> database to persist the data.</p>

<br/>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# Tech Stack

- Next.js 14
- Prisma
- Tier.run
- Stripe

## Ziele

### Pricing with Tier https://model.tier.run/edit/clozrz5t2bi90o972kzpmj68v

Was soll das Boilerplate können?

Ziel ist ein metered billing SaaS mit Next.js, Prisma, PostgreSQL und Stripe.

- [x] Authentifizierung
  - [x] Registrierung
  - [ ] Passwort vergessen
  - [ ] Passwort ändern
  - [ ] Email ändern
  - [ ] Email bestätigen
  - [ ] Email verifizieren
  - [x] Login
  - [x] Logout
- [ ] Projekte
  - [x] Erstellen
  - [ ] Name ändern
  - [ ] Mitglieder
    - [ ] Hinzufügen
    - [ ] Entfernen
    - [ ] Einladung Annehmen
- [ ] Billing