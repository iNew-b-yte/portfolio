import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  HStack,
  Icon,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiMapPin } from 'react-icons/fi'
import { profile } from '../data/profile'

const MotionBox = motion(Box)
const MotionHeading = motion(Heading)
const MotionText = motion(Text)

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      position="relative"
      overflow="hidden"
      pt={14}
    >
      {/* Animated gradient background */}
      <MotionBox
        position="absolute"
        top="-50%"
        left="-20%"
        w="140%"
        h="200%"
        bgGradient="radial(circle, purple.500 0%, transparent 70%)"
        opacity={0.15}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <MotionBox
        position="absolute"
        bottom="-50%"
        right="-20%"
        w="140%"
        h="200%"
        bgGradient="radial(circle, pink.500 0%, transparent 70%)"
        opacity={0.15}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <MotionBox
          as={VStack}
          spacing={4}
          align="start"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <MotionText
            variants={item}
            fontSize="sm"
            fontWeight="600"
            color="purple.400"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            Welcome to my portfolio
          </MotionText>

          <MotionHeading
            variants={item}
            as="h1"
            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
            fontWeight="bold"
            lineHeight="1.1"
            bgGradient="linear(to-r, white, gray.400)"
            bgClip="text"
          >
            {profile.name}
          </MotionHeading>

          <MotionHeading
            variants={item}
            as="h2"
            fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
            fontWeight="600"
            bgGradient="linear(to-r, purple.400, pink.400)"
            bgClip="text"
          >
            {profile.title}
          </MotionHeading>

          <MotionText
            variants={item}
            fontSize="sm"
            color="gray.400"
            maxW="3xl"
            lineHeight="1.7"
          >
            {profile.summary}
          </MotionText>

          <MotionBox variants={item} pt={2}>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={3}>
              <Button
                as="a"
                href="#contact"
                variant="gradient"
                size="md"
                fontSize="sm"
                leftIcon={<FiMail />}
              >
                Get in touch
              </Button>
              <Button
                as="a"
                href="#projects"
                variant="outline"
                size="md"
                fontSize="sm"
                colorScheme="purple"
                borderColor="purple.500"
                _hover={{
                  bg: 'purple.500',
                  transform: 'translateY(-2px)',
                }}
                transitionDuration="0.3s"
              >
                View my work
              </Button>
            </Stack>
          </MotionBox>

          <MotionBox variants={item} pt={4}>
            <HStack spacing={4} flexWrap="wrap">
              <HStack spacing={2}>
                <Icon as={FiMapPin} color="purple.400" bosmize={3.5} />
                <Text fontSize="sm" color="gray.400">{profile.location}</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FiPhone} color="purple.400" bosmize={3.5} />
                <Text fontSize="sm" color="gray.400">{profile.phone}</Text>
              </HStack>
              <HStack
                as="a"
                href={`mailto:${profile.email}`}
                spacing={2}
                _hover={{ color: 'purple.400' }}
                transition="color 0.3s"
              >
                <Icon as={FiMail} color="purple.400" bosmize={3.5} />
                <Text fontSize="sm" color="gray.400">{profile.email}</Text>
              </HStack>
            </HStack>
          </MotionBox>

          <MotionBox variants={item} pt={2}>
            <HStack spacing={3}>
              <Button
                as="a"
                href={`https://${profile.github}`}
                target="_blank"
                size="sm"
                variant="ghost"
                leftIcon={<FiGithub />}
                color="gray.400"
                fontSize="sm"
                _hover={{
                  color: 'white',
                  bg: 'whiteAlpha.100',
                }}
              >
                GitHub
              </Button>
              <Button
                as="a"
                href={`https://${profile.linkedin}`}
                target="_blank"
                size="sm"
                variant="ghost"
                leftIcon={<FiLinkedin />}
                color="gray.400"
                fontSize="sm"
                _hover={{
                  color: 'white',
                  bg: 'whiteAlpha.100',
                }}
              >
                LinkedIn
              </Button>
            </HStack>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  )
}

