# Xamen Generator

[Live Demo / Repository](https://github.com/RafaelElebiyo/Xamen_Generator)  

**Xamen Generator** is a full-stack web application for managing online exams. It allows teachers to create exams, students to take them online, and both parties to view grades in real-time. Teachers can share exam links via clipboard or social media.  

## Features

- **Exam Management**: Teachers can create, edit, and delete exams.  
- **Online Exam Solving**: Students can solve exams directly in the browser.  
- **Real-Time Grades**: Both students and teachers can view the grades immediately after submission.  
- **Link Sharing**: Teachers can copy exam links or share via social networks.  
- **Responsive Design**: Built with **Bootstrap** and enhanced with **Font Awesome** icons.  
- **Secure Backend**: Uses **Spring Security** for authentication and authorization.  
- **Database Management**: **Spring Data JPA** with **MySQL**.  

## Tech Stack

- **Frontend**: Angular, Bootstrap, Font Awesome  
- **Backend**: Spring Boot, Spring Data JPA, Spring Security, Spring Web, Lombok, Spring Boot DevTools  
- **Database**: MySQL  

## Requirements

- Node.js >= 16  
- Angular CLI >= 16  
- Java 17+  
- Maven  
- MySQL / MariaDB  

## Installation

### Backend (Spring Boot)

1. Clone the repository:

```bash
git clone https://github.com/RafaelElebiyo/Xamen_Generator.git
cd Xamen_Generator/backend
```
Configure your MySQL database in application.properties:
```
spring.datasource.url=jdbc:mysql://localhost:3306/xamen_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

Build and run the backend:
```
mvn clean install
mvn spring-boot:run
Frontend (Angular)
```
Navigate to the frontend folder:
```
cd ../frontend
```
Install dependencies:
`
npm install
`
Run the Angular app:
``
ng serve
``
Open your browser at http://localhost:4200.

Usage
Teachers can create exams, add questions, and generate shareable links.

Students access the link to complete the exam online.

Both teachers and students can view the grades immediately after submission.

Contributing
Contributions are welcome! You can:

Improve the frontend UI/UX.

Add new features like analytics or exam timers.

Enhance backend security or performance.
