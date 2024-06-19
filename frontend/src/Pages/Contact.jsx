import React, { useState } from "react";

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "194ced11-3e44-4386-b55e-a53e78e0fd84");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message Sent Successfully!");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div className="contactPage">
      <div className="mapAndForm">
        <div className="mapContainer">
          <iframe
            className="map"
            title="location-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1694183799445!2d144.964873715321!3d-37.814217979751604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577b1b9b2abf07!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1618970694797!5m2!1sen!2sau"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="contactForm">
          <h6 className="contactHeading">Reach out to us!</h6>
          <form onSubmit={onSubmit} className="contactCard">
            <input
              className="name inputBar"
              type="text"
              placeholder="Your Name"
              name="name"
              required
            />
            <input
              className="email inputBar"
              type="email"
              placeholder="Your Email"
              name="email"
              required
            />
            <textarea
              className="message inputBar"
              placeholder="Your Message"
              name="message"
              required
            ></textarea>
            <div className="sendButton">
              <button className="button">Send Message</button>
            </div>
          </form>
          <span>{result}</span>
        </div>
      </div>
      <div className="contactDetails">
        <h2 className="mobileNumber">Mobile Number: 8486736200</h2>
        <h2 className="emailId" >
          Email: <a href="mailto:gearpit8@gmail.com">gearpit8@gmail.com</a>
        </h2>
      </div>
    </div>
  );
}
