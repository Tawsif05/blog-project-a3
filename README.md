## Setup Instructions

Follow the steps below to set up the Blog Management project on your local machine:

### 1. Clone the Repository
Clone the project from GitHub to your local system using the following command:
```bash
git clone https://github.com/your-username/blog-project-a3.git
cd blog-project-a3
```

### 2. Install Dependencies
Run the following command to install all required dependencies:
```bash
npm install
```

### 3. Set Environment Variables
Create a `.env` file in the root directory of the project and add the following configuration:

```env

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/book-shop?retryWrites=true&w=majority

```
Replace `<username>` and `<password>` with your MongoDB credentials.


### 4. Start the Application
Use the command below to start the application in development mode:

```bash
npm run dev
```
The server will run at `http://localhost:5000` by default.

### 5. Test the API

- Use **Postman** or any API testing tool to interact with the API endpoints.
- Alternatively, you can use a browser to test GET endpoints.

## Available Script
- `npm run dev`: Starts the server in development mode with live reloading.
- `npm run build`: Builds the application for production.
- `npm start`: Runs the compiled production build.

## Requirements
Make sure the following software/tools are installed on your system:

- **Node.js**: Version 16 or higher.
- **npm**: Comes with Node.js.
- **MongoDB**: Either a local instance or a cloud instance (e.g., MongoDB Atlas).

## Live Link

- Deployed at: https://book-store-a2.vercel.app/

## Video Explanation

- Watch the explanation: https://drive.google.com/file/d/1cemgRNTeE-W6cfKlHNelWv0pl-y2FJEd/view?usp=sharing
