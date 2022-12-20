import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import signinImage from '../assets/signup.jpg';
import passwordEye from '../assets/eye.png';
import Spinner from '../ui/Spinner';

const cookies = new Cookies();

const initialState = {
  fullName: '',
  username: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: '',
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const showHandler = () => {
    setShow(!show);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form);
    setIsLoading(true);

    const { username, password, phoneNumber, avatarURL } = form;

    const URL = 'https://satisfying-cloudy-raver.glitch.me/auth';

    const {
      data: { token, userId, hashedPassword, fullName },
    } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
      username,
      password,
      fullName: form.fullName,
      phoneNumber,
      avatarURL,
    });

    cookies.set('token', token);
    cookies.set('username', username);
    cookies.set('fullName', fullName);
    cookies.set('userId', userId);

    if (isSignup) {
      cookies.set('phoneNumber', phoneNumber);
      cookies.set('avatarURL', avatarURL);
      cookies.set('hashedPassword', hashedPassword);
    }

    setIsLoading(false);
    window.location.reload();
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>

            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  type="text"
                  name="avatarURL"
                  placeholder="Avatar URL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                type={show? 'text': 'password'}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <label onClick={showHandler}><img className='password_eye_size' src={passwordEye} alt="" /></label>
            </div>

            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type={show? 'text': 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
                <label onClick={showHandler}><img className='password_eye_size' src={passwordEye} alt="" /></label>
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              {isLoading ? (<button className='sign_button_width'><Spinner /></button>) : (<button className='sign_button_width'> {isSignup ? 'Sign Up' : 'Sign In'}</button>)}
              {/* <button>{isSignup ? 'Sign Up' : 'Sign In'}</button> */}
            </div>
          </form>

          <div className="auth__form-container_fields-account">
            <p>
              {isSignup
                ? 'Already have an account? '
                : "Don't have an account? "}
              <span onClick={switchMode}>
                {isSignup ? 'Sign In' : 'Sign Up'}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signinImage} alt="banner" />
      </div>
    </div>
  );
};

export default Auth;
