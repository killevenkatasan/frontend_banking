# Banking Application Frontend

A modern React-based frontend for the Banking Customer Management System.

## Features

- 📊 **Dashboard** - View customer statistics and sorted customer list
- 👥 **Customer Management** - Create, view, and manage customer records
  - Two registration modes: Simple & Full (with age validation)
  - Activate/Deactivate customers
- 💰 **High Income Customers** - View customers earning >$100,000
  - Detailed statistics and customer insights
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with modern features

## Project Structure

```
src/
├── components/         # Reusable React components
│   ├── Navbar.js      # Navigation bar
│   ├── Card.js        # Card component for content wrapping
│   └── LoadingSpinner.js # Loading indicator
├── pages/             # Page components
│   ├── Dashboard.js   # Customer statistics & sorted list
│   ├── CustomerManagement.js # CRUD operations for customers
│   └── HighIncomeCustomers.js # High earners view
├── services/          # API services
│   └── api.js        # Axios API client and endpoints
├── App.js            # Main App component
└── index.js          # Entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Banking backend running on `http://localhost:8080/banking`

### Installation

1. Navigate to the project directory
```bash
cd /Users/killevenkatasans/Desktop/frontend_banking
```

2. Install dependencies
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Building for Production

Create an optimized production build:
```bash
npm run build
```

## API Endpoints Used

### Customer Management
- `GET /banking/View` - Get all customers
- `GET /banking/search/{id}` - Get customer by ID
- `POST /banking/CreateAccount` - Create customer (simple)
- `POST /banking` - Create customer (full, with age validation ≥18)
- `PUT /banking/update/{id}` - Update customer
- `GET /banking/deactive/{id}` - Deactivate customer

### Customer Filtering
- `GET /banking/active` - Get only active customers
- `GET /banking/highincome` - Get customers with income > $100K
- `GET /banking?sortBy=name&order=asc` - Get customers with sorting

## Pages Overview

### Dashboard
- **Total Customers** - Count of all customers in system
- **Active Customers** - Count of active (not deactivated) customers
- **High Income Customers** - Count of customers earning >$100K
- **Sortable Customer List** - View all customers with sorting options
  - Sort by: Name, Income, ID, Email
  - Order: Ascending or Descending

### Customer Management
- **Create Customer** - Two registration methods:
  1. **Simple Registration** - Basic details (name, email, phone, address, city, country, income, registration date)
  2. **Full Registration** - Complete profile with age validation (must be 18+)
- **Customer Table** - View all customers with details
- **Deactivate** - Mark customer as inactive
- **Real-time Validation** - Phone number must be 10 digits

### High Income Customers
- **Overview Cards** - Total customers, combined income, average income
- **Detailed Cards** - Each high-income customer with full information
- **Status Badges** - Active/Inactive status indicator

## Data Model

```
Customer Fields:
- id (Auto-generated)
- name (Required)
- email (Required, validated format)
- phoneNumber (Required, 10 digits)
- address (Required)
- country (Required)
- city (Required)
- income (Required, minimum 0)
- date (Optional, registration date)
- dateOfBirth (Optional, for age validation)
- age (Auto-calculated from dateOfBirth)
- active (Boolean, default true)
```

## Key Features

### Validation
- ✅ Email format validation
- ✅ Phone number must be exactly 10 digits
- ✅ Age must be 18+ (full registration only)
- ✅ Income must be positive

### User Experience
- Loading spinners for data fetching
- Error messages with actionable feedback
- Responsive grid layouts
- Smooth animations and transitions
- Mobile-first design

### Error Handling
- API error handling with user-friendly messages
- Network error recovery
- Validation error feedback

## Styling

The application uses a custom CSS framework with:
- Modern blue and gold color scheme
- Responsive grid layouts
- Card-based UI components
- Smooth transitions and hover effects
- Mobile-first approach

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to submit issues and enhancement requests.

## License

MIT License
