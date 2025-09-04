"use client";

import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    50: "#e6f5ec",
    100: "#c3e5d0",
    200: "#9fd4b3",
    300: "#7ac495",
    400: "#56b478",
    500: "#38a05c", // Primary green color
    600: "#2e8349",
    700: "#246737",
    800: "#1a4a24",
    900: "#0f2e12",
  },
  gray: {
    50: "#f7fafc",
    800: "#1a202c", // Footer background
    900: "#171923", // Dark background
  },
};

const fonts = {
  body: "var(--font-geist-sans), sans-serif",
  heading: "var(--font-geist-sans), sans-serif",
  mono: "var(--font-geist-mono), monospace",
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: "medium",
      borderRadius: "md",
    },
    variants: {
      primary: {
        bg: "brand.500",
        color: "white",
        _hover: {
          bg: "brand.600",
        },
      },
      secondary: {
        bg: "white",
        color: "brand.500",
        _hover: {
          bg: "gray.100",
        },
      },
      outline: {
        borderColor: "brand.500",
        color: "brand.500",
      },
    },
  },
  Link: {
    baseStyle: {
      _hover: {
        textDecoration: "none",
      },
    },
  },
};

const theme = extendTheme({
  colors,
  fonts,
  components,
  styles: {
    global: {
      body: {
        bg: "white",
        color: "gray.800",
      },
    },
  },
});

export default theme;
