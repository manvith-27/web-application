# Express MySQL Authentication

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create MySQL database:
```bash
mysql -u root -p < setup.sql
```

3. Configure environment (optional):
```bash
cp .env.example .env
# Edit .env with your MySQL credentials
```

4. Start the server:
```bash
npm start
```

5. Visit http://localhost:3000/register

## Features

- User registration with bcrypt password hashing
- MySQL database integration
- EJS templating
- MVC structure
