import { useNavigate } from 'react-router-dom';

import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directory-item.styles';

const DirectoryItem = ({ category }) => {
  const { imageCover, type, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageCover} />
      <Body>
        <h2>{type}</h2>
        <p>Buy Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
