import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import { Services, ServiceDetail } from './pages/Services'
import { Projects, ProjectDetail } from './pages/Projects'
import { Products, ProductDetail } from './pages/Products'
import { Technicians, TechnicianProfile, BookTechnician } from './pages/Technicians'
import { Enquiry, Book, Contact, Emergency, ThankYou } from './pages/Forms'
import { Testimonials, Faq, Blog, BlogPost, Search, Legal, Sitemap, NotFound } from './pages/Misc'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="team" element={<Team />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path="technicians" element={<Technicians />} />
        <Route path="technicians/:slug" element={<TechnicianProfile />} />
        <Route path="technicians/:slug/book" element={<BookTechnician />} />
        <Route path="book" element={<Book />} />
        <Route path="enquiry" element={<Enquiry />} />
        <Route path="contact" element={<Contact />} />
        <Route path="emergency" element={<Emergency />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="faq" element={<Faq />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="search" element={<Search />} />
        <Route path="privacy" element={<Legal kind="privacy" />} />
        <Route path="terms" element={<Legal kind="terms" />} />
        <Route path="sitemap" element={<Sitemap />} />
        <Route path="thank-you" element={<ThankYou />} />
        <Route path="booking-confirmed" element={<ThankYou booking />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
