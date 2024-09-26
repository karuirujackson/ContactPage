import React, { useState } from 'react';
import './ContactPage.css';
import Swal from 'sweetalert2';

const ContactPage = () =>  {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "1e686d59-55a3-441a-bcb7-9be6338c785c");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
        Swal.fire({
          title: "Good job!",
          text: "The form was submitted successfully!",
          icon: "success"
        });
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };


  return (
    <section className="contact">
      <form onSubmit={onSubmit}>
        <h2>Contact Form</h2>
        <div className="input-box">
          <label>Full Name</label>
          <input type="text" className="field" name='name' placeholder='Enter Your Name' required />
        </div>
        <div className="input-box">
          <label>Email Address</label>
          <input type="email" className="field" name='email' placeholder='Enter Your Email' required />
        </div>
        <div className="input-box">
          <label>Your Message</label>
          <textarea className='field mess' name='message' placeholder='Enter Your Message' required></textarea>
        </div>
        <button type='submit'>Send Message</button>
      </form>
      <span>{result}</span>
    </section>
  )
}

export default ContactPage;