"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils/format";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useToast,
  VStack,
  HStack,
  Checkbox,
  useSteps,
  Input,
} from "@chakra-ui/react";

export default function ReservationForm({ lake, onClose }) {
  const router = useRouter();
  const { currentUser, isAuthenticated } = useAuth();
  const toast = useToast();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedPonds, setSelectedPonds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: 3,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Calculate available dates (next 30 days)
  const availableDates = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    availableDates.push(date);
  }

  // Time slots based on requirements
  const timeSlots = [
    { id: "morning-12h", label: "6:00 AM - 6:00 PM (12 ore)", startHour: 6, duration: 12 },
    { id: "evening-12h", label: "6:00 PM - 6:00 AM (12 ore)", startHour: 18, duration: 12 },
    { id: "morning-24h", label: "6:00 AM - 6:00 AM (24 ore)", startHour: 6, duration: 24 },
    { id: "evening-24h", label: "6:00 PM - 6:00 PM (24 ore)", startHour: 18, duration: 24 },
    { id: "morning-48h", label: "6:00 AM - 6:00 AM (48 ore)", startHour: 6, duration: 48 },
    { id: "evening-48h", label: "6:00 PM - 6:00 PM (48 ore)", startHour: 18, duration: 48 },
  ];

  // Calculate total price whenever selected ponds or time slot changes
  useEffect(() => {
    if (selectedTimeSlot && selectedPonds.length > 0) {
      let basePrice = 0;

      if (selectedTimeSlot.duration === 12) {
        basePrice = lake.price.dayPass;
      } else if (selectedTimeSlot.duration === 24) {
        basePrice = lake.price.weekendPass;
      } else if (selectedTimeSlot.duration === 48) {
        basePrice = lake.price.weekPass || lake.price.weekendPass * 2;
      }

      setTotalPrice(basePrice * selectedPonds.length);
    } else {
      setTotalPrice(0);
    }
  }, [selectedTimeSlot, selectedPonds, lake.price]);

  // Handle pond selection/deselection
  const togglePondSelection = (pondId) => {
    if (selectedPonds.includes(pondId)) {
      setSelectedPonds(selectedPonds.filter((id) => id !== pondId));
    } else {
      setSelectedPonds([...selectedPonds, pondId]);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push("/auth/login?redirect=reservation");
      return;
    }

    setLoading(true);

    // In a real app, this would be an API call to create a reservation
    // For now, we'll simulate a delay and then redirect to the user dashboard
    try {
      // Get the selected pond objects
      const ponds = lake.ponds.filter((pond) => selectedPonds.includes(pond.id));

      // Create a reservation object
      const reservation = {
        id: `res-${Date.now()}`,
        userId: currentUser.id,
        lakeId: lake.id,
        lakeName: lake.name,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        ponds: ponds,
        totalPrice: totalPrice,
        status: "pending",
        paymentInfo: {
          cardNumber: data.cardNumber,
          expiryDate: data.expiryDate,
          cardholderName: data.cardholderName,
        },
        createdAt: new Date(),
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      toast({
        title: "Rezervare creată",
        description: "Ieșirea ta la pescuit a fost rezervată cu succes!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Close the form and redirect
      onClose();
      router.push("/dashboard/user/reservations");
    } catch (error) {
      toast({
        title: "Eroare",
        description: "A apărut o eroare la crearea rezervării. Încearcă din nou.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: "Pasul 1", description: "Alege data și intervalul" },
    { title: "Pasul 2", description: "Alege heleșteul" },
    { title: "Pasul 3", description: "Detalii plată" },
  ];

  return (
    <Modal isOpen={true} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Rezervă ieșirea la pescuit</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stepper index={activeStep} mb={8}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                </StepIndicator>
                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Box>
              <Heading as="h3" size="md" mb={4}>
                Alege data și intervalul orar
              </Heading>

              <FormControl mb={6}>
                <FormLabel>Alege data</FormLabel>
                <Select
                  placeholder="Alege o dată"
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    setSelectedDate(date);
                  }}
                >
                  {availableDates.map((date, index) => (
                    <option key={index} value={date.toISOString()}>
                      {formatDate(date)}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Alege intervalul orar</FormLabel>
                <RadioGroup
                  onChange={(value) => {
                    const slot = timeSlots.find((slot) => slot.id === value);
                    setSelectedTimeSlot(slot);
                  }}
                >
                  <Stack>
                    {timeSlots.map((slot) => (
                      <Radio key={slot.id} value={slot.id} colorScheme="green">
                        {slot.label}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Heading as="h3" size="md" mb={4}>
                Selectează heleșteiele
              </Heading>

              <Text mb={4}>Selectează unul sau mai multe heleșteie la {lake.name}:</Text>

              <Stack spacing={3}>
                {lake.ponds.map((pond) => (
                  <Checkbox
                    key={pond.id}
                    isChecked={selectedPonds.includes(pond.id)}
                    onChange={() => togglePondSelection(pond.id)}
                    colorScheme="green"
                  >
                    <HStack>
                      <Text fontWeight="medium">{pond.name}</Text>
                      <Text color="gray.600">
                        ({pond.size} acri, {pond.fishTypes.join(", ")})
                      </Text>
                    </HStack>
                  </Checkbox>
                ))}
              </Stack>

              {selectedPonds.length > 0 && (
                <Box mt={6} p={4} bg="green.50" rounded="md">
                  <Flex justify="space-between">
                    <Text>Preț total:</Text>
                    <Text fontWeight="bold">{formatCurrency(totalPrice)}</Text>
                  </Flex>
                  <Text fontSize="sm" mt={2}>
                    Pentru {selectedPonds.length} heleșteu(ri), {selectedTimeSlot?.duration} ore
                  </Text>
                </Box>
              )}
            </Box>
          )}

          {activeStep === 2 && (
            <Box as="form" id="reservation-form" onSubmit={handleSubmit(onSubmit)}>
              <Heading as="h3" size="md" mb={4}>
                Detalii plată
              </Heading>

              <VStack spacing={4} align="stretch">
                <FormControl isInvalid={errors.cardholderName}>
                  <FormLabel>Nume deținător card</FormLabel>
                  <Input {...register("cardholderName", { required: "Numele este obligatoriu" })} focusBorderColor="brand.500" />
                  <FormErrorMessage>{errors.cardholderName && errors.cardholderName.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.cardNumber}>
                  <FormLabel>Număr card</FormLabel>
                  <Input
                    {...register("cardNumber", {
                      required: "Numărul cardului este obligatoriu",
                      pattern: {
                        value: /^[0-9]{16}$/,
                        message: "Te rugăm să introduci un număr de card valid din 16 cifre",
                      },
                    })}
                    focusBorderColor="brand.500"
                  />
                  <FormErrorMessage>{errors.cardNumber && errors.cardNumber.message}</FormErrorMessage>
                </FormControl>

                <HStack>
                  <FormControl isInvalid={errors.expiryDate}>
                    <FormLabel>Data expirării</FormLabel>
                    <Input
                      placeholder="MM/YY"
                      {...register("expiryDate", {
                        required: "Data expirării este obligatorie",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                          message: "Te rugăm să introduci o dată validă în format MM/YY",
                        },
                      })}
                      focusBorderColor="brand.500"
                    />
                    <FormErrorMessage>{errors.expiryDate && errors.expiryDate.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.cvv}>
                    <FormLabel>CVV</FormLabel>
                    <Input
                      {...register("cvv", {
                        required: "CVV este obligatoriu",
                        pattern: {
                          value: /^[0-9]{3,4}$/,
                          message: "Te rugăm să introduci un CVV valid",
                        },
                      })}
                      focusBorderColor="brand.500"
                    />
                    <FormErrorMessage>{errors.cvv && errors.cvv.message}</FormErrorMessage>
                  </FormControl>
                </HStack>

                <Box mt={6} p={4} bg="green.50" rounded="md">
                  <Heading as="h4" size="sm" mb={2}>
                    Rezumat rezervare
                  </Heading>
                  <Divider mb={3} />
                  <VStack align="stretch" spacing={2}>
                    <Flex justify="space-between">
                      <Text>Data:</Text>
                      <Text>{selectedDate ? formatDate(selectedDate) : "Neselectat"}</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text>Interval orar:</Text>
                      <Text>{selectedTimeSlot ? selectedTimeSlot.label : "Neselectat"}</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text>Heleșteie:</Text>
                      <Text>{selectedPonds.length} selectat(e)</Text>
                    </Flex>
                    <Divider my={2} />
                    <Flex justify="space-between" fontWeight="bold">
                      <Text>Total:</Text>
                      <Text>{formatCurrency(totalPrice)}</Text>
                    </Flex>
                  </VStack>
                </Box>
              </VStack>
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Renunță
          </Button>

          {activeStep > 0 && (
            <Button variant="outline" mr={3} onClick={() => setActiveStep(activeStep - 1)}>
              Înapoi
            </Button>
          )}

          {activeStep < 2 ? (
            <Button
              colorScheme="green"
              onClick={() => setActiveStep(activeStep + 1)}
              isDisabled={(activeStep === 0 && (!selectedDate || !selectedTimeSlot)) || (activeStep === 1 && selectedPonds.length === 0)}
            >
              Înainte
            </Button>
          ) : (
            <Button colorScheme="green" type="submit" form="reservation-form" isLoading={loading} loadingText="Se rezervă...">
              Finalizează rezervarea
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
