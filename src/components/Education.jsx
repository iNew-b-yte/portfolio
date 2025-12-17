import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiBookOpen, FiCalendar, FiAward } from 'react-icons/fi'
import { education } from '../data/education'

const MotionBox = motion(Box)

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <Box id="education" py={16} bg="gray.900">
      <Container maxW="container.xl">
        <MotionBox
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <VStack spacing={10} align="start">
            <Box>
              <Text
                fontSize="sm"
                fontWeight="600"
                color="purple.400"
                letterSpacing="wide"
                textTransform="uppercase"
                mb={2}
              >
                Academic Background
              </Text>
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                bgGradient="linear(to-r, white, gray.400)"
                bgClip="text"
              >
                Education
              </Heading>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
              {education.map((edu, index) => (
                <MotionBox
                  key={edu.degree}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Box
                    p={5}
                    bg="gray.800"
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="whiteAlpha.100"
                    _hover={{
                      borderColor: 'purple.500',
                      transform: 'translateY(-4px)',
                      bosmhadow: '0 10px 30px rgba(139, 92, 246, 0.2)',
                    }}
                    transitionDuration="0.3s"
                    h="full"
                  >
                    <VStack align="start" spacing={3}>
                      <Box
                        p={2}
                        bg="purple.500"
                        borderRadius="lg"
                        display="inline-block"
                      >
                        <FiBookOpen size={20} />
                      </Box>

                      <Box>
                        <Heading
                          as="h3"
                          fontSize="md"
                          fontWeight="bold"
                          color="white"
                          mb={1}
                        >
                          {edu.degree}
                        </Heading>
                        <Text
                          fontSize="sm"
                          color="purple.300"
                          fontWeight="600"
                        >
                          {edu.institution}
                        </Text>
                      </Box>

                      <HStack spacing={4} fontSize="sm" color="gray.400" flexWrap="wrap">
                        <HStack>
                          <FiCalendar />
                          <Text>{edu.duration}</Text>
                        </HStack>
                        <HStack>
                          <FiAward />
                          <Text>{edu.grade}</Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  )
}

