import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import { selectPropertiesMap } from '../../store/properties/property.selector';

const CategoriesPreview = () => {
  const propertiesMap = useSelector(selectPropertiesMap);

  return (
    <Fragment>
      {Object.keys(propertiesMap).map((type) => {
        const products = propertiesMap[type];
        return <CategoryPreview key={type} title={type} products={products} />;
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
