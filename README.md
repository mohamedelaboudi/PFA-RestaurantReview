# Restaurant Ranking Website

Welcome to the Restaurant Ranking Website project! This application helps users find the best restaurants based on various criteria and user reviews, ensuring an optimal dining experience.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Project Structure](#project-structure)

## Features

- *Restaurant Rankings*: Users can view and rank restaurants based on multiple criteria.
- *User Reviews*: Users can leave reviews and ratings for restaurants they have visited.
- *Search and Filter*: Search for restaurants by name, cuisine, location, and other filters.
- *Responsive Design*: Optimized for both desktop and mobile devices.
- *User Authentication*: Secure login and registration for users to manage their profiles and reviews.

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [ASP.NET Core](https://dotnet.microsoft.com/apps/aspnet)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
 Clone the repository:
   ```bash
   git clone https://github.com/mohamedelaboudi/PFA-RestaurantReview.git
   cd PFA-RestaurantReview

### Backend Setup


1. Update the appsettings.json with your SQL Server connection string.
   
2.  migrtion
   dotnet ef migrations add initialcreate 

4. Restore the dependencies:
    dotnet restore
 
6. Run the application:
    dotnet run

   
 ### admin Setup (for adding Restaurants)

1.navigate to the frontend project folder:
  cd ../UI
  
2.Install the dependencies:
   npm install
   
3.Start the React application:
  npm run dev  

### User Interface Setup

1.navigate to the frontend project folder:
  cd ../UI
  
2.Install the dependencies:
   npm install
   
3.Start the React application:
  npm run dev   


 ### Usage
Open your browser and navigate to http://localhost:3000.
Register a new account or log in with your existing credentials.
Search for restaurants, read reviews, and submit your own ratings.

 ### Technologies
Frontend: React JS , Tailwind css
Backend: ASP.NET Core API, Entity Framework Core
Database: SQL Server
API Documentation: Postman

 ### Project Structure
restaurant-ranking/
- backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── Data/
│   └── appsettings.json
- frontend/
  ├── UI/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.js
│   │   └── index.js
 ├── admin/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.js
│   │   └── index.js
└── README.md  

Contact
If you have any questions, feel free to contact us at [mohamedelaboudi@gmail.com].
