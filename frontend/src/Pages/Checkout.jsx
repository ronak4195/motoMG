import React, {useState} from 'react'
import { Link} from "react-router-dom"
import "./css/Checkout.css"

export const Checkout = () => {
  const [formData, setFormData] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateDetails = async () => {
    console.log("updateDetails Function executed", formData);
    let responseData;
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData
      }),
      });
      responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('user-first-name', responseData.username); 
        localStorage.setItem('userId', responseData.userId);
        localStorage.setItem('user', JSON.stringify(responseData.user));
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Failed to fetch", error);
      alert("Signup failed. Please try again.");
    }
  };


  // const updateDetails = async () => {
  //   console.log("updateDetails Function executed", formData);
  //   let responseData;
  //   try {
  //     const response = await fetch('http://localhost:4000/signup', {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     responseData = await response.json();
  //     if (responseData.success) {
  //       localStorage.setItem('auth-token', responseData.token);
  //       localStorage.setItem('user-first-name', responseData.username); 
  //       localStorage.setItem('userId', responseData.userId);
  //       localStorage.setItem('user', JSON.stringify(responseData.user));
  //       window.location.replace("/");
  //     } else {
  //       alert(responseData.errors);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch", error);
  //     alert("updateDetails failed. Please try again.");
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   updateDetails();
  // };

  // const handleSubmit = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDetails();
  };

  return (
    <div>
        <form onSubmit={handleSubmit} className="updateDetails-form">
            <div className="cheackOutFormGroup">
              <label htmlFor="address1" className='labelCheckout'>Flat, House no., Building, Company, Apartment:</label>
              <input
                type="text"
                id="address1"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                required
                className='inputCheckout'
              />
            </div>
          
          <div className="cheackOutFormGroup">
            <label htmlFor="address2" className='labelCheckout'>Area, Street, Sector, Village, Landmark:</label>
            <input
              type="text"
              id="address2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              required
              className='inputCheckout'
            />
          </div>
          
          <div className="cheackOutFormGroup">
            <label htmlFor="city" className='labelCheckout'>City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className='inputCheckout'
            />
          </div>
          
          
            <div className="cheackOutFormGroup">
              <label htmlFor="state" className='labelCheckout'>State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className='inputCheckout'
              />
            </div>

          <div className="cheackOutFormGroup">
            <label htmlFor="pincode" className='labelCheckout'>Pincode:</label>
            <input
              type="pincode"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className='inputCheckout'
            />
          </div>
          <div
            className="cheackOutFormGroup checkOutbtn"
          >
            <Link to="/" style={{width:'100%'}}><button type="submit" className='checkOut'>Continue</button></Link>
          </div>
        </form>
    </div>
  )
}

export default Checkout;


