import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { loginUser } from '../../store/user/user.reducer';

import { useDispatch } from 'react-redux';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
  username: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, password } = formFields;

  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(loginUser({ username, password }));
      resetFormFields();
    } catch (error) {
      console.log('user sign in failed', error);
    }

    // try {
    //   await signInAuthUserWithEmailAndPassword(email, password);
    //   resetFormFields();
    // } catch (error) {
    //   console.log('user sign in failed', error);
    // }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Username'
          type='name'
          required
          onChange={handleChange}
          name='username'
          value={username}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
