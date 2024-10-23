import { useState } from "react";
import { toast } from "react-toastify";

const Search = () => {
  const [formData, setFormData] = useState({
    form_no: "",
    phone_no: "",
  });

  const [data, setData] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Search handler function
  const handleSearch = (e) => {
    e.preventDefault();

    fetch("https://itder.com/api/search-purchase-data", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  };

  if (data.status_code == 201) {
    toast.success("Data Fetch Successfully. Check the console.");
    console.log(data);
  }

  return (
    <div className="mt-10">
      <h1 className="text-center font-bold text-3xl">Search Here</h1>
      <form
        onSubmit={handleSearch}
        className="p-4 border rounded-lg w-1/2 mx-auto"
      >
        <div className="mb-4">
          <label htmlFor="form_no" className="block font-semibold mb-2">
            Form No:
          </label>
          <input
            type="text"
            id="form_no"
            name="form_no"
            value={formData.form_no}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone_no" className="block font-semibold mb-2">
            Phone No:
          </label>
          <input
            type="text"
            id="phone_no"
            name="phone_no"
            value={formData.phone_no}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
