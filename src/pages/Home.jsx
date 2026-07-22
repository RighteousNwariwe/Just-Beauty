import { useEffect, useState } from 'react'
import ContactForm from '../components/ContactForm'
import './Home.css'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const todayIdx = new Date().getDay()
    const row = document.querySelector(`.hours-row[data-day="${todayIdx}"]`)
    if (row) row.classList.add('today')

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduceMotion && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      }, { threshold: 0.15 })
      document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    } else {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'))
    }
  }, [])

  return (
    <>
      <section className="hero" id="top">
        <img src="/hero-salon.jpg" alt="Just Beauty salon interior with chandeliers and styling chairs" />
        <div className="hero-content">
          <div className="eyebrow">
            <svg className="icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3l1.8 5.6L19.4 10l-5.6 1.8L12 17.4l-1.8-5.6L4.6 10l5.6-1.4L12 3z"/>
              <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/>
            </svg>
            Hair · Spa · Laundry
          </div>
          <h1>Beauty, care <em>&amp; calm</em><br/>under one roof.</h1>
          <p className="lede">A unisex hair salon, spa and laundry — serving Maitland, Cape Town with warmth and precision.</p>
          <div className="hero-buttons">
            <a href="#hair" className="btn btn-solid">
              View Services
              <svg className="icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14"/>
                <path d="M13 6l6 6-6 6"/>
              </svg>
            </a>
            <a href="#visit" className="btn btn-outline">Visit Us</a>
          </div>
        </div>
        <div className="scroll-cue"></div>
      </section>

      <section className="intro">
        <div className="wrap">
          <div className="ornament">
            <span className="stem"></span>
            <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3l1.8 5.6L19.4 10l-5.6 1.8L12 17.4l-1.8-5.6L4.6 10l5.6-1.4L12 3z"/>
              <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/>
            </svg>
            <span className="stem"></span>
          </div>
          <div className="eyebrow reveal" style={{justifyContent: 'center'}}>Our House</div>
          <h2 className="reveal reveal-delay-1">Where a fresh look meets a fresh basket of linen.</h2>
          <p className="reveal reveal-delay-2">Just Beauty is a small, family-run studio in the heart of Maitland. We braid, twist, relax and lock hair; we knead tired shoulders; and we return your laundry pressed and folded — because looking after yourself shouldn't be a chore.</p>
        </div>
      </section>

      <section className="split" id="hair">
        <div className="split-media reveal">
          <img src="/hero-salon.jpg" alt="Styling chairs and mirrors at Just Beauty" />
          <div className="badge">
            <div className="badge-icon">
              <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="6" cy="6" r="3"/>
                <circle cx="6" cy="18" r="3"/>
                <line x1="20" y1="4" x2="8.12" y2="15.88"/>
                <line x1="14.47" y1="14.48" x2="20" y2="20"/>
                <line x1="8.12" y1="8.12" x2="12" y2="12"/>
              </svg>
            </div>
            <div>
              <div className="eyebrow" style={{marginBottom: '2px'}}>Signature</div>
              <strong>Boho Braids</strong>
            </div>
          </div>
        </div>
        <div className="split-copy reveal">
          <div className="eyebrow">
            <svg className="icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="6" cy="6" r="3"/>
              <circle cx="6" cy="18" r="3"/>
              <line x1="20" y1="4" x2="8.12" y2="15.88"/>
              <line x1="14.47" y1="14.48" x2="20" y2="20"/>
              <line x1="8.12" y1="8.12" x2="12" y2="12"/>
            </svg>
            Hairdressing
          </div>
          <h3>Braids, twists, locs &amp; every finish in between.</h3>
          <div className="price-list">
            {[
              {name: 'Wash / Dry', price: 'from R100'},
              {name: 'Lines', price: 'R150'},
              {name: 'Relaxer (Dark & Lovely)', price: 'R250'},
              {name: 'Relaxer (Soft & Free)', price: 'R200'},
              {name: 'Straight Back', price: 'R300'},
              {name: 'Straight Up', price: 'R350'},
              {name: 'Short Braid *', price: 'from R400'},
              {name: 'Long Braid *', price: 'from R500'},
              {name: 'Short Twist', price: 'from R450'},
              {name: 'Long Twist', price: 'from R500'},
              {name: 'Boho Braid — Short', price: 'R400'},
              {name: 'Boho Braid — Long', price: 'R500'},
              {name: 'Crochet', price: 'R300'},
              {name: 'Pony Tail', price: 'R250'},
              {name: 'Treatment', price: 'R300'},
              {name: 'Wig Installation', price: 'from R200'},
              {name: 'Dreadlocks', price: 'from R500'},
            ].map((item, i) => (
              <div key={i} className="price-row">
                <span className="name">{item.name}</span>
                <span className="price">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="price-note">* Fibre not included on braids.</p>
        </div>
      </section>

      <section className="split reverse" id="spa">
        <div className="split-media reveal">
          <img src="/massage.jpg" alt="Full body massage in candle-lit treatment room" />
        </div>
        <div className="split-copy reveal">
          <div className="eyebrow">
            <svg className="icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3l1.8 5.6L19.4 10l-5.6 1.8L12 17.4l-1.8-5.6L4.6 10l5.6-1.4L12 3z"/>
              <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/>
            </svg>
            Spa &amp; Massage
          </div>
          <h3>Exhale. You've arrived.</h3>
          <p className="desc">Slip away for a full-body massage in our candle-lit treatment room. Choose relaxing, deep tissue or a quick back &amp; shoulders revive — perfect while your laundry runs or your braids set.</p>
          <div className="price-list">
            {[
              {name: 'Pedicure & Manicure', price: 'from R300'},
              {name: 'Foot & Leg Massage', price: 'from R300'},
              {name: 'Back Massage (30–45 min)', price: 'R350'},
              {name: 'Full Body Massage (45 min)', price: 'from R450'},
            ].map((item, i) => (
              <div key={i} className="price-row">
                <span className="name">{item.name}</span>
                <span className="price">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="price-note"><b>Spa treatments</b> by appointment only — Fridays &amp; Saturdays.</p>
          <a href="#visit" className="btn btn-solid">
            Book a Session
            <svg className="icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14"/>
              <path d="M13 6l6 6-6 6"/>
            </svg>
          </a>
        </div>
      </section>

      <section className="instore">
        <div className="wrap">
          <div className="eyebrow on-dark reveal">
            <svg className="icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 8h12l-1 12H7L6 8z"/>
              <path d="M9 8V6a3 3 0 0 1 6 0v2"/>
            </svg>
            In Store
          </div>
          <h2 className="reveal reveal-delay-1">Wigs, fibres &amp; everything for your hair and nails.</h2>
          <div className="instore-grid">
            {[
              {icon: 'wig', label: 'Wigs'},
              {icon: 'thread', label: 'Fibres — all kinds'},
              {icon: 'bottle', label: 'Hair products'},
              {icon: 'drop', label: 'Botox treatments'},
              {icon: 'leaf', label: 'Keratin treatments'},
              {icon: 'nail', label: 'Nail services'},
            ].map((item, i) => (
              <div key={i} className={`instore-card reveal ${i === 1 ? 'reveal-delay-1' : ''} ${i === 2 ? 'reveal-delay-2' : ''}`}>
                <span className="icon-circle">
                  <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {item.icon === 'wig' && <><path d="M5 12c0-4.5 3-8 7-8s7 3.5 7 8v6a2 2 0 0 1-2 2h-1v-5m-8 5h-1a2 2 0 0 1-2-2v-6z"/><path d="M9 15v5"/></>}
                    {item.icon === 'thread' && <><rect x="7" y="3" width="10" height="18" rx="4"/><path d="M8 7c2 1 6 1 8 0M8 12c2 1 6 1 8 0M8 17c2 1 6 1 8 0"/></>}
                    {item.icon === 'bottle' && <><path d="M10 2h4v3.5l2 2V21a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V7.5l2-2V2z"/><path d="M9 11h6"/></>}
                    {item.icon === 'drop' && <path d="M12 3s6 7 6 11.5a6 6 0 0 1-12 0C6 10 12 3 12 3z"/>}
                    {item.icon === 'leaf' && <><path d="M5 19c8-1 13-6 14-14-8 1-13 6-14 14z"/><path d="M5 19c3-5 6-8 10-10"/></>}
                    {item.icon === 'nail' && <><path d="M9 2h6l1 3-2 1v9a4 4 0 0 1-8 0V6L4 5l1-3h4z"/><path d="M8 6h8"/></>}
                  </svg>
                </span>
                {item.label}
              </div>
            ))}
          </div>
          <p className="instore-note reveal">Ask in-store for current pricing on wigs, fibre packs, Botox, keratin and nail sets.</p>
        </div>
      </section>

      <section className="split" id="laundry">
        <div className="split-media reveal">
          <img src="/laundry.jpg" alt="Neatly folded stack of washed linen and clothing" />
        </div>
        <div className="split-copy reveal">
          <div className="eyebrow">
            <svg className="icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 4l4 2 4-2 4 4-3 3v9H7v-9L4 8l4-4z"/>
            </svg>
            Laundry
          </div>
          <h3>Washed, pressed, folded — ready.</h3>
          <div className="price-list">
            {[
              {name: 'Wash & Dry', price: 'R30 / kilo'},
              {name: 'Ironing', price: 'R30 / shirt'},
              {name: 'Dry Cleaning', price: 'from R250'},
              {name: 'Blankets', price: 'from R250'},
            ].map((item, i) => (
              <div key={i} className="price-row">
                <span className="name">{item.name}</span>
                <span className="price">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="price-note">Drop-off welcome during business hours. Same-week turnaround on most orders.</p>
        </div>
      </section>

      <section className="visit" id="visit">
        <div className="wrap">
          <div className="visit-grid">
            <div className="reveal">
              <div className="eyebrow on-rose">
                <svg className="icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12z"/>
                  <circle cx="12" cy="9" r="2.4"/>
                </svg>
                Visit
              </div>
              <h2>Come through — we'll put the kettle on.</h2>
              <div className="visit-detail">
                <span className="ic-circle">
                  <svg className="icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12z"/>
                    <circle cx="12" cy="9" r="2.4"/>
                  </svg>
                </span>
                <span>173 Voortrekker Rd,<br/>Maitland, Cape Town, 7405<br/>South Africa</span>
              </div>
              <div className="visit-detail">
                <span className="ic-circle">
                  <svg className="icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 3h3l1.5 4.5L8.5 9.5a12 12 0 0 0 6 6l2-2L21 15v3a2 2 0 0 1-2 2C11 20 4 13 4 5a2 2 0 0 1 2-2z"/>
                  </svg>
                </span>
                <span>Walk-ins welcome · Call to book</span>
              </div>
            </div>
            <div className="reveal reveal-delay-1">
              <div className="hours-title">
                <svg className="icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="8.5"/>
                  <path d="M12 7.5V12l3 2"/>
                </svg>
                Opening Hours
              </div>
              {[
                {day: 'Sunday', time: '09:00 – 15:00', idx: 0},
                {day: 'Monday', time: '08:00 – 21:00', idx: 1},
                {day: 'Tuesday', time: '08:00 – 21:00', idx: 2},
                {day: 'Wednesday', time: '08:00 – 21:00', idx: 3},
                {day: 'Thursday', time: '08:00 – 21:00', idx: 4},
                {day: 'Friday', time: '08:00 – 21:30', idx: 5},
                {day: 'Saturday', time: '08:00 – 22:30', idx: 6},
              ].map((item) => (
                <div key={item.day} className="hours-row" data-day={item.idx}>
                  <span className="day">{item.day}</span>
                  <span className="time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactForm />

      <footer>
        <div className="logo">Just Beauty</div>
        <p>&copy; 2026 Just Beauty · Beauty, cosmetic &amp; personal care</p>
      </footer>

      <a href="https://wa.me/27XXXXXXXXXX?text=Hi%20Just%20Beauty!%20I'd%20like%20to%20make%20a%20booking%20inquiry." className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp">
        <svg className="icon" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  )
}
