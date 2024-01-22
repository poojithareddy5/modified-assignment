import React, { useContext, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { ContextApi } from '../components/ContextApi';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const navigate = useNavigate();
  const value = useContext(ContextApi)
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [saveOtp, setSaveOtp] = useState('')
  const [show, setShow] = useState(false)
  const [showOtpError, setShowOtpError] = useState('')

  const [message, setMessage] = useState('');
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setSaveOtp(e.target.value);
  };

  const handleSendOtp = () => {
    if (value.email === email) {
      // Generate a random OTP
      const generatedOtp = Math.floor(1000 + Math.random() * 9000);
      setOtp(generatedOtp);
      setMessage('');
      setShow(true)
    } else {
      if (email !== '') {
        setMessage('Ops! email does not exist.');
      } else {
        setMessage('email required*');
      }
    }

  };

  const handleOtpVerify = () => {
    console.log('click')
    if (otp.toString() === saveOtp) {
      navigate('/reset')
      setShowOtpError('')
    } else {
      if (saveOtp !== '') {
        setShowOtpError('Ops! wrong otp')
      } else {
        setShowOtpError("!please enter otp")
      }
    }
  }
  const backBtn = () => {
    setShow(false)
  }
  const backToLogin = () => {
    navigate('/login')
  }
  return (
    <div>
      <form>
        <div hidden={show} >
          <div className='login-header' >
            <FaArrowLeft onClick={backToLogin} />
            <h2>Email</h2>
          </div>
          <div>
            <input autoFocus type="email" required placeholder='Email' value={email} onChange={handleEmailChange} />

          </div>
          <p>{message}</p>
          <button type="button" onClick={handleSendOtp}>
            Send OTP
          </button>
        </div>
        <div hidden={!show} >
          <div className='login-header' >
            <FaArrowLeft onClick={backBtn} />
            <h2>OTP.</h2>
          </div>

          <span className='otp' >Your Otp is {otp}</span>
          <div>
            <input autoFocus type="text" placeholder='-- OTP --' style={{ textAlign: 'center' }} maxLength='4' onChange={handleOtpChange} />
          </div>
          <p>{showOtpError}</p>
          <button type='button' onClick={handleOtpVerify} >Verify</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordReset;
