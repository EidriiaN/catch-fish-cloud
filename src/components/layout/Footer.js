"use client";

import Link from "next/link";
import { Box, Container, SimpleGrid, Stack, Text, Flex, Heading, LinkBox, LinkOverlay, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box bg="gray.800" color="white">
      <Container maxW="7xl" py={12} px={{ base: 4, md: 6, lg: 8 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {/* Company Info */}
          <Stack spacing={4}>
            <Heading as="h3" size="md" mb={1}>
              Pește Prins
            </Heading>
            <Text color="gray.200" mb={4}>
              Conectăm pescarii cu cele mai bune locații private de pescuit.
            </Text>
            <Stack direction={"row"} spacing={4}>
              <Box as="a" href="#" color="gray.400" _hover={{ color: "white" }}>
                <Icon as={FaFacebook} w={6} h={6} />
              </Box>
              <Box as="a" href="#" color="gray.400" _hover={{ color: "white" }}>
                <Icon as={FaInstagram} w={6} h={6} />
              </Box>
              <Box as="a" href="#" color="gray.400" _hover={{ color: "white" }}>
                <Icon as={FaTwitter} w={6} h={6} />
              </Box>
            </Stack>
          </Stack>

          {/* Quick Links */}
          <Stack spacing={4}>
            <Heading as="h3" size="md" mb={2}>
              Linkuri utile
            </Heading>
            <Stack spacing={2}>
              <Text as={Link} href="/lakes" color="gray.200" _hover={{ color: "white" }}>
                Caută bălți
              </Text>
              <Text as={Link} href="/auth/login" color="gray.200" _hover={{ color: "white" }}>
                Autentificare
              </Text>
              <Text as={Link} href="/auth/register" color="gray.200" _hover={{ color: "white" }}>
                Înregistrare
              </Text>
              <Text as={Link} href="/about" color="gray.200" _hover={{ color: "white" }}>
                Despre noi
              </Text>
              <Text as={Link} href="/contact" color="gray.200" _hover={{ color: "white" }}>
                Contact
              </Text>
            </Stack>
          </Stack>

          {/* Contact Info */}
          <Stack spacing={4}>
            <Heading as="h3" size="md" mb={2}>
              Contactează-ne
            </Heading>
            <Box as="address" fontStyle="normal" color="gray.200">
              <Text>Str. Pescuitului 1234</Text>
              <Text>Lakeville, CA 90210</Text>
              <Text mt={2}>
                Email:{" "}
                <Box as="a" href="mailto:info@pesteprins.ro" _hover={{ color: "white" }}>
                  info@pesteprins.ro
                </Box>
              </Text>
              <Text>
                Telefon:{" "}
                <Box as="a" href="tel:+1-555-123-4567" _hover={{ color: "white" }}>
                  (555) 123-4567
                </Box>
              </Text>
            </Box>
          </Stack>
        </SimpleGrid>

        <Box mt={8} pt={8} borderTopWidth={1} borderColor="gray.700">
          <Text color="gray.200" textAlign="center">
            &copy; {currentYear} Pește Prins. Toate drepturile rezervate.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
