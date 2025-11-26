WakhanWiki

WakhanWiki is a full-stack web application that showcases the provinces of Afghanistan.
Users can explore each province, see what it’s known for (famous people, foods, culture), and interact through comments.
The app includes authentication, user profiles, and a role-based permission system (Editor vs Writer).

1. Features
   1.1 Authentication & Profiles

User registration and login

Passwords securely hashed with bcrypt

Session-based authentication using express-session

User profile fields:

Full name

Email

Avatar (profile picture)

Bio

1.2 Role-Based Access Control (RBAC)

Each user has a role stored in the User model:

Editor (default for new users)

Can view all provinces

Can comment on provinces

Cannot create, edit, or delete provinces

Writer

Full CRUD access for provinces (create, update, delete)

Can still comment like an editor

Can only edit/delete their own comments

Implemented with:

Role stored in MongoDB (role field in User schema)

Role stored in session on login (req.session.logged_in_role)

Middleware in middleware/auth.js:

requireLogin

requireWriter

EJS conditionals to hide/show buttons based on role

1.3 Province Management

For Writer users:

Add new provinces

Edit existing provinces

Delete provinces

Each province can include:

Description

“Known for” text

Famous people

Famous foods

Images

All data is stored in MongoDB via Mongoose models.

1.4 Comment System

Any logged-in user (Editor or Writer) can comment on provinces

Users can edit and delete their own comments

“Edited” flag shown when a comment is updated

Server-side ownership checks:

Only the comment’s owner can edit/delete it

Enforced in CommentController.js (not just in the UI)

Safe rendering:

If a comment’s user is missing, the app uses:

A default avatar

“Deleted user” label

Prevents crashes from orphaned comments

1.5 Security

Passwords:

Hashed using bcrypt before being saved in the database

Login uses bcrypt.compare instead of plain text comparison

Routes:

Province CRUD routes protected with requireWriter middleware

Comment routes protected with both login and ownership checks

Environment Variables:

MONGODB_URI and SESSION_SECRET stored in .env

.env is excluded from Git via .gitignore

2. Tech Stack

Backend:

Node.js

Express.js

express-session

bcrypt

dotenv

method-override

Database:

MongoDB Atlas

Mongoose (schemas & population)

Frontend:

EJS templating engine

CSS (custom styling)

Basic client-side JS (for small UI behaviors)

3. Installation & Running Locally
   4.1 Clone the repository
   git clone https://github.com/your-username/wakhanWiki.git
   cd wakhanWiki

4.2 Install dependencies
npm install

4.3 Create a .env file in the project root
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret_here

4.4 Start the development server
npm run dev

# or

node server.js

Open the app at:

http://localhost:3000

4. Current Status & Future Work

Right now, WakhanWiki includes:

Complete authentication with bcrypt-secured passwords

Role-based access (Editor vs Writer)

Secure province CRUD with backend middleware

Comment system with ownership protection

MVC structure with controllers, models, views, middleware

Future Tasks (Planned by the Developer)

Redesign the UI to make it more modern and visually polished

Improve layout of province pages

Add search functionality (search provinces by name)

Add image galleries per province

Add nicer 403/404 error pages

Improve mobile responsiveness
