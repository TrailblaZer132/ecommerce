# Setup Steps:

1.  npm create vite@latest frontend -- --template react -y
2.  cd frontend
3.  npm install
4.  cd ..
5.  npm init -y
6.  npm i nodemon multer mongoose jsonwebtoken express-formidable express-async-handler express dotenv cors cookie-parser concurrently bcrypt
7.  cd frontend
8.  npm i slick-carousel react-s
    lick react-toastify react-router react-router-dom react
    -redux react-icons apexcharts react-apexcharts moment f
    lowbite axios @reduxjs/toolkit @paypal/react-paypal-js
9.  In the package.json file, add the following scripts:

    ```json

    "scripts": {
    "backend": "nodemon backend/index.js",
    "frontend": "npm run dev --prefix frontend",
    "dev": "concurrently \"npm run frontend\" \"npm run backend\""
    },

    ```

10. Create a folder named backend in the root directory.
11. Create a file named index.js in the backend folder.
12. Create following folders in the backend folder:

    - config
    - controllers
    - utils
    - middlewares
    - models
    - routes

# Cleanup steps:

1. Remove the following files:

   - frontend/src/assets
   - frontend/src/app.css
   - frontend/src/index.css
   - navigate to frontend/src/App.jsx and Ctrl + A, Delete and the paste this:

   ```jsx
   function App() {
     return <>Hello</>;
   }
   export default App;
   ```

2. Remove the following code from frontend/src/main.jsx:

```jsx
import "./index.css";
```

# Further steps:

1. Create a file named db.js in the config folder.
2. Work in the db.js file to connect to the database(mongoose).
3. Make a file named .env in the root directory.
4. ## Make sure that MongoDB is running and accessible on your local machine.
5. Using postman, test the connection to the database:
   - Open the app
   - Navigate to Create New Collection and select add request
   - Enter the url http://localhost:5000/
   - Hit send and check the response

# Tailwind CSS setup:

1. In the terminal, run the following command:

   ```bash

     cd frontend
     npm install -D tailwindcss postcss autoprefixer
     npx tailwindcss init -p

   ```

2. In the tailwind.config.js file, add the following code:

   ```js
   /** @type {import('tailwindcss').Config} \*/
   export default {
     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

3. Create index.css in src folder. In the index.css file, add the following code:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. In main.jsx file add the import:

   ```jsx
   import "./index.css";
   ```

5. Change the App.js file to App.jsx and add the following code:

   ```jsx
   function App() {
     return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
   }

   export default App;
   ```

6. Check the working of tailwindcss by running the following command:

   ```bash

   npm run frontend

   ```
