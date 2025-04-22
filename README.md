# Personal Website

This is the source code for my personal website, built using [Astro](https://astro.build/).

## Development Setup

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

    _Note: This project uses Node.js. Make sure you have a compatible version installed._

3.  **Environment Variables:**
    Copy the example environment file `.env.local.example` to `.env.local`:

    ```bash
    cp .env.local.example .env.local
    ```

    Then, fill in the required values in `.env.local`. These variables are necessary for features like the contact form and analytics during local development.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This command starts the local development server. Open your browser and navigate to `http://localhost:4321` (or the address shown in the terminal) to see the website.

## Available Scripts

The following scripts are available via `npm run <script_name>`:

| Command     | Action                                                      |
| :---------- | :---------------------------------------------------------- |
| `dev`       | Starts the local development server                         |
| `build`     | Builds the production-ready site to the `./dist/` directory |
| `preview`   | Serves the production build locally for preview             |
| `astro ...` | Executes Astro CLI commands (e.g., `astro check`)           |

## Running Production Build Locally

To test the production build on your local machine:

1.  **Build the site:**

    ```bash
    npm run build
    ```

    This command creates an optimized version of your site in the `./dist/` directory.

2.  **Preview the build:**
    ```bash
    npm run preview
    ```
    This command starts a local server to serve the files from `./dist/`, allowing you to preview the production site before deployment. Open your browser to the address provided in the terminal.
