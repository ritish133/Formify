# Formify

Formify is an intelligent AI-powered form builder that enables users to generate, customize, and share forms effortlessly. By leveraging Gemini AI, Formify creates fully-functional forms from simple descriptions, streamlining the process of collecting and managing data. Users can modify fields, themes, and borders, generate shareable live links, and export responses in Excel format.

## Features

- **AI-Powered Form Generation:** Instantly create forms by describing your requirements—Gemini AI takes care of the rest.
- **Full Customization:** Easily modify form fields, adjust themes, and change form borders for a personalized look.
- **Live Shareable Links:** Generate a live form link that you can share with anyone to collect responses in real time.
- **Response Export:** Download form responses as Excel files for convenient data analysis or record-keeping.
- **User Authentication:** Secure account management and authentication with Clerk.
- **Payments:** Stripe integration for managing subscriptions and unlocking advanced features.
- **Modern UI:** Responsive, intuitive interface built with Next.js and Tailwind CSS.
- **Database:** Built on Neon with Drizzle ORM for scalable, reliable data storage.

## Tech Stack

- **Frontend:** Next.js
- **Styling:** Tailwind CSS
- **Authentication:** Clerk
- **Payments:** Stripe
- **AI Integration:** Gemini AI
- **Database:** Neon
- **ORM:** Drizzle ORM

## Getting Started

### Prerequisites

- Node.js ≥ 16.x
- Yarn or npm

### Installation

```bash
git clone https://github.com/ritish133/Formify.git
cd Formify
npm install
# or
yarn install
```

### Configuration

1. Create a `.env.local` file in the root directory.
2. Add your Clerk, Stripe, Gemini AI, Neon database, and any other required environment variables.
3. Update any relevant URLs or configuration in the project settings.

### Running the App

```bash
npm run dev
# or
yarn dev
```
Visit `http://localhost:3000` in your browser.

## Contributing

Pull requests are welcome! For major changes, please open an issue to discuss what you would like to change.

## License

[MIT](LICENSE)

---

> Built with ❤️ by [Ritish Kumar Singh](https://github.com/ritish133)
