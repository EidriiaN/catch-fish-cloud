"use client";

import { useState, useEffect } from "react";
import { Container, Heading, Grid, GridItem, Text, Box, useColorModeValue } from "@chakra-ui/react";
import { mockLakes } from "@/lib/db/mock-data";
import { LakeCard } from "@/components/lakes/LakeCard";
import { LakesFilters } from "@/components/lakes/LakesFilters";
import { LakeSkeletonGrid } from "@/components/lakes/LakeCardSkeleton";

export default function Lakes() {
  const [lakes, setLakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPrice, setFilterPrice] = useState("all");
  const [filterRating, setFilterRating] = useState("all");

  // Simulate data loading from API
  useEffect(() => {
    const timer = setTimeout(() => {
      setLakes(mockLakes);
      setLoading(false);
    }, 800); // Slightly longer to show loading state

    return () => clearTimeout(timer);
  }, []);

  // Filter lakes based on search and filters
  const filteredLakes = lakes.filter((lake) => {
    // Filter by search term
    const matchesSearch =
      lake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lake.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lake.location.address.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by price
    let matchesPrice = true;
    if (filterPrice === "low") {
      matchesPrice = lake.price.dayPass < 30;
    } else if (filterPrice === "medium") {
      matchesPrice = lake.price.dayPass >= 30 && lake.price.dayPass < 50;
    } else if (filterPrice === "high") {
      matchesPrice = lake.price.dayPass >= 50;
    }

    // Filter by rating
    let matchesRating = true;
    if (filterRating === "4plus") {
      matchesRating = lake.rating >= 4;
    } else if (filterRating === "3plus") {
      matchesRating = lake.rating >= 3;
    }

    return matchesSearch && matchesPrice && matchesRating;
  });

  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Container maxW="container.xl" py={8} px={{ base: 4, md: 6 }}>
      <Heading as="h1" size="xl" textAlign="center" mb={8} color={useColorModeValue("gray.800", "white")}>
        Găsește locul perfect pentru pescuit
      </Heading>

      {/* Search and Filters */}
      <LakesFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterPrice={filterPrice}
        setFilterPrice={setFilterPrice}
        filterRating={filterRating}
        setFilterRating={setFilterRating}
      />
      {/* Lake Listings */}
      {loading ? (
        <LakeSkeletonGrid count={6} />
      ) : filteredLakes.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Text fontSize="lg" color={textColor}>
            Nicio baltă nu corespunde criteriilor tale. Încearcă să ajustezi filtrele.
          </Text>
        </Box>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
        >
          {filteredLakes.map((lake) => (
            <GridItem key={lake.id}>
              <LakeCard lake={lake} />
            </GridItem>
          ))}
        </Grid>
      )}
    </Container>
  );
}
