import React, { useEffect, useRef, useCallback } from "react";
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
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

// Campo de formulario reutilizable
const FormField = ({ id, label, children, error, touched }) => (
  <FormControl isInvalid={touched && !!error}>
    <FormLabel htmlFor={id}>{label}</FormLabel>
    {children}
    <FormErrorMessage>{error}</FormErrorMessage>
  </FormControl>
);

const ContactMeSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  // Header scroll animation
  const headerRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const headerElement = headerRef.current;
      if (!headerElement) return;
      headerElement.style.transform =
        currentScrollY > lastScrollY.current && currentScrollY > 0
          ? "translateY(-200px)"
          : "translateY(0)";
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: "",
    },
    onSubmit: async (values, { resetForm }) => {
      await submit("https://example.com/api", values);
      // El reset se maneja en el useEffect de abajo
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      type: Yup.string(),
      comment: Yup.string().min(25, "Must be at least 25 characters").required("Required"),
    }),
  });

  // Memoiza resetForm para evitar advertencias de dependencias
  const resetForm = useCallback(() => formik.resetForm(), [formik]);

  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);
      if (response.type === "success") {
        resetForm();
      }
    }
  }, [response, onOpen, resetForm]);

  // Opciones del select
  const enquiryOptions = [
    { value: "hireMe", label: "Freelance project proposal" },
    { value: "openSource", label: "Open source consultancy session" },
    { value: "feedback", label: "Feedback about my portfolio" },
    { value: "collaboration", label: "Collaboration opportunity" },
    { value: "other", label: "Other" },
  ];

  return (
    <FullScreenSection isDarkBackground backgroundColor="#c7352b" py={16} spacing={8}>
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Box
          position="sticky"
          top="0"
          zIndex={10}
          bg="#c7352b"
          px={4}
          py={2}
          borderRadius="md"
          boxShadow="md"
          width="auto"
        >
          <Heading as="h1" id="contactme-section">
            Contacto
          </Heading>
        </Box>
        <Box p={6} rounded="md" w="100%" mt="80px">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormField
                id="firstName"
                label="Name"
                error={formik.errors.firstName}
                touched={formik.touched.firstName}
              >
                <Input id="firstName" name="firstName" {...formik.getFieldProps("firstName")} />
              </FormField>
              <FormField
                id="email"
                label="Email Address"
                error={formik.errors.email}
                touched={formik.touched.email}
              >
                <Input id="email" name="email" type="email" {...formik.getFieldProps("email")} />
              </FormField>
              <FormField
                id="type"
                label="Type of enquiry"
                error={formik.errors.type}
                touched={formik.touched.type}
              >
                <Select
                  id="type"
                  name="type"
                  placeholder="Select enquiry type"
                  bg="white"
                  color="black"
                  _placeholder={{ color: "gray.500" }}
                  {...formik.getFieldProps("type")}
                >
                  {enquiryOptions.map(option => (
                    <option key={option.value} value={option.value} style={{ color: "black" }}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormField>
              <FormField
                id="comment"
                label="Your message"
                error={formik.errors.comment}
                touched={formik.touched.comment}
              >
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...formik.getFieldProps("comment")}
                />
              </FormField>
              <Button
                type="submit"
                colorScheme="teal"
                width="full"
                isLoading={isLoading}
                aria-label="Submit contact form"
              >
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