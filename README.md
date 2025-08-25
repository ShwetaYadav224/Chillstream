# 🎬 Chillstream

Chillstream is a **Netflix-style streaming clone** built with React, TypeScript, and Vite. It uses the **TMDB API** to fetch movies, TV shows, genres, and search results. Explore trending content, search for your favorites, and view detailed info including trailers and credits.

---

## 🚀 Features

- Browse **Popular, Top Rated, Trending, Now Playing, and Upcoming Movies**  
- Explore **Popular, Top Rated, and On-Air TV Shows**  
- **Search** for movies, TV shows, or both  
- View **Movie/TV show details** with trailers, images, and credits  
- Fully **responsive design** for mobile, tablet, and desktop  
- **ESLint + TypeScript** for type-safe, maintainable, and production-ready code

---

## 🛠 Tech Stack

| Layer              | Technology / Tool           |
|-------------------|-----------------------------|
| Frontend Library   | React                       |
| Language           | TypeScript                  |
| Bundler            | Vite                        |
| Styling            | CSS                         |
| API                | [TMDB API](https://developer.themoviedb.org/) |
| Linting            | ESLint + type-aware rules, react-x & react-dom plugins |

---

## 🌐 APIs Used

- **TMDB (The Movie Database) API**  
  - Fetch movies, TV shows, genres, and search results  
  - Image handling via TMDB base URL (`w500` for posters, `w1280` for backdrops)

---

## 🔗 Live Link

[https://chillstream.pages.dev/](https://chillstream.pages.dev/)

---

## 📦 Installation & Setup

Follow these steps to run **Chillstream** locally:

### 1. Clone the repository

```bash
git clone https://github.com/ShwetaYadav224/Chillstream.git
cd Chillstream
````

### 2. Install dependencies

Make sure you have **Node.js (v18+)** and **npm** installed. Then run:

```bash
npm install
```

### 3. Create a `.env` file

Chillstream requires a **TMDB API key**. Create a `.env` file in the root directory:

```bash
touch .env
```

Add your API key inside `.env`:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

> You can get your API key from [TMDB](https://www.themoviedb.org/).

### 4. Start the development server

```bash
npm run dev
```

Open your browser at:

```
http://localhost:5173
```

### 5. Optional: Build for production

```bash
npm run build
```

This generates a production-ready `dist/` folder that can be deployed to **Vercel, Netlify**, or any static hosting platform.

---

## 📁 Project Structure

```
Chillstream/
├── public/               # Static assets
├── src/
│   ├── api/              # TMDB API functions
│   ├── components/       # Reusable React components
│   ├── pages/            # Page-level components
│   └── App.tsx           # Main React component
├── .eslintrc.js          # ESLint configuration (type-aware rules)
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── package.json          # NPM dependencies
└── README.md             # Project documentation
```



