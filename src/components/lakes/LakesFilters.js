"use client";

import { useState } from "react";
import { Box, Input, InputGroup, InputLeftElement, Select, Grid, GridItem, FormLabel, Stack, useColorModeValue } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const LakesFilters = ({ searchTerm, setSearchTerm, filterPrice, setFilterPrice, filterRating, setFilterRating }) => {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box bg={bg} p={6} borderRadius="lg" boxShadow="md" mb={8} borderWidth="1px" borderColor={borderColor}>
      <Stack spacing={4}>
        <Box mb={4}>
          <FormLabel htmlFor="search" fontWeight="medium">
            Caută bălți
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              id="search"
              placeholder="Caută după nume, descriere sau locație"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="filled"
            />
          </InputGroup>
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
          <GridItem>
            <FormLabel htmlFor="priceFilter" fontWeight="medium">
              Interval de preț
            </FormLabel>
            <Select id="priceFilter" value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)} variant="filled">
              <option value="all">Toate prețurile</option>
              <option value="low">Economic (sub $30)</option>
              <option value="medium">Standard ($30-$50)</option>
              <option value="high">Premium ($50+)</option>
            </Select>
          </GridItem>

          <GridItem>
            <FormLabel htmlFor="ratingFilter" fontWeight="medium">
              Rating minim
            </FormLabel>
            <Select id="ratingFilter" value={filterRating} onChange={(e) => setFilterRating(e.target.value)} variant="filled">
              <option value="all">Toate ratingurile</option>
              <option value="3plus">3+ stele</option>
              <option value="4plus">4+ stele</option>
            </Select>
          </GridItem>
        </Grid>
      </Stack>
    </Box>
  );
};
