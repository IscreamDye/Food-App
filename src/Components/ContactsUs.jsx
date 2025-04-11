import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      // Simulate sending the contact information (you can replace this with actual API calls or form submission logic)
      console.log({ name, email, message });
      setSubmitted(true); // Set submitted to true to show the success message
      setName('');
      setEmail('');
      setMessage('');
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="App flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto max-w-[1010px] flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold">
            FoodHub
          </Link>
          
        </div>
      </header>

      <div className="container mx-auto max-w-[1010px] mt-8 mb-8">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>

        {submitted ? (
          <div className="text-center text-green-500">
            <h3 className="text-2xl font-semibold">Thank You!</h3>
            <p>Your message has been successfully sent. We will get back to you soon.</p>
          </div>
        ) : (
          <div className="text-lg">
            <p className="mb-4">We'd love to hear from you! Please fill out the form below to get in touch with us.</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-lg">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-lg">Message:</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your message"
                  rows="4"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-green-500 text-white font-semibold rounded"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ContactUs;
