import styled from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 2;
  background-color: white;

  @media (max-width: 768px) {
    flex-direction: row;
    height: auto;
    padding: 10px;
    padding-left: 30px;
    padding-right: 30px;
  }
`;

export const NavCategoriesContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 101px;

  @media (max-width: 768px) {
    margin-left: 0;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const Logo = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    order: -1;
    position: static;
  }
`;

export const Cart = styled.img`
  width: 25px;
  margin-right: 101px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

export const NavButton = styled.div`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px 0;
  position: relative;
  font-size: 16px;

  &:hover {
    opacity: 80%;
  }
`;

export const ActiveButton = styled.div`
  color: #5ece7b;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px 0;
  position: relative;
  font-size: 16px;
  font-weight: 600;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: #5ece7b;
  }

  &:hover {
    opacity: 80%;
  }
`;

export const CartAmount = styled.div`
  background-color: #1d1f22;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
  padding: 5px;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 95px;
  top: 25px;

  @media (max-width: 768px) {
    right: 25px;
    top: 15px;
  }
`;
