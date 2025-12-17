import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Badge,
  Code,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  AspectRatio,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCheckCircle, FiCode, FiDatabase, FiServer, FiZap, FiLock, FiUsers } from 'react-icons/fi'
import { useParams, Navigate } from 'react-router-dom'
import { projectDetails } from '../data/projectDetails'

const MotionBox = motion(Box)

export default function ProjectDetail() {
  const { projectId } = useParams()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  const project = projectDetails[projectId]
  
  if (!project) {
    return <Navigate to="/#projects" replace />
  }

  const iconMap = {
    FiCode,
    FiDatabase,
    FiServer,
    FiZap,
    FiLock,
    FiUsers,
  }

  return (
    <Box bg="gray.900" minH="100vh" pt={20} pb={16}>
      <Container maxW="container.xl">
        <MotionBox
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <VStack spacing={8} align="start">
            {/* Header */}
            <Box w="full">
              <Badge
                colorScheme="purple"
                fontSize="sm"
                px={2}
                py={1}
                borderRadius="md"
                mb={3}
              >
                {project.category}
              </Badge>
              <Heading
                as="h1"
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="bold"
                bgGradient="linear(to-r, white, gray.400)"
                bgClip="text"
                mb={3}
              >
                {project.title}
              </Heading>
              <Text fontSize="md" color="gray.400" mb={4}>
                {project.subtitle}
              </Text>
              <Text fontSize="sm" color="gray.500" lineHeight="1.8">
                {project.description}
              </Text>
            </Box>

            {/* Architecture Diagram */}
            {project.architectureDiagram && (
              <Box
                w="full"
                p={6}
                bg="gray.800"
                borderRadius="xl"
                borderWidth="1px"
                borderColor="whiteAlpha.100"
              >
                <Heading as="h2" fontSize="xl" mb={4} color="purple.400">
                  System Architecture
                </Heading>
                {project.architectureDiagram.imageUrl ? (
                  <AspectRatio ratio={16 / 9} maxW="full">
                    <Image
                      src={project.architectureDiagram.imageUrl}
                      alt="Architecture Diagram"
                      borderRadius="md"
                    />
                  </AspectRatio>
                ) : (
                  <Box
                    p={4}
                    bg="gray.900"
                    borderRadius="md"
                    fontFamily="monospace"
                    fontSize="sm"
                    whiteSpace="pre"
                    overflowX="auto"
                  >
                    {project.architectureDiagram.asciiDiagram}
                  </Box>
                )}
                <Text fontSize="sm" color="gray.400" mt={3}>
                  {project.architectureDiagram.description}
                </Text>
              </Box>
            )}

            {/* Key Technical Highlights */}
            <Box w="full">
              <Heading as="h2" fontSize="2xl" mb={4} color="white">
                Key Technical Highlights
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {project.technicalHighlights.map((highlight, index) => {
                  const IconComponent = iconMap[highlight.icon] || FiCheckCircle
                  return (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      p={4}
                      bg="gray.800"
                      borderRadius="lg"
                      borderWidth="1px"
                      borderColor="whiteAlpha.100"
                      _hover={{
                        borderColor: 'purple.500',
                        transform: 'translateY(-2px)',
                      }}
                      transitionDuration="0.3s"
                    >
                      <HStack spacing={3} mb={2}>
                        <Box
                          p={2}
                          bg="purple.500"
                          borderRadius="md"
                          display="inline-block"
                        >
                          <IconComponent size={16} />
                        </Box>
                        <Text fontSize="sm" fontWeight="600" color="purple.300">
                          {highlight.title}
                        </Text>
                      </HStack>
                      <Text fontSize="sm" color="gray.400" lineHeight="1.6">
                        {highlight.description}
                      </Text>
                    </MotionBox>
                  )
                })}
              </SimpleGrid>
            </Box>

            {/* Senior-Level Implementation Details */}
            <Box w="full">
              <Heading as="h2" fontSize="2xl" mb={4} color="white">
                Senior-Level Implementation Details
              </Heading>
              <Accordion allowMultiple>
                {project.implementationDetails.map((detail, index) => (
                  <AccordionItem
                    key={index}
                    border="1px"
                    borderColor="whiteAlpha.100"
                    borderRadius="lg"
                    mb={3}
                    bg="gray.800"
                  >
                    <AccordionButton
                      _hover={{ bg: 'whiteAlpha.100' }}
                      py={4}
                    >
                      <Box flex="1" textAlign="left">
                        <Text fontSize="sm" fontWeight="600" color="purple.300">
                          {detail.section}
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <VStack align="start" spacing={3}>
                        <Text fontSize="sm" color="gray.400" lineHeight="1.7">
                          {detail.description}
                        </Text>
                        
                        {detail.codeSnippet && (
                          <Box w="full">
                            <Text fontSize="sm" color="gray.500" mb={2}>
                              Code Example:
                            </Text>
                            <Code
                              display="block"
                              whiteSpace="pre"
                              fontSize="sm"
                              p={3}
                              bg="gray.900"
                              borderRadius="md"
                              overflowX="auto"
                              color="green.300"
                            >
                              {detail.codeSnippet}
                            </Code>
                          </Box>
                        )}
                        
                        {detail.challenges && detail.challenges.length > 0 && (
                          <Box w="full">
                            <Text fontSize="sm" fontWeight="600" color="orange.400" mb={2}>
                              Challenges Solved:
                            </Text>
                            <List spacing={1}>
                              {detail.challenges.map((challenge, idx) => (
                                <ListItem key={idx} fontSize="sm" color="gray.400">
                                  <ListIcon as={FiCheckCircle} color="orange.400" />
                                  {challenge}
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}
                        
                        {detail.impact && (
                          <Alert
                            status="success"
                            variant="subtle"
                            bg="whiteAlpha.50"
                            borderRadius="md"
                            fontSize="sm"
                          >
                            <AlertIcon />
                            <Box>
                              <AlertTitle fontSize="sm">Impact</AlertTitle>
                              <AlertDescription fontSize="sm">
                                {detail.impact}
                              </AlertDescription>
                            </Box>
                          </Alert>
                        )}
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Box>

            {/* Production Metrics */}
            {project.productionMetrics && (
              <Box w="full">
                <Heading as="h2" fontSize="2xl" mb={4} color="white">
                  Production Metrics & Impact
                </Heading>
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                  {project.productionMetrics.map((metric, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      p={4}
                      bg="gray.800"
                      borderRadius="lg"
                      borderWidth="1px"
                      borderColor="whiteAlpha.100"
                      textAlign="center"
                    >
                      <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        bgGradient="linear(to-r, purple.400, pink.400)"
                        bgClip="text"
                      >
                        {metric.value}
                      </Text>
                      <Text fontSize="sm" color="gray.400" mt={1}>
                        {metric.label}
                      </Text>
                    </MotionBox>
                  ))}
                </SimpleGrid>
              </Box>
            )}

            <Divider borderColor="whiteAlpha.200" />

            {/* Tech Stack */}
            <Box w="full">
              <Heading as="h2" fontSize="xl" mb={3} color="white">
                Technologies Used
              </Heading>
              <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} spacing={2}>
                {project.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    fontSize="sm"
                    px={3}
                    py={2}
                    bg="whiteAlpha.100"
                    color="gray.300"
                    borderRadius="md"
                    textAlign="center"
                  >
                    {tech}
                  </Badge>
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  )
}

