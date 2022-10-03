import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import signInImage from '../assets/signup.jpg';
const cookies = new Cookies();

const initialState = { fullName: '', username: '', password: '', confirmPassword: '', phoneNumber: '', avatarURL: '' };
const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setisSignup] = useState(true)
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'https://chatapp-param.herokuapp.com/auth';

        const { data : { token, userID, hashedPassword, fullName} } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, { username, password, fullName: form.fullName, phoneNumber, avatarURL });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userID', userID);

        if (isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }
    const switchMode = () => {
        setisSignup((prevIsSignup) => !prevIsSignup)
    }


  return (
    <div className='auth__form-container'>
         <div className='auth__form-container_fields'>
            <div className='auth__form-container_fields-content'>
                <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                <form onSubmit={handleSubmit}>
                   {isSignup && (   
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='fullName'>Full Name</label>
                        <input type='text' name='fullName' placeholder='Full Name' onChange={handleChange} required />
                    </div>
                    )}
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' placeholder='Username' onChange={handleChange} required />
                    </div>
                    {isSignup && (   
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='phoneNumber'>Phone Number</label>
                        <input type='text' name='phoneNumber' placeholder='Phone Number' onChange={handleChange} required />
                    </div>
                    )}
                    {isSignup && (   
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='avatarURL'>Avatar URL</label>
                        <input type='text' name='avatarURL' placeholder='Avatar URL' onChange={handleChange} required />
                    </div>
                    )}
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' placeholder='Password' onChange={handleChange} required />
                    </div>
                    {isSignup && (   
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input type='password' name='confirmPassword' placeholder='Confirm Password' onChange={handleChange} required />
                        </div>
                    )}
                    <div className='auth__form-container_fields-content_button'>
                        <button type='submit'>{isSignup ? 'Sign Up' : 'Sign In'}</button>
                    </div>
                </form>
                <div className='auth__form-container_fields-account'>
                    <p>{isSignup ? 'Already have an account?' : "Don't have an account?"}</p>
                    <span onClick={switchMode}>{isSignup ? 'Sign In' : 'Sign Up'}</span>
                </div>
            </div>
        </div>
        <div className='auth__form-container_image'>
            <img src={signInImage} alt='sign in' />
        </div>
    </div>
  )
}

export default Auth