export default function PhoneField({ phone, onChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Country Code
        </label>
        <input
          type="text"
          name="country_code"
          value={phone.country_code}
          onChange={(e) => onChange("country_code", e.target.value)}
          placeholder="+44"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="text"
          name="number"
          value={phone.number}
          onChange={(e) => onChange("number", e.target.value)}
          placeholder="Enter phone number"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    </div>
  );
}
