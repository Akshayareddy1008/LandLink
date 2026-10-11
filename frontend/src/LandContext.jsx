
import { createContext, useContext, useState, useEffect } from "react";

const LandContext = createContext();

export function LandProvider({ children }) {
  const [listings, setListings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("landlink_listings")) || [];
    } catch {
      return [];
    }
  });

  const [enquiries, setEnquiries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("landlink_enquiries")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("landlink_listings", JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem("landlink_enquiries", JSON.stringify(enquiries));
  }, [enquiries]);

  return (
    <LandContext.Provider
      value={{
        listings,
        setListings,
        enquiries,
        setEnquiries
      }}
    >
      {children}
    </LandContext.Provider>
  );
}

export function useLand() {
  return useContext(LandContext);
}
