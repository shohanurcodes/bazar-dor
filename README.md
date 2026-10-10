# 🛒 Bazar Dor — বাজার দর

Bazar Dor is a responsive web application built with Next.js that helps users explore products, compare market prices, browse product categories, and manage their accounts through a secure authentication system.

## ✨ Features

- **Responsive Design:** Optimized for mobile, tablet, and desktop devices.
- **Dynamic Homepage:** Displays rising-price products, falling-price products, and all available products.
- **Product Categories:** Browse products by category with dynamic category routes.
- **Product Details:** View detailed product information on individual product pages.
- **Sorting:** Sort products to make browsing easier.
- **Authentication:** Sign up and sign in using email and password.
- **Social Login:** Sign in using Google and GitHub.
- **Protected Routes:** Restrict access to protected product pages when users are not authenticated.
- **User Profile:** View and update profile information.
- **Toast Notifications:** Display feedback for important user actions.
- **Loading States:** Show loading skeletons while data is being fetched.
- **Empty and Error States:** Handle empty results and unavailable data gracefully.
- **Custom 404 Page:** Display a friendly page when a route is not found.
- **Dynamic Routing:** Support product and category routes, including direct URL access and page refreshes.

## 🛠️ Technologies Used

- **Next.js** — React framework with App Router
- **React** — User interface development
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Styling and responsive layouts
- **HeroUI** — UI components
- **Better Auth** — Authentication and session management
- **MongoDB Atlas** — Database
- **Sonner** — Toast notifications
- **Vercel** — Deployment

## 🌐 API

The application uses the Bazar Dor API to retrieve product and category data.

**Base API URL:**

`https://api.api-store.workers.dev/api/bazardor`

### Available endpoints

| Endpoint                  | Description                            |
| ------------------------- | -------------------------------------- |
| `/products`               | Retrieve products                      |
| `/products?category=chal` | Retrieve products filtered by category |
| `/products/1`             | Retrieve a product by ID               |
| `/categories`             | Retrieve available categories          |
| `/categories/chal`        | Retrieve a category by slug            |

> API responses and available product data depend on the API provider.

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/shohanurcodes/bazar-dor
```

### 2. Navigate to the project folder

```bash
cd bazar-dor
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root and configure the environment variables required by the application.

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret
MONGODB_URI=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Replace the example values with your own credentials. Never commit `.env.local` or expose private keys in a public repository.

Configure the Google and GitHub OAuth callback URLs for your local environment and deployed domain.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Create a production build

```bash
npm run build
```

To run the production build locally:

```bash
npm start
```

## 📁 Main Application Routes

| Route              | Purpose                              |
| ------------------ | ------------------------------------ |
| `/`                | Homepage and product sections        |
| `/category/[slug]` | Category-specific products           |
| `/product/[slug]`  | Product details and protected access |
| `/signin`          | User sign-in                         |
| `/signup`          | User registration                    |
| `/profile`         | User profile management              |

*Actual routes may depend on the route structure implemented in the project.*

## 🔐 Authentication

Bazar Dor uses Better Auth for authentication and session management.

Supported authentication methods:

- Email and password
- Google OAuth
- GitHub OAuth

Protected pages require an authenticated session. Users can also manage their profile through the profile page.

## 📱 Responsive Design

The interface is designed to provide a consistent browsing experience across different screen sizes, including mobile phones, tablets, and desktop computers.

## 🚢 Deployment

The application can be deployed on Vercel.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables in Vercel project settings.
4. Set the production authentication URL and OAuth callback URLs.
5. Deploy the application.
6. Test authentication, product pages, category pages, and page refreshes on the deployed website.

## 👨‍💻 Author

**Developer:** Sohanur Rahman

**Project:** Bazar Dor&#x20;

