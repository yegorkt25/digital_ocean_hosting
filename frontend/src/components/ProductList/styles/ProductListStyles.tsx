import styled from "styled-components";

export const MainHeader = styled.h1`
  font-weight: 400;
  font-size: 42px;
  margin-left: 100px;

  @media (max-width: 768px) {
  }
`;

export const AddToCartImage = styled.img`
  border-radius: 50%;
  z-index: 0;
  &:hover {
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

export const ProductCardImage = styled.img`
  max-width: 100%;
  max-height: 390px;
  height: auto;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    max-height: 250px;
  }
`;

export const ProductTitle = styled.div`
  font-weight: 300;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ProductPrice = styled.div`
  font-weight: 500;
  font-size: 18px;
  margin-top: 5px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ProductListContainer = styled.div`
  margin: auto;
  padding: 0px;
  // border: 1px solid red;
  z-index: 1;
`;

export const ProductCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 100px 40px;
  margin: 100px;

  @media (max-width: 768px) {
    margin: 50px;
    gap: 50px 20px;
  }
`;

export const StyledProductCard = styled.div`
  background: white;
  padding: 16px;
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  z-index: 1;

  &:hover {
    box-shadow: 0px 4px 35px 0px #686b6e50;
    cursor: pointer;

    .AddToCartButton {
      visibility: visible;
    }
  }

  .AddToCartButton {
    position: absolute;
    right: 35px;
    bottom: 65px;
    visibility: hidden;
  }
`;

export const OutOfStockContainer = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - 16px);
  background-color: rgba(255, 255, 255, 0.7);
`;

export const ImageContainer = styled.div`
  position: relative;
`;

export const OutOfStockText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 400;
  font-size: 24px;
  color: #8d8f9a;
`;
