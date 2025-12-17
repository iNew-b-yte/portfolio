import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Badge,
  HStack,
  Button,
  AspectRatio,
  Image,
  Wrap,
  WrapItem,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiExternalLink, FiGithub, FiPlay, FiCheckCircle } from 'react-icons/fi'
import { projects } from '../data/projects'

const MotionBox = motion(Box)

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <Box id="projects" py={16} bg="gray.800">
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
                Featured Work
              </Text>
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                bgGradient="linear(to-r, white, gray.400)"
                bgClip="text"
              >
                Projects
              </Heading>
            </Box>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} w="full">
              {projects.map((project, index) => (
                <MotionBox
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  h="full"
                >
                  <Box
                    p={6}
                    h="full"
                    bg="gray.900"
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="whiteAlpha.100"
                    _hover={{
                      borderColor: 'purple.500',
                      transform: 'translateY(-4px)',
                      bosmhadow: '0 10px 30px rgba(139, 92, 246, 0.2)',
                    }}
                    transitionDuration="0.3s"
                    display="flex"
                    flexDirection="column"
                  >
                    <VStack align="start" spacing={4} flex={1}>
                      {/* Video/Thumbnail */}
                      {(project.videoUrl || project.thumbnailUrl) && (
                        <Box w="full" position="relative">
                          {project.videoUrl ? (
                            <AspectRatio ratio={16 / 9} w="full">
                              <iframe
                                src={project.videoUrl}
                                title={project.title}
                                allowFullScreen
                                style={{ borderRadius: '8px' }}
                              />
                            </AspectRatio>
                          ) : project.thumbnailUrl ? (
                            <Box position="relative" w="full">
                              <Image
                                src={project.thumbnailUrl}
                                alt={project.title}
                                borderRadius="md"
                                w="full"
                              />
                              <Box
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                                bg="blackAlpha.700"
                                p={3}
                                borderRadius="full"
                              >
                                <FiPlay size={24} color="white" />
                              </Box>
                            </Box>
                          ) : null}
                        </Box>
                      )}

                      {/* Project Header */}
                      <Box>
                        <Heading
                          as="h3"
                          fontSize="lg"
                          fontWeight="bold"
                          mb={1}
                          bgGradient="linear(to-r, purple.400, pink.400)"
                          bgClip="text"
                        >
                          {project.title}
                        </Heading>
                        <Text fontSize="sm" color="purple.300" fontWeight="600">
                          {project.subtitle}
                        </Text>
                      </Box>

                      {/* Description */}
                      <Text fontSize="sm" color="gray.400" lineHeight="1.6">
                        {project.description}
                      </Text>

                      {/* Highlights */}
                      {project.highlights && project.highlights.length > 0 && (
                        <List spacing={1}>
                          {project.highlights.map((highlight, idx) => (
                            <ListItem
                              key={idx}
                              fontSize="sm"
                              color="gray.400"
                              display="flex"
                              alignItems="flex-start"
                            >
                              <ListIcon
                                as={FiCheckCircle}
                                color="purple.400"
                                mt={0.5}
                                flesmhrink={0}
                                bosmize={3}
                              />
                              <Text>{highlight}</Text>
                            </ListItem>
                          ))}
                        </List>
                      )}

                      {/* Tech Stack */}
                      <Wrap spacing={2}>
                        {project.tech.map((tech) => (
                          <WrapItem key={tech}>
                            <Badge
                              fontSize="sm"
                              px={2}
                              py={1}
                              bg="whiteAlpha.100"
                              color="gray.300"
                              borderRadius="md"
                            >
                              {tech}
                            </Badge>
                          </WrapItem>
                        ))}
                      </Wrap>

                      {/* Links */}
                      {(project.detailLink || project.demoUrl || project.githubUrl) && (
                        <HStack spacing={3} pt={2}>
                          {project.detailLink && (
                            <Button
                              as="a"
                              href={project.detailLink}
                              size="sm"
                              variant="ghost"
                              leftIcon={<FiExternalLink />}
                              color="purple.400"
                              _hover={{ bg: 'whiteAlpha.100' }}
                            >
                              View Details
                            </Button>
                          )}
                          {project.demoUrl && (
                            <Button
                              as="a"
                              href={project.demoUrl}
                              target="_blank"
                              size="sm"
                              variant="ghost"
                              leftIcon={<FiExternalLink />}
                              color="purple.400"
                              _hover={{ bg: 'whiteAlpha.100' }}
                            >
                              Demo
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button
                              as="a"
                              href={project.githubUrl}
                              target="_blank"
                              size="sm"
                              variant="ghost"
                              leftIcon={<FiGithub />}
                              color="purple.400"
                              _hover={{ bg: 'whiteAlpha.100' }}
                            >
                              Code
                            </Button>
                          )}
                        </HStack>
                      )}
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

