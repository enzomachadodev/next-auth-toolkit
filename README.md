# **🌟 Auth Manager - Authentication Toolkit with Next.js and Auth.js**

![Project Image](https://github.com/enzomachado/PROJECT_NAME/blob/main/public/thumbnail.png)

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. 🛠️ [Tech Stack](#tech-stack)
3. ✨ [Features](#features)
4. 🚀 [Getting Started](#getting-started)
5. 👋 [Let’s Connect!](#lets-connect)

## <a name="introduction">🤖 Introduction</a>

This project is a Authentication Toolkit built with Next.js and Auth.js (NextAuth v5). It showcases features such as Two Factor Authentication (2FA), Forgot Password functionality, Email Verification functionality, Credential Login, OAuth (Google & Github) Login and much more.

## <a name="tech-stack">🛠 Tech Stack</a>

- React 19
- Next.js 15
- TailwindCSS
- Next Auth (Auth.js)
- PostgreSQL
- TypeScript
- Shadcn

## <a name="features">✨ Features</a>

👉 **NextAuth v5 (Auth.js)**: Integrates the latest version of NextAuth to manage authentication efficiently.

👉 **Next.js 15 with Server Actions**: Built on Next.js 15, utilizing server actions to ensure a seamless and optimized user experience.

👉 **Credentials Provider**: Supports Credential-based Login for secure authentication using email and password.

👉 **OAuth Provider**: Seamless social login integration with Google and GitHub, providing users with a fast and secure way to sign in.

👉 **Forgot Password Functionality**: Allows users to reset their passwords via email.

👉 **Email Verification**: Implements email-based verification to enhance account security and validate user authenticity.

👉 **Two-Factor Verification (2FA)**: Supports 2FA for an added layer of security.

👉 **User Roles (Admin & User)**: Enables role-based access control.

👉 **Login Component**: Customizable login component that supports both modal and redirect-based authentication workflows.

and many more, including features alongside code architecture and
reusability

## <a name="quick-start">🚀 Getting Started</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/).
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Docker](https://www.docker.com/) (optional, for containerized setup).

**Cloning the Repository**

```bash
git clone https://github.com/enzomachadodev/auth-manager.git

cd auth-manager
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Database with Docker Compose**

At the root of the project, there is a `docker-compose.yml` file with the configuration for a PostgreSQL database.

If you don't have Docker installed, you can find it here Get Docker.

To start the container:

```bash
docker compose up -d
```

To end the service:

```bash
docker compose down postgres
```

**Set Up Environment Variables**

Create a new file called `.env` in the root of your project and add the contents as in `.env.example`

Replace the placeholder values with your actual Google, GitHub, and Resend credentials. You'll need to sign up for [Resend](https://resend.com) and create an API key for email sending, including user verification, two-factor authentication, and password changes.

**Database Tables**

To create database tables, you can run Prisma commands.

```bash
npx prisma db push
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="lets-connect">👋 Let’s Connect!</a>

- [enzomachado.dev](https://enzomachado.dev)
- [LinkedIn](https://linkedin.com/in/enzomachadodev)
- [GitHub](https://github.com/enzomachadodev)
- [Twitter](https://x.com/enzofmachado)
