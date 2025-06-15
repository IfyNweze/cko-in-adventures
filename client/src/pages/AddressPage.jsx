import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAddress } from "../contexts/AddressContext";
import InputField from "../components/InputField";
import PhoneField from "../components/PhoneField";
import CartSummary from "../components/CartSummary";
import Header from '../components/Header';


// List of countries with ISO 3166-1 alpha-2 codes and full names
const countries = [
  { code: "AF", name: "Afghanistan" },
  { code: "AX", name: "Åland Islands" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AS", name: "American Samoa" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AI", name: "Anguilla" },
  { code: "AQ", name: "Antarctica" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AW", name: "Aruba" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BM", name: "Bermuda" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BQ", name: "Bonaire, Sint Eustatius and Saba" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BV", name: "Bouvet Island" },
  { code: "BR", name: "Brazil" },
  { code: "IO", name: "British Indian Ocean Territory" },
  { code: "BN", name: "Brunei Darussalam" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "CV", name: "Cabo Verde" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "KY", name: "Cayman Islands" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CX", name: "Christmas Island" },
  { code: "CC", name: "Cocos (Keeling) Islands" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CG", name: "Congo" },
  { code: "CD", name: "Congo, Democratic Republic of the" },
  { code: "CK", name: "Cook Islands" },
  { code: "CR", name: "Costa Rica" },
  { code: "CI", name: "Côte d'Ivoire" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CW", name: "Curaçao" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "SZ", name: "Eswatini" },
  { code: "ET", name: "Ethiopia" },
  { code: "FK", name: "Falkland Islands (Malvinas)" },
  { code: "FO", name: "Faroe Islands" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GF", name: "French Guiana" },
  { code: "PF", name: "French Polynesia" },
  { code: "TF", name: "French Southern Territories" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GI", name: "Gibraltar" },
  { code: "GR", name: "Greece" },
  { code: "GL", name: "Greenland" },
  { code: "GD", name: "Grenada" },
  { code: "GP", name: "Guadeloupe" },
  { code: "GU", name: "Guam" },
  { code: "GT", name: "Guatemala" },
  { code: "GG", name: "Guernsey" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HM", name: "Heard Island and McDonald Islands" },
  { code: "VA", name: "Holy See" },
  { code: "HN", name: "Honduras" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran, Islamic Republic of" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IM", name: "Isle of Man" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JE", name: "Jersey" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "KP", name: "Korea, Democratic People's Republic of" },
  { code: "KR", name: "Korea, Republic of" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Lao People's Democratic Republic" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libya" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MO", name: "Macao" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MQ", name: "Martinique" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "YT", name: "Mayotte" },
  { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia, Federated States of" },
  { code: "MD", name: "Moldova, Republic of" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MS", name: "Montserrat" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NC", name: "New Caledonia" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "NU", name: "Niue" },
  { code: "NF", name: "Norfolk Island" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" },
  { code: "PS", name: "Palestine, State of" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PN", name: "Pitcairn" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "PR", name: "Puerto Rico" },
  { code: "QA", name: "Qatar" },
  { code: "RE", name: "Réunion" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russian Federation" },
  { code: "RW", name: "Rwanda" },
  { code: "BL", name: "Saint Barthélemy" },
  { code: "SH", name: "Saint Helena, Ascension and Tristan da Cunha" },
  { code: "KN", name: "Saint Kitts and Nevis" },
  { code: "LC", name: "Saint Lucia" },
  { code: "MF", name: "Saint Martin (French part)" },
  { code: "PM", name: "Saint Pierre and Miquelon" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" },
  { code: "ST", name: "Sao Tome and Principe" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SX", name: "Sint Maarten (Dutch part)" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "GS", name: "South Georgia and the South Sandwich Islands" },
  { code: "SS", name: "South Sudan" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SJ", name: "Svalbard and Jan Mayen" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syrian Arab Republic" },
  { code: "TW", name: "Taiwan, Province of China" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania, United Republic of" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TK", name: "Tokelau" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TC", name: "Turks and Caicos Islands" },
  { code: "TV", name: "Tuvalu" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UM", name: "United States Minor Outlying Islands" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VE", name: "Venezuela, Bolivarian Republic of" },
  { code: "VN", name: "Vietnam" },
  { code: "VG", name: "Virgin Islands, British" },
  { code: "VI", name: "Virgin Islands, U.S." },
  { code: "WF", name: "Wallis and Futuna" },
  { code: "EH", name: "Western Sahara" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
];

// Country code mapping (ISO 3166-1 alpha-2 to international calling code)
const countryCodes = {
  "AF": "+93", "AX": "+358", "AL": "+355", "DZ": "+213", "AS": "+1", "AD": "+376",
  "AO": "+244", "AI": "+1", "AQ": "+672", "AG": "+1", "AR": "+54", "AM": "+374",
  "AW": "+297", "AU": "+61", "AT": "+43", "AZ": "+994", "BS": "+1", "BH": "+973",
  "BD": "+880", "BB": "+1", "BY": "+375", "BE": "+32", "BZ": "+501", "BJ": "+229",
  "BM": "+1", "BT": "+975", "BO": "+591", "BQ": "+599", "BA": "+387", "BW": "+267",
  "BV": "+47", "BR": "+55", "IO": "+246", "BN": "+673", "BG": "+359", "BF": "+226",
  "BI": "+257", "CV": "+238", "KH": "+855", "CM": "+237", "CA": "+1", "KY": "+1",
  "CF": "+236", "TD": "+235", "CL": "+56", "CN": "+86", "CX": "+61", "CC": "+61",
  "CO": "+57", "KM": "+269", "CG": "+242", "CD": "+243", "CK": "+682", "CR": "+506",
  "CI": "+225", "HR": "+385", "CU": "+53", "CW": "+599", "CY": "+357", "CZ": "+420",
  "DK": "+45", "DJ": "+253", "DM": "+1", "DO": "+1", "EC": "+593", "EG": "+20",
  "SV": "+503", "GQ": "+240", "ER": "+291", "EE": "+372", "SZ": "+268", "ET": "+251",
  "FK": "+500", "FO": "+298", "FJ": "+679", "FI": "+358", "FR": "+33", "GF": "+594",
  "PF": "+689", "TF": "+262", "GA": "+241", "GM": "+220", "GE": "+995", "DE": "+49",
  "GH": "+233", "GI": "+350", "GR": "+30", "GL": "+299", "GD": "+1", "GP": "+590",
  "GU": "+1", "GT": "+502", "GG": "+44", "GN": "+224", "GW": "+245", "GY": "+592",
  "HT": "+509", "HM": "+672", "VA": "+39", "HN": "+504", "HK": "+852", "HU": "+36",
  "IS": "+354", "IN": "+91", "ID": "+62", "IR": "+98", "IQ": "+964", "IE": "+353",
  "IM": "+44", "IL": "+972", "IT": "+39", "JM": "+1", "JP": "+81", "JE": "+44",
  "JO": "+962", "KZ": "+7", "KE": "+254", "KI": "+686", "KP": "+850", "KR": "+82",
  "KW": "+965", "KG": "+996", "LA": "+856", "LV": "+371", "LB": "+961", "LS": "+266",
  "LR": "+231", "LY": "+218", "LI": "+423", "LT": "+370", "LU": "+352", "MO": "+853",
  "MG": "+261", "MW": "+265", "MY": "+60", "MV": "+960", "ML": "+223", "MT": "+356",
  "MH": "+692", "MQ": "+596", "MR": "+222", "MU": "+230", "YT": "+262", "MX": "+52",
  "FM": "+691", "MD": "+373", "MC": "+377", "MN": "+976", "ME": "+382", "MS": "+1",
  "MA": "+212", "MZ": "+258", "MM": "+95", "NA": "+264", "NR": "+674", "NP": "+977",
  "NL": "+31", "NC": "+687", "NZ": "+64", "NI": "+505", "NE": "+227", "NG": "+234",
  "NU": "+683", "NF": "+672", "MP": "+1", "NO": "+47", "OM": "+968", "PK": "+92",
  "PW": "+680", "PS": "+970", "PA": "+507", "PG": "+675", "PY": "+595", "PE": "+51",
  "PH": "+63", "PN": "+64", "PL": "+48", "PT": "+351", "PR": "+1", "QA": "+974",
  "RE": "+262", "RO": "+40", "RU": "+7", "RW": "+250", "BL": "+590", "SH": "+290",
  "KN": "+1", "LC": "+1", "MF": "+590", "PM": "+508", "VC": "+1", "WS": "+685",
  "SM": "+378", "ST": "+239", "SA": "+966", "SN": "+221", "RS": "+381", "SC": "+248",
  "SL": "+232", "SG": "+65", "SX": "+1", "SK": "+421", "SI": "+386", "SB": "+677",
  "SO": "+252", "ZA": "+27", "GS": "+500", "SS": "+211", "ES": "+34", "LK": "+94",
  "SD": "+249", "SR": "+597", "SJ": "+47", "SE": "+46", "CH": "+41", "SY": "+963",
  "TW": "+886", "TJ": "+992", "TZ": "+255", "TH": "+66", "TL": "+670", "TG": "+228",
  "TK": "+690", "TO": "+676", "TT": "+1", "TN": "+216", "TR": "+90", "TM": "+993",
  "TC": "+1", "TV": "+688", "UG": "+256", "UA": "+380", "AE": "+971", "GB": "+44",
  "US": "+1", "UM": "+1", "UY": "+598", "UZ": "+998", "VU": "+678", "VE": "+58",
  "VN": "+84", "VG": "+1", "VI": "+1", "WF": "+681", "EH": "+212", "YE": "+967",
  "ZM": "+260", "ZW": "+263"
};

export default function AddressPage() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { addresses, updateAddress } = useAddress();

  const [step, setStep] = useState("billing");
  const [useBillingForAll, setUseBillingForAll] = useState(false);
  const [errors, setErrors] = useState({});

  const [billing, setBilling] = useState(addresses.billing);
  const [customer, setCustomer] = useState(addresses.customer);
  const [shipping, setShipping] = useState(addresses.shipping);

  useEffect(() => {
    setBilling(addresses.billing);
    setCustomer(addresses.customer);
    setShipping(addresses.shipping);
  }, [addresses]);

  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (setter, field) => (name, value) => {
    setter((prev) => ({
      ...prev,
      phone: { ...prev.phone, [name]: value }
    }));
  };

  const handleCountryChange = (setter) => (e) => {
    const code = e.target.value;
    setter((prev) => {
      const updated = { ...prev, country: code };
      if (prev.phone && countryCodes[code]) {
        updated.phone = { ...prev.phone, country_code: countryCodes[code] };
      }
      return updated;
    });
  };

  const validateBilling = () => {
    const newErrors = {};
    if (!billing.address_line1) newErrors.address_line1 = "Address Line 1 is required";
    if (!billing.city) newErrors.city = "City is required";
    if (!billing.zip) newErrors.zip = "ZIP Code is required";
    if (!billing.country) newErrors.country = "Country is required";
    if (!billing.email) newErrors.email = "Email is required";
    if (!billing.phone?.number) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const validateCustomer = () => {
    if (useBillingForAll) return {};
    const newErrors = {};
    if (!customer.email) newErrors.email = "Customer email is required";
    if (!customer.phone?.number) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const handleNext = () => {
    if (step === "billing") {
      const billingErrors = validateBilling();
      if (Object.keys(billingErrors).length > 0) {
        setErrors(billingErrors);
        return;
      }
      updateAddress("billing", billing);
      setStep("customer");
    } else if (step === "customer") {
      const customerErrors = validateCustomer();
      if (Object.keys(customerErrors).length > 0) {
        setErrors(customerErrors);
        return;
      }
      updateAddress("customer", useBillingForAll ? { ...customer, email: billing.email, name: billing.name, phone: billing.phone } : customer);
      setStep("shipping");
    } else if (step === "shipping") {
      updateAddress("shipping", useBillingForAll ? { ...billing, phone: billing.phone } : shipping);
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (cartItems.length === 0) {
      setErrors({ cart: "Your cart is empty. Please add items before proceeding." });
      return;
    }

    const billingErrors = validateBilling();
    const customerErrors = validateCustomer();
    const newErrors = { ...billingErrors, ...customerErrors };

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateAddress("billing", billing);
    updateAddress("customer", useBillingForAll ? { ...customer, email: billing.email, name: billing.name, phone: billing.phone } : customer);
    updateAddress("shipping", useBillingForAll ? { ...billing, phone: billing.phone } : shipping);

    console.log("Final addresses before navigation:", { billing, customer, shipping });

    setTimeout(() => navigate("/checkout"), 100);
  };

  const renderSection = (title, sectionKey, content) => (
    <div className="border rounded-xl p-4 mb-4 bg-white shadow">
      <button type="button" onClick={() => setStep(sectionKey)} className="text-left w-full">
        <h2 className="text-lg font-semibold">{title}</h2>
      </button>
      {step === sectionKey && <div className="mt-4">{content}</div>}
    </div>
  );

return (
    <>
    <Header />
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        {errors.cart && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 font-medium">{errors.cart}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section - Left Side */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {renderSection("Billing Address (Required)", "billing", (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Full Name"
                        name="name"
                        value={billing.name}
                        onChange={handleChange(setBilling)}
                        error={errors.name}
                      />
                      <InputField
                        label="Email"
                        name="email"
                        value={billing.email}
                        onChange={handleChange(setBilling)}
                        type="email"
                        error={errors.email}
                      />
                    </div>
                    
                    <InputField
                      label="Address Line 1"
                      name="address_line1"
                      value={billing.address_line1}
                      onChange={handleChange(setBilling)}
                      error={errors.address_line1}
                    />
                    
                    <InputField
                      label="Address Line 2"
                      name="address_line2"
                      value={billing.address_line2}
                      onChange={handleChange(setBilling)}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <InputField
                        label="City"
                        name="city"
                        value={billing.city}
                        onChange={handleChange(setBilling)}
                        error={errors.city}
                      />
                      <InputField
                        label="State (e.g. CA)"
                        name="state"
                        value={billing.state}
                        onChange={handleChange(setBilling)}
                        maxLength={3}
                      />
                      <InputField
                        label="ZIP Code"
                        name="zip"
                        value={billing.zip}
                        onChange={handleChange(setBilling)}
                        error={errors.zip}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Country</label>
                      <select
                        name="country"
                        value={billing.country}
                        onChange={handleCountryChange(setBilling)}
                        className="w-full border border-gray-300 rounded-xl py-3 px-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="" disabled>Select a country</option>
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                    </div>
                    
                    <PhoneField
                      phone={billing.phone}
                      onChange={handlePhoneChange(setBilling, "phone")}
                      error={errors.phone}
                    />
                    
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                      <input
                        type="checkbox"
                        checked={useBillingForAll}
                        onChange={(e) => setUseBillingForAll(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Use billing details for customer and shipping
                      </label>
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    >
                      Continue to Customer Details
                    </button>
                  </div>
                </div>
              ))}

              {renderSection("Customer Details (Optional)", "customer", (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Full Name"
                        name="name"
                        value={customer.name}
                        onChange={handleChange(setCustomer)}
                        disabled={useBillingForAll}
                      />
                      <InputField
                        label="Email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange(setCustomer)}
                        type="email"
                        error={errors.email}
                        disabled={useBillingForAll}
                      />
                    </div>
                    
                    <PhoneField
                      phone={customer.phone}
                      onChange={handlePhoneChange(setCustomer, "phone")}
                      error={errors.phone}
                      disabled={useBillingForAll}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Tax Number (Optional)"
                        name="tax_number"
                        value={customer.tax_number}
                        onChange={handleChange(setCustomer)}
                      />
                      <InputField
                        label="Customer ID (Optional)"
                        name="id"
                        value={customer.id}
                        onChange={handleChange(setCustomer)}
                      />
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    >
                      Continue to Shipping Address
                    </button>
                  </div>
                </div>
              ))}

              {renderSection("Shipping Address (Optional)", "shipping", (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="space-y-6">
                    <InputField
                      label="Address Line 1"
                      name="address_line1"
                      value={shipping.address_line1}
                      onChange={handleChange(setShipping)}
                      disabled={useBillingForAll}
                    />
                    
                    <InputField
                      label="Address Line 2"
                      name="address_line2"
                      value={shipping.address_line2}
                      onChange={handleChange(setShipping)}
                      disabled={useBillingForAll}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <InputField
                        label="City"
                        name="city"
                        value={shipping.city}
                        onChange={handleChange(setShipping)}
                        disabled={useBillingForAll}
                      />
                      <InputField
                        label="State (e.g. CA)"
                        name="state"
                        value={shipping.state}
                        onChange={handleChange(setShipping)}
                        maxLength={3}
                        disabled={useBillingForAll}
                      />
                      <InputField
                        label="ZIP Code"
                        name="zip"
                        value={shipping.zip}
                        onChange={handleChange(setShipping)}
                        disabled={useBillingForAll}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Country</label>
                      <select
                        name="country"
                        value={shipping.country}
                        onChange={handleCountryChange(setShipping)}
                        disabled={useBillingForAll}
                        className="w-full border border-gray-300 rounded-xl py-3 px-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500"
                      >
                        <option value="" disabled>Select a country</option>
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <PhoneField
                      phone={shipping.phone}
                      onChange={handlePhoneChange(setShipping, "phone")}
                      disabled={useBillingForAll}
                    />
                    
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CartSummary editable />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
);
}