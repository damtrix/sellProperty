import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { SignUpContainer } from './sign-up-form.styles';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../store/user/user.reducer';

const defaultFormFields = {
  fullName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  username: '',
  address: '',
  phoneNumber: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {
    fullName,
    email,
    password,
    passwordConfirm,
    phoneNumber,
    username,
    address,
  } = formFields;

  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      alert('passwords do not match');
      return;
    }

    try {
      await dispatch(
        signupUser({
          fullName,
          email,
          password,
          passwordConfirm,
          phoneNumber,
          username,
          address,
        })
      );
      resetFormFields();
    } catch (error) {
      console.log(error);
      // if (error.code === 'auth/email-already-in-use') {
      //   alert('Cannot create user, email already in use');
      // } else {
      //   console.log('user creation encountered an error', error);
      // }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Full Name'
          type='text'
          required
          onChange={handleChange}
          name='fullName'
          value={fullName}
        />

        <FormInput
          label='Username'
          type='text'
          required
          onChange={handleChange}
          name='username'
          value={username}
        />

        <FormInput
          label='Address'
          type='text'
          required
          onChange={handleChange}
          name='address'
          value={address}
        />

        <FormInput
          label='Phone Number'
          type='text'
          required
          onChange={handleChange}
          name='phoneNumber'
          value={phoneNumber}
        />

        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='passwordConfirm'
          value={passwordConfirm}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
