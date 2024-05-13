## Getting Started

Follow these steps to set up and run ScreenSphere locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/Megane0103/screensphere.git
   ```

2. Navigate to the project directory:

   ```bash
   cd screensphere
   ```

3. Install backend dependencies:

   ```bash
   cd backend
   ```

   ```bash
   cp .env.example .env
   ```

   ```bash
   composer install
   ```

   ```bash
   php artisan key:generate
   ```

   
4. Set up the database:

   ```bash
   php artisan migrate
   ```

5. Install frontend dependencies:

   ```bash
   cd frontend
   ```

   ```bash
   npm install
   ```

6. Build the frontend assets:

   ```bash
   npm start
   ```

7. Start the development server:

   ```bash
   php artisan serve
   ```

   The application will be accessible at `http://localhost:8000`.


## License

This project is licensed under the [MIT License](LICENSE.md).

