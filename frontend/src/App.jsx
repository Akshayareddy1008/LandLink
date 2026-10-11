
import { useState } from "react";
import "./App.css";
import Buyer from "./Buyer";
import Seller from "./Seller";
import { LandProvider } from "./LandContext";

function AppContent() {
  const [portal, setPortal] = useState("");

  if (portal === "buyer") {
    return <Buyer onBack={() => setPortal("")} />;
  }

  if (portal === "seller") {
    return <Seller onBack={() => setPortal("")} />;
  }

  return (
    <div className="app">
      <header className="navbar">
        <h1 className="logo">LandLink<span>.</span></h1>

        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#portals">Our Portals</a>
        </nav>

        <a className="nav-button" href="#portals">
          Get Started
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">A SMARTER WAY TO FIND LAND</p>

            <h2>
              Your Land Journey,
              <br />
              <span>Made Simple.</span>
            </h2>

            <p className="hero-text">
              Buy and sell land with greater transparency.
              Explore properties, compare asking prices, and
              connect with buyers or sellers directly.
            </p>

            <a className="primary-button" href="#portals">
              Explore LandLink →
            </a>

            <div className="features">
              <span>✓ Transparent Listings</span>
              <span>✓ Direct Connections</span>
              <span>✓ Buyer Guidance</span>
            </div>
          </div>

          <div className="hero-image">
            <div className="image-overlay">
              <p>Find a place to build your future.</p>
            </div>
          </div>
        </section>

        <section className="portals" id="portals">
          <p className="eyebrow">GET STARTED WITH LANDLINK</p>
          <h2>Choose Your Portal</h2>

          <p className="section-text">
            Select the portal that matches your purpose.
          </p>

          <div className="portal-cards">
            <article className="portal-card buyer-card">
              <div className="portal-icon">⌕</div>
              <h3>Buyer Portal</h3>

              <p>
                Discover land, explore property details,
                compare prices, and connect with sellers.
              </p>

              <ul>
                <li>Search and filter land listings</li>
                <li>Save your favourite properties</li>
                <li>Request property visits</li>
                <li>Access first-time buyer guidance</li>
              </ul>

              <button className="portal-button" onClick={() => setPortal("buyer")}>
                Enter Buyer Portal →
              </button>
            </article>

            <article className="portal-card seller-card">
              <div className="portal-icon">＋</div>
              <h3>Seller Portal</h3>

              <p>
                Publish your land listings, manage properties,
                and respond to interested buyers.
              </p>

              <ul>
                <li>Create property listings</li>
                <li>Add land photos and asking prices</li>
                <li>Edit your own listings</li>
                <li>Manage buyer enquiries</li>
              </ul>

              <button className="portal-button" onClick={() => setPortal("seller")}>
                Enter Seller Portal →
              </button>
            </article>
          </div>
        </section>

        <section className="about" id="about">
          <p className="eyebrow">WHY LANDLINK?</p>
          <h2>More Clarity. Better Connections.</h2>

          <div className="about-grid">
            <div>
              <h3>Price Transparency</h3>
              <p>
                Compare asking prices across similar listings.
                These comparisons are not official valuations.
              </p>
            </div>

            <div>
              <h3>Listing Clarity</h3>
              <p>
                Understand which property details and document
                information a seller has provided.
              </p>
            </div>

            <div>
              <h3>Buyer Support</h3>
              <p>
                Use checklists to help ask questions before
                deciding to purchase land.
              </p>
            </div>
          </div>

          <p className="disclaimer">
            Property listings are not legal verification.
            Independently verify ownership and land records.
          </p>
        </section>
      </main>

      <footer>
        <h2>LandLink<span>.</span></h2>
        <p>Connecting land buyers and sellers with clarity.</p>
        <p>© 2026 LandLink. Project prototype.</p>
      </footer>
    </div>
  );
}
export default function App() {
  return (
    <LandProvider>
      <AppContent />
    </LandProvider>
  );
}