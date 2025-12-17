import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Stack,
  Container,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const Links = [
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Education', href: '/#education' },
  { name: 'Migration Case Study', href: '/case-study/migration' },
  { name: 'Contact', href: '/#contact' },
]

const NavLink = ({ children, href }) => (
  <Link
    px={2}
    py={1}
    rounded="md"
    fontSize="sm"
    fontWeight="500"
    color="gray.300"
    _hover={{
      textDecoration: 'none',
      color: 'white',
      bgGradient: 'linear(to-r, purple.500, pink.500)',
      bgClip: 'text',
    }}
    href={href}
    transitionDuration="0.3s"
  >
    {children}
  </Link>
)

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <MotionBox
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg="rgba(17, 25, 40, 0.75)"
      backdropFilter="blur(16px)"
      borderBottom="1px"
      borderColor="whiteAlpha.100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxW="container.xl">
        <Flex h={14} alignItems="center" justifyContent="space-between">
          <Link href="/">
            <Box
              fontSize="lg"
              fontWeight="bold"
              bgGradient="linear(to-r, purple.400, pink.400)"
              bgClip="text"
              _hover={{ cursor: 'pointer' }}
            >
              NK
            </Box>
          </Link>

          <HStack spacing={6} alignItems="center" display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link.name} href={link.href}>
                {link.name}
              </NavLink>
            ))}
          </HStack>

          <IconButton
            size="sm"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            bg="transparent"
            _hover={{ bg: 'whiteAlpha.200' }}
          />
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={2}>
              {Links.map((link) => (
                <NavLink key={link.name} href={link.href}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </MotionBox>
  )
}

