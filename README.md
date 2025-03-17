# 🛒 College-Centric Grocery Delivery System

## 🚀 About This Project
This is a **Web2-based grocery delivery system** tailored for college students and sellers. The platform allows sellers to manage their stores and products while providing users with a seamless shopping experience.

## 🌟 Features Implemented
### 🔐 Authentication
- **Google Authentication** using NextAuth.js for user login 
- Secure session management
- JWT-based authentication with MongoDB for seller

### 🏪 Seller Dashboard
- **Manage store & products**
- View **recent orders** and **sales data**
- Fetch seller-specific products from MongoDB
- Implemented **server-side rendering (SSR)** for optimized performance

### 📦 Product Management
- Sellers can **add products**
- Image uploads handled via **Cloudinary**
- Products are stored in **MongoDB**

### 🛍️ User Shopping Experience
- **Product search & filtering**
- **Category-based navigation**
- View **store details** dynamically using Next.js **dynamic routing**
- Secure checkout process

### 🏗️ Tech Stack & Tools Used
- **Frontend:** Next.js (App Router) + TypeScript
- **Backend:** Node.js + Express.js (via Next.js API routes)
- **Database:** MongoDB (via Mongoose ORM)
- **Authentication:** NextAuth.js (Google Auth)
- **Image Hosting:** Cloudinary
- **Styling:** Tailwind CSS + shadcn/ui
- **UI Components:** shadcn/ui + v0.dev (by Vercel)

## 🛠️ Installation & Setup
1. Clone the repo:
   ```sh
   git clone https://github.com/gdevansh16082004/grocery.git
   ```
2. Install dependencies:
   ```sh
   cd your-project-folder
   npm install
   ```
3. Set up environment variables in a `.env.local` file:
   ```env
   MONGODB_URI=your-mongodb-uri
   NEXTAUTH_SECRET=your-next-auth-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser. 🚀

## 📜 Credits
- **[shadcn/ui](https://ui.shadcn.com/)** - UI Components
- **[v0.dev by Vercel](https://v0.dev/)** - AI-powered UI generation
- **[Cloudinary](https://cloudinary.com/)** - Image hosting
- **[Google Authentication](https://developers.google.com/identity)** - OAuth login via NextAuth.js




