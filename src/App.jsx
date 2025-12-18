import { Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectDetail from './components/ProjectDetail'
import MigrationCaseStudy from './components/MigrationCaseStudy'

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
    </>
  )
}

function App() {
  const basename = import.meta.env.MODE === 'production' ? '/portfolio' : '/'

  return (
    <Router basename={basename}>
      <Box bg="gray.900" minH="100vh">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="/case-study/migration" element={<MigrationCaseStudy />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  )
}

export default App

