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
    { id: "morning-12h", label: "6:00 AM - 6:00 PM (12 hours)", startHour: 6, duration: 12 },
    { id: "evening-12h", label: "6:00 PM - 6:00 AM (12 hours)", startHour: 18, duration: 12 },
    { id: "morning-24h", label: "6:00 AM - 6:00 AM (24 hours)", startHour: 6, duration: 24 },
    { id: "evening-24h", label: "6:00 PM - 6:00 PM (24 hours)", startHour: 18, duration: 24 },
    { id: "morning-48h", label: "6:00 AM - 6:00 AM (48 hours)", startHour: 6, duration: 48 },
    { id: "evening-48h", label: "6:00 PM - 6:00 PM (48 hours)", startHour: 18, duration: 48 },
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
      router.push("/login?redirect=reservation");
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
        title: "Reservation Created",
        description: "Your fishing trip has been booked successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Close the form and redirect
      onClose();
      router.push("/dashboard/user/reservations");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating your reservation. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: "Step 1", description: "Select Date & Time" },
    { title: "Step 2", description: "Choose Pond" },
    { title: "Step 3", description: "Payment Details" },
  ];

  return (
    <Modal isOpen={true} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Book Your Fishing Trip</ModalHeader>
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
                Select Date & Time
              </Heading>

              <FormControl mb={6}>
                <FormLabel>Select Date</FormLabel>
                <Select
                  placeholder="Choose a date"
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
                <FormLabel>Select Time Slot</FormLabel>
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
                Select Ponds
              </Heading>

              <Text mb={4}>Select one or more ponds at {lake.name}:</Text>

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
                        ({pond.size} acres, {pond.fishTypes.join(", ")})
                      </Text>
                    </HStack>
                  </Checkbox>
                ))}
              </Stack>

              {selectedPonds.length > 0 && (
                <Box mt={6} p={4} bg="green.50" rounded="md">
                  <Flex justify="space-between">
                    <Text>Total Price:</Text>
                    <Text fontWeight="bold">{formatCurrency(totalPrice)}</Text>
                  </Flex>
                  <Text fontSize="sm" mt={2}>
                    For {selectedPonds.length} pond(s), {selectedTimeSlot?.duration} hours
                  </Text>
                </Box>
              )}
            </Box>
          )}

          {activeStep === 2 && (
            <Box as="form" id="reservation-form" onSubmit={handleSubmit(onSubmit)}>
              <Heading as="h3" size="md" mb={4}>
                Payment Details
              </Heading>

              <VStack spacing={4} align="stretch">
                <FormControl isInvalid={errors.cardholderName}>
                  <FormLabel>Cardholder Name</FormLabel>
                  <Input {...register("cardholderName", { required: "Name is required" })} focusBorderColor="brand.500" />
                  <FormErrorMessage>{errors.cardholderName && errors.cardholderName.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.cardNumber}>
                  <FormLabel>Card Number</FormLabel>
                  <Input
                    {...register("cardNumber", {
                      required: "Card number is required",
                      pattern: {
                        value: /^[0-9]{16}$/,
                        message: "Please enter a valid 16-digit card number",
                      },
                    })}
                    focusBorderColor="brand.500"
                  />
                  <FormErrorMessage>{errors.cardNumber && errors.cardNumber.message}</FormErrorMessage>
                </FormControl>

                <HStack>
                  <FormControl isInvalid={errors.expiryDate}>
                    <FormLabel>Expiry Date</FormLabel>
                    <Input
                      placeholder="MM/YY"
                      {...register("expiryDate", {
                        required: "Expiry date is required",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                          message: "Please enter a valid date in MM/YY format",
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
                        required: "CVV is required",
                        pattern: {
                          value: /^[0-9]{3,4}$/,
                          message: "Please enter a valid CVV",
                        },
                      })}
                      focusBorderColor="brand.500"
                    />
                    <FormErrorMessage>{errors.cvv && errors.cvv.message}</FormErrorMessage>
                  </FormControl>
                </HStack>

                <Box mt={6} p={4} bg="green.50" rounded="md">
                  <Heading as="h4" size="sm" mb={2}>
                    Reservation Summary
                  </Heading>
                  <Divider mb={3} />
                  <VStack align="stretch" spacing={2}>
                    <Flex justify="space-between">
                      <Text>Date:</Text>
                      <Text>{selectedDate ? formatDate(selectedDate) : "Not selected"}</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text>Time:</Text>
                      <Text>{selectedTimeSlot ? selectedTimeSlot.label : "Not selected"}</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text>Ponds:</Text>
                      <Text>{selectedPonds.length} selected</Text>
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
            Cancel
          </Button>

          {activeStep > 0 && (
            <Button variant="outline" mr={3} onClick={() => setActiveStep(activeStep - 1)}>
              Previous
            </Button>
          )}

          {activeStep < 2 ? (
            <Button
              colorScheme="green"
              onClick={() => setActiveStep(activeStep + 1)}
              isDisabled={(activeStep === 0 && (!selectedDate || !selectedTimeSlot)) || (activeStep === 1 && selectedPonds.length === 0)}
            >
              Next
            </Button>
          ) : (
            <Button colorScheme="green" type="submit" form="reservation-form" isLoading={loading} loadingText="Booking...">
              Complete Booking
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
