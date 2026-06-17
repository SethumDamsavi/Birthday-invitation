import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarHeart, Send, CheckCircle2, Loader2 } from 'lucide-react'

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    guestCount: '1',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // ==========================================
    // PASTE YOUR GOOGLE SCRIPT WEB APP URL HERE:
    // ==========================================
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzpTywYT_EtZGsC4_ksvT1uLs8q7fmQ6vOsVtLd76uQuFTCvR20v8znTApX5xh3idwKwA/exec' 

    try {
      // Create form data to send
      const formBody = new FormData();
      formBody.append('name', formData.name);
      formBody.append('attending', formData.attending === 'yes' ? 'Joyfully Accepts' : 'Regretfully Declines');
      formBody.append('guestCount', formData.attending === 'yes' ? formData.guestCount : '0');
      formBody.append('message', formData.message);

      // Send the data to Google Sheets
      await fetch(scriptURL, {
        method: 'POST',
        body: formBody,
        mode: 'no-cors'
      });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was a problem submitting your RSVP. Please try again.');
      setIsSubmitting(false);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 20px',
    margin: '8px 0 20px',
    display: 'inline-block',
    border: '2px solid var(--pink-100)',
    borderRadius: '15px',
    boxSizing: 'border-box',
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    background: 'rgba(255, 255, 255, 0.9)',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    color: 'var(--text-dark)'
  };

  const labelStyle = {
    display: 'block',
    textAlign: 'left',
    fontFamily: 'var(--font-sans)',
    fontWeight: '700',
    color: 'var(--pink-600)',
    marginBottom: '5px',
    fontSize: '0.95rem'
  };

  return (
    <section id="rsvp" className="section-container" style={{ padding: '6vw 2vw', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        style={{ 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))', 
          backdropFilter: 'blur(20px)', 
          border: '2px solid white', 
          borderRadius: '40px', 
          padding: 'clamp(40px, 6vw, 60px) 20px', 
          boxShadow: '0 20px 50px rgba(236,72,153,0.1)',
          width: '100%',
          maxWidth: '800px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative Background Blur */}
        <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '150px', height: '150px', background: 'var(--pink-200)', borderRadius: '50%', filter: 'blur(50px)', opacity: 0.5, zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--pink-300)', borderRadius: '50%', filter: 'blur(50px)', opacity: 0.3, zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{ 
                    background: 'linear-gradient(135deg, var(--pink-100), white)', 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    boxShadow: '0 10px 20px rgba(236,72,153,0.15)',
                    marginBottom: '20px',
                    border: '2px solid var(--pink-200)'
                  }}
                >
                  <CalendarHeart strokeWidth={2} size={36} color="var(--pink-500)" />
                </motion.div>
                
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--pink-600)', margin: '0 0 15px 0', textShadow: '0 2px 10px rgba(236,72,153,0.1)' }}>
                  Confirm Attendance
                </h3>
                
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: 'var(--text-medium)', textTransform: 'uppercase', letterSpacing: '2px', lineHeight: '1.6', marginBottom: '30px' }}>
                  Please confirm your attendance<br/>
                  <span style={{ fontWeight: '700', color: 'var(--pink-500)' }}>Before November 1st, 2026</span>
                </p>

                <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'left' }}>
                  <label style={labelStyle}>Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange} 
                    style={inputStyle} 
                    placeholder="Enter your name"
                    onFocus={(e) => e.target.style.borderColor = 'var(--pink-400)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--pink-100)'}
                  />

                  <label style={labelStyle}>Will you attend? *</label>
                  <select 
                    name="attending" 
                    value={formData.attending} 
                    onChange={handleChange} 
                    style={{...inputStyle, cursor: 'pointer'}}
                    onFocus={(e) => e.target.style.borderColor = 'var(--pink-400)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--pink-100)'}
                  >
                    <option value="yes">Joyfully Accepts</option>
                    <option value="no">Regretfully Declines</option>
                  </select>

                  <AnimatePresence>
                    {formData.attending === 'yes' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, overflow: 'hidden' }} 
                        animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      >
                        <label style={labelStyle}>Number of Guests</label>
                        <input 
                          type="number" 
                          name="guestCount" 
                          min="1" 
                          max="10" 
                          value={formData.guestCount} 
                          onChange={handleChange} 
                          style={inputStyle} 
                          onFocus={(e) => e.target.style.borderColor = 'var(--pink-400)'}
                          onBlur={(e) => e.target.style.borderColor = 'var(--pink-100)'}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <label style={labelStyle}>Additional Notes (Optional)</label>
                  <textarea 
                    name="message" 
                    rows="3" 
                    value={formData.message} 
                    onChange={handleChange} 
                    style={{...inputStyle, resize: 'vertical'}} 
                    placeholder="Dietary requirements, special requests, or a message..."
                    onFocus={(e) => e.target.style.borderColor = 'var(--pink-400)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--pink-100)'}
                  ></textarea>

                  <motion.button 
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.03, boxShadow: '0 15px 30px rgba(236,72,153,0.3)' } : {}}
                    whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                    style={{ 
                      background: 'linear-gradient(45deg, var(--pink-500), var(--pink-400))', 
                      color: 'white', 
                      padding: '18px 40px', 
                      borderRadius: '30px', 
                      fontFamily: 'var(--font-sans)', 
                      fontSize: '1.1rem', 
                      fontWeight: '700', 
                      textTransform: 'uppercase', 
                      letterSpacing: '2px', 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      boxShadow: '0 10px 20px rgba(236,72,153,0.2)',
                      border: 'none',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.7 : 1,
                      width: '100%',
                      marginTop: '10px'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        Submitting...
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                          <Loader2 size={20} />
                        </motion.div>
                      </>
                    ) : (
                      <>
                        Confirm RSVP
                        <Send size={20} />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '40px 20px', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                  style={{ display: 'inline-block', marginBottom: '25px' }}
                >
                  <CheckCircle2 size={90} color="var(--pink-500)" />
                </motion.div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--pink-600)', margin: '0 0 15px 0' }}>
                  Thank You!
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'var(--text-medium)', lineHeight: '1.6', maxWidth: '400px' }}>
                  {formData.attending === 'yes' 
                    ? `We've received your RSVP! We can't wait to celebrate with you, ${formData.name}.` 
                    : `We've received your RSVP. We will miss you, ${formData.name}!`}
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', attending: 'yes', guestCount: '1', message: '' });
                  }}
                  style={{
                    background: 'white',
                    border: '2px solid var(--pink-300)',
                    color: 'var(--pink-600)',
                    padding: '12px 30px',
                    borderRadius: '30px',
                    marginTop: '40px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: '700',
                    fontSize: '1rem',
                    boxShadow: '0 5px 15px rgba(236,72,153,0.1)'
                  }}
                >
                  Submit Another RSVP
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </section>
  )
}
