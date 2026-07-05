# WanderStay — Hotel Search App

A React app for browsing, searching, filtering, and saving hotels from the
[Hotel Search API](https://demohotelsapi.pythonanywhere.com/).

## Features

- Live API integration with in-memory caching
- Search by name/city, filters (city, price, rating), sorting
- Client-side pagination
- Hotel detail page with photo gallery
- Favorites saved to localStorage
- Dark mode (persisted, respects system preference)
- Loading, error, and empty states throughout

## Tech stack

React 19 + Vite, React Router, plain CSS with custom properties.

## Running locally

\`\`\`bash
npm install
npm run dev
\`\`\`

## A note on the API

The API's \`limit\`/\`skip\` params don't reliably slice the response, so this
app fetches the full hotel list once and filters/sorts/paginates on the
client — this also makes filtering feel instant.