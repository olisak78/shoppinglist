## Shoplist Frontend
This is a React frontend for a shopping list application, interacting with a .NET 8 backend (shoplistbackend) for categories and products and a Node.js backend (orderbackend) for order submission. It uses Redux for state management.

### Prerequisites

- Node.js 18+: Install from https://nodejs.org.
- Git: Install from https://git-scm.com/download/win.
- Visual Studio Code (optional): For editing and running the project.
- Backend APIs:
  shoplistbackend running at http://localhost:5000.
  orderbackend running at http://localhost:3001.



### Installation

#### Clone the Repository:
```
git clone https://github.com/your-username/frontend.git
cd frontend
```

#### Install Dependencies:
```
npm install
```

### Running the Application

#### Start the Frontend:
```
npm start
```

The app runs at http://localhost:3000.

#### Test the Application:

- Open http://localhost:3000 in a browser.
- Add items to the shopping list from categories (e.g., Fruits, Vegetables).
- Proceed to the order form, fill it out, and submit to verify order submission.
- Success messages appear as green alerts; errors as red alerts.


### Project Structure

- src/components/ShoppingList.tsx: Main shopping list interface for adding items.
- src/components/OrderForm.tsx: Form for submitting orders with Redux integration.
- src/app/store.ts: Redux store configuration.
- src/app/shoppingListSlice.ts: Redux slice for managing the shopping list.
- src/main.css: Styles for the application.
- src/app/data.ts: Placeholder for category/product data (fetched from backend).

### Notes

- The .gitignore file excludes node_modules/, build/, and .env files.
- Ensure both backends (shoplistbackend, orderbackend) are running before starting the frontend.
- The app fetches categories from http://localhost:5000/api/categories and submits orders to http://localhost:3001/api/orders.
