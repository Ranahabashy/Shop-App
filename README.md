# 🚀 Shop App

Modern e-commerce frontend built with **Next.js 16 (App Router)** following **Clean Architecture** principles.

---

## ✨ Features

- 🛍️ Product listing in responsive grid
- 🔍 Global search (Header search + mobile popup)
- 🧩 Filter by category
- 📄 Product details page
- 🔐 Authentication (login & register)
- 👤 User profile dropdown
- 🍪 JWT-based session using cookies
- ⚡ API proxy layer
- 🎯 Pagination with modern UI
- 🎨 Tailwind CSS UI
- 📱 Fully responsive

---

## 🧰 Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Zustand
- Axios
- Jose (JWT)

---

## 🏗️ Architecture

src/
  app/
  components/
  application/
  domain/
  infrastructure/
  lib/

---

## 🔌 API

Internal:
- /api/mock-auth/*
- /api/products/*

External:
- https://dummyjson.com/products

---

## ▶️ Run

npm install  
npm run dev

http://localhost:3000
