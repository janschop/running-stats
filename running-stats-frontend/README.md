## Frontend README (running-stats-frontend/README.md)

# Running Stats Frontend

This is the frontend for the Running Stats project, built with React and TypeScript. It consumes the ASP.NET Core API to display running activity data in various views (e.g., a list of activities and graphs).

## Features

- **Responsive UI:** Built with Create React App and TypeScript.
- **Data Visualization:** Uses Recharts to display graphs (e.g., running distance and training load over time).
- **API Integration:** Fetches data from the backend API with Axios.
- **Environment Configuration:** Easily configurable API base URLs via environment variables.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository (or ensure you have the project locally).
2. Navigate to the frontend folder:

   ```bash
   cd running-stats-frontend
```

3. Install dependencies:
    
    ```bash
    npm install
    ```
    

### Configuration

- Create a `.env` file in the project root to set your API base URL (if different from the default):
    
    ```env
    REACT_APP_API_BASE_URL=http://localhost:5231
    ```
    

### Running the App

Start the development server:

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000/).

### Build

To create a production build:

```bash
npm run build
```

## Folder Structure

- **src/components:** Contains reusable UI components (e.g., `ActivitiesList.tsx`, `ActivitiesGraph.tsx`).
- **src/services:** Contains API service code (`api.ts`) for making HTTP requests.
- **src/interfaces:** Contains TypeScript interfaces (e.g., `Activity.ts`, `GraphData.ts`).

