import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { useDispatch } from 'react-redux';
import { propertiesData } from '../../store/properties/property.reducer';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(propertiesData());
  }, []);

  return (
    <div>
      <Directory />
      <Outlet />
      <FooterComponent />
    </div>
  );
};

export default Home;
