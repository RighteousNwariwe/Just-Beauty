# Just-Beauty
Hair, cosmetics and beauty salon - React Application

## React Setup Instructions

This is a React-based web application built with Vite, featuring Firebase Authentication, Realtime Database, and EmailJS integration.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure EmailJS**:
   - Sign up at [https://www.emailjs.com/](https://www.emailjs.com/)
   - Create an email service and template with variables: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{service}}`, `{{message}}`
   - Update the placeholders in `src/components/ContactForm.jsx`:
     ```javascript
     // Replace these with your actual EmailJS credentials
     await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', submissionData, 'YOUR_PUBLIC_KEY')
     ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

### Firebase Configuration

Firebase is already configured with your provided credentials. The following features are enabled:

- **Authentication**: Google Sign-in and Email/Password authentication
- **Realtime Database**: Stores contact form submissions
- **Analytics**: Tracks user interactions

### Features

- **Modern React UI**: Built with React 18 and Vite for fast development
- **Authentication**: 
  - Google Sign-in with smooth UI
  - Email/Password sign-up and sign-in
  - Protected admin routes
- **Contact Form**: Submits to Firebase Realtime Database and sends email via EmailJS
- **Admin Portal**: 
  - View all contact form submissions
  - Filter by status (All, Pending, Completed)
  - Mark requests as completed
  - Delete requests
  - Real-time statistics dashboard
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: Beautiful transitions and hover effects

### File Structure

```
Just-Beauty/
├── public/                 # Static assets (images)
├── src/
│   ├── components/        # Reusable React components
│   │   ├── ContactForm.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/          # React Context providers
│   │   └── AuthContext.jsx
│   ├── pages/             # Page components
│   │   ├── Admin.jsx
│   │   ├── Admin.css
│   │   ├── Auth.jsx
│   │   ├── Auth.css
│   │   ├── Home.jsx
│   │   └── Home.css
│   ├── App.jsx            # Main app component with routing
│   ├── index.css          # Global styles
│   ├── main.jsx           # Entry point
│   └── firebase.js        # Firebase configuration
├── index-react.html       # React app entry (rename to index.html to use)
├── package.json
├── vite.config.js
└── README.md
```

### Authentication Flow

1. **Sign In/Sign Up**: Navigate to `/auth` to access the authentication page
2. **Google Sign-in**: Click "Continue with Google" for quick authentication
3. **Email/Password**: Use the form to sign up or sign in with email
4. **Admin Access**: Once signed in, "Admin Portal" appears in navigation
5. **Protected Routes**: Admin portal is protected and requires authentication

### Admin Portal Features

- **Dashboard Statistics**: Total requests, pending, completed, and weekly counts
- **Requests Table**: View all submissions with full details
- **Status Management**: Mark requests as completed or delete them
- **Real-time Updates**: Dashboard updates automatically when new submissions arrive
- **Filter System**: Filter by All, Pending, or Completed status

### Security Notes

- Firebase API keys are visible in the client-side code (this is normal for Firebase)
- Ensure your Firebase security rules are properly configured in the Firebase Console
- For production, consider implementing additional admin role verification
- Enable Email/Password authentication in Firebase Console if you want to use that feature

### Switching Between Versions

- **React Version**: Use `index-react.html` (rename to `index.html`) and run `npm run dev`
- **Original HTML Version**: Use the existing `index.html` and `admin.html` files

### Development

The React app includes:
- React Router for client-side routing
- Firebase SDK v10 for authentication and database
- EmailJS for email notifications
- Context API for state management
- CSS animations and transitions for smooth UX
