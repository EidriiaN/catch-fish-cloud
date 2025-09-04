# FishingLakes - Connecting Anglers with Private Fishing Spots

FishingLakes is a web application for connecting fishermen with private fishing lakes. The platform allows lake administrators to list their lakes/ponds and manage reservations, while fishermen can discover, book, and review fishing locations.

## Project Overview

This project is built with Next.js 15+ and uses Chakra UI for a modern, responsive design. It's structured to provide a seamless experience for both anglers looking for premium fishing spots and lake owners managing their properties.

## Key Features

- **Discover Lakes**: Browse through a curated list of private fishing lakes with detailed information
- **Advanced Filtering**: Find lakes by price range, rating, and specific amenities
- **Interactive Maps**: View lake locations and explore individual ponds with Leaflet.js
- **Reservation System**: Book your fishing spot in advance with date and pond selection
- **User Dashboard**: Manage your bookings, reviews, and preferences
- **Admin Dashboard**: For lake owners to manage their listings, reservations, and customer feedback
- **Reviews & Ratings**: Share your experiences and read what others have to say

## Technology Stack

- **Frontend**: Next.js with React (JavaScript)
- **Styling**: Chakra UI
- **Authentication**: Custom auth during development → Firebase Auth
- **Database**: Firebase (Firestore)
- **Maps**: Leaflet.js with OpenStreetMap → Google Maps API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/EidriiaN/catch-fish-cloud.git
cd catch-fish-cloud
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## Project Structure

```
src/
  app/                     # Next.js App Router structure
    api/                   # API routes
    auth/                  # Authentication pages
    lakes/                 # Lake listing and details
    dashboard/             # User and admin dashboards
  components/              # Reusable components
    layout/                # Layout components (Navbar, Footer)
    ui/                    # UI components (buttons, cards, etc.)
    maps/                  # Map-related components
    lakes/                 # Lake-specific components
    reservations/          # Reservation-related components
    reviews/               # Review-related components
  lib/                     # Utilities and services
    auth/                  # Authentication logic
    db/                    # Database operations
    utils/                 # Helper functions
    theme/                 # Chakra UI theme customization
```

## Development Status

The project is currently in active development. Here's an overview of the current status:

### Completed

- ✅ Project setup with Next.js and Chakra UI
- ✅ Basic page structure and navigation
- ✅ Responsive UI components and layouts
- ✅ Mock data integration for development
- ✅ Lake listing page with filters and search
- ✅ Fixed hydration errors and component structure

### In Progress

- 🔄 Lake detail page with maps and reservation form
- 🔄 User and admin dashboards
- 🔄 Reservation system implementation
- 🔄 Review submission and display

### Planned

- Firebase integration for authentication and data storage
- Enhanced map features with pond selection
- Admin tools for lake management
- Deployment and production setup

For a more detailed development plan, see [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
