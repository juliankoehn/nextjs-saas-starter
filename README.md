# Next.js SaaS Prisma PostgreSQL Auth Starter

This project aims to create a metered billing SaaS utilizing Next.js, Prisma, PostgreSQL, and Stripe.

> :warning: **it's still a work in progress.**

## Features

- NextJS 14 `/app` dir
- Pricing using [**Tier**](https://www.tier.run/) and [**Stripe**](https://stripe.com/)
  - Pricing model using Tier Model Builder
  - Subscriptions and Checkout
- Authentication using [**Lucia Auth**](https://lucia-auth.com/)
- ORM using [**Prisma**](https://www.prisma.io/)
- [tailwindcss](https://tailwindcss.com/) and [shadcn](https://ui.shadcn.com/) for styling and UI

## Running Locally

First, run the development server:

```
npm i 
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

License under the [MIT License](LICENSE).

## Features

- [x] **Authentication**
  - [x] Registration
  - [x] Forgot Password
  - [x] Change Password
  - [x] Email Verification
  - [x] Login
  - [x] Logout
- [x] **Account**
  - [x] Change Username / Name
  - [x] Change Password
  - [x] Change Email
    - [x] Confirm Email
  - [x] Change Timezone
  - [x] Change Language
  - [ ] Change Appearance
  - [ ] Delete Account restrict when Owner of Projects
- [ ] **Projects**
  - [x] Create
  - [x] Change Name
  - [x] Delete Project
    - [ ] Restrict Delete to Owner
  - [ ] **Members**
    - [x] Add
      - [x] Create Invitation
        - [ ] Send Email
      - [x] Accept Invitation
      - [x] Remove Invitation
    - [x] Remove
      - [ ] Self-remove only if not Owner
    - [ ] Change Role
- [ ] **Billing**

## Tech Stack

- Next.js 14
- Prisma
- Tier.run
- Stripe
- tailwindcss
- shadcn
- lucide-icons
- lucia-auth
- React-Email
  
## Docker Compose

using mailpit for local email development.

## Development

### Emails

> :warning: docs section is WIP