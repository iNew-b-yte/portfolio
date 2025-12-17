import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
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
  HStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  FiCheckCircle,
  FiAlertTriangle,
  FiTarget,
  FiTrendingUp,
  FiShield,
  FiDatabase,
} from 'react-icons/fi'

const MotionBox = motion(Box)

export default function MigrationCaseStudy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const migrationPhases = [
    {
      phase: 'Phase 1: Analysis & Planning',
      duration: '2 weeks',
      activities: [
        'Audited entire codebase for database dependencies',
        'Identified 200+ raw SQL queries hardcoded across 50+ files',
        'Discovered 80% of queries bypassing ORM layer',
        'Mapped data model inconsistencies between SAP HANA and PostgreSQL',
        'Created comprehensive migration strategy document',
      ],
      challenges: [
        'No centralized query management',
        'Direct string interpolation creating SQL injection risks',
        'SAP HANA-specific syntax scattered throughout codebase',
      ],
    },
    {
      phase: 'Phase 2: Abstraction Layer Design',
      duration: '1 week',
      activities: [
        'Designed database abstraction layer to hide implementation details',
        'Created repository pattern for all database operations',
        'Implemented query builder wrapper around ORM',
        'Established naming conventions and coding standards',
        'Set up dual-database testing framework',
      ],
      impact: 'Enabled plug-and-play database switching without touching business logic',
    },
    {
      phase: 'Phase 3: Incremental Migration',
      duration: '4 weeks',
      activities: [
        'Migrated queries module-by-module to prevent breaking changes',
        'Converted raw SQL to ORM queries with parameterized inputs',
        'Implemented automatic query sanitization',
        'Added comprehensive unit tests for each migrated module',
        'Maintained backward compatibility during transition',
      ],
      metrics: {
        queriesMigrated: '200+',
        ormAdoption: '95%',
        testCoverage: '85%',
      },
    },
    {
      phase: 'Phase 4: Security Hardening',
      duration: '1 week',
      activities: [
        'Replaced all string interpolation with parameterized queries',
        'Implemented input validation layer before database operations',
        'Added SQL injection prevention middleware',
        'Conducted security audit of all database interactions',
        'Set up automated security scanning in CI/CD',
      ],
      impact: 'Eliminated SQL injection attack surface completely',
    },
    {
      phase: 'Phase 5: Testing & Validation',
      duration: '2 weeks',
      activities: [
        'Executed parallel runs on both SAP HANA and PostgreSQL',
        'Validated data integrity across 500K+ records',
        'Performance tested all critical queries',
        'Conducted user acceptance testing',
        'Fixed edge cases and data type mismatches',
      ],
      results: {
        bugsFound: '0',
        performanceGain: '30%',
        dataIntegrity: '100%',
      },
    },
    {
      phase: 'Phase 6: Cutover & Monitoring',
      duration: '1 week',
      activities: [
        'Executed zero-downtime cutover using blue-green deployment',
        'Set up comprehensive monitoring and alerting',
        'Kept SAP HANA as hot standby for 1 week',
        'Monitored performance metrics in production',
        'Documented rollback procedures (unused)',
      ],
      outcome: 'Seamless production deployment with zero post-migration bugs',
    },
  ]

  const problemsEncountered = [
    {
      problem: 'Tightly Coupled Raw Queries',
      description:
        'Code directly embedded SAP HANA-specific SQL syntax, making it impossible to switch databases without massive refactoring.',
      example: `// Bad: Hardcoded SAP HANA query
const query = \`SELECT * FROM users WHERE id = '\${userId}' AND status = 'active'\`
db.execute(query) // Direct string interpolation - SQL injection risk!`,
      solution:
        'Created abstraction layer with repository pattern that hides database-specific implementation',
    },
    {
      problem: 'Lack of ORM Usage (80% bypass)',
      description:
        'Most developers bypassed the ORM and wrote raw SQL queries, losing benefits of automatic sanitization and cross-database compatibility.',
      example: `// Bad: Bypassing ORM
const result = await db.raw(\`
  SELECT u.*, p.profile_data 
  FROM users u 
  LEFT JOIN profiles p ON u.id = p.user_id 
  WHERE u.email = '\${email}'
\`)`,
      solution:
        'Migrated to ORM-first approach with query builders, making SQL injection nearly impossible',
    },
    {
      problem: 'SQL Injection Vulnerabilities',
      description:
        'Frontend input was directly interpolated into SQL queries without sanitization, creating critical security risks.',
      example: `// Critical Security Risk:
app.post('/users', (req, res) => {
  const username = req.body.username // User input directly from frontend
  const query = \`INSERT INTO users (username) VALUES ('\${username}')\`
  // Vulnerable to: username = "'; DROP TABLE users; --"
})`,
      solution:
        'Implemented parameterized queries and input validation middleware at application boundary',
    },
  ]

  const solutionsImplemented = [
    {
      solution: 'Database Abstraction Layer',
      description:
        'Created a repository pattern that completely abstracts database operations from business logic.',
      code: `// Solution: Repository Pattern
class UserRepository {
  async findById(userId) {
    // Uses ORM under the hood - database agnostic
    return await this.orm.User.findOne({ where: { id: userId } })
  }
  
  async findByEmail(email) {
    // Automatic sanitization via ORM
    return await this.orm.User.findOne({ where: { email } })
  }
}

// Business logic never touches database directly
const user = await userRepository.findById(userId)`,
      benefits: [
        'Plug-and-play database switching',
        'Single point of change for query optimization',
        'Easier to test with mock repositories',
        'Clear separation of concerns',
      ],
    },
    {
      solution: 'ORM-First Approach',
      description:
        'Migrated 95% of queries to use ORM with automatic query building and sanitization.',
      code: `// Solution: ORM with Query Builder
const users = await User.findAll({
  where: {
    status: 'active',
    createdAt: {
      [Op.gte]: startDate,
      [Op.lte]: endDate
    }
  },
  include: [{
    model: Profile,
    required: false
  }],
  order: [['createdAt', 'DESC']],
  limit: pageSize
})

// ORM automatically:
// - Sanitizes all inputs
// - Generates parameterized queries
// - Handles database differences`,
      benefits: [
        'Automatic SQL injection prevention',
        'Cross-database compatibility',
        'Type safety and validation',
        'Query optimization suggestions',
      ],
    },
    {
      solution: 'Input Validation Middleware',
      description:
        'Added validation layer at API boundary before any database interaction.',
      code: `// Solution: Validation Middleware
const { body, validationResult } = require('express-validator')

app.post('/users',
  // Validation rules
  body('email').isEmail().normalizeEmail(),
  body('username').trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
  body('age').optional().isInt({ min: 18, max: 120 }),
  
  // Validation handler
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
  
  // Safe to use validated input
  async (req, res) => {
    const user = await userRepository.create(req.body)
    res.json(user)
  }
)`,
      benefits: [
        'Input sanitization before database operations',
        'Clear error messages for invalid data',
        'Defense in depth security approach',
        'Prevents malformed data from reaching database',
      ],
    },
  ]

  const lessonsLearned = [
    {
      lesson: 'Always Design for Changeability',
      description:
        'Tightly coupling to specific database implementations creates technical debt that becomes exponentially harder to fix.',
      recommendation:
        'Use abstraction layers from day one. The small upfront cost pays massive dividends during migrations or scaling.',
    },
    {
      lesson: 'ORM is Your Friend, Not Enemy',
      description:
        'Developers often bypass ORMs for "performance," but lose critical security and maintainability benefits.',
      recommendation:
        'Use ORM for 95% of queries. Reserve raw SQL only for complex optimizations, and wrap them in repository methods.',
    },
    {
      lesson: 'Never Trust User Input',
      description:
        'Direct string interpolation of user input is the #1 cause of SQL injection attacks in production.',
      recommendation:
        'Implement validation at API boundary, use parameterized queries everywhere, and treat all input as hostile.',
    },
    {
      lesson: 'Incremental Migration Beats Big Bang',
      description:
        'Attempting to migrate everything at once is risky and makes rollback nearly impossible.',
      recommendation:
        'Migrate module-by-module, maintain backward compatibility, and verify each step before proceeding.',
    },
    {
      lesson: 'Zero Post-Migration Bugs is Achievable',
      description:
        'With proper planning, abstraction, testing, and incremental approach, perfect migrations are possible.',
      recommendation:
        'Invest time in planning and abstraction design. The migration itself becomes straightforward.',
    },
  ]

  const bestPractices = [
    'Design abstraction layers that hide implementation details',
    'Use ORM with parameterized queries for automatic sanitization',
    'Validate all input at application boundary',
    'Never interpolate user input directly into queries',
    'Test queries in parallel on both databases before cutover',
    'Maintain backward compatibility during migration',
    'Use feature flags for gradual rollout',
    'Keep comprehensive rollback procedures documented',
    'Monitor query performance metrics in production',
    'Conduct security audits after migration',
  ]

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
                Case Study
              </Badge>
              <Heading
                as="h1"
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="bold"
                bgGradient="linear(to-r, white, gray.400)"
                bgClip="text"
                mb={3}
              >
                Database Migration: SAP HANA → PostgreSQL
              </Heading>
              <Text fontSize="md" color="gray.400" mb={4}>
                A comprehensive case study on executing a zero-bug production database migration
              </Text>
            </Box>

            {/* Overview */}
            <Alert
              status="info"
              variant="subtle"
              bg="whiteAlpha.50"
              borderRadius="lg"
              borderWidth="1px"
              borderColor="blue.500"
            >
              <AlertIcon />
              <Box>
                <AlertTitle fontSize="sm">Migration Scope</AlertTitle>
                <AlertDescription fontSize="sm" lineHeight="1.6">
                  Migrated production system from SAP HANA to PostgreSQL across 50+ modules,
                  200+ queries, and 500K+ records with zero post-migration bugs and 30%
                  performance improvement
                </AlertDescription>
              </Box>
            </Alert>

            {/* Migration Phases */}
            <Box w="full">
              <Heading as="h2" fontSize="2xl" mb={4} color="white">
                Migration Timeline & Phases
              </Heading>
              <VStack spacing={4} align="stretch">
                {migrationPhases.map((phase, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    p={5}
                    bg="gray.800"
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="whiteAlpha.100"
                    borderLeftWidth="4px"
                    borderLeftColor="purple.500"
                  >
                    <HStack justify="space-between" mb={3}>
                      <Heading as="h3" fontSize="md" color="purple.300">
                        {phase.phase}
                      </Heading>
                      <Badge colorScheme="purple" fontSize="sm">
                        {phase.duration}
                      </Badge>
                    </HStack>

                    <List spacing={1} mb={3}>
                      {phase.activities.map((activity, idx) => (
                        <ListItem key={idx} fontSize="sm" color="gray.400">
                          <ListIcon as={FiCheckCircle} color="green.400" />
                          {activity}
                        </ListItem>
                      ))}
                    </List>

                    {phase.challenges && (
                      <Box mt={3} p={3} bg="orange.900" bg="whiteAlpha.50" borderRadius="md">
                        <Text fontSize="sm" fontWeight="600" color="orange.400" mb={2}>
                          Challenges:
                        </Text>
                        {phase.challenges.map((challenge, idx) => (
                          <Text key={idx} fontSize="sm" color="gray.400" mb={1}>
                            • {challenge}
                          </Text>
                        ))}
                      </Box>
                    )}

                    {phase.impact && (
                      <Alert status="success" variant="subtle" bg="green.900" bg="whiteAlpha.50" mt={3} borderRadius="md">
                        <AlertIcon bosmize={4} />
                        <Text fontSize="sm" color="green.300">
                          <strong>Impact:</strong> {phase.impact}
                        </Text>
                      </Alert>
                    )}

                    {phase.metrics && (
                      <SimpleGrid columns={3} spacing={2} mt={3}>
                        {Object.entries(phase.metrics).map(([key, value]) => (
                          <Box key={key} textAlign="center" p={2} bg="whiteAlpha.50" borderRadius="md">
                            <Text fontSize="lg" fontWeight="bold" color="purple.400">
                              {value}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    )}

                    {phase.results && (
                      <SimpleGrid columns={3} spacing={2} mt={3}>
                        {Object.entries(phase.results).map(([key, value]) => (
                          <Box key={key} textAlign="center" p={2} bg="whiteAlpha.50" borderRadius="md">
                            <Text fontSize="lg" fontWeight="bold" color="green.400">
                              {value}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    )}

                    {phase.outcome && (
                      <Alert status="success" variant="subtle" bg="whiteAlpha.50" mt={3} borderRadius="md">
                        <AlertIcon bosmize={4} />
                        <Text fontSize="sm" color="green.300">
                          {phase.outcome}
                        </Text>
                      </Alert>
                    )}
                  </MotionBox>
                ))}
              </VStack>
            </Box>

            <Divider borderColor="whiteAlpha.200" />

            {/* Problems Encountered */}
            <Box w="full">
              <Heading as="h2" fontSize="2xl" mb={4} color="white">
                <HStack spacing={2}>
                  <FiAlertTriangle color="#F59E0B" />
                  <Text>Problems Encountered</Text>
                </HStack>
              </Heading>
              <Accordion allowMultiple>
                {problemsEncountered.map((item, index) => (
                  <AccordionItem
                    key={index}
                    border="1px"
                    borderColor="orange.500"
                    borderRadius="lg"
                    mb={3}
                    bg="gray.800"
                  >
                    <AccordionButton _hover={{ bg: 'whiteAlpha.100' }} py={4}>
                      <Box flex="1" textAlign="left">
                        <Text fontSize="sm" fontWeight="600" color="orange.400">
                          {item.problem}
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <VStack align="start" spacing={3}>
                        <Text fontSize="sm" color="gray.400" lineHeight="1.7">
                          {item.description}
                        </Text>

                        {item.example && (
                          <Box w="full">
                            <Text fontSize="sm" color="gray.500" mb={2}>
                              Example of the Problem:
                            </Text>
                            <Code
                              display="block"
                              whiteSpace="pre"
                              fontSize="sm"
                              p={3}
                              bg="gray.900"
                              borderRadius="md"
                              overflowX="auto"
                              color="red.300"
                            >
                              {item.example}
                            </Code>
                          </Box>
                        )}

                        <Alert status="info" variant="subtle" bg="whiteAlpha.50" borderRadius="md">
                          <AlertIcon bosmize={4} />
                          <Text fontSize="sm" color="blue.300">
                            <strong>Solution:</strong> {item.solution}
                          </Text>
                        </Alert>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Box>

            <Divider borderColor="whiteAlpha.200" />

            {/* Solutions Implemented */}
            <Box w="full">
              <Heading as="h2" fontSize="2xl" mb={4} color="white">
                <HStack spacing={2}>
                  <FiTarget color="#10B981" />
                  <Text>Solutions Implemented</Text>
                </HStack>
              </Heading>
              <Accordion allowMultiple>
                {solutionsImplemented.map((item, index) => (
                  <AccordionItem
                    key={index}
                    border="1px"
                    borderColor="green.500"
                    borderRadius="lg"
                    mb={3}
                    bg="gray.800"
                  >
                    <AccordionButton _hover={{ bg: 'whiteAlpha.100' }} py={4}>
                      <Box flex="1" textAlign="left">
                        <Text fontSize="sm" fontWeight="600" color="green.400">
                          {item.solution}
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <VStack align="start" spacing={3}>
                        <Text fontSize="sm" color="gray.400" lineHeight="1.7">
                          {item.description}
                        </Text>

                        {item.code && (
                          <Box w="full">
                            <Text fontSize="sm" color="gray.500" mb={2}>
                              Implementation:
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
                              {item.code}
                            </Code>
                          </Box>
                        )}

                        {item.benefits && item.benefits.length > 0 && (
                          <Box w="full">
                            <Text fontSize="sm" fontWeight="600" color="green.400" mb={2}>
                              Benefits:
                            </Text>
                            <List spacing={1}>
                              {item.benefits.map((benefit, idx) => (
                                <ListItem key={idx} fontSize="sm" color="gray.400">
                                  <ListIcon as={FiCheckCircle} color="green.400" />
                                  {benefit}
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Box>

            <Divider borderColor="whiteAlpha.200" />

            {/* Lessons Learned */}
            <Box w="full">
              <Heading as="h2" fontSize="2xl" mb={4} color="white">
                <HStack spacing={2}>
                  <FiTrendingUp color="#8B5CF6" />
                  <Text>Lessons Learned</Text>
                </HStack>
              </Heading>
              <VStack spacing={4} align="stretch">
                {lessonsLearned.map((item, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    p={5}
                    bg="gray.800"
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="purple.500"
                  >
                    <Heading as="h3" fontSize="sm" color="purple.300" mb={2}>
                      {index + 1}. {item.lesson}
                    </Heading>
                    <Text fontSize="sm" color="gray.400" mb={3} lineHeight="1.7">
                      {item.description}
                    </Text>
                    <Box p={3} bg="whiteAlpha.50" borderRadius="md" borderLeftWidth="3px" borderLeftColor="purple.500">
                      <Text fontSize="sm" fontWeight="600" color="purple.400" mb={1}>
                        Recommendation:
                      </Text>
                      <Text fontSize="sm" color="gray.400" lineHeight="1.6">
                        {item.recommendation}
                      </Text>
                    </Box>
                  </MotionBox>
                ))}
              </VStack>
            </Box>

            <Divider borderColor="whiteAlpha.200" />

            {/* Best Practices */}
            <Box w="full">
              <Heading as="h2" fontSize="2xl" mb={4} color="white">
                <HStack spacing={2}>
                  <FiShield color="#10B981" />
                  <Text>Production Migration Best Practices</Text>
                </HStack>
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                {bestPractices.map((practice, index) => (
                  <Box
                    key={index}
                    p={3}
                    bg="gray.800"
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor="whiteAlpha.100"
                  >
                    <HStack spacing={2} align="start">
                      <FiCheckCircle color="#10B981" size={14} style={{ marginTop: '2px', flesmhrink: 0 }} />
                      <Text fontSize="sm" color="gray.400" lineHeight="1.6">
                        {practice}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>

            {/* Results Summary */}
            <Alert
              status="success"
              variant="subtle"
              bg="whiteAlpha.50"
              borderRadius="lg"
              borderWidth="1px"
              borderColor="green.500"
            >
              <AlertIcon />
              <Box>
                <AlertTitle fontSize="sm">Final Results</AlertTitle>
                <AlertDescription fontSize="sm" lineHeight="1.6">
                  Successfully migrated 500K+ records across 50+ modules with <strong>zero post-migration bugs</strong>,
                  <strong> 30% performance improvement</strong>, <strong>100% data integrity</strong>, and
                  <strong> complete elimination of SQL injection vulnerabilities</strong>. The abstraction layer and ORM-first
                  approach now enables switching databases with minimal code changes.
                </AlertDescription>
              </Box>
            </Alert>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  )
}

