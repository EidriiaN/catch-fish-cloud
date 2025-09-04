"use client";

import { Box, Button, Container, Flex, Grid, Heading, Icon, SimpleGrid, Stack, Text, VStack, Circle, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { FaMapMarkerAlt, FaUserPlus, FaClock } from "react-icons/fa";
import Hero from "@/components/ui/Hero";

export default function Home() {
  return (
    <Box fontFamily="body">
      {/* Hero Section */}
      <Hero
        title="Discover Private Fishing Paradises"
        subtitle="Find, reserve, and enjoy exclusive access to premium fishing lakes and ponds."
        ctaText="Find Lakes"
        ctaLink="/lakes"
        secondaryCtaText="Sign Up"
        secondaryCtaLink="/auth/register"
      />

      {/* Features Section */}
      <Box py={16} bg="white">
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" textAlign="center" mb={12} color="gray.900">
            Why Choose FishingLakes?
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <VStack bg="green.50" p={6} rounded="lg" textAlign="center" spacing={4}>
              <Circle size="16" bg="green.500" color="white">
                <Icon as={FaMapMarkerAlt} boxSize={8} />
              </Circle>
              <Heading as="h3" size="md" color="gray.900">
                Exclusive Locations
              </Heading>
              <Text color="gray.700">Access private lakes and ponds not available to the general public.</Text>
            </VStack>

            <VStack bg="green.50" p={6} rounded="lg" textAlign="center" spacing={4}>
              <Circle size="16" bg="green.500" color="white">
                <Icon as={FaUserPlus} boxSize={8} />
              </Circle>
              <Heading as="h3" size="md" color="gray.900">
                Premium Experience
              </Heading>
              <Text color="gray.700">Enjoy well-stocked waters, better catch rates, and less crowded fishing spots.</Text>
            </VStack>

            <VStack bg="green.50" p={6} rounded="lg" textAlign="center" spacing={4}>
              <Circle size="16" bg="green.500" color="white">
                <Icon as={FaClock} boxSize={8} />
              </Circle>
              <Heading as="h3" size="md" color="gray.900">
                Easy Reservations
              </Heading>
              <Text color="gray.700">Book your fishing time in advance to ensure availability.</Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* How It Works */}
      <Box py={16} bg="gray.50">
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" textAlign="center" mb={12} color="gray.900">
            How It Works
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
            <VStack textAlign="center" spacing={4}>
              <Circle size="12" bg="green.500" color="white" fontWeight="bold">
                1
              </Circle>
              <Heading as="h3" size="md" color="gray.900">
                Create Account
              </Heading>
              <Text color="gray.700">Sign up and create your profile in minutes.</Text>
            </VStack>

            <VStack textAlign="center" spacing={4}>
              <Circle size="12" bg="green.500" color="white" fontWeight="bold">
                2
              </Circle>
              <Heading as="h3" size="md" color="gray.900">
                Discover Lakes
              </Heading>
              <Text color="gray.700">Browse through our selection of premium fishing spots.</Text>
            </VStack>

            <VStack textAlign="center" spacing={4}>
              <Circle size="12" bg="green.500" color="white" fontWeight="bold">
                3
              </Circle>
              <Heading as="h3" size="md" color="gray.900">
                Make Reservation
              </Heading>
              <Text color="gray.700">Book your preferred date and pond.</Text>
            </VStack>

            <VStack textAlign="center" spacing={4}>
              <Circle size="12" bg="green.500" color="white" fontWeight="bold">
                4
              </Circle>
              <Heading as="h3" size="md" color="gray.900">
                Go Fishing!
              </Heading>
              <Text color="gray.700">Enjoy your exclusive fishing experience.</Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box py={16} bg="green.700" color="white">
        <Container maxW="container.xl" textAlign="center">
          <Heading as="h2" size="xl" mb={6}>
            Ready to Find Your Perfect Fishing Spot?
          </Heading>
          <Text fontSize="xl" mb={8} maxW="2xl" mx="auto">
            Join thousands of anglers who&apos;ve discovered premium fishing through our platform.
          </Text>
          <Button as={Link} href="/lakes" bg="white" color="green.700" _hover={{ bg: "gray.100" }} size="lg" fontWeight="medium">
            Browse Lakes Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
