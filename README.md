# Next.js Product Management App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Setup Environment Variables

Create a `.env.local` file by copying the example file:

```bash
cp .env.example .env.local
```

Update the environment variables inside `.env.local` according to your configuration.

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app in your browser.

---

## 📁 Folder Structure

Below is the folder structure with explanations:

### `/app`

Contains application routes.

```
app/
  └── product/
        ├── page.tsx        # Product list or main page
        └── [id]/
              └── page.tsx  # Dynamic product details/edit page
  
```

### `/module`

Encapsulates UI logic for specific features.

```
module/
  └── product/
        ├── list/          # Product listing UI
        ├── manage/        # Product create/edit UI
        ├── types/         # Types for all product page specific section
        ├── static/        # Product static constant or data
        └── modal/         # Modals specific to product
```

### `/styles`

All SCSS files related to UI styles.

```
styles/
  ├── antd-override.scss   # Ant Design style overrides
  ├── utility-class.scss   # Utility classes
  ├── color.scss           # Color variables
  ├── reset.scss           # CSS Reset
  └── globals.scss         # Global styles
```

### `/Wrapper`

Reusable form and UI components wrapping Ant Design or custom components.

```
Wrapper/
  ├── ButtonWrapper.tsx
  ├── CardWrapper.tsx
  ├── InputWrapper.tsx
  ├── LayoutWrapper.tsx
  ├── ModalWrapper.tsx
  ├── SelectWrapper.tsx
  └── ...other wrappers
```

### `/Common Component`

Shared UI components across pages.

```
Common Component/
  ├── NotFoundPage
  ├── Skeletonloader
  ├── Toast
  ├── ViewDetailsModal
  ├── NavLink
  ├── DynamicPageLayout
  ├── Header
  ├── Footer
  └── Sidenav
```

### `/Utils`

Utility functions used throughout the app.

```
Utils/
  ├── getBase64
  ├── hexToRGBA
  ├── isLightColor
  ├── errorMsg
  ├── metaTitle
  ├── getCurrentPath
  ├── getCardTitle
  ├── getDecimal
  └── modalCloseHandler
```

### `/Types`

Common TypeScript type definitions.

```
Types/
  ├── ModalPropTypes
  └── responseType
```

### `/Store`

Redux slices for state management.

```
Store/
  ├── menu
  ├── theme
  └── user
```

---

## 🛠 Tech Stack

- **Framework:** Next.js
- **Styling:** SCSS, Ant Design
- **State Management:** Redux Toolkit
- **Type Checking:** TypeScript

---

## ✅ TODO

- [ ] Add tests
- [ ] Add CI/CD pipeline
- [ ] Write component documentation

---

## 📌 Notes

- Always create new modals/components inside their respective module folder.
- Keep wrappers generic and reusable.
- Update `.env.local` if you add new environment variables.

---

## 👥 Contributors

Feel free to add contributor names here if you're collaborating.

---
