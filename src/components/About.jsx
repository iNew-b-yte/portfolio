import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const MotionBox = motion(Box)

const stats = [
  { label: 'Years Experience', value: '2.7+' },
  { label: 'Concurrent Calls', value: '100+' },
  { label: 'Funding Impact', value: '$1M' },
  { label: 'Bugs Fixed', value: '200+' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <Box id="about" py={16} bg="gray.900">
      <Container maxW="container.xl">
        <MotionBox
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <VStack spacing={8} align="start">
            <Box>
              <Text
                fontSize="sm"
                fontWeight="600"
                color="purple.400"
                letterSpacing="wide"
                textTransform="uppercase"
                mb={2}
              >
                About Me
              </Text>
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                bgGradient="linear(to-r, white, gray.400)"
                bgClip="text"
              >
                Building Real-Time AI Systems
              </Heading>
            </Box>

            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} w="full" pt={4}>
              {stats.map((stat, index) => (
                <MotionBox
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  p={4}
                  bg="whiteAlpha.50"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="whiteAlpha.100"
                  _hover={{
                    bg: 'whiteAlpha.100',
                    borderColor: 'purple.500',
                    transform: 'translateY(-4px)',
                  }}
                  transitionDuration="0.3s"
                >
                  <Stat>
                    <StatLabel fontSize="sm" color="gray.400" mb={1}>
                      {stat.label}
                    </StatLabel>
                    <StatNumber
                      fontSize="2xl"
                      fontWeight="bold"
                      bgGradient="linear(to-r, purple.400, pink.400)"
                      bgClip="text"
                    >
                      {stat.value}
                    </StatNumber>
                  </Stat>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  )
}

