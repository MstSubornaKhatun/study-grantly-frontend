🎓 Scholarship Management System

📘 Project Purpose

The Scholarship Management System helps students search for suitable university scholarships and apply for them directly through the platform. It provides three types of user roles:

Default user (after registration)

Moderator (can manage scholarships & reviews)

Admin (can manage users, scholarships, and all data)



---

🌐 Live Website

🔗 Live Link: 
📁 Client GitHub: https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-MstSubornaKhatun
📁 Server GitHub: https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-MstSubornaKhatun



---

🚀 Key Features

🔓 Authentication

Email/password login using Firebase

Social login (e.g., Google)

JWT token stored in localStorage

Password validation (min 6 chars, capital letter, special char)

Role-based private route access

Secure Firebase config via .env.local


🏠 Home Page

Responsive navbar with role-based links

3-slide banner carousel

Top 6 scholarships (sorted by low fee & recent post)

“All Scholarships” button

2 Extra sections (e.g., testimonials, featured universities)


🎓 All Scholarships Page

Search by: scholarship name, university name, degree

Display all scholarships in card layout

If no result, show “No data found” message or image

Optional pagination (challenge task)


📝 Scholarship Details Page (Private)

Full scholarship details

Review carousel (reviewer image, name, rating, comment)

“Apply Scholarship” button (redirects to payment)


💳 Apply Scholarship Flow

Stripe/SSLCommerz real payment gateway

Show toast on success/failure

Form to submit applicant details (address, SSC/HSC result, degree, etc.)

Image upload using imgbb

Application data includes user ID, scholarship ID, date


🧑‍💻 User Dashboard

My Profile: shows user info and role

My Applications: table of applied scholarships
→ Details | Edit (if pending) | Cancel | Add Review

My Reviews: table of user’s reviews
→ Edit via modal | Delete review


🧑‍🏫 Moderator Dashboard (Private)

Profile: shows moderator info

Manage Scholarships: CRUD functionality with modals

All Reviews: shows all reviews with delete option

All Applications: feedback modal, cancel button, status view

Add Scholarship: full form with image upload using imgbb


👨‍💼 Admin Dashboard (Private)

All moderator features +

Manage Users: change user role (dropdown), delete users, filter by role

Manage Reviews: view/delete all reviews

Analytics Chart: basic chart page (e.g., applications/month)



---

⚙ Technologies Used

🔧 Frontend

React.js

React Router DOM

React Hook Form

Firebase

Axios (with interceptor)

TanStack React Query

React Toastify

Lucide React Icons

Stripe.js / SSLCommerz

Swiper.js (optional for sliders)

SweetAlert2


🖥 Backend

Node.js

Express.js

MongoDB (with Mongoose or native driver)

CORS

JSON Web Token (JWT)

dotenv



---

🛡 Security

Firebase and MongoDB credentials secured in .env files

JWT implementation with token sent in headers

Axios interceptor for secure requests



---

📊 Bonus Features (Challenge Tasks)

Pagination on All Scholarship page

Sorting/filtering in Manage Applications by deadline or applied date

Admin analytics page using Chart.js or Recharts



---

📄 Extra Notes

💡 404 Not Found page included

✅ Fully responsive (mobile/tablet/desktop)

✅ Firebase domain authorized (for production)

✅ No errors on reload or private routes

✅ Real payment flow tested and functional