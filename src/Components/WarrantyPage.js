import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Text,
  VStack,
  Image,
  ChakraProvider,
  Heading,
  Divider,
  FormControl,
  FormErrorMessage,
  Link,
} from "@chakra-ui/react";
import { getWarrantyDetails } from "../actions/warrantyActions";
import { useNavigate } from "react-router-dom";


const WarrantyPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
  const [isError, setIsError] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox
  const [searchResult, setSearchResult] = useState([]);

  const navigate = useNavigate();

  const handleService = () => {
    navigate('/technicalsupport', { state: { deviceId: searchResult.deviceId } });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the serial number input
    if (serialNumber.trim() === "") {
      setIsError(true);
      return;
    }
    const response = await getWarrantyDetails(serialNumber);
    console.log('Form submitted successfully:', response.data.data);
    setSearchResult(response.data.data);
    console.log(' searchResult:', searchResult);
    // If validation passes, proceed to the next step
    setIsError(false);
    setSubmitted(true);
  };

  const handleBack = () => {
    setSubmitted(false);
    setSerialNumber(""); // Reset the serial number field
    setIsChecked(false); // Reset the checkbox
  };

  return (
    <ChakraProvider>
      <Box
        bg="#f5f7fa"
        minH="100vh"
        py={{ base: 6, md: 12 }}
        px={{ base: 4, md: 6 }}
      >
        {!submitted && (
          <Heading
            color="gray.700"
            textAlign="center"
            fontSize={{ base: "2xl", md: "4xl" }}
            mb={{ base: 6, md: 12 }}
          >
            Warranty Status Inquiry
          </Heading>
        )}

        {!submitted ? (
          <Box
            bg="white"
            p={{ base: 6, md: 12 }}
            borderRadius="xl"
            boxShadow="lg"
            maxW="3xl"
            mx="auto"
            as="form"
            onSubmit={handleSubmit}
          >
            <Text
              fontSize={{ base: "lg", md: "2xl" }}
              fontWeight="bold"
              textAlign="center"
              mb={6}
            >
              Check Your Warranty Status
            </Text>
            <FormControl isInvalid={isError}>
              <Input
                placeholder="Enter Your Serial Number"
                name="serialNumber"
                size="lg"
                bg="#f1f4f9"
                border="2px solid"
                borderColor={isError ? "red.500" : "purple"}
                focusBorderColor={isError ? "red.500" : "purple.600"}
                _placeholder={{ color: "gray.500" }}
                mb={2}
                value={serialNumber}
                onChange={(e) => {
                  setSerialNumber(e.target.value);
                  if (e.target.value.trim() !== "") {
                    setIsError(false);
                  }
                }}
              />
              {isError && (
                <FormErrorMessage mb={3}>
                  Serial number is required.
                </FormErrorMessage>
              )}
            </FormControl>
            <Checkbox
              display="block"
              textAlign="center"
              mb={6}
              colorScheme="purple"
              fontSize={{ base: "sm", md: "md" }}
              isRequired
              onChange={(e) => setIsChecked(e.target.checked)} // Update the checkbox state
            >
              I agree to provide my product SERIAL Number to Ambicam to inquire
              the warranty period of my product, and also agree to the
              <Link href="https://adiance.com/PrivacyPolicy" style={{ color: "purple", marginLeft: "4px" }}>
                Adiance Privacy Policy
              </Link>
              .
            </Checkbox>
            <Button
              bg={isChecked ? "purple.600" : "gray.600"}
              color="white"
              size="lg"
              width="100%"
              borderRadius="full"
              _hover={{ bg: isChecked ? "purple.500" : "gray.600" }}
              type="submit"
              isDisabled={!isChecked}
            >
              Submit
            </Button>
          </Box>
        ) : (
          <>
            <Box
              bg="white"
              mt={{ base: 10, md: 16 }}
              borderRadius="xl"
              boxShadow="lg"
              maxW="3xl"
              mx="auto"
              p={6}
            >
              <Text
                fontSize={{ base: "lg", md: "2xl" }}
                fontWeight="bold"
                textAlign="center"
                mb={6}
              >
                Warranty Status
              </Text>

              <Divider mb={6} />

              <Box display="flex" alignItems="center" spacing={4} mb={6}>
                <Image
                  boxSize="30%"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAUC6PPmIoIJqM9elPAtmImfhdbvqTgAjIRg&s"
                  alt="Product"
                  mr={4}
                />
                <VStack align="start" spacing={2}>
                  <Text fontSize="md">
                    Product Id:<b> {searchResult.deviceId} </b>
                  </Text>
                  <Text fontSize="md">
                    Product Type:<b> {searchResult.cameraType} </b>
                  </Text>
                  <Text fontSize="md">
                    Mfg. Date: <b>{searchResult.mfgDate}</b>
                  </Text>
                  <Text fontSize="md">
                    Exp. Date: <b> {searchResult.expDate} </b>
                  </Text>
                </VStack>
              </Box>

              <Divider mb={6} />

              <Box>
                <Text fontSize="sm" color="gray.600" mb={4}>
                  Reminder:
                </Text>
                <VStack
                  align="start"
                  spacing={2}
                  fontSize="sm"
                  color="gray.600"
                >
                  <Text>
                    1. If any functional faults occur due to product quality
                    issues, you are entitled to Warranty Service with valid
                    proof of purchase.
                  </Text>
                  <Text>
                    2. Extended warranty is not included in the warranty
                    expiration time shown above.
                  </Text>
                  <Text>
                    3. If you have any queries about the information listed
                    above, please visit our{" "}
                    <Link color="blue.500" onClick={handleService}>
                      Service Center
                    </Link>{" "}
                    with valid proof of purchase for further assistance.
                  </Text>
                  <Text>
                    {/* <Link color="blue.500" to={{ pathname: "/technicalsupport", state: { serialNumber } }}>
                      Contact Us
                    </Link>{" "} */}
                    <Link
                      color="blue.500"
                      onClick={handleService}
                    >
                      Contact Us
                    </Link>
                  </Text>
                </VStack>
              </Box>

              <Button
                mt={6}
                bg="purple.600"
                color="white"
                size="lg"
                width="100%"
                borderRadius="full"
                _hover={{ bg: "purple.500" }}
                onClick={handleBack}
              >
                Back
              </Button>
            </Box>
          </>
        )}

        {/* <Box
          mt={{ base: 10, md: 16 }}
          bg="white"
          p={{ base: 6, md: 12 }}
          borderRadius="xl"
          boxShadow="lg"
          maxW="3xl"
          mx="auto"
        >
          <Text
            fontSize={{ base: "lg", md: "2xl" }}
            fontWeight="bold"
            textAlign="center"
            mb={8}
          >
            How to find your Serial Number?
          </Text>
          <Flex
            justify="space-around"
            align="center"
            direction={{ base: "column", md: "row" }}
          >
            <VStack spacing={4} textAlign="center">
              <Image
                src="logo512.png"
                alt="Dial Method"
                boxSize={{ base: "80px", md: "120px" }}
                mb={4}
              />
            </VStack>
            <VStack spacing={4} textAlign="center">
              <Image
                src="logo192.png"
               
                alt="Settings Method"
                boxSize={{ base: "80px", md: "120px" }}
                mb={4}
              />
            </VStack>
          </Flex>
        </Box> */}
      </Box>
    </ChakraProvider>
  );
};

export default WarrantyPage;
