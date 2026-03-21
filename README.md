# Thai NLEM Drug Search Web App

A simple and fast web application for searching drug information from Thailand's National List of Essential Medicines (NLEM). This project provides a user-friendly frontend interface for the [thai-nlem-api](https://github.com/pharmacist-sabot/thai-nlem-api).

## Features

- **Live Search**: Instantly search for drugs by their generic name.
- **Debounced Input**: API requests are debounced to ensure efficient network usage and a smooth user experience.
- **Detailed Information**: Displays the drug's generic name, available dosage forms, and its NLEM account level (e.g., บัญชี ก, ข, ค).
- **Clear UI States**: Provides distinct visual feedback for loading, error, and "no results found" states.

## Technology Stack

- **Framework**: [Vue 3](https://vuejs.org/) (using Composition API with `<script setup>`)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS with CSS Custom Properties

## Backend API

This web application is a client for the `thai-nlem-api`. It consumes the public API endpoint hosted on Render.

- **API Base URL**: `https://thai-nlem-api.onrender.com/`
- **Search Endpoint**: `/api/drugs/search?q={query}`

For more details about the API, please visit its repository.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18.x or newer recommended) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation & Local Development

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/pharmacist-sabot/thai-nlem-webapp.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd thai-nlem-webapp
    ```

3.  **Install the dependencies:**

    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server. You can now open your browser and visit `http://localhost:5173` (or the URL shown in your terminal) to see the application in action.

## Building for Production

To create a production-ready build of the application, run the following command:

```bash
npm run build
```

This command will compile and minify the application's assets. The output will be placed in the `dist/` directory, which can then be deployed to any static hosting service.

## Project Structure

The project follows a standard Vite + Vue project structure:

```
.
├── public/               # Static assets that are copied directly
├── src/
│   ├── assets/           # Static assets processed by Vite
│   ├── components/       # Reusable Vue components
│   │   ├── AppSpinner.vue
│   │   ├── DrugCard.vue
│   │   ├── SearchInput.vue
│   │   └── TheHeader.vue
│   ├── App.vue           # Main application component
│   ├── main.ts           # Application entry point
│   └── style.css         # Global styles
├── index.html            # Main HTML file
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript compiler configuration
└── vite.config.ts        # Vite configuration
```

## Contributing

Contributions are welcome! If you have suggestions for improvement or find any bugs, please feel free to open an issue or submit a pull request.

## License

This project is open source.
