# Alcoa Scaffolding API Documentation

## Table of Contents
- [Overview](#overview)
- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)
- [Endpoints](#endpoints)
- [Request/Response Examples](#requestresponse-examples)
- [Error Codes](#error-codes)
- [Email Templates](#email-templates)

## Overview

**Base URL:** `http://localhost:5000` (development)  
**Version:** 1.0.0  
**Content-Type:** `application/json`

## Authentication

Currently, the API does not require authentication for public endpoints. All email endpoints are protected by rate limiting.

## Rate Limiting

### General API Endpoints
- **Window:** 15 minutes
- **Max Requests:** 100 per IP
- **Reset:** Automatic after window expires

### Email Endpoints
- **Window:** 1 hour
- **Max Requests:** 10 per IP/email combination
- **Reset:** Automatic after window expires

**Rate Limit Response:**
```json
{
  "success": false,
  "error": "Too many requests",
  "message": "You have exceeded the rate limit. Please try again later.",
  "retryAfter": "3600"
}
```

## Endpoints

### 1. Health Check

Check API status and configuration.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "OK",
  "message": "Alcoa Scaffolding API is running",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "environment": "development",
  "emailConfigured": true,
  "version": "1.0.0"
}
```

---

### 2. Send Contact Form

Submit a contact form inquiry.

**Endpoint:** `POST /api/email/send-contact`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "string (required, 2-100 chars)",
  "email": "string (required, valid email)",
  "phone": "string (required, valid phone)",
  "company": "string (optional, max 200 chars)",
  "projectType": "string (optional)",
  "message": "string (required, 10-5000 chars)"
}
```

**Project Types:**
- `residential`
- `commercial`
- `industrial`
- `emergency`
- `rental`
- `consultation`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully. We will contact you within 2 hours."
}
```

**Validation Error Response (400):**
```json
{
  "error": "Validation failed",
  "details": {
    "name": "Name is required",
    "email": "Invalid email format",
    "phone": "Phone number is required",
    "message": "Message must be at least 10 characters long"
  }
}
```

---

### 3. Send Quote Request

Submit a quote request with project details.

**Endpoint:** `POST /api/email/send-quote`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "string (required, 2-100 chars)",
  "email": "string (required, valid email)",
  "phone": "string (required, valid phone)",
  "company": "string (optional, max 200 chars)",
  "projectType": "string (optional)",
  "message": "string (optional, max 5000 chars)",
  "projectHeight": "number (optional, 0-1000 meters)",
  "coverageArea": "number (optional, 0-100000 sqm)",
  "duration": "string (optional)",
  "startDate": "string (optional, date format)"
}
```

**Duration Options:**
- `1-7 days`
- `1-4 weeks`
- `1-3 months`
- `3+ months`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Quote request sent successfully. We will send you a quote within 24 hours."
}
```

---

### 4. Test Email Configuration

Test email service configuration (development only).

**Endpoint:** `GET /api/email/test`

**Available:** Development mode only

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email configuration is valid"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "message": "Invalid login credentials"
}
```

---

## Request/Response Examples

### Contact Form Example

**cURL:**
```bash
curl -X POST http://localhost:5000/api/email/send-contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed Mohammed",
    "email": "ahmed@example.com",
    "phone": "+971581375601",
    "company": "Dubai Construction LLC",
    "projectType": "commercial",
    "message": "We need scaffolding for a 20-story building project in Dubai Marina. Please provide a quote."
  }'
```

**JavaScript (Fetch):**
```javascript
const response = await fetch('http://localhost:5000/api/email/send-contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Ahmed Mohammed',
    email: 'ahmed@example.com',
    phone: '+971581375601',
    company: 'Dubai Construction LLC',
    projectType: 'commercial',
    message: 'We need scaffolding for a 20-story building project in Dubai Marina.'
  })
});

const data = await response.json();
console.log(data);
```

**Axios:**
```javascript
import axios from 'axios';

const sendContactForm = async (formData) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/email/send-contact',
      formData
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error.response.data);
    throw error;
  }
};
```

---

### Quote Request Example

**cURL:**
```bash
curl -X POST http://localhost:5000/api/email/send-quote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Ali",
    "email": "sarah@construction.ae",
    "phone": "+971501234567",
    "company": "Emirates Projects",
    "projectType": "industrial",
    "message": "Urgent requirement for industrial project",
    "projectHeight": "15",
    "coverageArea": "800",
    "duration": "1-3 months",
    "startDate": "2024-02-15"
  }'
```

**React Example:**
```javascript
import { useState } from 'react';

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
    projectHeight: '',
    coverageArea: '',
    duration: '',
    startDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/email/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send quote request');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

---

## Error Codes

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 400 | Bad Request | Validation error or invalid input |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Endpoint not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Email service unavailable |

### Error Response Format

```json
{
  "success": false,
  "error": "Error message",
  "details": {
    // Additional error details (development mode only)
  }
}
```

### Common Validation Errors

**Invalid Email:**
```json
{
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format"
  }
}
```

**Missing Required Fields:**
```json
{
  "error": "Validation failed",
  "details": {
    "name": "Name is required",
    "phone": "Phone number is required",
    "message": "Message is required"
  }
}
```

**Invalid Phone Number:**
```json
{
  "error": "Validation failed",
  "details": {
    "phone": "Invalid phone number format"
  }
}
```

**Message Too Short:**
```json
{
  "error": "Validation failed",
  "details": {
    "message": "Message must be at least 10 characters long"
  }
}
```

---

## Email Templates

### Contact Form Emails

#### 1. Company Notification Email

Sent to: `alcoaaluminiumscaffolding1@gmail.com`

**Subject:** 🔔 New Contact Form Submission from [Name]

**Content:**
- Customer name, email, phone
- Company (if provided)
- Project type (if selected)
- Message
- Submission timestamp (UAE time)

#### 2. Customer Auto-Reply Email

Sent to: Customer's email address

**Subject:** Thank You for Contacting Alcoa Aluminium Scaffolding

**Content:**
- Personalized greeting
- Confirmation of message receipt
- Response time commitment (2 hours)
- Copy of submitted message
- Contact information for urgent matters
- Company address and emergency hotline

---

### Quote Request Emails

#### 1. Company Quote Notification

Sent to: `alcoaaluminiumscaffolding1@gmail.com`

**Subject:** 💰 New Quote Request from [Name]

**Content:**
- Project details (height, area, duration, start date)
- Customer contact information
- Project type
- Additional notes
- Priority flag (24-hour response)

#### 2. Customer Quote Confirmation

Sent to: Customer's email address

**Subject:** Your Quote Request - Alcoa Aluminium Scaffolding

**Content:**
- Quote request confirmation
- Expected quotation delivery time (24 hours)
- Contact information for follow-up
- Business hours

---

## Best Practices

### 1. Error Handling

Always handle both successful and error responses:

```javascript
try {
  const response = await fetch(url, options);
  const data = await response.json();
  
  if (response.ok) {
    // Handle success
    console.log(data.message);
  } else {
    // Handle error
    console.error(data.error);
    if (data.details) {
      // Display validation errors
      Object.keys(data.details).forEach(field => {
        console.error(`${field}: ${data.details[field]}`);
      });
    }
  }
} catch (error) {
  // Handle network errors
  console.error('Network error:', error);
}
```

### 2. Rate Limiting

Implement client-side rate limiting to prevent hitting the API limits:

```javascript
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 5000; // 5 seconds

const sendEmail = async (data) => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    alert('Please wait before sending another request');
    return;
  }
  
  lastRequestTime = now;
  // Make API call
};
```

### 3. Input Validation

Validate inputs on the client side before sending:

```javascript
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone) => {
  return /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(phone);
};
```

### 4. Security

- Always use HTTPS in production
- Never expose API keys in client code
- Sanitize user inputs before submission
- Implement CSRF protection if using cookies

---

## Support

For API support or questions:

- **Email:** alcoaaluminiumscaffolding1@gmail.com
- **Phone:** +971 58 137 5601
- **Emergency:** 24/7 Hotline Available

---

**Last Updated:** January 2024  
**Version:** 1.0.0

