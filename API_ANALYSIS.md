# Banking Application - Complete API Analysis

## 📊 Overview
Your backend is a Spring Boot REST API for managing banking customers. It provides endpoints for customer CRUD operations, filtering, and sorting.

---

## 🔌 API Endpoints Detailed Analysis

### **Base URL**: `http://localhost:8080/banking`
### **Database**: MySQL (`hello` database)
### **Port**: 8080

---

## 1️⃣ CREATE ACCOUNT ENDPOINT

### **POST** `/banking/CreateAccount`
**Purpose**: Create a new account by providing customer details

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phoneNumber": 9876543210,
  "address": "123 Main Street",
  "country": "USA",
  "city": "New York",
  "income": 50000,
  "date": "2024-02-18"
}
```

**Response**:
```
"Create Successfully"
```

**Response Code**: 200 OK

**Validation Rules**:
- ✅ Name: Required (cannot be blank)
- ✅ Email: Required & must be valid format
- ✅ Phone: Required & exactly 10 digits
- ✅ Address: Required (cannot be blank)
- ✅ Country: Required (cannot be blank)
- ✅ City: Required (cannot be blank)
- ✅ Income: Required & must be positive (≥ 0)
- ✅ Date: Optional

**Notes**: 
- Uses manual object mapping in service
- Sets `active = true` by default
- Does NOT calculate age

---

## 2️⃣ VIEW ALL ACCOUNTS ENDPOINT

### **GET** `/banking/View`
**Purpose**: Retrieve all customer accounts from the database

**Request Parameters**: None

**Response**:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": 9876543210,
    "address": "123 Main Street",
    "country": "USA",
    "city": "New York",
    "income": 50000,
    "date": "2024-02-18",
    "dateOfBirth": null,
    "age": null,
    "active": true
  }
]
```

**Response Code**: 200 OK

**Notes**: 
- Returns all customers regardless of active status
- No pagination implemented
- Returns all fields including NULL values

---

## 3️⃣ SEARCH BY ID ENDPOINT

### **GET** `/banking/search/{id}`
**Purpose**: Retrieve a specific customer by their ID

**Path Parameters**:
- `id` (Long): Customer ID

**Example**: `GET /banking/search/1`

**Response** (Found):
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phoneNumber": 9876543210,
  "address": "123 Main Street",
  "country": "USA",
  "city": "New York",
  "income": 50000,
  "date": "2024-02-18",
  "dateOfBirth": null,
  "age": null,
  "active": true
}
```

**Response Code**: 200 OK (if found) / 404 Not Found

**Notes**:
- Returns Optional<BankingEntity>
- Empty response if ID doesn't exist

---

## 4️⃣ UPDATE ACCOUNT ENDPOINT

### **PUT** `/banking/update/{id}`
**Purpose**: Update an existing customer's information

**Path Parameters**:
- `id` (Long): Customer ID to update

**Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phoneNumber": 9876543210,
  "address": "456 Oak Avenue",
  "country": "USA",
  "city": "Los Angeles",
  "income": 75000,
  "date": "2024-02-18"
}
```

**Response**:
```
"The given Information Updated Successfully"
```

**Response Code**: 200 OK

**Updatable Fields**:
- ✅ Name
- ✅ Email
- ✅ Phone Number
- ✅ Address
- ✅ Country
- ✅ City
- ✅ Income
- ✅ Date

**Non-Updatable Fields**:
- ❌ ID (Auto-generated)
- ❌ Active Status (use deactivate endpoint)
- ❌ Date of Birth & Age

**Notes**:
- Throws exception if ID doesn't exist
- Overwrites all provided fields
- Does NOT preserve existing values if not included in request

---

## 5️⃣ DEACTIVATE CUSTOMER ENDPOINT

### **GET** `/banking/deactive/{id}`
**Purpose**: Deactivate a customer account

**Path Parameters**:
- `id` (Long): Customer ID to deactivate

**Example**: `GET /banking/deactive/1`

