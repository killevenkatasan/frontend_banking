# Quick Reference Guide - Frontend Banking App

## 🚀 Getting Started (2 minutes)

```bash
# Step 1: Install dependencies
cd /Users/killevenkatasans/Desktop/frontend_banking
npm install

# Step 2: Start the app
npm start

# App opens at http://localhost:3000
```

---

## 📍 Routes & Pages

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Dashboard | View stats & sorted customers |
| `/customers` | CustomerManagement | Create, view, deactivate customers |
| `/high-income` | HighIncomeCustomers | View customers earning >$100K |

---

## 🎯 Page Features at a Glance

### Dashboard
- **Shows:** Customer count, active count, high-income count
- **Does:** Display all customers with sorting options
- **Sort by:** Name, Income, ID, Email
- **Order:** Ascending or Descending

### Customers
- **Shows:** All customers in a table
- **Does:** Create customers (2 methods), deactivate
- **Method 1:** Simple (no age check)
- **Method 2:** Full (age must be 18+)

### High Income
- **Shows:** Customers earning >$100,000
- **Does:** Display stats (total, combined, average income)
- **Cards:** Detailed info for each customer

---

## 📝 Creating a Customer

### Simple Method (no age required)
**Fields:**
- Name, Email, Phone (10 digits), Address, City, Country, Income, Date (optional)

**Example:**
```
Name: John Doe
Email: john@example.com
Phone: 9876543210
Address: 123 Main St
City: New York
Country: USA
Income: 50000
Date: 2024-02-18 (optional)
```

### Full Method (age 18+ required)
**Fields:**
- Name, Email, Phone (10 digits), Address, City, Country, Income, Date of Birth

**Example:**
```
Name: Alice Smith
Email: alice@example.com
Phone: 9876543210
Address: 456 Oak Ave
City: Los Angeles
Country: USA
Income: 150000
Date of Birth: 1995-05-15 (age auto-calculated to 28)
```

---

## ✅ Validation Rules

| Field | Rule | Example |
|-------|------|---------|
| Name | Required, non-empty | John Doe ✓ |
| Email | Valid email format | john@example.com ✓ |
| Phone | Exactly 10 digits | 9876543210 ✓ |
| Address | Required, non-empty | 123 Main Street ✓ |
| City | Required, non-empty | New York ✓ |
| Country | Required, non-empty | USA ✓ |
| Income | Positive number | 50000 ✓ |
| Age (Full) | Must be 18+ | DOB < 18 years ago ✓ |

---

## 🔌 API Endpoints Called

### All Customers
```
GET /banking/View
```

### Single Customer
```
GET /banking/search/{id}
```

### Create Customer (Simple)
```
POST /banking/CreateAccount
```

### Create Customer (Full)
```
POST /banking
```

### Update Customer
```
PUT /banking/update/{id}
```

### Deactivate Customer
```
GET /banking/deactive/{id}
```

### Active Only
```
GET /banking/active
```

### High Income Only
```
GET /banking/highincome
```

### Sorted Customers
```
GET /banking?sortBy=name&order=asc
```

---

## 🎨 UI Components

### Navbar
- Logo & title
- Links to all pages
- User info display

### Card
- Container for content
- Optional title
- Shadow and border styling

### LoadingSpinner
- Shows while loading data
- Spinning animation
- "Loading..." text

### Dashboard
- Stat cards (blue gradient)
- Customer grid cards
- Sort controls

### CustomerManagement
- Tabbed form (Simple/Full)
- Customer data table
- Deactivate buttons

### HighIncomeCustomers
- Stat cards (gold gradient)
- Detail cards per customer
- Status badges

---

## 🐛 Troubleshooting

**Problem:** "Cannot connect to backend"
```
Check: curl http://localhost:8080/banking/View
Fix: Start backend server, ensure it's on port 8080
```

**Problem:** "Phone validation error"
```
Ensure: Exactly 10 digits, no spaces/dashes
Example: 9876543210 (not 987-654-3210)
```

**Problem:** "Age validation error"
```
Only in Full Registration method
Fix: Select birth date 18+ years ago
```

**Problem:** "Email validation error"
```
Ensure: Valid email format with @
Example: user@example.com (not user@, not user.com)
```

**Problem:** "npm command not found"
```
Install Node.js from nodejs.org
```

---

## 📊 File Structure

```
src/
├── App.js ......................... Main app & routes
├── App.css ........................ App styling
├── index.js ....................... React entry
├── index.css ...................... Global styles
│
├── components/
│   ├── Navbar.js .................. Navigation bar
│   ├── Navbar.css
│   ├── Card.js .................... Reusable card
│   ├── Card.css
│   ├── LoadingSpinner.js .......... Loading indicator
│   └── LoadingSpinner.css
│
├── pages/
│   ├── Dashboard.js ............... Main dashboard
│   ├── Dashboard.css
│   ├── CustomerManagement.js ...... CRUD page
│   ├── CustomerManagement.css
│   ├── HighIncomeCustomers.js .... High earners
│   └── HighIncomeCustomers.css
│
└── services/
    └── api.js ..................... API calls
```

---

## 🔄 User Workflows

### View All Customers
1. Go to Dashboard
2. See customer list with sorting options
3. Change sort field or order if needed

### Create a Customer
1. Go to Customers
2. Click "Add Customer"
3. Choose registration method
4. Fill form
5. Click "Create Customer"

### Deactivate a Customer
1. Go to Customers
2. Find customer in table
3. Click "Deactivate"
4. Confirm
5. Status changes to "Inactive"

### View High Earners
1. Go to "High Income"
2. See statistics at top
3. Browse customer detail cards

---

## 🎯 Default Values

- Customer status: Active (true)
- Age calculated: From dateOfBirth
- Sorting: By name, ascending
- Income threshold: $100,000

---

## 💾 Data Persistence

All data is stored in MySQL database:
- Host: localhost:3306
- Database: hello
- Table: banking_entity

Frontend reads/writes from/to this database via backend API.

---

## 🔐 Security Notes

⚠️ **Current:**
- No authentication
- No authorization
- Credentials exposed in backend config

✅ **To Add (Future):**
- JWT authentication
- Role-based access control
- Environment variables for secrets
- CORS configuration

---

## 📞 Support

**Check:** Browser console (F12) for errors  
**Check:** Network tab to see API calls  
**Read:** API_ANALYSIS.md for backend details  
**Read:** SETUP_GUIDE.md for detailed setup  

---

## ✨ Features Summary

✅ Dashboard with statistics  
✅ Customer CRUD operations  
✅ Two registration methods  
✅ Age validation (18+)  
✅ Customer filtering  
✅ Email validation  
✅ Phone validation (10 digits)  
✅ Status management (active/inactive)  
✅ Sorting capabilities  
✅ Responsive design  
✅ Error handling  
✅ Loading states  

---

## 🚀 Ready to Use!

The frontend is fully functional and ready to work with your banking backend.

**Next Steps:**
1. ✅ Install dependencies: `npm install`
2. ✅ Start app: `npm start`
3. ✅ Test with sample data
4. ✅ Deploy when ready

Happy coding! 🎉
