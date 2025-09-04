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
  RadioGroup,
  Radio,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const user = await register(name, email, password, userType);

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
            Create Your Account
          </Heading>

          {error && (
            <Alert status="error" rounded="md">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} focusBorderColor="brand.500" />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} focusBorderColor="brand.500" />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} focusBorderColor="brand.500" minLength={6} />
              </FormControl>

              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  focusBorderColor="brand.500"
                  minLength={6}
                />
              </FormControl>

              <FormControl id="userType">
                <FormLabel>Account Type</FormLabel>
                <RadioGroup value={userType} onChange={setUserType}>
                  <Stack direction="row">
                    <Radio value="user" colorScheme="green">
                      User
                    </Radio>
                    <Radio value="lakeOwner" colorScheme="green">
                      Lake Owner
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <Button type="submit" colorScheme="green" size="md" width="full" isLoading={isLoading} loadingText="Creating Account..." mt={4}>
                Create Account
              </Button>
            </VStack>
          </form>

          <Box textAlign="center">
            <Text color="gray.600">
              Already have an account?{" "}
              <ChakraLink as={Link} href="/auth/login" color="brand.500">
                Sign in here
              </ChakraLink>
            </Text>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
