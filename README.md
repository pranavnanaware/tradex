# Trade X

This project is a **stock trading application** built using Next.js. It provides functionalities to view stock tickers, buy and sell stocks, and manage a portfolio. The project integrates several UI libraries for building a dynamic and responsive interface, along with essential packages for authentication, state management, and more.

**Important:**

If you encounter any issues with **CORS** or **cookies**, particularly when using Safari or Incognito mode, please switch to **Google Chrome** for a smoother experience. Safari/Incognito modes may have restrictions that can cause issues with CORS or cookie handling in this application.

## Features

- **Stock Trading**: Query specific stock tickers, buy and sell stocks, and view a portfolio.
- **Responsive UI**: Built with Tailwind CSS and ShadCN UI components for a modern and responsive user interface.
- **Theming**: Support for light and dark themes using `next-themes`.
- **State Management**: Utilizes `@tanstack/react-query` for server-side data fetching and caching.
- **Charts**: Integrated with Recharts to visualize stock data.

## Tech Stack

- **Next.js**: Framework for building the frontend, with server-side rendering and API routes.
- **React**: Frontend library for building user interfaces.
- **ShadCN UI**: A set of accessible, unstyled components used for the dialog, popover, select, and more.
- **Tanstack React Query**: For server-side state management and caching.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TypeScript**: Strongly typed JavaScript for better code quality and maintainability.
- **SQLAlchemy + TimescaleDB**: Backend for managing stocks, portfolios, and transactions (used in the Flask API).
- **Recharts**: Library for building charts and visualizing stock performance.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/pranavnanaware/tradex.git
   cd stock
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Build for production:

   ```bash
   npm run build
   ```

5. Lint the project:
   ```bash
   npm run lint
   ```

## Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the project for production.
- **`npm run start`**: Starts the production build.
- **`npm run lint`**: Lints the project for potential issues.

## Dependencies

- **@radix-ui/react-dialog**: Accessible dialog component.
- **@radix-ui/react-icons**: Icon set for the application.
- **@tanstack/react-query**: Manages fetching, caching, and syncing server data.
- **next**: Framework for server-side rendering, API routes, and static site generation.
- **tailwindcss**: Utility-first CSS framework for styling.
- **typescript**: Strongly typed JavaScript for building better code.
- **jsonwebtoken**: Library for user authentication using JWT tokens.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute the code.

---

If you encounter any issues or have suggestions for improvements, please open an issue in the repository.
