import styled from 'styled-components';

export const BaseButton = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

export const GoogleSignInButton = styled(BaseButton)`
  background-color: #4285f4;
  color: white;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

export const InvertedButton = styled(BaseButton)`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

export const RoundedButton = styled(BaseButton)`
  background-color: black;
  color: white;
  padding: 0 10px 0 10px;
  border: 1px solid black;
  border-radius: 30px;
  min-width: auto;

  &:hover {
    background-color: white;
    color: black;
    border: none;
  }
`;

export const SmallInfoButton = styled(BaseButton)`
  background-color: black;
  color: white;
  padding: 0 5px 0 5px;
  min-width: auto;
  font-size: 10px;
  height: 30px;
  align-items: center;

  &:hover {
    background-color: white;
    color: black;
    border: none;
  }
`;
