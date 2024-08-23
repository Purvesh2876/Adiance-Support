import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  HStack,
  Flex,
  Switch,
  Icon,
  Button,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  ButtonGroup,
  Stack,
  GridItem,
  Textarea,
  Heading,
  Grid,
  InputGroup,
  InputLeftAddon,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaArrowRight,
  FaBell,
  FaBolt,
  FaCheck,
  FaFileInvoice,
  FaInfo,
  FaInfoCircle,
  FaLayerGroup,
  FaLock,
} from "react-icons/fa";

const subscriptionPlans = [
  {
    id: 1,
    name: "Basic",
    monthly: 0,
    annually: 0,
    features: ["Live PlayBack", "Live Alerts", "SD Card Access"],
    buttonText: "Subscribe now",
    icon: FaBolt,
  },
  {
    id: 2,
    name: "DVR 1",
    monthly: 3,
    annually: 36,
    features: [
      "24 Hours Recording Backup",
      "Live PlayBacks",

      "Live Alerts",
      "Day-wise Alerts",
      "SD Card Access",
      "Reports",

      "Analytics Events",
    ],
    buttonText: "Subscribe now",
    icon: FaLayerGroup,
  },
  {
    id: 3,
    name: "DVR 3",
    monthly: 5,
    annually: 60,
    features: [
      "Recording Backup upto 72 Hours",
      "Live PlayBacks",
      "Live Alerts",
      "Day-Wise Alerts",
      "SD Card Access",
      "Reports",
      "Analytics Events",
    ],
    buttonText: "Subscribe now",
    icon: FaLayerGroup,
  },
  {
    id: 4,
    name: "DVR 7",
    monthly: 40,
    annually: 400,
    features: [
      "Recording Backup upto 7 Days",
      "Live PlayBacks",
      "Live Alerts",
      "Day-Wise Alerts",
      "SD Card Access",
      "Reports",
      "Analytics Events",
    ],
    buttonText: "Subscribe now",
    icon: FaLayerGroup,
  },
  {
    id: 5,
    name: "DVR 15",
    monthly: 50,
    annually: 500,
    features: [
      "Recording Backup upto 15 Days",
      "Live PlayBacks",
      "Live Alerts",
      "Day-Wise Alerts",
      "SD Card Access",
      "Reports",
      "Analytics Events",
    ],
    buttonText: "Subscribe now",
    icon: FaLayerGroup,
  },
  {
    id: 6,
    name: "DVR 30",
    monthly: 60,
    annually: 600,
    features: [
      "Recording Backup upto 30 Days",
      "Live PlayBacks",
      "Live Alerts",
      "Day-Wise Alerts",
      "SD Card Access",
      "Reports",
      "Analytics Events",
    ],
    buttonText: "Subscribe now",
    icon: FaLayerGroup,
  },
];

const aiFeaturesList = [
  { id: 1, name: "Edge AI", aiMonthlyPrice: 5, aiAnnuallyPrice: 50 },
  {
    id: 2,
    name: "Cloud AI",
    aiMonthlyPrice: 10,
    aiAnnuallyPrice: 100,
  },
  { id: 3, name: "GEN AI", aiMonthlyPrice: 7, aiAnnuallyPrice: 70 }, // Adjusted to match your requirement
];

