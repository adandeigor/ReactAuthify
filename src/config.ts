// example.config.ts

 const  config = {
    // Firebase configuration
    firebase: {
      apiKey: "your-firebase-api-key",
      authDomain: "your-firebase-auth-domain",
      projectId: "your-firebase-project-id",
      storageBucket: "your-firebase-storage-bucket",
      messagingSenderId: "your-firebase-messaging-sender-id",
      appId: "your-firebase-app-id",
    },
  
    // NextAuth configuration
    nextAuth: {
      secret: "your-nextauth-secret",
    },
  
    // Email configuration
    email: {
      smtp: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "your-smtp-username",
          pass: "your-smtp-password",
        },
      },
      projectName: "Your Project Name", // Used for email personalization
      from: "no-reply@yourdomain.com", // Default email sender
    },
  };

  export default config;