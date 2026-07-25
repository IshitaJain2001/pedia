# Little Hearts Pediatric Hospital - MERN Stack Application

A modern, responsive pediatric hospital landing page built with the MERN stack (MongoDB, Express.js, React.js, Node.js). The application features a warm, child-friendly design with smooth animations and comprehensive healthcare services.

## 🎨 Features

### Frontend
- **Modern UI/UX**: Warm, child-friendly design with soft colors and rounded elements
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Smooth Animations**: Framer Motion for engaging user interactions
- **Interactive Components**: 
  - Sticky navbar with smooth scroll
  - Hero section with animated floating elements
  - Service cards with hover effects
  - Testimonials carousel
  - FAQ accordion
  - Animated statistics counter
  - Google Maps integration
- **Forms**: 
  - General Query form with validation
  - Appointment booking form with validation
- **Extra Features**:
  - Toast notifications
  - Scroll to top button
  - Floating WhatsApp and call buttons
  - Loading states

### Backend
- **RESTful APIs**: Express.js with proper routing
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Express-validator for server-side validation
- **Error Handling**: Comprehensive error handling middleware
- **Collections**:
  - GeneralQueries
  - Appointments

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- React Router
- Tailwind CSS
- Framer Motion
- React Icons
- React Hook Form
- React Hot Toast
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- Express Validator
- Dotenv

## 📁 Project Structure

```
pediatric/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── WhyChooseUs.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Doctors.jsx
│   │   │   ├── Statistics.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── GeneralQueryForm.jsx
│   │   │   ├── AppointmentForm.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   └── FloatingButtons.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── generalQueryController.js
│   │   └── appointmentController.js
│   ├── models/
│   │   ├── GeneralQuery.js
│   │   └── Appointment.js
│   ├── routes/
│   │   ├── generalQueryRoutes.js
│   │   └── appointmentRoutes.js
│   ├── middlewares/
│   │   ├── validator.js
│   │   └── errorHandler.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd pediatric
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Configure Environment Variables**
```bash
cp .env.example .env
```

Edit `.env` file with your MongoDB connection string:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pediatric-hospital
NODE_ENV=development
```

4. **Install Frontend Dependencies**
```bash
cd ../client
npm install
```

### Running the Application

1. **Start Backend Server**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

2. **Start Frontend Development Server**
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:3000`

### Building for Production

1. **Build Frontend**
```bash
cd client
npm run build
```

2. **Start Backend in Production Mode**
```bash
cd backend
npm start
```

## 📡 API Endpoints

### General Queries
- `POST /api/general-query` - Create a new general query
- `GET /api/general-query` - Get all general queries (Admin)

### Appointments
- `POST /api/appointments` - Create a new appointment
- `GET /api/appointments` - Get all appointments (Admin)
- `PATCH /api/appointments/:id` - Update appointment status (Admin)
- `DELETE /api/appointments/:id` - Delete appointment (Admin)

### Health Check
- `GET /api/health` - Server health check

## 🎨 Color Palette

### Primary Colors
- Sky Blue: `#8FD8FF`
- Soft Mint: `#D8F8E1`
- Warm Yellow: `#FFEAA7`
- White: `#FFFFFF`
- Soft Peach: `#FFD8C2`

### Accent Colors
- Coral: `#FF6B6B`
- Lavender: `#A78BFA`

### Typography
- Headings: Poppins
- Body: Nunito

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pediatric-hospital
NODE_ENV=development
```

## 📝 Form Validation

### General Query Form
- Full Name (2-100 characters)
- Email (valid email format)
- Phone Number (valid phone format)
- Child's Age (required)
- Subject (max 200 characters)
- Message (10-1000 characters)

### Appointment Form
- Parent Name (2-100 characters)
- Email (valid email format)
- Phone Number (valid phone format)
- Child Name (2-100 characters)
- Child Age (required)
- Gender (Male/Female/Other)
- Preferred Doctor (required)
- Appointment Date (future date)
- Preferred Time (required)
- Reason for Visit (10-500 characters)

## 🌟 Features Highlights

### Animations
- Fade up effects on scroll
- Slide animations
- Scale effects on hover
- Floating background elements
- Smooth transitions

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface
- Optimized for all screen sizes

### Performance
- Lazy loading
- Image optimization
- Code splitting
- Optimized bundle size

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍⚕️ Support

For support, please contact info@littlehearts.com or call +1 (555) 123-4567.

---

**Built with ❤️ for Little Hearts Pediatric Hospital**
