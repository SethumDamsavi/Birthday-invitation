export default function VenueImage() {
  return (
    <section className="venue-image-section">
      <div className="venue-image-wrapper">
        <img src="/images/venue.png" alt="Celebration venue" className="venue-img" />
        <div className="venue-image-overlay">
          <p className="venue-overlay-text">A Night to Remember</p>
        </div>
      </div>
    </section>
  )
}
