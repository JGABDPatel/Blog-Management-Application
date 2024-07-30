# Blog App

This is a Blog Application built with Angular, .NET Core, and Bootstrap. It supports basic CRUD operations for blog posts with server-side pagination, filtering, and toastr notifications for user feedback.

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [Angular CLI](https://angular.io/cli) (version 13.x or later)
- [.NET Core SDK](https://dotnet.microsoft.com/download) (version 5.x or later)

### Backend (.NET Core)     
     Build solution
     The API will be running on https://localhost:6123 

### Frontend (Angular)     
    Navigate to the BlogApp directory and open the VS code 
    Install Dependencies: npm install
    Run the application: ng serve
    Open in Browser: Open your browser and navigate to http://localhost:4200.  

## Design and Application Structure

### API Endpoints
    GET /api/blogposts: Get all blog posts with pagination and filtering.
    POST /api/blogposts: Create a new blog post.
    PUT /api/blogposts/{id}: Update an existing blog post.
    DELETE /api/blogposts/{id}: Delete a blog post by ID.

### Frontend
    Components: Modular and reusable UI components.
    Services: Handle HTTP requests and interact with the backend API.
    State Management: Managed using RxJS for reactive programming.
    Form Handling: Utilized Angular Reactive Forms for robust form management and validation.
    UI: Designed with Bootstrap for a responsive and modern user interface.

### Key Components
    BlogPostsComponent: Displays a list of blog posts in a table with pagination and filtering.
    BlogPostFormComponent: Modal form for creating and editing blog posts.

### State Management
    Used RxJS for managing the state and handling asynchronous operations. The service layer interacts with the backend API and updates the state accordingly.

### Features
    CRUD Operations: Create, Read, Update, and Delete blog posts.
    Server-Side Pagination: Efficiently handles large datasets.
    Filtering: Allows users to search for specific blog posts.
    Toastr Notifications: Provides user feedback for successful and failed operations.

## Current Design Scalability Features

### Server-Side Pagination:
The current design implements server-side pagination, which reduces the amount of data sent to the client. This ensures that the application can handle large datasets efficiently by only loading a subset of data at a time.

### Filtering:
The server-side filtering allows users to search and retrieve only the relevant data, reducing the load on both the server and client. This makes the application responsive and efficient even with a large number of blog posts.

### Repository Pattern:
The use of the repository pattern abstracts the data access layer, making it easier to optimize and scale the data access code. This separation of concerns also facilitates better maintainability and testing.

### Angular Reactive Forms:
The use of Angular Reactive Forms for form handling allows for better performance and scalability as it provides more control over the form data and its validation.

## Potential Scalability Enhancements

## Asynchronous Processing: 
Implement asynchronous processing for heavy tasks that do not require immediate responses. This can be achieved using background processing libraries like Hangfire for .NET Core.

## Output     
![image](https://github.com/user-attachments/assets/73f814a7-49d8-4eb9-9634-c6af390bb597)
![image](https://github.com/user-attachments/assets/dbc99462-bb0f-417b-8643-84dbbb034eb1)


