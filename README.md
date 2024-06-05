# Plant Pots Shop

## Project Overview

The Plant Pots Shop project is a web-based application developed using .NET Core with REST API technology. This application provides a platform for managing and selling plant pots with a focus on security, scalability, and efficient data handling.

## Features

- **Security**: 
  - Password strength validation using zxcvbn.
  - HTTPS protocol for secure communication.
  
- **Architecture**:
  - The project is organized into three layers: Presentation, Business Logic, and Data Access.
  - Dependency Injection (DI) is used for better modularity and testability.
  
- **Database**:
  - Uses Entity Framework Core (EF Core) as the Object-Relational Mapper (ORM).
  - Database migrations handled via `Add-Migration` and `Update-Database` commands.
  
- **Scalability**:
  - All functions are implemented using async-await to support asynchronous processing.
  
- **Data Handling**:
  - Data Transfer Objects (DTOs) are carefully designed to avoid circular dependencies and minimize conversion overheads using AutoMapper.
  - Connection strings are stored in `appsettings.json`, but for security, they should be moved to user secrets or environment variables.
  
- **Error Handling**:
  - Errors are properly handled and logged.
  - Real-time email notifications are sent to the manager in case of errors.
  
- **Monitoring**:
  - Traffic is recorded in a rating table for monitoring purposes.
  
- **Testing**:
  - Comprehensive integration tests and unit tests are written to ensure the reliability of the application.

## Getting Started

### Prerequisites

- .NET Core SDK
- SQL Server or any other compatible database

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd plant-pots-shop
2. **Setup the Database**:

- **Update the connection string in `appsettings.json`.**

- **Apply migrations**:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
