# Just-Beauty
Hair, cosmetics and beauty salon - React Application


---

## 🔑 Authentication Flow

1. **Sign In/Sign Up** — Navigate to `/auth` to access the authentication page
2. **Google Sign-in** — Click "Continue with Google" for quick authentication
3. **Email/Password** — Use the form to sign up or sign in with email
4. **Admin Access** — Once signed in, "Admin Portal" appears in navigation
5. **Protected Routes** — Admin portal is protected and requires authentication

---

## 📊 Admin Portal Features

- **Dashboard Statistics** — Total requests, pending, completed, and weekly counts
- **Requests Table** — View all submissions with full details
- **Status Management** — Mark requests as completed or delete them
- **Real-time Updates** — Dashboard updates automatically when new submissions arrive
- **Filter System** — Filter by All, Pending, or Completed status

---

## 🔒 Security Notes

> - Firebase API keys are visible in the client-side code (this is normal for Firebase)
> - Ensure your Firebase security rules are properly configured in the Firebase Console
> - For production, consider implementing additional admin role verification
> - Enable Email/Password authentication in Firebase Console if you want to use that feature

---

## 🔄 Switching Between Versions

| Version | How to Use |
|---|---|
| **React** | Use `index-react.html` (rename to `index.html`) and run `npm run dev` |
| **Original HTML** | Use the existing `index.html` and `admin.html` files |

---

## 🛠️ Built With

- React Router — client-side routing
- Firebase SDK v10 — authentication and database
- EmailJS — email notifications
- Context API — state management
- CSS animations and transitions for smooth UX
