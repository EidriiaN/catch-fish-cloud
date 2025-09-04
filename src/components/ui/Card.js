"use client";

import { Box, Heading, Text, Stack, Flex, useColorModeValue } from "@chakra-ui/react";

export const Card = ({ children, title, subtitle, footer, ...rest }) => {
  return (
    <Box bg={useColorModeValue("white", "gray.700")} boxShadow="md" borderRadius="lg" overflow="hidden" {...rest}>
      {(title || subtitle) && (
        <Box p={5} borderBottomWidth="1px">
          {title && (
            <Heading as="h3" size="md">
              {title}
            </Heading>
          )}
          {subtitle && (
            <Text mt={1} color="gray.600">
              {subtitle}
            </Text>
          )}
        </Box>
      )}

      <Box p={5}>{children}</Box>

      {footer && (
        <Box p={4} bg="gray.50" borderTopWidth="1px">
          {footer}
        </Box>
      )}
    </Box>
  );
};

export const CardGrid = ({ children, columns = { base: 1, md: 2, lg: 3 }, spacing = 6, ...rest }) => {
  return (
    <Flex flexWrap="wrap" justifyContent="flex-start" mx={-spacing / 2} {...rest}>
      {children}
    </Flex>
  );
};

export const CardGridItem = ({ children, width = { base: "100%", md: "50%", lg: "33.33%" }, spacing = 6, ...rest }) => {
  return (
    <Box width={width} px={spacing / 2} mb={spacing} {...rest}>
      {children}
    </Box>
  );
};
