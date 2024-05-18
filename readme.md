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

# Running the project:

Run the following command in the terminal to start the frontend and backend servers concurrently:

```bash

npm run dev

```

or to run the backend server only:

```bash

npm run backend

```

or to run the frontend server only:

```bash

npm run frontend

```

# Installing translations:

1. In the terminal, run the following command:

   ```bash

   npm install i18next react-i18next
   npm install i18next-http-backend

   ```

   2. Create a folder named locales in the src folder.
   3. Create a file named en.json in the locales folder.
   4. Add the following code in the en.json file:

   ```json
   {
     "translation": {
       "hello": "Hello world!"
     }
   }
   ```

   5. Create a file named i18n.js in the src folder.
   6. Add the following code in the i18n.js file:

   ```js
   import i18n from "i18next";
   import { initReactI18next } from "react-i18next";
   import HttpApi from "i18next-http-backend";

   i18n
     .use(HttpApi)
     .use(initReactI18next)
     .init({
       fallbackLng: "en",
       debug: true,
       interpolation: {
         escapeValue: false, // React already does escaping
       },
       backend: {
         loadPath: "/src/locales/{{lng}}/translation.json",
       },
       react: {
         useSuspense: false,
       },
     });

   export default i18n;
   ```

2. In the main.jsx file, add the following code:

   ```jsx
   import i18n from "./i18n";
   ```

3. In the App.jsx file, add the following code:

   ```jsx
   import { Outlet } from "react-router-dom";
   import Navigation from "./pages/Auth/Navigation";
   import { ToastContainer } from "react-toastify";
   import "react-toastify/dist/ReactToastify.css";
   import { useTranslation } from "react-i18next";
   import LanguageDropdown from "./components/LanguageDropdown";
   import "./i18n";

   const App = () => {
     const { t } = useTranslation();
     return (
       <>
         <ToastContainer />
         <Navigation />
         <main className="py-3">
           <Outlet />

           <center>
             <LanguageDropdown />
             <div>
               <h1>{t("welcomeMessage")}</h1>
               <h2>{t("greeting")}</h2>
             </div>
           </center>
         </main>
       </>
     );
   };

   export default App;
   ```

4. In the LanguageDropdown.jsx file, add the following code:

   ```jsx
   import { useTranslation } from "react-i18next";

   const LanguageDropdown = () => {
     const { i18n } = useTranslation();

     const changeLanguage = (event) => {
       i18n.changeLanguage(event.target.value);
     };

     return (
       <select onChange={changeLanguage}>
         <option value="en">English</option>
         <option value="hi">Hindi</option>
         {/* Add more options for other languages */}
       </select>
     );
   };

   export default LanguageDropdown;
   ```

