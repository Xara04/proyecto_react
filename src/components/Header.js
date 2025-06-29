import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faYahoo,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

// Array de redes sociales
const socials = [
  {
    icon: faYahoo,
    url: "https://yahoo.com",
    label: "Yahoo",
  },
  {
    icon: faGithub,
    url: "https://github.com",
    label: "GitHub",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: faFacebook,
    url: "https://facebook.com",
    label: "Facebook",
  },
];

// Array de navegación interna
const navLinks = [
  { id: "projects", label: "Proyectos" },
  { id: "contactme", label: "Contacto" },
];

const Header = () => {
  // Scroll suave a la sección correspondiente
  const handleClick = (anchor) => (e) => {
    e.preventDefault();
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      zIndex={1000}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack px={16} py={4} justifyContent="space-between" alignItems="center">
          {/* Redes sociales */}
          <nav aria-label="Redes sociales">
            <HStack spacing={4}>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  tabIndex={0}
                >
                  <FontAwesomeIcon icon={social.icon} size="2x" />
                </a>
              ))}
            </HStack>
          </nav>
          {/* Navegación interna */}
          <nav aria-label="Navegación principal">
            <HStack spacing={8}>
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}-section`}
                  onClick={handleClick(link.id)}
                  tabIndex={0}
                >
                  {link.label}
                </a>
              ))}
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;