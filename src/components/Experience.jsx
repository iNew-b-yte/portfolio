import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  List,
  ListItem,
  ListIcon,
  Badge,
  Divider,
  AspectRatio,
  Image,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCheckCircle, FiMapPin, FiCalendar } from 'react-icons/fi'
import { experience } from '../data/experience'

const MotionBox = motion(Box)

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <Box id="experience" py={16} bg="gray.900">
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
                Professional Journey
              </Text>
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                bgGradient="linear(to-r, white, gray.400)"
                bgClip="text"
              >
                Work Experience
              </Heading>
            </Box>

            <VStack spacing={8} w="full" align="start">
              {experience.map((exp, expIndex) => (
                <MotionBox
                  key={exp.company}
                  w="full"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: expIndex * 0.2 }}
                >
                  <Box
                    p={6}
                    bg="gray.800"
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="whiteAlpha.100"
                    _hover={{
                      borderColor: 'purple.500',
                      bosmhadow: '0 10px 30px rgba(139, 92, 246, 0.2)',
                    }}
                    transitionDuration="0.3s"
                  >
                    <VStack align="start" spacing={4}>
                      {/* Company Header */}
                      <Box w="full">
                        <HStack justify="space-between" flexWrap="wrap" mb={2}>
                          <Heading
                            as="h3"
                            fontSize="xl"
                            fontWeight="bold"
                            bgGradient="linear(to-r, purple.400, pink.400)"
                            bgClip="text"
                          >
                            {exp.company}
                          </Heading>
                          <Badge
                            colorScheme="purple"
                            fontSize="sm"
                            px={2}
                            py={1}
                            borderRadius="md"
                          >
                            Current
                          </Badge>
                        </HStack>
                        
                        <Text fontSize="md" fontWeight="600" color="gray.300" mb={2}>
                          {exp.role}
                        </Text>

                        <HStack spacing={4} fontSize="sm" color="gray.400" flexWrap="wrap">
                          <HStack>
                            <FiCalendar />
                            <Text>{exp.duration}</Text>
                          </HStack>
                          <HStack>
                            <FiMapPin />
                            <Text>{exp.location}</Text>
                          </HStack>
                        </HStack>
                      </Box>

                      <Divider borderColor="whiteAlpha.200" />

                      {/* Experience Sections */}
                      <VStack spacing={6} w="full" align="start">
                        {exp.sections.map((section, sectionIndex) => (
                          <Box key={sectionIndex} w="full">
                            <Heading
                              as="h4"
                              fontSize="sm"
                              fontWeight="600"
                              color="purple.300"
                              mb={3}
                            >
                              {section.title}
                            </Heading>

                            {/* Video/Thumbnail Support */}
                            {(section.videoUrl || section.thumbnailUrl) && (
                              <Box mb={3}>
                                {section.videoUrl ? (
                                  <AspectRatio ratio={16 / 9} maxW="600px">
                                    <iframe
                                      src={section.videoUrl}
                                      title={section.title}
                                      allowFullScreen
                                      style={{ borderRadius: '8px' }}
                                    />
                                  </AspectRatio>
                                ) : section.thumbnailUrl ? (
                                  <Image
                                    src={section.thumbnailUrl}
                                    alt={section.title}
                                    borderRadius="md"
                                    maxW="600px"
                                  />
                                ) : null}
                              </Box>
                            )}

                            <List spacing={2}>
                              {section.achievements.map((achievement, achIndex) => (
                                <ListItem
                                  key={achIndex}
                                  fontSize="sm"
                                  color="gray.400"
                                  lineHeight="1.6"
                                  display="flex"
                                  alignItems="flex-start"
                                >
                                  <ListIcon
                                    as={FiCheckCircle}
                                    color="purple.400"
                                    mt={0.5}
                                    flesmhrink={0}
                                  />
                                  <Text>{achievement}</Text>
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        ))}
                      </VStack>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </VStack>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  )
}

