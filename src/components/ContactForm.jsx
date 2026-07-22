import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { ref, push } from 'firebase/database'
import { db } from '../firebase'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [formMessage, setFormMessage] = useState({ text: '', type: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormMessage({ text: '', type: '' })

    try {
      // Save to Firebase Realtime Database
      const submissionData = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        timestamp: new Date().toISOString(),
        status: 'pending'
      }

      await push(ref(db, 'contact_submissions'), submissionData)

      // Send email using EmailJS
      // Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID with your actual EmailJS service and template IDs
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', submissionData, 'YOUR_PUBLIC_KEY')

      setFormMessage({
        text: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.',
        type: 'success'
      })
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
    } catch (error) {
      console.error('Error:', error)
      setFormMessage({
        text: 'Oops! Something went wrong. Please try again or contact us via WhatsApp.',
        type: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="eyebrow reveal">
          <svg className="icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 3l1.8 5.6L19.4 10l-5.6 1.8L12 17.4l-1.8-5.6L4.6 10l5.6-1.4L12 3z"/>
            <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/>
          </svg>
          Get in Touch
        </div>
        <h2 className="reveal reveal-delay-1">Send us a message</h2>
        <div className="contact-form reveal reveal-delay-2">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+27 XX XXX XXXX"
                />
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Interested In</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  <option value="hair">Hair Services</option>
                  <option value="spa">Spa & Massage</option>
                  <option value="laundry">Laundry Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-group full">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us about your booking request or inquiry..."
              />
            </div>
            <div className="form-submit">
              <button type="submit" className="btn btn-solid" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <svg className="icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14"/>
                  <path d="M13 6l6 6-6 6"/>
                </svg>
              </button>
            </div>
            {formMessage.text && (
              <div className={`form-message ${formMessage.type}`}>
                {formMessage.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
