/**
 * Application Configuration
 * Central configuration file for application settings
 */

module.exports = {
  // Server Configuration
  server: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
  },

  // CORS Configuration
  cors: {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, curl)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        // Local development (Vite default ports)
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:3000',
        'http://localhost:4173', // Vite preview
        'http://localhost:4174', // Vite preview
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174',
        // Production URLs
        process.env.FRONTEND_URL,
        // Netlify
        'https://alcoaaluminiumscaffolding.netlify.app',
        'https://alcoa-aluminium-scaffolding.netlify.app',
        // Render
        'https://alcoa-scaffolding.onrender.com',
        'https://alco-aluminium-scaffolding.onrender.com',
        // Vercel
        'https://alcoa-scaffolding.vercel.app',
        'https://alco-aluminium-scaffolding.vercel.app'
      ].filter(Boolean);
      
      // Check if origin matches any allowed origin
      const isAllowed = allowedOrigins.some(allowedOrigin => {
        if (!allowedOrigin) return false;
        // Exact match
        if (origin === allowedOrigin) return true;
        // Allow all subdomains of Vercel, Render, and Netlify
        if (origin.endsWith('.vercel.app') || 
            origin.endsWith('.onrender.com') || 
            origin.endsWith('.netlify.app')) return true;
        return false;
      });
      
      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked origin: ${origin}`);
        console.warn(`Allowed origins:`, allowedOrigins);
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
  },

  // Rate Limiting Configuration
  rateLimit: {
    // General API rate limit
    api: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP, please try again later.',
      standardHeaders: true,
      legacyHeaders: false
    },
    // Email-specific rate limit (stricter)
    email: {
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 10, // Limit each IP to 10 email requests per hour
      message: 'Too many emails sent from this IP, please try again after an hour.',
      standardHeaders: true,
      legacyHeaders: false
    }
  },

  // Email Configuration
  email: {
    responseTime: process.env.RESPONSE_TIME || '2 hours',
    emergencyHotline: process.env.EMERGENCY_HOTLINE || '+971 58 137 5601',
    supportEmail: process.env.SUPPORT_EMAIL || process.env.COMPANY_EMAIL || process.env.EMAIL_USER,
    companyName: process.env.COMPANY_NAME || 'Alcoa Aluminium Scaffolding',
    companyAddress: process.env.COMPANY_ADDRESS || 'Musaffah, Abu Dhabi, UAE',
    timezone: process.env.TIMEZONE || 'Asia/Dubai'
  },

  // Security Configuration
  security: {
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:']
        }
      }
    }
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    enableConsole: true,
    enableFile: process.env.NODE_ENV === 'production'
  }
};

