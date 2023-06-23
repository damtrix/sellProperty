import { useDispatch } from 'react-redux';

import { addItemToCart } from '../../store/cart/cart.reducer';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  ProductCartContainer,
  Footer,
  Title,
  Price,
} from './product-card.styles';

const ProductCard = ({ product }) => {
  const { title, price, imageCover } = product;
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(product));

  return (
    <ProductCartContainer>
      <img src={imageCover} alt={`${title}`} />
      <Footer>
        <Title>
          {title.length > 20 ? `${title.substring(0, 19)}...` : title}
        </Title>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}>
        Add to card
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;
