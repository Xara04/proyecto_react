import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const ContactMeSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  // Reference for the header element (for the bonus task)
  const headerRef = useRef(null);
  let lastScrollY = useRef(0); // To store the previous scroll position

  // Handle header animation on scroll (Bonus Task)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const headerElement = headerRef.current;

      if (!headerElement) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 0) {
        // Scrolling down
        headerElement.style.transform = "translateY(-200px)";
      } else {
        // Scrolling up
        headerElement.style.transform = "translateY(0)";
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount


  const formik = useFormik({
    // a) initialValues
    initialValues: {
      firstName: '',
      email: '',
      type: 'hireMe', // Default value for select
      comment: '',
    },
    // a) onSubmit function
    onSubmit: async (values) => {
      await submit('https://example.com/api', values); // Replace with your actual API endpoint
    },
    // a) validationSchema
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      type: Yup.string(), // No specific validation for type, as it's a select with predefined options
      comment: Yup.string()
        .min(25, 'Must be at least 25 characters')
        .required('Required'),
    }),
  });

  // e) Listen for changes in the 'response' object
  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message); // Display the alert

      if (response.type === 'success') {
        formik.resetForm(); // Reset form on success
      }
    }
  }, [response, onOpen, formik.resetForm]); // Dependencies for useEffect

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}> {/* d) Connect onSubmit to formik.handleSubmit */}
            <VStack spacing={4}>
              {/* firstName field */}
              <FormControl isInvalid={formik.touched.firstName && !!formik.errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...formik.getFieldProps('firstName')} 
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage> {/* c) Display error message */}
              </FormControl>

              {/* Email field */}
              <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps('email')} 
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage> {/* c) Display error message */}
              </FormControl>

              {/* Type of enquiry field */}
              <FormControl isInvalid={formik.touched.type && !!formik.errors.type}>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  id="type"
                  name="type"
                  {...formik.getFieldProps('type')} 
                >
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
                <FormErrorMessage>{formik.errors.type}</FormErrorMessage> {/* c) Display error message */}
              </FormControl>

              {/* Your message field */}
              <FormControl isInvalid={formik.touched.comment && !!formik.errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...formik.getFieldProps('comment')} 
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage> {/* c) Display error message */}
              </FormControl>

              {/* Submit Button */}
              <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}> {/* e) Show loading indicator */}
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default ContactMeSection;