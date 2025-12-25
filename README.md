# Local LLM Maps Assistant — Backend API

This project implements a backend API that enables a Local LLM (or any client application) to search for places and locations using a maps data provider.

> **Provider Notice**  
> This project uses **OpenStreetMap (Nominatim)** instead of Google Maps due to billing constraints on testing accounts.  
> The API structure remains compatible and returns coordinates, address data, and Google Maps open-links for viewing locations or directions.

The API returns structured location data such as coordinates, address information, and links for opening the location or navigation in Google Maps.

---

## 🚀 Features

- Place search using **OpenStreetMap / Nominatim API**
- Secure backend API design (no public keys required)
- Backend built with **Node.js + Express**
- Returns structured JSON:
  - Place name & address
  - Latitude & longitude
  - Google Maps open link
  - Directions link
- Designed for integration with LLM / automation workflows

---

## 🧩 Tech Stack

- Node.js  
- Express  
- OpenStreetMap (Nominatim) API  
- dotenv  
- axios / fetch  

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
```

## 🏗️ How to Run the Project

Open terminal and run the following commands step by step:

```bash
# 1. Clone repository
git clone https://github.com/JabEfendi/Local-LLM-Maps-Assistant-Backend-API.git
cd Local-LLM-Maps-Assistant-Backend-API

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Server will run at:
echo "http://localhost:3000"
```
## 📡 API Endpoint

Search places using **OpenStreetMap (Nominatim)**.

```bash
# Endpoint
GET /places/search

# Query Parameters
# Name    Required    Description
# q       Yes         Search keyword (place / location name)

# Example Request
curl "http://localhost:3000/places/search?q=jakarta+cafe"

# Example Response
{
  "query": "jakarta cafe",
  "count": 3,
  "results": [
    {
      "name": "Starbucks, Jakarta",
      "lat": -6.20123,
      "lng": 106.8123,
      "address": { "...": "..." },
      "map_url": "https://www.google.com/maps?q=-6.20123,106.8123",
      "directions_url": "https://www.google.com/maps/dir/?api=1&destination=-6.20123,106.8123"
    }
  ]
}
```
