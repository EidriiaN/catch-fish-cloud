"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Alert,
  AlertIcon,
  VStack,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await login(email, password);

      // Redirect based on role
      if (user.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="md" py={12}>
      <Box bg={useColorModeValue("white", "gray.700")} p={8} rounded="lg" boxShadow="md">
        <Stack spacing={6}>
          <Heading as="h1" size="lg" textAlign="center">
            Autentifică-te în contul tău
          </Heading>

          {error && (
            <Alert status="error" rounded="md">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Adresă de email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} focusBorderColor="brand.500" />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Parolă</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} focusBorderColor="brand.500" />
              </FormControl>

              <Button type="submit" colorScheme="green" size="md" width="full" isLoading={isLoading} loadingText="Se autentifică...">
                Autentificare
              </Button>
            </VStack>
          </form>

          <Box textAlign="center">
            <Text color="gray.600">
              Nu ai un cont?{" "}
              <ChakraLink as={Link} href="/auth/register" color="brand.500">
                Înscrie-te aici
              </ChakraLink>
            </Text>

            <Text mt={2} fontSize="sm" color="gray.600">
              Pentru demo poți folosi:
              <br />
              Utilizator: john@example.com
              <br />
              Admin: admin1@example.com
              <br />
              (orice parolă va funcționa)
            </Text>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
