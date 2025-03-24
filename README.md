# We Want Waste - Skip Selection Page Redesign

## Overview

This project is a **redesign of the skip selection page** for [We Want Waste](https://wewantwaste.co.uk/), improving its **UI/UX while keeping functionality intact**.  

### 🔹 Goals:
- **Modernize** the look and feel.
- **Improve responsiveness** for mobile and desktop.
- **Enhance user interactions** with a smooth and intuitive experience.
- **Ensure maintainable and scalable React code**.

## 🚀 Features & Implementation  

### 🔸 **State Management (Redux)**
- **Redux Toolkit (RTK Query)** was used for **efficient API data management**.
- API calls and state updates are handled through:
  - `redux/api/generalApiSlice.ts` – Base API setup.
  - `redux/bookSkip/skipApi.ts` – Fetches available skips.
  - `redux/bookSkip/skipSlice.ts` – Manages **selected skip** state.
- The global store is configured in `redux/store.ts`, defining `RootState` & `AppDispatch`.

---

### 🎨 **UI & UX Design**
- Built using **Tailwind CSS**, **Aceternity UI**, and **ShadCN**.
- Fully responsive across **mobile, tablet, and desktop** screens.

#### 🛠 **How the UI Works**
1. **Skip Selection Carousel**  
   - Displays available skips in a **smooth-scrolling carousel**.  
   - **Touch & mouse swipe support** (works like Apple's card scrolling, responding to swipe force).  
   - Includes **navigation buttons** for easy selection.  

2. **Skip Details Drawer**  
   - When a skip is selected, a **drawer slides in** showing skip details.  
   - Includes:
     - **Skip name & price**.
     - **Remove button** to deselect the skip.  
   - Closing the drawer does **not** deselect the skip (maintains state).
   - When there's a selected skip and the drawer closes, an animated button hangs below to open the drawer again

3. **Selection State Handling**  
   - Clicking a skip **updates `selectedSkip` in Redux**.
   - The selected skip remains highlighted in the carousel.  
   - If a skip is removed, the drawer **closes automatically**, and `selectedSkip` resets.  

---

### 🔗 **API Integration**
- Skip data is **dynamically fetched** from:
https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft

- API integration is handled via **RTK Query** in `skipApi.ts`.

---

## 📌 Setup & Installation

1. **Clone the repository**:
 ```bash
 git clone https://github.com/oechristophers/rem-test.git

 cd rem-test
```

 2. **Install dependencies**:

```bash
 yarn install

 Or using npm

 npm install

 ```

 ## 🎮 Live Demo
[Rem Test Link](https://rem-test.vercel.app/)

## 📝 Submission
- This project was completed as part of a front-end coding challenge for We Want Waste. The final submission was made via the provided form.


