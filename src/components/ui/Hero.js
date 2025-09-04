"use client";

import { Box, Button, Container, Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

export default function Hero({
  title,
  subtitle,
  image,
  ctaText = "Get Started",
  ctaLink = "/",
  secondaryCtaText,
  secondaryCtaLink,
  overlay = true,
  height = { base: "60vh", md: "80vh" },
  bg = "green.900",
  ...rest
}) {
  return (
    <Box position="relative" height={height} display="flex" alignItems="center" bg={bg} overflow="hidden" {...rest}>
      {/* Background image */}
      {image && (
        <Box
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          backgroundImage={`url(${image})`}
          backgroundSize="cover"
          backgroundPosition="center"
          zIndex={0}
        />
      )}

      {/* Overlay */}
      {overlay && (
        <Box
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          bg="green.900"
          opacity="0.85"
          bgGradient="linear(to-r, green.900, green.800)"
          zIndex={5}
        />
      )}

      <Container maxW="container.xl" position="relative" zIndex={10}>
        <Stack maxW="3xl" color="white" spacing={6}>
          <Heading as="h1" size="2xl" fontWeight="bold">
            {title}
          </Heading>

          {subtitle && <Text fontSize="xl">{subtitle}</Text>}

          <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
            <Button as={Link} href={ctaLink} colorScheme="green" size="lg" fontWeight="medium">
              {ctaText}
            </Button>

            {secondaryCtaText && (
              <Button as={Link} href={secondaryCtaLink || "/"} bg="white" color="green.800" _hover={{ bg: "gray.100" }} size="lg" fontWeight="medium">
                {secondaryCtaText}
              </Button>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
