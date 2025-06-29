import { Heading, HStack, Image, Text, VStack, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <Box
      borderRadius="xl" // Rounded corners for the card
      overflow="hidden" // Ensures content doesn't spill out of rounded corners
      boxShadow="md" // Adds a subtle shadow for depth
      backgroundColor="white" // White background for the card
      color="black" // Default text color for contrast
    >
      <Image src={imageSrc} alt={title} objectFit="cover" width="100%" height="200px" /> {/* Image at the top */}
      <VStack p={4} spacing={3} alignItems="flex-start"> {/* Content stacked vertically with padding */}
        <Heading as="h3" size="md"> {/* Project title */}
          {title}
        </Heading>
        <Text fontSize="sm"> {/* Project description */}
          {description}
        </Text>
        <HStack spacing={2} alignItems="center"> {/* "See more" text and arrow */}
          <Text fontSize="sm" fontWeight="bold">
            See more
          </Text>
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </HStack>
      </VStack>
    </Box>
  );
};

export default Card;