# Frontend Setup & Running Guide

## Quick Start

### 1. Install Dependencies
```bash
cd /Users/killevenkatasans/Desktop/frontend_banking
npm install
```

### 2. Start Development Server
```bash
npm start
```

This will:
- Open the app at `http://localhost:3000`
- Hot-reload on file changes
- Show errors in the console

### 3. Ensure Backend is Running

The backend must be running on `http://localhost:8080/banking`

Check if backend is accessible:
```bash
curl http://localhost:8080/banking/View
```

---

## Frontend Pages & Navigation

### 🏠 Dashboard (`/`)
**What it shows:**
- Total number of customers
- Number of active customers
- Number of high-income customers (>$100K)
- Sortable list of all customers

**Features:**
- Sort by: Name, Income, ID, Email
- Sort order: Ascending or Descending
- View customer status (Active/Inactive)

### 👥 Customers (`/customers`)
**What it shows:**
- Create new customers (2 registration methods)
- View all customers in a table
- Deactivate active customers

**Create Customer Options:**

**Option 1: Simple Registration**
- Name, Email, Phone (10 digits), Address, City, Country, Income, Date (optional)
- No age validation

**Option 2: Full Registration**
- Name, Email, Phone (10 digits), Address, City, Country, Income, Date of Birth
- Requires customer to be 18+ years old
- Auto-calculates age

**Table Shows:**
- Customer name, email, phone
- Location (city, country)
- Annual income
- Age (if available)
- Active status
- Deactivate button (only for active customers)

### 💰 High Income (`/high-income`)
**What it shows:**
- Customers earning more than $100,000
- Statistics: Total, Combined Income, Average Income
- Detailed customer cards

**Each Card Displays:**
- Name and ID
- Annual income badge (prominent)
- Email, Phone, Location, Address
- Status (Active/Inactive)
- Age (if available)

---

## API Calls Made by Frontend

### From Dashboard
```
GET /banking/View          → Get all customers (for sorting)
GET /banking/active        → Count active customers
GET /banking/highincome    → Count high-income customers
GET /banking?sortBy=name&order=asc  → Sorted customer list
```

### From Customer Management
```
GET /banking/View                    → List all customers
POST /banking/CreateAccount          → Create customer (simple method)
POST /banking                        → Create customer (full method with age validation)
GET /banking/deactive/{id}           → Deactivate customer
```

### From High Income Customers
```
GET /banking/highincome   → Get all customers earning >$100K
```

---

## Troubleshooting

### Issue: "Cannot find module 'react'"
**Solution:**
```bash
npm install
```

### Issue: Backend Connection Error
**Check:**
1. Backend is running: `curl http://localhost:8080/banking/View`
2. Backend is on correct port (8080)
3. MySQL is running with database `hello`

**Fix:**
1. Start backend: `mvn spring-boot:run` (in backend folder)
2. Check `application.properties` in backend

### Issue: Phone number validation failing
**Requirement:** Must be exactly 10 digits, no spaces or special characters
**Example:** `9876543210` ✓

### Issue: "Customer must be at least 18 years old"
**Only happens with:** Full Registration method
**Fix:** Select a date of birth that makes customer 18+

### Issue: Form not submitting
**Check:**
1. All required fields are filled (marked with *)
2. Email is valid format
3. Phone is exactly 10 digits
4. Income is >= 0

---

## File Structure

```
frontend_banking/
├── node_modules/           # Dependencies (created after npm install)
├── public/
│   └── index.html         # HTML template
├── src/
│   ├── components/
│   │   ├── Navbar.js      # Top navigation bar
│   │   ├── Card.js        # Reusable card wrapper
│   │   └── LoadingSpinner.js
│   ├── pages/
│   │   ├── Dashboard.js         # Main dashboard
│   │   ├── CustomerManagement.js # CRUD operations
│   │   └── HighIncomeCustomers.js
│   ├── services/
│   │   └── api.js         # API calls
│   ├── App.js             # Main component
│   ├── App.css            # App styling
│   ├── index.js           # React entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies & scripts
├── README.md              # Project documentation
└── API_ANALYSIS.md        # Backend API analysis
```

---

## Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject configuration (one-way operation, be careful!)
npm run eject
```

---

## Performance Tips

1. **Reduce API calls:**
   - Dashboard loads customer data only once
   - Use sorting on frontend when possible

2. **Optimize rendering:**
   - Components only re-render when necessary
   - Lists use efficient key props

3. **Lazy loading:**
   - Images load only when visible
   - Components load on route navigation

---

## Browser Console Debugging

1. Open DevTools: `F12` or `Cmd+Option+I` (Mac)
2. Go to **Console** tab
3. Check for errors in red
4. Check Network tab to see API calls

**Common Errors:**
- `404 Not Found` → Backend endpoint doesn't exist
- `CORS error` → Backend doesn't allow cross-origin requests
- `TypeError: Cannot read property 'data'` → API returned different structure

---

## Customization

### Change Colors
Edit: `src/pages/*.css` and `src/components/*.css`
- Blue (#1e3a8a, #3b82f6)
- Gold (#fbbf24, #f59e0b)
- Green (#10b981, #059669)
- Red (#dc2626)

### Change API Base URL
Edit: `src/services/api.js`
```javascript
const API_BASE_URL = 'http://your-backend-url/banking';
```

### Add New Page
1. Create `src/pages/NewPage.js`
2. Add route in `src/App.js`
3. Add link in `src/components/Navbar.js`

---

## Production Deployment

### Build the app
```bash
npm run build
```

### Output
Creates `build/` folder with optimized files

### Deploy to:
- **Netlify:** Drag & drop `build/` folder
- **Vercel:** Connect GitHub repo
- **AWS S3:** Upload `build/` contents
- **Docker:** Create Dockerfile in project root

---

## Need Help?

1. Check [API_ANALYSIS.md](API_ANALYSIS.md) for backend API details
2. Check browser console (F12) for errors
3. Verify backend is running: `curl http://localhost:8080/banking/View`
4. Check network requests in DevTools → Network tab
