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

## 📦 Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/ShwetaYadav224/Chillstream.git
cd Chillstream
Make sure you have Node.js (v18+) and npm installed. Then run:
npm install
Chillstream requires a TMDB API key. Create a .env file in the root directory:
touch .env
Start the app locally
npm run dev
