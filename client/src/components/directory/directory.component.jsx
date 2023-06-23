import DirectoryItem from '../directory-item/directory-item.component';

import { DirectoryContainer } from './directory.styles';

const categories = [
  {
    id: 1,
    type: 'bungalow',
    imageCover:
      'https://res.cloudinary.com/damtrix/image/upload/v1687250432/propertyCategories/bungalow0_aaurgu.jpg',
    route: 'buy/bungalow',
  },
  {
    id: 2,
    type: 'duplex',
    imageCover:
      'https://res.cloudinary.com/damtrix/image/upload/v1687250435/propertyCategories/duplex0_frhl3g.jpg',
    route: 'buy/duplex',
  },
  {
    id: 3,
    type: 'semi detach duplex',
    imageCover:
      'https://res.cloudinary.com/damtrix/image/upload/v1687250432/propertyCategories/semi-detach-duplex0_nmdtky.jpg',
    route: 'buy/semi detach duplex',
  },
  {
    id: 4,
    type: 'land',
    imageCover:
      'https://res.cloudinary.com/damtrix/image/upload/v1687250434/propertyCategories/land0_hgnzkh.jpg',
    route: 'buy/land',
  },
  {
    id: 5,
    type: 'mansion',
    imageCover:
      'https://res.cloudinary.com/damtrix/image/upload/v1687250431/propertyCategories/mansion0_yamfez.jpg',
    route: 'buy/mansion',
  },
];

const Directory = () => {
  return (
    <DirectoryContainer>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </DirectoryContainer>
  );
};

export default Directory;
