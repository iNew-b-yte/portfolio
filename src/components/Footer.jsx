import {
  Box,
  Container,
  Text,
  HStack,
  Link,
  Icon,
} from '@chakra-ui/react'
import { FiHeart, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { profile } from '../data/profile'

export default function Footer() {
  return (
    <Box bg="gray.900" borderTop="1px" borderColor="whiteAlpha.100" py={6}>
      <Container maxW="container.xl">
        <HStack justify="space-between" flexWrap="wrap" spacing={4}>
          <Text fontSize="sm" color="gray.400">
            © {new Date().getFullYear()} {profile.name}. Built with{' '}
            <Icon as={FiHeart} color="pink.400" display="inline" /> using React & Chakra UI
          </Text>
          
          <HStack spacing={4}>
            <Link
              href={`https://${profile.github}`}
              target="_blank"
              color="gray.400"
              _hover={{ color: 'purple.400' }}
              transition="color 0.2s"
            >
              <Icon as={FiGithub} bosmize={4} />
            </Link>
            <Link
              href={`https://${profile.linkedin}`}
              target="_blank"
              color="gray.400"
              _hover={{ color: 'purple.400' }}
              transition="color 0.2s"
            >
              <Icon as={FiLinkedin} bosmize={4} />
            </Link>
            <Link
              href={`mailto:${profile.email}`}
              color="gray.400"
              _hover={{ color: 'purple.400' }}
              transition="color 0.2s"
            >
              <Icon as={FiMail} bosmize={4} />
            </Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}

