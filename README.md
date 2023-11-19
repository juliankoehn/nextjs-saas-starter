# Next.js SaaS Prisma PostgreSQL Auth Starter

This project aims to create a metered billing SaaS utilizing Next.js, Prisma, PostgreSQL, and Stripe.

> :warning: **it's still a work in progress.**

## Features

- [x] **Authentication**
  - [x] Registration
  - [x] Forgot Password
  - [x] Change Password
  - [x] Email Verification
  - [x] Login
  - [x] Logout
- [ ] **Account**
  - [ ] Change Username / Name
  - [ ] Change Password
  - [ ] Change Email
    - [ ] Confirm Email
  - [ ] Change Timezone
  - [ ] Change Language
  - [ ] Change Appearance
- [ ] **Projects**
  - [x] Create
  - [x] Change Name
  - [x] Delete Project
    - [ ] Restrict Delete to Owner
  - [ ] **Members**
    - [ ] Add
      - [x] Create Invitation
        - [ ] Send Email
      - [x] Accept Invitation
      - [x] Remove Invitation
    - [x] Remove
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