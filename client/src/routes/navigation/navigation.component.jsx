import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
// import { signOutUser } from '../../utils/firebase/firebase.utils';

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
  LogoName,
} from './navigation.styles';
import { logoutUser } from '../../store/user/user.reducer';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const signOutUser = () => dispatch(logoutUser());
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo />
          <LogoName>sellProperty</LogoName>
        </LogoContainer>
        <NavLinks>
          <NavLink to='/buy'>BUY</NavLink>

          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
