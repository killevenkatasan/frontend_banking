# Frontend Architecture & Flow Diagram

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND (Port 3000)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    App Router                             │   │
│  │  Routes: /, /customers, /high-income                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           ↓                                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                     Navbar (Global)                       │   │
│  │  Logo | Links | User Info                                │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           ↓                                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    3 Main Pages                           │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │  1. Dashboard          2. Customers      3. High Income   │   │
│  │  - Stats               - CRUD ops        - >$100K earners │   │
│  │  - Sorted list         - Form (2 tabs)   - Stats cards    │   │
│  │  - Filtering           - Deactivate      - Details        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           ↓                                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   API Service Layer                       │   │
│  │           Axios Client (api.js)                           │   │
│  │  Base URL: http://localhost:8080/banking                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                           ↓ HTTP/REST
┌─────────────────────────────────────────────────────────────────┐
│          SPRING BOOT BACKEND (Port 8080)                        │
│          /banking endpoints                                      │
└─────────────────────────────────────────────────────────────────┘
                           ↓ JDBC
┌─────────────────────────────────────────────────────────────────┐
│          MySQL Database (Port 3306)                             │
│          Database: hello                                         │
│          Table: banking_entity                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📱 Page Flow Diagram

```
                      START
                        ↓
              ┌─────────────────┐
              │   App.js        │
              │   Port: 3000    │
              └────────┬────────┘
                       ↓
          ┌────────────────────────────┐
          │     Navbar (Global)        │
          │  Home | Customers | Income │
          └────────┬───────────────────┘
                   ↓
        ┌──────────┴──────────┬─────────────────┐
        ↓                     ↓                 ↓
    ┌────────────┐    ┌──────────────┐   ┌──────────────┐
    │ Dashboard  │    │ Customers    │   │ High Income  │
    │ (Route /)  │    │ (Route /cust)│   │ (Route /hi)  │
    └────┬───────┘    └──────┬───────┘   └──────┬───────┘
         ↓                   ↓                   ↓
    ┌────────────┐    ┌──────────────┐   ┌──────────────┐
    │ Load Stats │    │ Create Cust  │   │ Load High $  │
    │ Load Cust  │    │ (2 methods)  │   │ Display      │
    │ (Sorted)   │    │ Manage Cust  │   │ Details      │
    └────────────┘    │ Deactivate   │   └──────────────┘
                      └──────────────┘
```

---

## 🔄 Data Flow

```
┌──────────────┐
│  User Input  │
│  (Form/UI)   │
└──────┬───────┘
       ↓
┌──────────────────┐
│  React State &   │
│  Event Handlers  │
└──────┬───────────┘
       ↓
┌─────────────────────────────┐
│  API Service (api.js)        │
│  - Validation               │
│  - Error handling           │
│  - Axios request            │
└──────┬──────────────────────┘
       ↓ HTTP Request
┌─────────────────────────────┐
│  Backend API (/banking/...) │
│  - Controller               │
│  - Service                  │
│  - Repository               │
└──────┬──────────────────────┘
       ↓ JDBC Query
┌─────────────────────────────┐
│  MySQL Database             │
│  - Query execution          │
│  - Data retrieval           │
└──────┬──────────────────────┘
       ↓ Response JSON
┌──────────────────┐
│  React State     │
│  (Update)        │
└──────┬───────────┘
       ↓
┌──────────────────┐
│  Re-render DOM   │
│  (User sees it)  │
└──────────────────┘
```

---

## 📊 Component Structure

```
App (Main Router)
│
├── Navbar (Shared)
│   ├── Logo
│   ├── Links
│   └── User Info
│
└── Routes
    │
    ├── Route "/"
    │   └── Dashboard
    │       ├── StatCard x3
    │       │   ├── Card (wrapper)
    │       │   └── Content
    │       ├── Sort Controls
    │       └── Customer Grid
    │           └── Customer Cards
    │
    ├── Route "/customers"
    │   └── CustomerManagement
    │       ├── Add Button
    │       ├── Form (Conditional)
    │       │   ├── Tabs (Simple/Full)
    │       │   ├── Form Fields
    │       │   └── Submit Button
    │       └── Data Table
    │           ├── Table Header
    │           └── Table Rows
    │
    └── Route "/high-income"
        └── HighIncomeCustomers
            ├── StatCard x3
            │   ├── Total Count
            │   ├── Total Income
            │   └── Average Income
            └── Customer Cards
                ├── Income Badge
                ├── Details
                └── Status
```

---

## 🔌 API Endpoints Map

```
Backend Base: http://localhost:8080/banking

Dashboard Page:
├── GET /View              ← Load all customers
├── GET /active            ← Count active
├── GET /highincome        ← Count high income
└── GET ?sortBy=X&order=Y  ← Sorted list

Customers Page:
├── GET /View              ← List all
├── POST /CreateAccount    ← Create (simple)
├── POST /                 ← Create (full)
├── PUT /update/{id}       ← Update (if added)
└── GET /deactive/{id}     ← Deactivate

High Income Page:
└── GET /highincome        ← Load high earners
```

---

## 🎨 UI Layout Structure

