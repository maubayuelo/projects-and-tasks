# Projects and Tasks Manager

A ReactJS-based project and task management application that enables users to create, edit, and manage projects and tasks using Supabase as the backend and Redux for state management.

## Features

- Create, edit, and delete projects
- Add, edit, and remove tasks associated with projects
- Task management with different statuses (Coming, To Do, In Progress, Done, Archived)
- Redux Toolkit for state management
- Supabase as the backend database
- Tailwind CSS for styling

## Tech Stack

- **Frontend:** React, Redux Toolkit, React Router, Tailwind CSS
- **Backend:** Supabase (PostgreSQL)

## Installation

Follow these steps to set up the project locally:

### 1. Clone this repository:

```sh
git clone https://github.com/maubayuelo/projects-and-tasks.git
cd projects-and-tasks-manager
```

### 2. Install dependencies:

```sh
npm install
```

### 3. Set up Supabase

Create a `.env.local` file in the root directory and add the following environment variables:

```sh
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Replace `your-supabase-url` and `your-supabase-anon-key` with your actual Supabase project details.

### 4. Start the development server:

```sh
npm start
```

The app will run on `http://localhost:3000/`

## Deployment

To deploy the application, follow these steps:

1. Build the app:
   ```sh
   npm run build
   ```

2. Deploy using Vercel, Netlify, or any hosting provider of your choice.

## How to Contribute

If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.