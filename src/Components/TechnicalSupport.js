import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Grid,
  ChakraProvider,
  VStack,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { sendSupportMail } from "../actions/warrantyActions";

const TechnicalSupport = () => {
  const location = useLocation();
  const { deviceId } = location.state || {}; // Extract deviceId from location.state

  console.log('deviceId:', deviceId);

  // Initialize form data, ensuring deviceId is populated correctly
  const [formData, setFormData] = useState({
    deviceId: deviceId || "", // Default to an empty string if deviceId is undefined
    issueDescription: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    companyName: "",
    provinceState: "",
    city: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if all fields are filled
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    const response = await sendSupportMail({
      deviceId: formData.deviceId,
      description: formData.issueDescription,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.contactNumber,
      companyName: formData.companyName,
      state: formData.provinceState,
      city: formData.city,
    });
    // console.log('Form submitted successfully:', response.data);
    console.log('Form submitted successfully:', response.data);
  };

  return (
    <ChakraProvider>
      <Box
        maxW="800px"
        mx="auto"
        mt="10"
        p="8"
        borderWidth="2px"
        borderRadius="lg"
        bg="white"
        boxShadow="lg"
      >
        <Box
          as="h1"
          fontSize="3xl"
          fontWeight="bold"
          textAlign="center"
          mb="8"
          color="Black"
        >
          Technical Support
        </Box>

        <form onSubmit={handleSubmit}>
          {/* What can we help you with? */}
          <Box mb="8" p="6" borderRadius="md" bg="gray.50">
            <Box
              as="h2"
              fontSize="2xl"
              fontWeight="bold"
              mb="4"
              color="purple.500"
            >
              What can we help you with?
            </Box>
            <Grid templateColumns={{ base: "1fr", md: "1fr" }} gap="6">
              <FormControl isRequired>
                <FormLabel color="gray.700">Device ID</FormLabel>
                <Input
                  type="text"
                  name="deviceId"
                  value={formData.deviceId}
                  onChange={handleChange}
                  bg="white"
                  borderColor="gray.300"
                  _hover={{ bg: "gray.100" }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 2px purple",
                  }}
                  isDisabled
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="gray.700">Specific Issue Description</FormLabel>
                <Textarea
                  name="issueDescription"
                  value={formData.issueDescription}
                  onChange={handleChange}
                  placeholder="Describe your issue"
                  bg="white"
                  borderColor="gray.300"
                  _hover={{ bg: "gray.100" }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 2px purple",
                  }}
                  minH="100px"
                />
              </FormControl>
            </Grid>
          </Box>


          {/* How can we reach you? */}
          <Box mb="8" p="3" borderRadius="md" bg="gray.50">
            <Box
              as="h2"
              fontSize="2xl"
              fontWeight="bold"
              mb="4"
              color="purple.500"
            >
              How can we reach you?
            </Box>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="6">
              <FormControl isRequired>
                <FormLabel color="gray.700">First Name</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  bg="white"
                  placeholder="Enter First Name"
                  borderColor="gray.300"
                  _hover={{ bg: "gray.100" }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 2px purple",
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="gray.700">Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  bg="white"
                  placeholder="Enter Last Name"
                  borderColor="gray.300"
                  _hover={{ bg: "gray.100" }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 2px purple",
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="gray.700">Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  bg="white"
                  placeholder="Enter Email ID"
                  borderColor="gray.300"
                  _hover={{ bg: "gray.100" }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 2px purple",
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="gray.700">Contact Number</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="+91" />
                  <Input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    bg="white"
                    placeholder="Enter Contact Number"
                    borderColor="gray.300"
                    _hover={{ bg: "gray.100" }}
                    _focus={{
                      borderColor: "purple.500",
                      boxShadow: "0 0 0 2px purple",
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="gray.700">Company Name</FormLabel>
                <Input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  bg="white"
                  placeholder="Enter Company Name"
                  borderColor="gray.300"
                  _hover={{ bg: "gray.100" }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 2px purple",
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="gray.700">Province/State</FormLabel>
                <Input
                  type="text"
                  name="provinceState"
                  value={formData.provinceState}
                  onChange={handleChange}
                  bg="white"
                  placeholder="Enter Province/State"
                  borderColor="gray.300"
                  _hover={{ bg: "gray.100" }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 2px purple",
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="gray.700">City</FormLabel>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  bg="white"
                  placeholder="Enter City"
                  borderColor="gray.300"
                  _hover={{ bg: "gray.100" }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 2px purple",
                  }}
                />
              </FormControl>
            </Grid>
          </Box>

          {/* Note that all fields are required */}
          <Text fontSize="md" color="red.500" mb="6" textAlign="left">
            * All fields are required.
          </Text>

          <VStack spacing={4} mt="8">
            <Button
              colorScheme="purple"
              size="lg"
              width="full"
              bg="purple.500"
              color="white"
              _hover={{ bg: "purple.700" }}
              isDisabled={!isFormValid}
              borderRadius="full"
              type="submit"
            >
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </ChakraProvider >
  );
};

export default TechnicalSupport;
