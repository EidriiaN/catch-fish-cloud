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
        title="Descoperă paradisuri private pentru pescuit"
        subtitle="Caută, rezervă și bucură-te de acces exclusiv la bălți și lacuri premium."
        ctaText="Caută bălți"
        ctaLink="/lakes"
        secondaryCtaText="Creează cont"
        secondaryCtaLink="/auth/register"
      />

      {/* Features Section */}
      <Box py={16} bg="white">
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" textAlign="center" mb={12} color="gray.900">
            De ce să alegi Pește Prins?
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <VStack bg="green.50" p={6} rounded="lg" textAlign="center" spacing={4}>
              <Circle size="16" bg="green.500" color="white">
                <Icon as={FaMapMarkerAlt} boxSize={8} />
              </Circle>
              <Heading as="h3" size="md" color="gray.900">
                Locații exclusive
              </Heading>
              <Text color="gray.700">Acces la lacuri și bălți private, indisponibile publicului larg.</Text>
            </VStack>

            <VStack bg="green.50" p={6} rounded="lg" textAlign="center" spacing={4}>
              <Circle size="16" bg="green.500" color="white">
                <Icon as={FaUserPlus} boxSize={8} />
              </Circle>
              <Heading as="h3" size="md" color="gray.900">
                Experiență premium
              </Heading>
              <Text color="gray.700">Bucură-te de ape bine populate, șanse mai mari la capturi și locuri mai puțin aglomerate.</Text>
            </VStack>

            <VStack bg="green.50" p={6} rounded="lg" textAlign="center" spacing={4}>
              <Circle size="16" bg="green.500" color="white">
                <Icon as={FaClock} boxSize={8} />
              </Circle>
              <Heading as="h3" size="md" color="gray.900">
                Rezervări ușoare
              </Heading>
              <Text color="gray.700">Programează din timp sesiunea de pescuit pentru a-ți asigura locul.</Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* How It Works */}
      <Box py={16} bg="gray.50">
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" textAlign="center" mb={12} color="gray.900">
            Cum funcționează
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
            <VStack textAlign="center" spacing={4}>
              <Circle size="12" bg="green.500" color="white" fontWeight="bold">
                1
              </Circle>
              <Heading as="h3" size="md" color="gray.900">
                Creează-ți cont
              </Heading>
              <Text color="gray.700">Înscrie-te și creează-ți profilul în câteva minute.</Text>
            </VStack>

            <VStack textAlign="center" spacing={4}>
              <Circle size="12" bg="green.500" color="white" fontWeight="bold">
                2
              </Circle>
              <Heading as="h3" size="md" color="gray.900">
                Descoperă bălți și lacuri
              </Heading>
              <Text color="gray.700">Răsfoiește selecția noastră de locuri premium pentru pescuit.</Text>
            </VStack>

            <VStack textAlign="center" spacing={4}>
              <Circle size="12" bg="green.500" color="white" fontWeight="bold">
                3
              </Circle>
              <Heading as="h3" size="md" color="gray.900">
                Fă o rezervare
              </Heading>
              <Text color="gray.700">Alege data dorită și heleșteul preferat.</Text>
            </VStack>

            <VStack textAlign="center" spacing={4}>
              <Circle size="12" bg="green.500" color="white" fontWeight="bold">
                4
              </Circle>
              <Heading as="h3" size="md" color="gray.900">
                Hai la pescuit!
              </Heading>
              <Text color="gray.700">Bucură-te de o experiență de pescuit exclusivă.</Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box py={16} bg="green.700" color="white">
        <Container maxW="container.xl" textAlign="center">
          <Heading as="h2" size="xl" mb={6}>
            Gata să-ți găsești locul perfect de pescuit?
          </Heading>
          <Text fontSize="xl" mb={8} maxW="2xl" mx="auto">
            Alătură-te miilor de pescari care au descoperit pescuitul premium prin platforma noastră.
          </Text>
          <Button as={Link} href="/lakes" bg="white" color="green.700" _hover={{ bg: "gray.100" }} size="lg" fontWeight="medium">
            Vezi bălțile disponibile
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
