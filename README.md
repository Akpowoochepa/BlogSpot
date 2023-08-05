# BlogSpot
# BlogSpot Platform

BlogSpot is a simple and intuitive blogging platform that enables users to create, update, and delete blog posts. Users can also register and log in to personalize their blogging experience.

## Features

- **User Authentication**: Secure login and registration functionality.
- **Blog Management**: Create, update, and delete personal blogs.
- **Responsive Design**: A seamless experience across different devices using Bootstrap.
- **Docker Integration**: Containerized application for easy deployment.

## Technologies Used

- Frontend: React.js, Bootstrap
- Backend: Node.js, Express.js
- Database: MySQL
- Other: Docker, bcryptjs, Passport.js

## Installation

1. **Clone the Repository**: `git clone <repository_url>`
2. **Navigate to Directory**: `cd blogspot`
3. **Install Dependencies**: `npm install`
4. **Set Up Environment Variables**: Configure `.env` file with database credentials and other settings.
5. **Build and Run the Docker Container**: `docker-compose up`
6. **Access the App**: Open `http://localhost:port` in your browser.

### Note on Node Modules and Database Code

- **Node Modules**: The node module packages have been removed from the repository due to their large size. Please run `npm install` to reinstall the necessary dependencies.
- **Database Code**: For safety reasons, the database connection code has been omitted from this repository. Please refer to the provided `SqlConfig.js.template` file and add your own database connection details.

## Usage

- **Register**: Create a new user account.
- **Login**: Access your personal blog dashboard.
- **Create Blog**: Click the "New Post" button to start writing.
- **Edit/Delete**: Manage your existing blog posts.

## Web-application Demo
Link - https://www.youtube.com/watch?v=Iy1ut6TcAM0

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

Special thanks to Professor Scott for the guidance and inspiration for this project.
