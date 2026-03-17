# WakhanWiki

WakhanWiki is a full-stack web application that showcases the provinces of Afghanistan.

Users can explore each province, discover what it is known for, including famous people, foods, and culture, and interact through comments.

The application includes authentication, user profiles, and a role-based permission system with two roles: Editor and Writer.

---

## Overview

WakhanWiki is designed to provide an informative and interactive platform for learning about the provinces of Afghanistan. It combines content management with community interaction by allowing users to browse province information and participate through comments based on their role.

---

## Features

### Authentication and User Profiles

- User registration and login
- Passwords securely hashed using `bcrypt`
- Session-based authentication using `express-session`

Each user profile includes:

- Full name
- Email
- Avatar (profile picture)
- Bio

### Role-Based Access Control

Each user has a role stored in the `User` model.

#### Editor

Default role for new users.

Permissions:

- View all provinces
- Comment on provinces
- Cannot create, edit, or delete provinces
- Can edit and delete only their own comments

#### Writer

Permissions:

- Full CRUD access for provinces
- Can comment on provinces
- Can edit and delete only their own comments

#### RBAC Implementation

Role-based access is implemented with:

- Role stored in MongoDB through the `role` field in the `User` schema
- Role stored in session on login using `req.session.logged_in_role`
- Middleware in `middleware/auth.js`
  - `requireLogin`
  - `requireWriter`
- EJS conditionals to hide or show buttons based on the logged-in user's role

### Province Management

Writer users can:

- Add new provinces
- Edit existing provinces
- Delete provinces

Each province can include:

- Description
- Known for text
- Famous people
- Famous foods
- Images

All province data is stored in MongoDB using Mongoose models.

### Comment System

- Any logged-in user, whether Editor or Writer, can comment on provinces
- Users can edit and delete only their own comments
- An `Edited` flag is shown when a comment is updated

#### Ownership Protection

Server-side ownership checks are enforced so that only the owner of a comment can edit or delete it.

This is enforced in `CommentController.js`, not only in the user interface.

#### Safe Rendering

If a comment's associated user is missing, the application uses:

- A default avatar
- A `Deleted user` label

This prevents crashes caused by orphaned comments.

### Security

#### Password Security

- Passwords are hashed using `bcrypt` before being saved to the database
- Login uses `bcrypt.compare` instead of plain-text comparison

#### Route Protection

- Province CRUD routes are protected with `requireWriter`
- Comment routes are protected with both login and ownership checks

#### Environment Variables

Sensitive configuration is stored in a `.env` file:

- `MONGODB_URI`
- `SESSION_SECRET`

The `.env` file is excluded from Git using `.gitignore`.

---

## Tech Stack

### Backend

- Node.js
- Express.js
- express-session
- bcrypt
- dotenv
- method-override

### Database

- MongoDB Atlas
- Mongoose

### Frontend

- EJS templating engine
- Custom CSS
- Basic client-side JavaScript for small UI interactions

---

## Installation and Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/wakhanWiki.git
cd wakhanWiki
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a .env file in the project root
```bash
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret_here
```

### 4. Start the development server
```bash
npm run dev
```
or run: 
```bash
node server.js
```

### 5. Open the application
``` http://localhost:3000 ```

### Current Status

WakhanWiki currently includes:
- Complete authentication with bcrypt-secured passwords
- Role-based access control for Editor and Writer
- Secure province CRUD with backend middleware
- Comment system with ownership protection
- MVC structure with controllers, models, views, and middleware


### Future Work

Planned improvements include:
- Redesigning the user interface to make it more modern and polished
- Improving the layout of province pages
- Adding search functionality to search provinces by name
- Adding image galleries for each province
- Creating custom 403 and 404 error pages

### Project Structure

The application follows an MVC-style structure and is organized into:
- `controllers`
- `models`
- `views`
- `middleware`
- `config `

This helps keep the codebase clean, modular, and easier to maintain.

## Author

### Naseer Ahmad Karimzai

WakhanWiki is being built as a full-stack project focused on clean structure, secure authentication, role-based permissions, and meaningful cultural content about Afghanistan.
