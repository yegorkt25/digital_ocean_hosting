import * as React from "react";
import NavCategory from "./NavCategory";
import logo from "../../assets/logo.svg";
import cart from "../../assets/cart.svg";
import {
  NavContainer,
  NavCategoriesContainer,
  Logo,
  Cart,
  CartAmount,
} from "./styles/NavStyles";
import { Category, SelectedProduct } from "../../Types";
import { NavLink } from "react-router-dom";

interface INavProps {
  categories: Category[];
  setSelectedCategory: (category: Category, fetchInfo: boolean) => void;
  selectedCategory: Category | null;
  switchCartOverlay: () => void;
  selectedProducts: SelectedProduct[];
}

export default class Navbar extends React.Component<INavProps> {
  constructor(props: INavProps) {
    super(props);
  }

  public render() {
    const {
      categories,
      setSelectedCategory,
      selectedCategory,
      switchCartOverlay,
      selectedProducts,
    } = this.props;

    return (
      <NavContainer>
        <NavCategoriesContainer>
          {Object.entries(categories).map(([key, value]) => {
            const isSelected = selectedCategory?.name === value.name;

            return (
              <NavLink
                to={"/" + value.name}
                key={key}
                className="navLink"
                data-testid={
                  isSelected ? "active-category-link" : "category-link"
                }
              >
                <NavCategory
                  setSelectedCategory={setSelectedCategory}
                  category={value}
                  isSelected={isSelected}
                />
              </NavLink>
            );
          })}
        </NavCategoriesContainer>

        <Logo src={logo} alt="logo" />

        <Cart
          src={cart}
          alt="cart"
          onClick={() => switchCartOverlay()}
          data-testid="cart-overlay"
        />
        {selectedProducts.length > 0 && (
          <CartAmount>
            {selectedProducts.reduce((sum, item) => sum + item.quantity, 0)}
          </CartAmount>
        )}
      </NavContainer>
    );
  }
}
