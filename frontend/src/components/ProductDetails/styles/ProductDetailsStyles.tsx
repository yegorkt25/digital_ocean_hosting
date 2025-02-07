import styled from "styled-components";

export const PhotoGalleryContainer = styled.div`
  display: flex;
  align-items: center;
  align-items: flex-start;
`;

export const ThumbnailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Thumbnail = styled.img`
  width: 80px;
  object-fit: cover;
  cursor: pointer;
`;

export const ProductDetailsContainer = styled.div`
  margin-top: 80px;
  margin-left: 100px;
  display: flex;
  gap: 110px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-left: 20px;
    gap: 40px;
  }
`;

export const MainImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainImage = styled.img`
  max-width: 420px;
  max-height: 600px;
  margin-left: 40px;

  @media (max-width: 768px) {
    max-width: 300px;
    margin-left: 0;
  }
`;

export const PrevButton = styled.button`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.73);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: 100;
  left: 50px;
`;

export const NextButton = styled.button`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.73);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: 100;
  right: 10px;
`;

export const InfoContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  // border: 1px solid red;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const InfoTitle = styled.h1`
  font-weight: 600;
  font-size: 30px;
  color: #1d1f22;
  margin: 0px;
`;

export const SubTitle = styled.div`
  font-family: Roboto Condensed;
  font-size: 18px;
  font-weight: 700;
`;

export const PriceCont = styled.div`
  font-family: Raleway;
  font-size: 24px;
  font-weight: 700;
`;

export const AddToCartButton = styled.div`
  width: 100%;
  height: 52px;
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
    width: 95%;
  }
`;

export const Description = styled.div`
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  color: #1d1f22;

  @media (max-width: 768px) {
    height: 48px;
    font-size: 14px;
    width: 96%;
  }
`;

export const SizeSelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  font-family: Source Sans Pro;
  font-size: 16px;
  font-weight: 400;
  text-align: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const SizeButton = styled.div`
  padding: 12px 22px;
  width: 63px;
  border: 1px solid #1d1f22;
  color: #1d1f22;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    color: hsl(216, 7.94%, 46.35%);
    border-color: hsl(216, 7.94%, 46.35%);
  }
`;

export const ActiveSizeButton = styled.div`
  padding: 12px 22px;
  width: 63px;
  color: #ffffff;
  background-color: #1d1f22;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    background-color: hsl(216, 7.94%, 17.35%);
  }
`;

export const ColorSelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const ColorContainer = styled.div`
  width: 36px;
  height: 36px;

  border: 1px solid #1d1f22;

  &:hover {
    cursor: pointer;
  }
`;

export const ActiveColorContainer = styled.div`
  width: 36px;
  height: 36px;
  outline: 1px solid #5ece7b;
  outline-offset: 1px;

  &:hover {
    cursor: pointer;
  }
`;
