"use client";

import { Box, Image, Heading, Text, Flex, Badge, Button, Stack, useColorModeValue } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/format";

export const LakeCard = ({ lake }) => {
  const { id, name, description, location, rating, reviews, price } = lake;

  // Generate stars for rating display
  const generateStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} color="yellow.400" />);
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<StarIcon key="half" color="yellow.400" opacity={0.6} />);
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarIcon key={`empty-${i}`} color="gray.300" />);
    }

    return stars;
  };

  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const priceColor = useColorModeValue("green.600", "green.300");

  return (
    <Box
      bg={bg}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      h="full"
      display="flex"
      flexDirection="column"
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "xl",
      }}
    >
      <Box position="relative" h="200px" bgColor="gray.200" overflow="hidden">
        {lake.images && lake.images.length > 0 ? (
          <Image
            src={lake.images[0]}
            alt={`${name} image`}
            objectFit="cover"
            w="full"
            h="full"
            fallback={
              <Box w="full" h="full" bg="gray.200" display="flex" alignItems="center" justifyContent="center">
                <Text>Lake Image</Text>
              </Box>
            }
          />
        ) : (
          <Flex w="full" h="full" alignItems="center" justifyContent="center" bg="gray.200">
            <Text color="gray.700">Lake Image Placeholder</Text>
          </Flex>
        )}
      </Box>

      <Stack p={4} spacing={3} flex="1" justifyContent="space-between">
        <Box>
          <Heading as="h3" size="md" fontWeight="semibold" mb={1} noOfLines={1}>
            {name}
          </Heading>

          <Text fontSize="sm" color={textColor} mb={2}>
            {location.address}
          </Text>

          <Flex alignItems="center" mb={2}>
            <Flex>{generateStars(rating)}</Flex>
            <Text ml={1} fontSize="sm" color={textColor}>
              {rating} ({reviews.length} reviews)
            </Text>
          </Flex>

          <Text color={textColor} noOfLines={2} mb={3}>
            {description}
          </Text>
        </Box>

        <Box>
          <Text fontWeight="semibold" fontSize="lg" color={priceColor} mb={3}>
            From {formatCurrency(price.dayPass)} / day
          </Text>

          <Button
            as={Link}
            href={`/lakes/${id}`}
            colorScheme="green"
            width="full"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "sm",
            }}
          >
            View Details
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
