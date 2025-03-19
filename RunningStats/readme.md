# Running Stats Backend

This is the ASP.NET Core backend API for the Running Stats project. It provides a RESTful API to manage and retrieve running activity data stored in a SQLite database.

## Features

- **RESTful API:** Exposes endpoints to retrieve activity data.
- **Data Access:** Uses Entity Framework Core for database interactions.
- **SQLite Database:** Lightweight database for easy setup and testing.
- **CORS Enabled:** Configured to allow requests from the frontend.
- **Testing:** Unit tests and integration tests ensure API quality.

## Getting Started

### Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download) (preferably .NET 9)
- SQLite (if you wish to inspect the database manually)

### Installation

1. Clone the repository (or navigate to the project folder).
2. Navigate to the backend folder:

    ```bash
    cd RunningStats
    ````

3. Restore dependencies:
    
    ```bash
    dotnet restore
    ```
    

### Configuration

- **appsettings.json:**  
    Configure your database connection string and other settings in `appsettings.json`.
    
- **CORS:**  
    The API is configured to allow requests from `http://localhost:3000`. Modify the CORS policy in `Program.cs` if needed.
    

### Running the API

Start the API:

```bash
dotnet run
```

By default, the API listens on `http://localhost:5231` (or as configured in your launch settings).

### API Endpoints

- **GET /api/activities**  
    Retrieves all activities.
- **GET /api/activities/bySport?sport=running**  
    Retrieves activities filtered by sport.

### Testing

The project includes unit tests and integration tests.

- **Unit Tests:** Located in the `RunningStats.Tests` project.
- **Integration Tests:** Located in the `RunningStats.IntegrationTests` project.

Run tests with:

```bash
dotnet test
```

### Project Structure

- **Controllers:** API controllers that expose endpoints.
- **Data:** Contains `RunningStatsContext.cs`, the EF Core database context.
- **Models:** Contains entity classes such as `Activity.cs`.
- **Program.cs:** Configures the application, including middleware, services, and routing.