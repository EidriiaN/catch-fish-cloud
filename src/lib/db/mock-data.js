// Mock data for development
export const mockLakes = [
  {
    id: "1",
    name: "Blue Pond Retreat",
    description: "A peaceful lake surrounded by lush forests, perfect for a quiet day of fishing.",
    location: {
      address: "123 Forest Rd, Lakeville, CA",
      coordinates: { lat: 34.0522, lng: -118.2437 },
    },
    images: ["/images/lake1-1.jpg", "/images/lake1-2.jpg"],
    price: {
      dayPass: 25,
      weekendPass: 40,
    },
    ponds: [
      {
        id: "p1",
        name: "North Pond",
        coordinates: [
          { lat: 34.0525, lng: -118.2437 },
          { lat: 34.0525, lng: -118.243 },
          { lat: 34.052, lng: -118.243 },
          { lat: 34.052, lng: -118.2437 },
        ],
        fishTypes: ["Bass", "Catfish"],
        maxCapacity: 4,
      },
      {
        id: "p2",
        name: "South Pond",
        coordinates: [
          { lat: 34.0515, lng: -118.2437 },
          { lat: 34.0515, lng: -118.243 },
          { lat: 34.051, lng: -118.243 },
          { lat: 34.051, lng: -118.2437 },
        ],
        fishTypes: ["Trout", "Perch"],
        maxCapacity: 6,
      },
    ],
    rating: 4.7,
    reviews: [
      {
        id: "r1",
        userId: "u2",
        userName: "John Fisher",
        rating: 5,
        comment: "Excellent fishing spot! Caught my personal best bass here.",
        date: "2025-06-10",
      },
      {
        id: "r2",
        userId: "u3",
        userName: "Mike Angler",
        rating: 4,
        comment: "Beautiful location, good fish. Facilities could be better.",
        date: "2025-06-05",
      },
    ],
    ownerId: "u1",
  },
  {
    id: "2",
    name: "Mountain Stream Lodge",
    description: "High altitude crystal clear waters with premium fish stocking. A premium experience for serious anglers.",
    location: {
      address: "456 Mountain View, Highland, OR",
      coordinates: { lat: 45.5202, lng: -122.6742 },
    },
    images: ["/images/lake2-1.jpg", "/images/lake2-2.jpg"],
    price: {
      dayPass: 45,
      weekendPass: 80,
    },
    ponds: [
      {
        id: "p3",
        name: "Eagle Pond",
        coordinates: [
          { lat: 45.5205, lng: -122.6745 },
          { lat: 45.5205, lng: -122.6735 },
          { lat: 45.52, lng: -122.6735 },
          { lat: 45.52, lng: -122.6745 },
        ],
        fishTypes: ["Rainbow Trout", "Brown Trout"],
        maxCapacity: 5,
      },
    ],
    rating: 4.9,
    reviews: [
      {
        id: "r3",
        userId: "u4",
        userName: "Sarah Caster",
        rating: 5,
        comment: "Worth every penny! The trout are magnificent.",
        date: "2025-06-15",
      },
    ],
    ownerId: "u5",
  },
];

export const mockUsers = [
  {
    id: "u1",
    name: "Lake Admin One",
    email: "admin1@example.com",
    role: "admin",
    lakes: ["1"],
  },
  {
    id: "u2",
    name: "John Fisher",
    email: "john@example.com",
    role: "user",
    reservations: ["res1"],
  },
  {
    id: "u3",
    name: "Mike Angler",
    email: "mike@example.com",
    role: "user",
    reservations: ["res2"],
  },
  {
    id: "u4",
    name: "Sarah Caster",
    email: "sarah@example.com",
    role: "user",
    reservations: ["res3"],
  },
  {
    id: "u5",
    name: "Mountain Lodge Owner",
    email: "lodge@example.com",
    role: "admin",
    lakes: ["2"],
  },
];

export const mockReservations = [
  {
    id: "res1",
    userId: "u2",
    lakeId: "1",
    pondId: "p1",
    date: "2025-07-20",
    status: "confirmed",
    price: 25,
    createdAt: "2025-07-01",
  },
  {
    id: "res2",
    userId: "u3",
    lakeId: "1",
    pondId: "p2",
    date: "2025-07-21",
    status: "pending",
    price: 25,
    createdAt: "2025-07-02",
  },
  {
    id: "res3",
    userId: "u4",
    lakeId: "2",
    pondId: "p3",
    date: "2025-07-25",
    status: "confirmed",
    price: 45,
    createdAt: "2025-07-05",
  },
];
