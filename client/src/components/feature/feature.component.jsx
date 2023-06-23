import { useDispatch, useSelector } from 'react-redux';
import { FeaturesCard } from '../features-card/features-card.component';
import { useEffect } from 'react';
import { propertiesData } from '../../store/properties/property.reducer';
import { selectProperties } from '../../store/properties/property.selector';
import { FeatureBody, FeatureContainer, FeatureTitle } from './feature.styles';

export const Features = () => {
  const properties = useSelector(selectProperties);

  return (
    <FeatureContainer>
      <FeatureTitle>Featured Properties:</FeatureTitle>
      <FeatureBody>
        {properties.data
          ?.filter((_, idx) => idx < 9)
          .map((property) => (
            <FeaturesCard key={property._id} property={property} />
          ))}
      </FeatureBody>
    </FeatureContainer>
  );
};
