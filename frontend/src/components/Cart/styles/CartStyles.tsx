import styled from "styled-components";

export const CartContainer = styled.div`
  width: 400px;
  height: 628px;
  background-color: #fff;
  position: fixed;
  z-index: 3;
  right: 72px;

  @media (max-width: 768px) {
    width: 90%; // Adjust width for smaller screens
    right: 5%; // Center the container
  }
`;

export const EmptyCartMessage = styled.div`
  font-family: Raleway;
  font-size: 16px;
  font-weight: 500;
  line-height: 25.6px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  z-index: 3;

  text-align: center;

  margin-top: 50px;

  color: hsl(216, 8%, 70%);
`;

export const CartContent = styled.div`
  // border: 1px solid red;
  overflow: auto;
  height: 440px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 768px) {
    padding: 16px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CartInfo = styled.div`
  font-family: Raleway;
  font-size: 16px;
  font-weight: 500;
  margin: 32px 16px 0px;
`;

export const MyBag = styled.span`
  font-weight: 700;
`;

export const CartProductInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TotalPriceInfo = styled.div`
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #1d1f22;
  margin: 16px;
  display: flex;
  justify-content: space-between;
  width: 365px;
  position: fixed;
  bottom: 270px;

  @media (max-width: 768px) {
    bottom: 270px;
  }
`;

export const PriceSpan = styled.span`
  font-family: Raleway;
  font-size: 16px;
  font-weight: 700;
  line-height: 25.6px;
  text-align: right;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #1d1f22;
`;

export const CartProductPrice = styled.div`
  font-family: Raleway;
  font-size: 16px;
  font-weight: 400;
  line-height: 25.6px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #1d1f22;
  margin: 16px 0px;
`;

export const AttributeText = styled.div`
  font-family: Raleway;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #1d1f22;
`;

export const CartImage = styled.img`
  max-height: 170px;
`;

export const CountSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0px 5px;
`;

export const ShadowOverlay = styled.div`
  background-color: #39374838;
  position: fixed;
  z-index: 2;
  inset: 80px 0px 0px 0px;
`;

export const OrderButton = styled.div`
  width: 365px;
  margin: auto;
  height: 52px;
  position: fixed;
  transform: translateX(5%);
  bottom: 225px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5ece7b;
  color: #ffffff;
  font-family: Raleway;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background-color: hsl(135.54, 53.33%, 63%);
    color: hsl(0, 0%, 100%);
  }

  @media (max-width: 768px) {
    height: 48px;
    font-size: 14px;
    // width: 95%;
    bottom: 230px;
    left: 15px;
  }
`;