**Response**:
```
"Customer with ID 1 has been deactivated successfully."
```

**Response Code**: 200 OK

**Notes**:
- Sets `active = false`
- Uses GET method (should ideally be PATCH or DELETE)
- Returns deactivated customer data

---

## 6️⃣ GET ACTIVE CUSTOMERS ENDPOINT

### **GET** `/banking/active`
**Purpose**: Retrieve all active (not deactivated) customers

**Request Parameters**: None

**Response**:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": 9876543210,
    "address": "123 Main Street",
    "country": "USA",
    "city": "New York",
    "income": 50000,
    "date": "2024-02-18",
    "dateOfBirth": null,
    "age": null,
    "active": true
  }
]
```

**Response Code**: 200 OK

**Database Query**: `findByActiveTrue()`

**Notes**:
- Filters by `active = true`
- Custom repository method
- Returns only active customers

---

## 7️⃣ ADD CUSTOMER ENDPOINT

### **POST** `/banking`
**Purpose**: Create a new customer with age calculation

**Request Body**:
```json
{
  "name": "Alice Smith",
  "email": "alice@example.com",
  "phoneNumber": 9123456789,
  "address": "789 Pine Road",
  "country": "USA",
  "city": "Chicago",
  "income": 85000,
  "dateOfBirth": "1995-05-15"
}
```

**Response**:
```json
{
  "id": 2,
  "name": "Alice Smith",
  "email": "alice@example.com",
  "phoneNumber": 9123456789,
  "address": "789 Pine Road",
  "country": "USA",
  "city": "Chicago",
  "income": 85000,
  "date": null,
  "dateOfBirth": "1995-05-15",
  "age": 28,
  "active": true
}
```

**Response Code**: 201 Created

**Validation Rules**:
- ✅ All fields required except `date`
- ✅ **Age >= 18 required** (throws IllegalArgumentException if not)
- ✅ Automatically calculates age from dateOfBirth

**Business Logic**:
- Calculates age: `Period.between(dateOfBirth, today).getYears()`
- Rejects customers under 18 years old
- Sets `active = true` by default

**Differences from `/CreateAccount`**:
- Requires `dateOfBirth` instead of `date`
- Automatically calculates age
- Validates age >= 18
- Returns created object (not just a message)

---

## 8️⃣ GET HIGH INCOME CUSTOMERS ENDPOINT

### **GET** `/banking/highincome`
**Purpose**: Retrieve customers with income greater than 100,000

**Request Parameters**: None

**Response**:
```json
[
  {
    "id": 2,
    "name": "Alice Smith",
    "email": "alice@example.com",
    "phoneNumber": 9123456789,
    "address": "789 Pine Road",
    "country": "USA",
    "city": "Chicago",
    "income": 150000,
    "dateOfBirth": "1995-05-15",
    "age": 28,
    "active": true
  }
]
```

**Response Code**: 200 OK

**Database Query**: `findByIncomeGreaterThan(100000L)`

**Notes**:
- Filters: Income > 100,000
- Useful for marketing or premium services
- Returns all customers above threshold

---

## 9️⃣ GET SORTED CUSTOMERS ENDPOINT

### **GET** `/banking`
**Purpose**: Retrieve all customers with sorting options

**Query Parameters**:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sortBy` | String | "name" | Field to sort by (name, income, id, etc.) |
| `order` | String | "asc" | Sort order: "asc" or "desc" |

**Examples**:
- `GET /banking` → Sort by name ascending
- `GET /banking?sortBy=income&order=desc` → Sort by income descending
- `GET /banking?sortBy=id&order=asc` → Sort by ID ascending

**Response**:
```json
[
  {
    "id": 1,
    "name": "Alice Smith",
    "email": "alice@example.com",
    ...
  },
  {
    "id": 2,
    "name": "Bob Johnson",
    "email": "bob@example.com",
    ...
  }
]
```

**Response Code**: 200 OK

**Sortable Fields**:
- ✅ name
- ✅ id
- ✅ income
- ✅ age
- ✅ email
- ✅ Any other entity field