const SubscriptionPlan = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [includeAI, setIncludeAI] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedAIOptions, setSelectedAIOptions] = useState([]);
  const [aiPrice, setAiPrice] = useState(0);
  const [grandTOtal, setGrandTotal] = useState('');

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("white", "gray.800");
  const boxShadowColor = useColorModeValue("lg", "2xl");

  const handleAnnualToggle = () => setIsAnnual(!isAnnual);

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAIOptions([]);
    setAiPrice(0);
  };

  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
  };
  const handleAIOptionChange = (e) => {
    const value = e.target.value;
    setSelectedAIOptions((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value)
        : [...prev, value]
    );
  };



  const handleProceedToAddress = () => {
    // Close the first modal and open the address modal
    setIsModalOpen(false);
    setIsAddressModalOpen(true);
  };

  const calculatePrice = (plan) => {
    if (!plan) return 0;
    let price = isAnnual ? plan.annually : plan.monthly;
    if (includeAI) {
      price += aiPrice;
    }
    return price;
  };

  const updateAiPrice = () => {
    const totalAiPrice = selectedAIOptions.reduce((acc, option) => {
      const feature = aiFeaturesList.find((f) => f.id === parseInt(option));
      if (feature) {
        // Use monthly or annual price based on the billing cycle
        return (
          acc + (isAnnual ? feature.aiAnnuallyPrice : feature.aiMonthlyPrice)
        );
      }
      return acc;
    }, 0);
    setGrandTotal(totalAiPrice);
  };

  useEffect(() => {
    const updateAiPrice = () => {
      const totalAiPrice = selectedAIOptions.reduce((acc, option) => {
        const feature = aiFeaturesList.find((f) => f.id === parseInt(option));
        if (feature) {
          return (
            acc + (isAnnual ? feature.aiAnnuallyPrice : feature.aiMonthlyPrice)
          );
        }
        return acc;
      }, 0);
      setAiPrice(totalAiPrice);
    };

    updateAiPrice();
  }, [selectedAIOptions, isAnnual]);



  // const grandTOtal={selectedPlan
  //   ? calculatePrice(selectedPlan) + aiPrice
  //   : aiPrice}

  return (
    <ChakraProvider>
      <Box
        bg="gray.50"
        _dark={{ bg: "gray.900" }}
        minH="100vh"
        display="flex"
        flexDirection="column"
        p={4}
      >
        {/* Header Section */}
        <Flex
          alignItems="center"
          justifyContent="space-between"
          width="full"
          maxWidth="100%"
          mb={8}
        >
          {/* Left Side: Subscription Texts */}
          <VStack alignItems="flex-start" spacing={1}>
            <Text
              fontSize={{ base: "2xl", md: "4xl" }} // base for mobile, md for larger screens
              fontWeight="bold"
              color="gray.800"
            >
              Subscription
            </Text>

            <Text
              fontSize="md"
              color="gray.600"
              display={{ base: "none", md: "block" }}
            >
              Select the plan that suits your demand. Hardware and accessibility
              are different in each plan.
            </Text>
          </VStack>

          {/* Right Side: View Invoices Link */}
          <Link
            href="#"
            color="black.600" // More consistent with the purple theme
            fontWeight="semiBold"
            display="flex"
            alignItems="center"
            _hover={{ textDecoration: "underline" }}
          >
            <Icon as={FaFileInvoice} w={5} h={5} mr={2} />
            View invoices
            <Icon
              as={FaArrowRight}
              w={4}
              h={4}
              ml={1}
              display={{ base: "none", md: "block" }}
            />
          </Link>
        </Flex>

        {/* Toggle Switches */}
        <ButtonGroup
          isAttached
          variant="outline"
          borderRadius="full"
          alignItems="center"
          justifyContent="center"
          mb={7}
        >
          <Button
            onClick={() => handleAnnualToggle(true)}
            bg={isAnnual ? "purple.600" : "white"}
            color={isAnnual ? "white" : "black"}
            borderRadius="full"
            _hover={{ bg: isAnnual ? "black" : "gray.100" }}
          >
            Yearly
          </Button>
          <Button
            onClick={() => handleAnnualToggle(false)}
            bg={!isAnnual ? "purple.600" : "white"}
            color={!isAnnual ? "white" : "black"}
            borderRadius="full"
            _hover={{ bg: !isAnnual ? "black" : "gray.100" }}
          >
            Monthly
          </Button>
        </ButtonGroup>

        {/* Subscription Cards */}
        <Flex
          wrap="wrap"
          justify="center" // Center align for mobile view
          gap={6}
        >
          {subscriptionPlans.map((plan) => (
            <Box
              key={plan.id}
              bg="white"
              _dark={{ bg: "gray.800" }}
              border="1px"
              borderColor="gray.300"
              borderRadius="xl"
              shadow="md"
              _hover={{ shadow: "lg", transform: "scale(1.05)" }}
              transition="transform 0.3s"
              p={6}
              minW="250px"
              maxW="350px"
              // flexGrow={1}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              textAlign="center"
            >
              <VStack align="center" flexGrow={1}>
                {/* Plan Name and Icon */}
                <Box bg="purple.100" p={2} borderRadius="full">
                  <Icon as={plan.icon} w={6} h={6} color="purple.500" />
                </Box>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="gray.800"
                  _dark={{ color: "white" }}
                >
                  {plan.name}
                </Text>

                {/* Plan Price */}
                <VStack align="center">
                  <HStack>
                    <Text
                      fontSize="3xl"
                      fontWeight="bold"
                      color="gray.800"
                      _dark={{ color: "white" }}
                    >
                      ${isAnnual ? plan.annually : plan.monthly}
                    </Text>
                    <Text
                      fontSize="lg"
                      color="gray.500"
                      _dark={{ color: "gray.400" }}
                    >
                      {isAnnual ? "/year" : "/mth"}
                    </Text>
                  </HStack>
                </VStack>

                {/* Plan Features */}
                <VStack align="start" w="full" spacing={2} pt={4}>
                  {plan.features.map((feature, index) => (
                    <HStack key={index} align="center">
                      <Box bg="purple.100" p={1} borderRadius="full">
                        <Icon as={FaCheck} w={4} h={4} color="purple.500" />
                      </Box>
                      <Text
                        fontSize="sm"
                        color="gray.600"
                        _dark={{ color: "gray.300" }}
                      >
                        {feature}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </VStack>

              {/* Button and Secured Payment */}
              <Button
                colorScheme="purple"
                variant={
                  plan.buttonText === "" ? "ghost" : "solid"
                }
                rounded="md"
                py={2}
                mt={4}
                width="100%"
                transition="all 0.2s"
                onClick={() => openModal(plan)}
              >
                {plan.buttonText}
              </Button>
            </Box>
          ))}
        </Flex>
        <Box mt={6} textAlign="center" px={4}>
          <Text fontSize="sm" color="gray.500">
            <Icon as={FaInfoCircle} w={5} h={5} color="gray.500" mr={3} />
            Note: To Add AI Feature Click Subscribe Now Button
          </Text>
        </Box>
        {/* AI Features Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          size={{ base: "50%", md: "lg" }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Customize Your AI Plan</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={4} fontSize={{ base: "md", md: "lg" }}>
                Select AI options for the {selectedPlan?.name} plan:
              </Text>
              <FormControl mb={4}>
                <FormLabel fontSize={{ base: "sm", md: "md" }}>
                  AI Options
                </FormLabel>
                {aiFeaturesList.map((feature) => (
                  <VStack key={feature.id} spacing={2} align="start" mb={2}>
                    <Checkbox
                      value={feature.id}
                      isChecked={selectedAIOptions.includes(
                        feature.id.toString()
                      )}
                      onChange={handleAIOptionChange}
                      size={{ base: "sm", md: "md" }}
                    >
                      {feature.name} (+$
                      {isAnnual
                        ? feature.aiAnnuallyPrice
                        : feature.aiMonthlyPrice}
                      )
                    </Checkbox>
                  </VStack>
                ))}
              </FormControl>
              <VStack spacing={4} align="start">
                <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
                  Total AI Cost: ${aiPrice}
                </Text>
                <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
                  Updated Plan Price: $
                  {selectedPlan
                    ? calculatePrice(selectedPlan) + aiPrice
                    : aiPrice}
                </Text>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Stack spacing={4} w="100%">
                <Button
                  colorScheme="purple"
                  mr={3}
                  onClick={handleProceedToAddress}
                  size={{ base: "sm", md: "md" }}
                >
                  Procced To Pay
                </Button>

              </Stack>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Address Modal */}

        <Modal isOpen={isAddressModalOpen} onClose={closeAddressModal} size={{ base: "50%", md: "lg" }}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add  Shipping Address</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <GridItem>
                <Box
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="lg"
                  boxShadow={boxShadowColor}
                  p={6} // Increase padding for form container
                  bg={bgColor}
                >
                  <form>
                    <Grid
                      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                      gap={4}
                    >
                      <GridItem colSpan={{ base: 2, md: 1 }}>
                        <FormControl isRequired>
                          <FormLabel htmlFor="firstName">First Name</FormLabel>
                          <Input
                            id="firstName"
                            name="firstName"
                            autoComplete="given-name"
                            variant="outline"
                            focusBorderColor="purple.500"
                            placeholder="Enter your first name"
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={{ base: 2, md: 1 }}>
                        <FormControl isRequired>
                          <FormLabel htmlFor="lastName">Last Name</FormLabel>
                          <Input
                            id="lastName"
                            name="lastName"
                            autoComplete="family-name"
                            focusBorderColor="purple.500"
                            placeholder="Enter your last name"
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={2}>
                        <FormControl isRequired>
                          <FormLabel htmlFor="address">Email</FormLabel>
                          <Input
                            id="email"
                            name="email"
                            autoComplete="email"

                            focusBorderColor="purple.500"
                            placeholder="Enter your Email"
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={2}>
                        <FormControl isRequired>
                          <FormLabel htmlFor="address">Street Address</FormLabel>
                          <Textarea
                            id="address"
                            name="address"
                            autoComplete="shipping street-address"
                            rows={3}
                            focusBorderColor="purple.500"
                            placeholder="Enter your address"
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={{ base: 2, md: 1 }}>
                        <FormControl isRequired>
                          <FormLabel htmlFor="city">City</FormLabel>
                          <Input
                            id="city"
                            name="city"
                            autoComplete="address-level2"
                            focusBorderColor="purple.500"
                            placeholder="Enter your city"
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={{ base: 2, md: 1 }}>
                        <FormControl isRequired>
                          <FormLabel htmlFor="state">State</FormLabel>
                          <Input
                            id="state"
                            name="state"
                            autoComplete="address-level1"
                            focusBorderColor="purple.500"
                            placeholder="Enter your state"
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={{ base: 2, md: 1 }}>
                        <FormControl isRequired>
                          <FormLabel htmlFor="pincode">Pin/Postal Code</FormLabel>
                          <Input
                            id="pincode"
                            name="pincode"
                            autoComplete="postal-code"
                            focusBorderColor="purple.500"
                            placeholder="Enter your  PinCode"
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={{ base: 2, md: 1 }}>
                        <FormControl isRequired>
                          <FormLabel htmlFor="contact">Contact Number</FormLabel>
                          <InputGroup>
                            <InputLeftAddon children="+91" />
                            <Input
                              type="tel"
                              id="contact"
                              name="contact"
                              placeholder="Enter Contact "
                              autoComplete="tel"
                              focusBorderColor="purple.500"
                            />
                          </InputGroup>
                        </FormControl>
                      </GridItem>
{/* 
                      <GridItem colSpan={2}>
                        <Button
                          colorScheme="purple"
                          size="lg"
                          variant="solid"
                          type="submit"
                          width="full"
                          _hover={{ bg: "purple.500", color: "white" }}
                        >
                          Deliver Here
                        </Button>
                      </GridItem> */}
                    </Grid>
                  </form>
                </Box>
              </GridItem>
            </ModalBody>
            <ModalFooter>
              <Stack spacing={4} w="100%">
                <Button
                  colorScheme="purple"
                  mr={3}
                  onClick={closeModal}
                  size={{ base: "sm", md: "md" }}
                  isDisabled
                >
                  Payment ${grandTOtal}
                </Button>

                <Flex align="center" justify="center" mt={2}>
                  <Icon as={FaLock} w={4} h={4} color="green.500" mr={1} />
                  <Text
                    fontSize="xs"
                    color="green.500"
                    _dark={{ color: "gray.300" }}
                  >
                    Secured Payment
                  </Text>
                </Flex>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default SubscriptionPlan;
