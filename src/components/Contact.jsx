import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  SimpleGrid,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi'
import { profile } from '../data/profile'

const MotionBox = motion(Box)

const contactMethods = [
  {
    icon: FiMail,
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: FiPhone,
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone}`,
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: profile.github,
    href: `https://${profile.github}`,
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: profile.linkedin,
    href: `https://${profile.linkedin}`,
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: profile.location,
    href: `https://www.google.com/maps/place/Delhi/@28.6442874,76.7635558,10z/data=!3m1!4b1!4m6!3m5!1s0x390cfd5b347eb62d:0x37205b715389640!8m2!3d28.7040592!4d77.1024902!16zL20vMDlmMDc?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D`,
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <Box id="contact" py={16} bg="gray.800">
      <Container maxW="container.xl">
        <MotionBox
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <VStack spacing={10} align="center" textAlign="center">
            <Box>
              <Text
                fontSize="sm"
                fontWeight="600"
                color="purple.400"
                letterSpacing="wide"
                textTransform="uppercase"
                mb={2}
              >
                Get In Touch
              </Text>
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                bgGradient="linear(to-r, white, gray.400)"
                bgClip="text"
                mb={3}
              >
                Let's Connect
              </Heading>
              <Text fontSize="sm" color="gray.400" maxW="2xl">
                I'm always open to discussing new projects, opportunities, or collaborations.
                Feel free to reach out through any of the channels below.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} w="full" maxW="4xl">
              {contactMethods.map((method, index) => (
                <MotionBox
                  key={method.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Box
                    as={method.href ? 'a' : 'div'}
                    href={method.href}
                    target={method.href && method.href.startsWith('http') ? '_blank' : undefined}
                    p={4}
                    bg="gray.900"
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="whiteAlpha.100"
                    _hover={
                      method.href
                        ? {
                            borderColor: 'purple.500',
                            transform: 'translateY(-4px)',
                            bosmhadow: '0 10px 30px rgba(139, 92, 246, 0.2)',
                            cursor: 'pointer',
                          }
                        : {}
                    }
                    transitionDuration="0.3s"
                    textDecoration="none"
                    display="block"
                  >
                    <VStack spacing={2}>
                      <Box
                        p={2}
                        bg="purple.500"
                        borderRadius="lg"
                        display="inline-block"
                      >
                        <Icon as={method.icon} bosmize={5} />
                      </Box>
                      <Text fontSize="sm" fontWeight="600" color="gray.300">
                        {method.label}
                      </Text>
                      <Text fontSize="sm" color="gray.400" wordBreak="break-word">
                        {method.value}
                      </Text>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>

            <HStack spacing={4} pt={4}>
              <Button
                as="a"
                href={`mailto:${profile.email}`}
                variant="gradient"
                size="md"
                fontSize="sm"
                leftIcon={<FiMail />}
              >
                Send an Email
              </Button>
            </HStack>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  )
}

