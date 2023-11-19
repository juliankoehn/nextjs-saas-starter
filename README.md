<p align="center">
  <a href="https://nextjs-postgres-auth.vercel.app/">
    <img src="/public/next.svg" height="96">
    <h3 align="center">Next.js SaaS Prisma PostgreSQL Auth Starter</h3>
  </a>
</p>


<p align="center">
This is a <a href="https://nextjs.org/">Next.js</a> starter kit that uses <a href="https://next-auth.js.org/">Lucia</a> for simple email + password login<br/>
<a href="https://www.prisma.io/">Prisma</a> as the ORM.

<br/>


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
  - [x] Passwort vergessen
  - [x] Passwort ändern
  - [x] Email verifizieren
  - [x] Login
  - [x] Logout
- [ ] Account
  - [ ] Change Username / Name
  - [ ] Change Password
  - [ ] Change Email
    - [ ] Confirm Email
  - [ ] Change Timezone
  - [ ] Change Language
  - [ ] Change Appereance
- [ ] Projekte
  - [x] Erstellen
  - [x] Name ändern
  - [x] Project Löschen
    - [ ] Restrict Delete to Owner
  - [ ] Mitglieder
    - [ ] Hinzufügen
      - [x] Create Invitation
        - [ ] Send Email
      - [x] Accept Invitation
      - [x] Remove Invitation
    - [x] Entfernen
    - [ ] Change Role
- [ ] Billing

### Tech Stack

- tailwindcss
- shadcn
- lucide-icons
- lucia-auth
- prisma
- tier.run