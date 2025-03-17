import React from "react";

const ContactForm = () => {
  return (
    <div className="max-w-lg mx-auto border border-purple-500 p-6 rounded-lg">
      <form>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none"
          />
          <textarea
            placeholder="your query"
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none h-24 resize-none"
          />
        </div>

        <p className="mt-4 text-gray-600">How can we help you?</p>

        <button
          type="submit"
          className="w-full bg-red-600 text-white px-4 py-3 mt-4 rounded-md font-semibold"
        >
          SEND MESSAGE
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
