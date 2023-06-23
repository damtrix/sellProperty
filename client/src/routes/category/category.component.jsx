import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContainer, Title } from './category.styles';
import { selectPropertiesMap } from '../../store/properties/property.selector';
import { FeaturesCard } from '../../components/features-card/features-card.component';

const Category = () => {
  const { category } = useParams();
  const propertiesMap = useSelector(selectPropertiesMap);
  const [products, setProducts] = useState(propertiesMap[category]);

  useEffect(() => {
    setProducts(propertiesMap[category]);
  }, [category, propertiesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <FeaturesCard key={product._id} property={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
