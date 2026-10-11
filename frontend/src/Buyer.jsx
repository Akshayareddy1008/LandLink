
import { useState } from "react";
import { useLand } from "./LandContext";

export default function Buyer({ onBack }) {
  const [page, setPage] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [view, setView] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem("landlink_saved") || "[]"
    );
  } catch {
    return [];
  }
});

  const { listings, enquiries, setEnquiries } = useLand();
  const [enquiryLand, setEnquiryLand] = useState(null);
const [buyerEmail, setBuyerEmail] = useState("");
const [message, setMessage] = useState("");
  function updateSaved(nextSaved) {
  setSaved(nextSaved);
  localStorage.setItem(
    "landlink_saved",
    JSON.stringify(nextSaved)
  );
}

  const filteredListings = listings.filter((land) =>
    `${land.title} ${land.location} ${land.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  function sendEnquiry(event) {
  event.preventDefault();

  setEnquiries([
    ...enquiries,
    {
      id: Date.now(),
      landId: enquiryLand.id,
      landTitle: enquiryLand.title,
      buyerName: name || "Buyer",
      buyerEmail,
      message
    }
  ]);

  setEnquiryLand(null);
  setBuyerEmail("");
  setMessage("");

  alert("Your enquiry has been sent!");
}

  if (loggedIn && view === "browse") {
    return (
      <main className="portals">
        <button className="secondary-button" onClick={() => setView("dashboard")}>
          ← Back to Dashboard
        </button>

        <p className="eyebrow" style={{ marginTop: 35 }}>
          LANDLINK · EXPLORE LAND
        </p>
        <h2>Available Properties</h2>
        <p className="section-text">
          Explore land listings added by sellers.
        </p>

        <input
          type="text"
          placeholder="Search by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={fieldStyle}
        />

        {filteredListings.length === 0 ? (
          <p>No properties found. Try another search.</p>
        ) : (
          <div className="portal-cards">
            {filteredListings.map((land) => (
              <article className="portal-card" key={land.id}>
                {land.photo && (
                  <img
                    src={land.photo}
                    alt={land.title}
                    style={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 10
                    }}
                  />
                )}

                <h3>{land.title}</h3>
                <p>📍 {land.location}</p>
                <p>
                  <strong>Area:</strong> {land.area} {land.unit}
                </p>
                <p>
                  <strong>Price:</strong> ₹
                  {Number(land.price).toLocaleString("en-IN")}
                </p>
                <p>{land.description}</p>

                <button
                  className="portal-button"
                  onClick={() =>
                    setSaved((previous) =>
                      previous.includes(land.id)
                        ? previous.filter((id) => id !== land.id)
                        : [...previous, land.id]
                    )
                  }
                >
                  {saved.includes(land.id)
                    ? "♥ Saved"
                    : "♡ Save Property"}
                </button>
                <button
  className="portal-button"
  onClick={() => setEnquiryLand(land)}
>
  Enquire Now
</button>
              </article>
            ))}
          </div>
        )}
        {enquiryLand && (
  <form onSubmit={sendEnquiry} style={fieldStyle}>
    <h3>Enquire About {enquiryLand.title}</h3>

    <label>Your Email</label>
    <input
      required
      type="email"
      value={buyerEmail}
      onChange={(e) => setBuyerEmail(e.target.value)}
      placeholder="Enter your email"
      style={fieldStyle}
    />

    <label>Message</label>
    <textarea
      required
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="I'm interested in this property..."
      style={fieldStyle}
    />

    <button className="portal-button" type="submit">
      Send Enquiry
    </button>

    <button
      type="button"
      className="secondary-button"
      onClick={() => setEnquiryLand(null)}
    >
      Cancel
    </button>
  </form>
)}
      </main>
    );
  }

  if (loggedIn && view === "saved") {
    const savedListings = listings.filter((land) =>
      saved.includes(land.id)
    );

    return (
      <main className="portals">
        <button className="secondary-button" onClick={() => setView("dashboard")}>
          ← Back to Dashboard
        </button>

        <p className="eyebrow" style={{ marginTop: 35 }}>
          LANDLINK · SAVED PROPERTIES
        </p>
        <h2>Your Saved Properties</h2>

        {savedListings.length === 0 ? (
          <p className="section-text">
            No saved properties yet. Browse land and save your favourites!
          </p>
        ) : (
          <div className="portal-cards">
            {savedListings.map((land) => (
              <article className="portal-card" key={land.id}>
                <h3>{land.title}</h3>
                <p>📍 {land.location}</p>
                <p>Area: {land.area} {land.unit}</p>
                <p>Price: ₹{Number(land.price).toLocaleString("en-IN")}</p>
                <button
                  className="portal-button"
                  onClick={() =>
                    setSaved((previous) =>
                      previous.filter((id) => id !== land.id)
                    )
                  }
                >
                  Remove from Saved
                </button>
              </article>
            ))}
          </div>
        )}
      </main>
    );
  }

  if (loggedIn) {
    return (
      <main className="portals">
        <button
          className="secondary-button"
          onClick={() => {
            setLoggedIn(false);
            setPage("login");
            setView("dashboard");
          }}
        >
          ← Logout
        </button>

        <p className="eyebrow" style={{ marginTop: 35 }}>
          LANDLINK · BUYER PORTAL
        </p>
        <h2>Welcome, {name || "Buyer"}!</h2>
        <p className="section-text">Your land search starts here.</p>

        <div className="portal-cards">
          <article className="portal-card">
            <div className="portal-icon">⌕</div>
            <h3>Explore Land</h3>
            <p>Discover properties and compare asking prices.</p>
            <button className="portal-button" onClick={() => setView("browse")}>
              Browse Properties
            </button>
          </article>

          <article className="portal-card">
            <div className="portal-icon">♡</div>
            <h3>Saved Properties</h3>
            <p>Your favourite land listings will appear here.</p>
            <button className="portal-button" onClick={() => setView("saved")}>
              View Saved
            </button>
          </article>

          <article className="portal-card">
            <div className="portal-icon">✓</div>
            <h3>Buyer Guidance</h3>
            <p>
              Remember to independently verify land records and ownership.
            </p>
          </article>
        </div>
      </main>
    );
  }

  return (
    <main className="portals">
      <button className="secondary-button" onClick={onBack}>
        ← Back to LandLink
      </button>

      <p className="eyebrow" style={{ marginTop: 35 }}>
        LANDLINK · BUYER PORTAL
      </p>

      <h2>{page === "login" ? "Buyer Login" : "Create Buyer Account"}</h2>
      <p className="section-text">
        Find your next piece of land with confidence.
      </p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setLoggedIn(true);
          setView("dashboard");
        }}
        style={{
          maxWidth: 420,
          margin: "30px auto",
          padding: 30,
          textAlign: "left",
          border: "1px solid #e5ebe5",
          borderRadius: 16
        }}
      >
        {page === "register" && (
          <>
            <label>Full Name</label>
            <input
              required
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              style={fieldStyle}
            />
          </>
        )}

        <label>Email Address</label>
        <input required type="email" placeholder="Enter your email" style={fieldStyle} />

        <label>Password</label>
        <input
          required
          type="password"
          minLength={8}
          placeholder="At least 8 characters"
          style={fieldStyle}
        />

        <button className="portal-button" type="submit">
          {page === "login" ? "Login as Buyer" : "Create Buyer Account"}
        </button>

        <p style={{ textAlign: "center", fontSize: 13, marginTop: 22 }}>
          {page === "login" ? "New to LandLink? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setPage(page === "login" ? "register" : "login")}
            style={{
              border: 0,
              background: "none",
              color: "#247d49",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            {page === "login" ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </main>
  );
}

const fieldStyle = {
  display: "block",
  width: "100%",
  padding: 13,
  margin: "8px 0 20px",
  border: "1px solid #dce5dc",
  borderRadius: 8,
  font: "inherit",
  boxSizing: "border-box"
};