```
┌─────────────────────────────────────────────────┐
│              NAVBAR (Sticky)                    │
│  Logo | Dashboard | Customers | High Income    │
├─────────────────────────────────────────────────┤
│                                                 │
│  MAIN CONTENT (Changes per route)               │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │         Page Title                      │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌───────────────────┬───────────────────────┐  │
│  │  Card/Section 1   │    Card/Section 2     │  │
│  │                   │                       │  │
│  │  Content...       │    Content...         │  │
│  └───────────────────┴───────────────────────┘  │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │    Large Content Section                │   │
│  │                                         │   │
│  │    Grid/Table/Cards                     │   │
│  │    - Item 1                             │   │
│  │    - Item 2                             │   │
│  │    - Item 3                             │   │
│  │    - Item N                             │   │
│  │                                         │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🔐 State Management

```
App Level:
├── isAuthenticated (true - no auth in backend)
└── user (basic user info)

Component Level:
├── Dashboard:
│   ├── customers (array)
│   ├── activeCount (number)
│   ├── highIncomeCount (number)
│   ├── loading (boolean)
│   ├── error (string)
│   ├── sortBy (string)
│   └── sortOrder (string)
│
├── CustomerManagement:
│   ├── customers (array)
│   ├── loading (boolean)
│   ├── error (string)
│   ├── showForm (boolean)
│   ├── selectedTab (string: 'simple'/'full')
│   └── formData (object)
│
└── HighIncomeCustomers:
    ├── customers (array)
    ├── loading (boolean)
    └── error (string)
```

---

## 📲 Mobile Responsive Breakpoints

```
Mobile (< 768px)
├── Single column layouts
├── Stacked cards
├── Full-width forms
└── Touch-friendly buttons

Tablet (768px - 1024px)
├── 2-column grids
├── Side-by-side cards
└── Adjusted spacing

Desktop (> 1024px)
├── 3+ column grids
├── Multi-column tables
└── Maximum spacing
```

---

## 🔄 User Journey Map

### Journey 1: View Customer Information
```
Dashboard → See stats → Browse customer list → Sort/Filter
```

### Journey 2: Create a Customer
```
Dashboard → Go to Customers → Add Customer → 
Choose method → Fill form → Submit → 
Success message → See in table/stats
```

### Journey 3: Manage Customer Status
```
Customers → Find customer → Click Deactivate → 
Confirm → Status updates → Refresh auto
```

### Journey 4: Find High Earners
```
Dashboard → Go to High Income → See stats → 
Browse customer cards → View details
```

---

## 📊 Data Binding Flow

```
Form Input
    ↓
handleInputChange()
    ↓
Update state (formData)
    ↓
Form re-renders with new values
    ↓
User sees current input
    ↓
On Submit:
    ↓
Validation
    ↓
API Call
    ↓
Response handling
    ↓
State update (customers list)
    ↓
Components re-render
    ↓
User sees new data
```

---

## 🎯 Feature Implementation Map

```
Dashboard ✅
├── Stats loading ✅
├── Customer list loading ✅
├── Sorting by multiple fields ✅
└── Filter by active/inactive ✅

CustomerManagement ✅
├── Simple registration form ✅
├── Full registration with age validation ✅
├── Phone number validation ✅
├── Email validation ✅
├── Create customer ✅
├── Display customers in table ✅
└── Deactivate functionality ✅

HighIncomeCustomers ✅
├── Load >$100K earners ✅
├── Display stats (total, combined, avg) ✅
├── Show detail cards ✅
└── Status indicators ✅
```

---

## 📈 Performance Optimization

```
Optimization Strategy:
├── Parallel API calls (Promise.all)
├── Minimal state updates
├── Efficient list rendering (key props)
├── CSS animations (GPU accelerated)
├── Conditional rendering
└── Error boundary handling
```

---

## 🔒 Error Handling Flow

```
Try {
    ↓
Make API Call
    ↓
Success → Parse response → Update state
    ↓
} Catch {
    ↓
Check error type
    ├── 404 → "Resource not found"
    ├── 400 → Show validation error
    ├── 500 → "Server error"
    └── Network → "Connection error"
    ↓
Display error message
    ↓
Allow retry
}
Finally {
    ↓
Stop loading spinner
}
```

---

## 🚀 Deployment Pipeline

```
Local Development
    ↓
npm install
    ↓
npm start (dev server)
    ↓
Testing & Verification
    ↓
npm run build (production build)
    ↓
Output: build/ folder with optimized files
    ↓
Deploy to hosting:
├── Netlify (drag & drop)
├── Vercel (GitHub integration)
├── AWS S3 (static hosting)
├── Docker (containerization)
└── Traditional hosting (FTP/SSH)
```

---

## 📋 Component Communication

```
App
├─ State: isAuthenticated, user
├─ Pass to Navbar: user (prop)
│
└─ Routes each have own state:
   ├── Dashboard:
   │   ├── Manages: customers, stats
   │   ├── Fetches: API calls
   │   └── Renders: StatCards, CustomerGrid
   │
   ├── CustomerManagement:
   │   ├── Manages: form state, customers list
   │   ├── Fetches: GET /View, POST /, GET /deactive
   │   └── Renders: Form, Table
   │
   └── HighIncomeCustomers:
       ├── Manages: high income customers
       ├── Fetches: GET /highincome
       └── Renders: StatCards, DetailCards
```

---

**This diagram provides a complete visual understanding of how the frontend is structured and how data flows through the application.**
