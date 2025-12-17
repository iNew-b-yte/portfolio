import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Wrap,
  WrapItem,
  Tag,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { skills } from '../data/skills'

const MotionBox = motion(Box)

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <Box id="skills" py={16} bg="gray.800">
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
                Core Competencies
              </Text>
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                bgGradient="linear(to-r, white, gray.400)"
                bgClip="text"
              >
                Technical Skills
              </Heading>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
              {skills.map((skillGroup, groupIndex) => (
                <MotionBox
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                  p={5}
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
                >
                  <VStack align="start" spacing={3}>
                    <Heading
                      as="h3"
                      fontSize="md"
                      fontWeight="600"
                      bgGradient="linear(to-r, purple.400, pink.400)"
                      bgClip="text"
                    >
                      {skillGroup.category}
                    </Heading>
                    <Wrap spacing={2}>
                      {skillGroup.items.map((skill, index) => (
                        <WrapItem key={skill}>
                          <MotionBox
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={
                              isInView
                                ? { opacity: 1, scale: 1 }
                                : { opacity: 0, scale: 0.8 }
                            }
                            transition={{
                              duration: 0.3,
                              delay: groupIndex * 0.1 + index * 0.05,
                            }}
                          >
                            <Tag
                              size="sm"
                              bg="whiteAlpha.100"
                              color="gray.300"
                              fontSize="sm"
                              fontWeight="500"
                              borderRadius="md"
                              _hover={{
                                bg: 'purple.500',
                                color: 'white',
                              }}
                              transition="all 0.2s"
                            >
                              {skill}
                            </Tag>
                          </MotionBox>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  )
}

