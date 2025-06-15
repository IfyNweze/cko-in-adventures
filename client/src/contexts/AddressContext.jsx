import { createContext, useContext, useState } from "react";

const AddressContext = createContext();

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState({
    billing: {
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phone: { country_code: "", number: "" },
      name: "",
      email: ""
    },
    customer: {
      name: "",
      email: "",
      phone: { country_code: "", number: "" },
      tax_number: "",
      id: ""
    },
    shipping: {
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phone: { country_code: "", number: "" }
    }
  });

  const updateAddress = (type, data) => {
    setAddresses((prev) => ({
      ...prev,
      [type]: { ...prev[type], ...data }
    }));
  };

  return (
    <AddressContext.Provider value={{ addresses, setAddresses, updateAddress }}>
      {children}
    </AddressContext.Provider>
  );
}

export const useAddress = () => useContext(AddressContext);