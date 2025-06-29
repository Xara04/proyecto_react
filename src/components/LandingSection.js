import React from "react";
import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const greeting = "Hola, Yo soy Sara";
const bio1 = "Soy frontend developer";
const bio2 = "actualmente estoy aprendiendo React";

// Implement the UI for the LandingSection component according to the instructions.
// Use a combination of Avatar, Heading and VStack components.
const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#d5ad51"
  >
    {/* Use VStack to stack elements vertically */}
    <VStack spacing={4}> {/* 'spacing' adds space between stacked items */}
      {/* Avatar component */}
      <Avatar
        src="https://cdni.iconscout.com/illustration/premium/thumb/chica-avatar-11255219-9022799.png"
        size="2xl" // You can adjust the size as needed, e.g., "xl", "2xl", "full"
        name="Pete" // Alt text for accessibility
      />

      {/* Greeting Heading */}
      <Heading as="h1" size="2xl" color="white">
        {greeting}
      </Heading>

      {/* Bio 1 Heading */}
      <Heading as="h2" size="lg" color="white">
        {bio1}
      </Heading>

      {/* Bio 2 Heading */}
      <Heading as="h2" size="lg" color="white">
        {bio2}
      </Heading>
    </VStack>
  </FullScreenSection>
);

export default LandingSection;