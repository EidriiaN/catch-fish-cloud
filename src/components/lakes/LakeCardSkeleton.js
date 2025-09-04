"use client";

import { Box, Grid, GridItem, Skeleton, Stack, useColorModeValue } from "@chakra-ui/react";

export const LakeCardSkeleton = () => {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box bg={bg} borderRadius="lg" overflow="hidden" boxShadow="md" h="full" display="flex" flexDirection="column">
      <Skeleton height="200px" width="100%" />
      <Stack p={4} spacing={3}>
        <Skeleton height="24px" width="70%" />
        <Skeleton height="16px" width="90%" />
        <Skeleton height="20px" width="40%" />
        <Skeleton height="16px" width="100%" />
        <Skeleton height="16px" width="90%" />
        <Box pt={4}>
          <Skeleton height="24px" width="50%" mb={3} />
          <Skeleton height="40px" width="100%" />
        </Box>
      </Stack>
    </Box>
  );
};

export const LakeSkeletonGrid = ({ count = 6 }) => {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={6}
    >
      {Array.from({ length: count }).map((_, index) => (
        <GridItem key={index}>
          <LakeCardSkeleton />
        </GridItem>
      ))}
    </Grid>
  );
};
