import * as React from "react";
import { CountSelectorContainer } from "./styles/CartStyles";
import { SizeButton } from "../ProductDetails/styles/ProductDetailsStyles";
import { SelectedProduct } from "../../Types";

export interface ICountSelectorProps {
  selectedProduct: SelectedProduct;
  addProductToCart: (product: SelectedProduct) => void;
  removeProductFromCart: (product: SelectedProduct) => void;
}

export default class CountSelector extends React.Component<ICountSelectorProps> {
  constructor(props: ICountSelectorProps) {
    super(props);
  }

  public render() {
    const { selectedProduct, addProductToCart, removeProductFromCart } =
      this.props;

    return (
      <CountSelectorContainer>
        <SizeButton
          className="countControls"
          onClick={() => addProductToCart(this.props.selectedProduct)}
          data-testid="cart-item-amount-increase"
        >
          +
        </SizeButton>
        <div className="productQuantity" data-testid="cart-item-amount">
          {selectedProduct.quantity}
        </div>
        <SizeButton
          data-testid="cart-item-amount-decrease"
          className="countControls"
          onClick={() => removeProductFromCart(this.props.selectedProduct)}
        >
          -
        </SizeButton>
      </CountSelectorContainer>
    );
  }
}
