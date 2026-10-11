
import { useState } from "react";
import { useLand } from "./LandContext";

export default function SellerPortal({ onBack }) {
  const [page, setPage] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {listings, setListings} = useLand();
  const [editId, setEditId] = useState(null);
  const [photo, setPhoto] = useState("");
  const [form, setForm] = useState({
    title: "",
    location: "",
    area: "",
    unit: "Sq. Yards",
    price: "",
    description: ""
  });

  const updateForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  
const saveListing = (event) => {
  event.preventDefault();

  if (editId !== null) {
    setListings(
      listings.map((land) =>
        land.id === editId
          ? { ...land, ...form, photo }
          : land
      )
    );
    setEditId(null);
  } else {
    setListings([
      ...listings,
      { ...form, photo, id: Date.now() }
    ]);
  }

  setForm({
    title: "",
    location: "",
    area: "",
    unit: "Sq. Yards",
    price: "",
    description: ""
  });

  setPhoto("");
  setPage("listings");
};


  if (!loggedIn) {
    return (
      <main className="portals">
        <button className="secondary-button" onClick={onBack}>
          ← Back to LandLink
        </button>

        <p className="eyebrow" style={{ marginTop: 35 }}>
          LANDLINK · SELLER PORTAL
        </p>

        <h2>{page === "login" ? "Seller Login" : "Create Seller Account"}</h2>
        <p className="section-text">
          List your land and connect with interested buyers.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setLoggedIn(true);
          }}
          style={formStyle}
        >
          {page === "register" && (
            <>
              <label>Full Name</label>
              <input
                required
                placeholder="Enter your full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                style={fieldStyle}
              />

              <label>Phone Number</label>
              <input
                required
                type="tel"
                placeholder="Enter phone number"
                style={fieldStyle}
              />
            </>
          )}

          <label>Email Address</label>
          <input
            required
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={fieldStyle}
          />

          <label>Password</label>
          <input
            required
            type="password"
            minLength={8}
            placeholder="At least 8 characters"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={fieldStyle}
          />

          <button className="portal-button" type="submit">
            {page === "login" ? "Login as Seller" : "Create Seller Account"}
          </button>

          <p style={{ textAlign: "center", marginTop: 20 }}>
            {page === "login" ? "New to LandLink? " : "Already registered? "}
            <button
              type="button"
              onClick={() => setPage(page === "login" ? "register" : "login")}
              style={linkStyle}
            >
              {page === "login" ? "Register" : "Login"}
            </button>
          </p>
        </form>
      </main>
    );
  }

  if (page === "add") {
    return (
      <main className="portals">
        <button className="secondary-button" onClick={() => setPage("dashboard")}>
          ← Back to Dashboard
        </button>

        <p className="eyebrow" style={{ marginTop: 35 }}>SELLER PORTAL</p>
        <h2>{editId !== null ? "Edit Your Land" : "Add Your Land"}</h2>
        <p className="section-text">Provide accurate property details.</p>

        <form onSubmit={saveListing} style={formStyle}>
          <label>Land Title</label>
          <input
            required
            name="title"
            placeholder="e.g. Residential plot near main road"
            value={form.title}
            onChange={updateForm}
            style={fieldStyle}
          />

          <label>Location</label>
          <input
            required
            name="location"
            placeholder="Village, town, district, state"
            value={form.location}
            onChange={updateForm}
            style={fieldStyle}
          />

          <label>Land Area</label>
          <input
            required
            type="number"
            min="0.01"
            step="any"
            name="area"
            placeholder="Enter land area"
            value={form.area}
            onChange={updateForm}
            style={fieldStyle}
          />

          <label>Measurement Unit</label>
          <select
            name="unit"
            value={form.unit}
            onChange={updateForm}
            style={fieldStyle}
          >
            <option>Sq. Yards</option>
            <option>Acres</option>
            <option>Sq. Feet</option>
            <option>Hectares</option>
          </select>

          <label>Asking Price (₹)</label>
          <input
            required
            type="number"
            min="1"
            step="any"
            name="price"
            placeholder="Enter total asking price"
            value={form.price}
            onChange={updateForm}
            style={fieldStyle}
          />

          <label>Property Description</label>
          <textarea
            required
            name="description"
            placeholder="Describe the land, road access, and known features"
            value={form.description}
            onChange={updateForm}
            rows="4"
            style={fieldStyle}
          />

          <label>Land Photo (optional)</label>
          <input
            type="file"
            accept="image/*"
            
onChange={(event) => {
  const file = event.target.files[0];

  if (file) {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("Please select an image smaller than 1 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  }
}}

            style={fieldStyle}
          />

          {photo && (
            <img
              src={photo}
              alt="Selected land"
              style={{
                width: "100%",
                maxHeight: 220,
                objectFit: "cover",
                borderRadius: 10,
                marginBottom: 20
              }}
            />
          )}

          <button className="portal-button" type="submit">
            {editId !== null ? "Save Changes" : "Publish Land Listing"}
          </button>
        </form>
      </main>
    );
  }

  if (page === "listings") {
    return (
      <main className="portals">
        <button className="secondary-button" onClick={() => setPage("dashboard")}>
          ← Back to Dashboard
        </button>

        <p className="eyebrow" style={{ marginTop: 35 }}>SELLER PORTAL</p>
        <h2>My Land Listings</h2>

        {listings.length === 0 ? (
          <p className="section-text">You haven't added any land yet.</p>
        ) : (
          <div className="portal-cards">
            {listings.map((land) => (
              <article className="portal-card" key={land.id}>
                {land.photo && (
                  <img
                    src={land.photo}
                    alt={land.title}
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      borderRadius: 10
                    }}
                  />
                )}
                <h3>{land.title}</h3>
                <p>📍 {land.location}</p>
                <p>Area: {land.area} {land.unit}</p>
                <h3>₹{Number(land.price).toLocaleString("en-IN")}</h3>
                <p>{land.description}</p>
                <button
                  className="secondary-button"
                  onClick={() =>
                    setListings(listings.filter((item) => item.id !== land.id))
                  }
                >
                  Delete Listing
                </button>
                <button
  className="portal-button"
  onClick={() => {
    setForm({
      title: land.title,
      location: land.location,
      area: land.area,
      unit: land.unit,
      price: land.price,
      description: land.description
    });

    setPhoto(land.photo || "");
    setEditId(land.id);
    setPage("add");
  }}
>
  Edit Property
</button>
              </article>
            ))}
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="portals">
      <button
        className="secondary-button"
        onClick={() => {
          setLoggedIn(false);
          setPage("login");
          setPassword("");
        }}
      >
        ← Logout
      </button>

      <p className="eyebrow" style={{ marginTop: 35 }}>
        LANDLINK · SELLER PORTAL
      </p>

      <h2>Welcome, {name || "Seller"}!</h2>
      <p className="section-text">Manage your land listings in one place.</p>

      <div className="portal-cards">
        <article className="portal-card">
          <div className="portal-icon">＋</div>
          <h3>Add Land</h3>
          <p>Publish land details and your asking price.</p>
          <button className="portal-button" onClick={() => setPage("add")}>
            Add Property
          </button>
        </article>

        <article className="portal-card">
          <div className="portal-icon">⌂</div>
          <h3>My Listings</h3>
          <p>View or remove the land listings you have added.</p>
          <button className="portal-button" onClick={() => setPage("listings")}>
            View Listings ({listings.length})
          </button>
        </article>

        <article className="portal-card">
          <div className="portal-icon">✉</div>
          <h3>Buyer Enquiries</h3>
          <p>Buyer enquiries will be connected in a later step.</p>
        </article>
      </div>
    </main>
  );
}

const formStyle = {
  maxWidth: 480,
  margin: "30px auto",
  padding: 30,
  textAlign: "left",
  border: "1px solid #e5ebe5",
  borderRadius: 16,
  background: "#fff"
};

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

const linkStyle = {
  border: 0,
  background: "none",
  color: "#247d49",
  fontWeight: 700,
  cursor: "pointer"
};
