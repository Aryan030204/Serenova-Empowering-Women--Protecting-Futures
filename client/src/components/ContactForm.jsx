import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  EMAIL_PUBLIC_KEY,
  EMAIL_SERVICE_ID,
  EMAIL_TEMPLATE_ID,
} from "../utils/config";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    query: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        {
          fullName: formData.fullName,
          emailId: formData.emailId,
          query: formData.query,
        },
        EMAIL_PUBLIC_KEY
      )
      .then(
        (res) => {
          console.log("Email sent successfully:", res);
          setFormData({ fullName: "", emailId: "", query: "" });
        },
        (err) => {
          console.error("Failed to send email:", err);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="max-w-lg mx-auto border border-purple-500 p-6 rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none"
            required
          />
          <input
            type="email"
            name="emailI"
            placeholder="Email Address"
            value={formData.emailId}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none"
            required
          />
          <textarea
            name="query"
            placeholder="Your query"
            value={formData.query}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none h-24 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white px-4 py-3 mt-4 rounded-md font-semibold"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
