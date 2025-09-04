"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link as ChakraLink,
  useColorModeValue,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const { currentUser, logout, isAdmin } = useAuth();
  const { isOpen, onToggle } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const bgColor = useColorModeValue("white", "gray.900");

  return (
    <Box
      position="fixed"
      top="0"
      width="full"
      zIndex={30}
      transition="all 0.3s"
      bg={scrolled ? bgColor : "transparent"}
      boxShadow={scrolled ? "sm" : "none"}
    >
      <Container maxW="7xl">
        <Flex
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          align={"center"}
          justify={"space-between"}
        >
          <Flex flex={{ base: 1 }} align="center">
            <Text as={Link} href="/" textAlign="left" fontFamily={"heading"} color="brand.500" fontWeight="bold" fontSize="xl" cursor="pointer">
              FishingLakes
            </Text>

            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6} display={{ base: "none", md: "flex" }}>
            {currentUser ? (
              <>
                <Button
                  as={Link}
                  href={isAdmin ? "/dashboard/admin" : "/dashboard/user"}
                  variant="link"
                  color="gray.600"
                  _hover={{ color: "brand.500" }}
                >
                  Dashboard
                </Button>
                <Button onClick={handleLogout} colorScheme="green" variant="solid">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} href="/auth/login" variant="link" color="gray.600" _hover={{ color: "brand.500" }}>
                  Sign In
                </Button>
                <Button as={Link} href="/auth/register" colorScheme="green" variant="solid">
                  Sign Up
                </Button>
              </>
            )}
          </Stack>

          <Flex flex={{ base: 1, md: "auto" }} ml={{ base: -2 }} display={{ base: "flex", md: "none" }} justify="flex-end">
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav currentUser={currentUser} isAdmin={isAdmin} handleLogout={handleLogout} />
        </Collapse>
      </Container>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = "gray.600";
  const linkHoverColor = "brand.500";

  return (
    <Stack direction={"row"} spacing={8}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <ChakraLink
            as={Link}
            href={navItem.href ?? "#"}
            p={2}
            fontSize={"md"}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
          >
            {navItem.label}
          </ChakraLink>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = ({ currentUser, isAdmin, handleLogout }) => {
  return (
    <Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}

      {currentUser ? (
        <>
          <Box
            py={2}
            as={Link}
            href={isAdmin ? "/dashboard/admin" : "/dashboard/user"}
            display="block"
            fontSize="md"
            fontWeight={500}
            color="gray.600"
            _hover={{ color: "brand.500" }}
          >
            Dashboard
          </Box>
          <Box
            py={2}
            as="button"
            display="block"
            onClick={handleLogout}
            fontSize="md"
            fontWeight={500}
            color="gray.600"
            _hover={{ color: "brand.500" }}
            cursor="pointer"
            textAlign="left"
            bg="transparent"
            border="none"
            width="100%"
          >
            Logout
          </Box>
        </>
      ) : (
        <>
          <Box py={2} as={Link} href="/auth/login" display="block" fontSize="md" fontWeight={500} color="gray.600" _hover={{ color: "brand.500" }}>
            Sign In
          </Box>
          <Box py={2} as={Link} href="/auth/register" display="block" fontSize="md" fontWeight={500} color="gray.600" _hover={{ color: "brand.500" }}>
            Sign Up
          </Box>
        </>
      )}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }) => {
  return (
    <Stack spacing={4}>
      <Box py={2} as={Link} href={href ?? "#"} display="block" fontSize="md" fontWeight={500} color="gray.600" _hover={{ color: "brand.500" }}>
        {label}
      </Box>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Find Lakes",
    href: "/lakes",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
