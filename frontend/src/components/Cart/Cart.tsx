import * as React from "react";
import {
  CartContainer,
  CartContent,
  CartInfo,
  EmptyCartMessage,
  MyBag,
  OrderButton,
  PriceSpan,
  ShadowOverlay,
  TotalPriceInfo,
} from "./styles/CartStyles";
import { SelectedProduct } from "../../Types";
import CartProductInfo from "./CartProductInfo";
import { addOrder } from "../../Requests";

export interface ICartProps {
  selectedProducts: SelectedProduct[];
  addProductToCart: (product: SelectedProduct) => void;
  removeProductFromCart: (product: SelectedProduct) => void;
  clearCart: () => void;
}

export default class Cart extends React.Component<ICartProps> {
  constructor(props: ICartProps) {
    super(props);
  }

  public render() {
    const {
      selectedProducts,
      removeProductFromCart,
      addProductToCart,
      clearCart: setCartEmpty,
    } = this.props;

    const isCartEmpty = selectedProducts.length === 0;
    const cartAmount = selectedProducts.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const isPlural = cartAmount > 1;

    return (
      <>
        <ShadowOverlay />
        <CartContainer>
          {!isCartEmpty && (
            <CartInfo data-testid="cart-item-amount">
              <MyBag>My Bag,</MyBag> {cartAmount} item
              {isPlural ? "s" : ""}
            </CartInfo>
          )}
          <CartContent>
            {isCartEmpty ? (
              <EmptyCartMessage>THE CART IS EMPTY</EmptyCartMessage>
            ) : (
              selectedProducts.map((product) => (
                <CartProductInfo
                  key={product.id}
                  addProductToCart={addProductToCart}
                  removeProductFromCart={removeProductFromCart}
                  selectedProduct={product}
                />
              ))
            )}
          </CartContent>

          <TotalPriceInfo data-testid="cart-total">
            Total:{" "}
            <PriceSpan>
              $
              {selectedProducts
                .reduce((sum, item) => sum + item.prices[0].price, 0)
                .toFixed(2)}
            </PriceSpan>
          </TotalPriceInfo>

          <OrderButton
            className={
              isCartEmpty ? "disabledOrderButton" : "enabledOrderButton"
            }
            data-testid="cart-btn"
            onClick={() => {
              addOrder(selectedProducts);
              setCartEmpty();
            }}
          >
            PLACE ORDER
          </OrderButton>
        </CartContainer>
      </>
    );
  }
}
