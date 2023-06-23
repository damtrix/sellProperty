import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import {
  FeaturesCardBackgroundImage,
  FeaturesCardContainer,
  FeaturesCardBody,
  FeaturesCardTitle,
  FeaturesCardPrice,
  FeaturesCardFooter,
  FeaturesCardInfo,
  FeaturesCardAddressContainer,
  FeaturesCardAddress,
  FeaturesCardDescription,
} from './features.styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const FeaturesCard = ({ property }) => {
  const { title, price, description, imageCover, city, area, country, state } =
    property;

  function commafy(num) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  }
  return (
    <FeaturesCardContainer>
      <FeaturesCardBackgroundImage imageUrl={imageCover} />
      <FeaturesCardBody>
        <FeaturesCardTitle>{title}</FeaturesCardTitle>
        <FeaturesCardInfo>
          <FeaturesCardAddressContainer>
            <LocationOnIcon />
            <FeaturesCardAddress>
              {area} {city}, {state}, {country}
            </FeaturesCardAddress>
          </FeaturesCardAddressContainer>
          <Button buttonType={BUTTON_TYPE_CLASSES.rounded} type='button'>
            &#8358;{commafy(price)}
          </Button>
        </FeaturesCardInfo>
        <FeaturesCardDescription>
          {description.length > 200
            ? `${description.substring(0, 199)}...[more]`
            : description}
        </FeaturesCardDescription>
        <FeaturesCardFooter>
          <Button buttonType={BUTTON_TYPE_CLASSES.smallInfo} type='button'>
            full info
          </Button>
        </FeaturesCardFooter>
      </FeaturesCardBody>
    </FeaturesCardContainer>
  );
};
