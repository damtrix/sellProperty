import styled from 'styled-components';

export const FeaturesCardBackgroundImage = styled.div`
  width: 100%;
  height: 50%;
  background-size: cover;
  background-position: center;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  position: relative;
`;

export const FeaturesCardContainer = styled.div`
  height: 550px;
  border: 1px solid #ddd;
  overflow: hidden;
  box-shadow: 2px 2px 8px #d2d2d2;

  &:hover {
    cursor: pointer;
    box-shadow: 1px 1px 2px #d2d2d2;

    transform: translateY(-2%);
    transition: transform 1s;

    ${FeaturesCardBackgroundImage} {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }
  }
`;

export const FeaturesCardBody = styled.div`
  padding: 0 25px;
`;

export const FeaturesCardTitle = styled.h1`
  font-family: Open Sans;
  font-size: 18px;
  font-weight: bold;
`;

export const FeaturesCardPrice = styled.h3``;

export const FeaturesCardFooter = styled.div`
  border-top: 1px solid #ddd;
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const FeaturesCardInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
`;

export const FeaturesCardAddressContainer = styled.div`
  text-transform: capitalize;
  font-family: Open Sans;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

export const FeaturesCardAddress = styled.div`
  margin-left: 5px;
`;

export const FeaturesCardDescription = styled.div`
  text-align: justify;
  font-family: Open Sans;
  font-weight: lighter;
  font-size: 15px;
  margin-bottom: 20px;
`;
