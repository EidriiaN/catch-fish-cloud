"use client";

import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  Box,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

export const FormInput = ({ id, label, type = "text", value, onChange, placeholder, error, isRequired = false, ...rest }) => {
  return (
    <FormControl id={id} isInvalid={!!error} isRequired={isRequired} mb={4}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input type={type} value={value} onChange={onChange} placeholder={placeholder} focusBorderColor="brand.500" {...rest} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export const FormTextarea = ({ id, label, value, onChange, placeholder, error, isRequired = false, ...rest }) => {
  return (
    <FormControl id={id} isInvalid={!!error} isRequired={isRequired} mb={4}>
      {label && <FormLabel>{label}</FormLabel>}
      <Textarea value={value} onChange={onChange} placeholder={placeholder} focusBorderColor="brand.500" {...rest} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export const FormSelect = ({ id, label, value, onChange, placeholder, options = [], error, isRequired = false, ...rest }) => {
  return (
    <FormControl id={id} isInvalid={!!error} isRequired={isRequired} mb={4}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select value={value} onChange={onChange} placeholder={placeholder} focusBorderColor="brand.500" {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export const FormCheckbox = ({ id, label, isChecked, onChange, error, ...rest }) => {
  return (
    <FormControl id={id} isInvalid={!!error} mb={4}>
      <Checkbox id={id} isChecked={isChecked} onChange={onChange} colorScheme="green" {...rest}>
        {label}
      </Checkbox>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export const FormRadioGroup = ({ id, label, value, onChange, options = [], error, direction = "column", isRequired = false, ...rest }) => {
  return (
    <FormControl id={id} isInvalid={!!error} isRequired={isRequired} mb={4}>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup value={value} onChange={onChange} {...rest}>
        <Stack direction={direction}>
          {options.map((option) => (
            <Radio key={option.value} value={option.value} colorScheme="green">
              {option.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export const FormButton = ({
  children,
  isLoading = false,
  loadingText,
  onClick,
  type = "button",
  variant = "solid",
  colorScheme = "green",
  ...rest
}) => {
  return (
    <Button type={type} onClick={onClick} isLoading={isLoading} loadingText={loadingText} variant={variant} colorScheme={colorScheme} {...rest}>
      {children}
    </Button>
  );
};

export const FormError = ({ message }) => {
  if (!message) return null;

  return (
    <Alert status="error" mb={4} borderRadius="md">
      <AlertIcon />
      <Text>{message}</Text>
    </Alert>
  );
};

export const FormSuccess = ({ message }) => {
  if (!message) return null;

  return (
    <Alert status="success" mb={4} borderRadius="md">
      <AlertIcon />
      <Text>{message}</Text>
    </Alert>
  );
};