**Notes**:
- Case-insensitive order parameter
- Uses Spring Data Sort API
- Returns ResponseEntity wrapper

---

## 🗂️ Data Model (BankingEntity)

```
┌─────────────────────────────┐
│      BankingEntity          │
├─────────────────────────────┤
│ @Id @GeneratedValue         │
│ id: Long                    │
├─────────────────────────────┤
│ @NotBlank                   │
│ name: String                │
│                             │
│ @Pattern (email)            │
│ email: String               │
│                             │
│ @Digits(10)                 │
│ phoneNumber: Double         │
│                             │
│ @NotBlank                   │
│ address: String             │
│                             │
│ date: LocalDate             │
│                             │
│ @NotBlank                   │
│ country: String             │
│                             │
│ @NotBlank                   │
│ city: String                │
│                             │
│ @Min(0)                     │
│ income: Long                │
│                             │
│ dateOfBirth: LocalDate      │
│ age: Long                   │
│                             │
│ active: boolean = true      │
└─────────────────────────────┘
```

---

## ⚠️ API Issues & Recommendations

### **Security Issues**:
1. ❌ Sensitive credentials exposed in `application.properties`
   - Move to `application-secret.properties` or environment variables
2. ❌ No authentication/authorization (no JWT, API keys)
   - Add Spring Security

### **Design Issues**:
1. ❌ Duplicate endpoints: `/CreateAccount` + `/` (both POST)
   - Consolidate into single endpoint
2. ❌ Deactivate uses GET method (should be PATCH/DELETE)
3. ❌ No error handling for 404/400 errors
4. ❌ No pagination for large datasets

### **Validation Issues**:
1. ⚠️ Phone number stored as `Double` (should be `String`)
   - Double can lose precision for large numbers
2. ⚠️ Two different endpoints have different validation rules
   - `/CreateAccount`: no age validation
   - `/`: requires age >= 18

### **Performance Issues**:
1. ❌ No indexes on frequently queried fields
2. ❌ `findAll()` loads all records into memory
3. ❌ No caching implemented

### **Data Issues**:
1. ⚠️ Field inconsistency: `date` vs `dateOfBirth`
   - Which represents registration date? Which represents birth date?

---

## 📋 API Summary Table

| # | Method | Endpoint | Purpose | Key Feature |
|---|--------|----------|---------|-------------|
| 1 | POST | `/banking/CreateAccount` | Create account | Manual mapping, no age calc |
| 2 | GET | `/banking/View` | Get all accounts | No filtering |
| 3 | GET | `/banking/search/{id}` | Get by ID | Single customer |
| 4 | PUT | `/banking/update/{id}` | Update customer | Overwrites all fields |
| 5 | GET | `/banking/deactive/{id}` | Deactivate account | Sets active=false |
| 6 | GET | `/banking/active` | Get active only | Filters active=true |
| 7 | POST | `/banking` | Create with age calc | Validates age>=18 |
| 8 | GET | `/banking/highincome` | Get high earners | Income > 100K |
| 9 | GET | `/banking` | Get sorted | Supports sortBy & order |

---

## 🧪 Quick Testing Commands

```bash
# Create account
curl -X POST http://localhost:8080/banking/CreateAccount \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","phoneNumber":9876543210,"address":"123 St","country":"USA","city":"NYC","income":50000,"date":"2024-02-18"}'

# Get all
curl http://localhost:8080/banking/View

# Search by ID
curl http://localhost:8080/banking/search/1

# Get active customers
curl http://localhost:8080/banking/active

# Get sorted by income descending
curl "http://localhost:8080/banking?sortBy=income&order=desc"

# Deactivate customer
curl http://localhost:8080/banking/deactive/1
```

---

## 📝 Database Configuration

**Database**: MySQL
**Host**: localhost
**Port**: 3306
**Database Name**: `hello`
**Username**: root
**Password**: kille@2004
**Auto Schema**: `update` (creates/updates tables automatically)

