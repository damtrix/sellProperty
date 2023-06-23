import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';
import Buy from './routes/buy/buy.component';
import { FooterComponent } from './components/footer/footer.component';

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener((user) => {
  //     if (user) {
  //       createUserDocumentFromAuth(user);
  //     }

  //     const pickedUser =
  //       user && (({ accessToken, email }) => ({ accessToken, email }))(user);
  //     console.log(setCurrentUser(pickedUser));
  //     dispatch(setCurrentUser(pickedUser));
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='buy/*' element={<Buy />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
