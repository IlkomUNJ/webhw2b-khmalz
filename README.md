[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/VfW8bnt7)

# WebHw2

Name: Khairul Akmal

NIM: 1313624017

# Quick Commerce

## Getting Started

1.  **Install dependencies:**

    ```bash
    npm install
    // OR
    pnpm install
    ```

2.  **Set up environment variables:**
    Copy the example environment file:

    ```bash
    cp .env.example .env
    ```

3.  **Generate an Application Key:**

    ```bash
    node ace generate:key
    ```

4.  **Run Database Migrations:**

    ```bash
    node ace migration:run
    ```

5.  **Run Database Seeders:**
    ```bash
    node ace db:seed
    ```
    _The default Admin credentials created by the seeder are:_
    - **Email:** `admin@gmail.com`
    - **Password:** `password`

## Running the Application

### Development

```bash
npm run dev
// OR
pnpm dev
```

The application will usually be available at `http://127.0.0.1:3333`.

### Production

To run the application in a production-like environment:

1.  **Build the application:**

    ```bash
    npm run build
    // OR
    pnpm build
    ```

2.  **Start the server:**

    Ensure `.env` file has `NODE_ENV=production`.

    ```bash
    npm run start
    // OR
    pnpm start
    ```
