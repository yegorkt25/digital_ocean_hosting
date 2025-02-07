import * as React from "react";
import { SelectedProduct } from "../../Types";
import {
  AttributeText,
  CartImage,
  CartProductInfoContainer,
  CartProductPrice,
} from "./styles/CartStyles";
import { ProductTitle } from "../ProductList/styles/ProductListStyles";
import ShowSwatchAttribute from "./ShowSwatchAttribute";
import ShowTextAttribute from "./ShowTextAttribute";
import CountSelector from "./CountSelector";

export interface ICartProductInfoProps {
  selectedProduct: SelectedProduct;
  addProductToCart: (product: SelectedProduct) => void;
  removeProductFromCart: (product: SelectedProduct) => void;
}

export default class CartProductInfo extends React.Component<ICartProductInfoProps> {
  constructor(props: ICartProductInfoProps) {
    super(props);
  }

  public render() {
    const { selectedProduct, addProductToCart, removeProductFromCart } =
      this.props;

    return (
      <CartProductInfoContainer>
        <div>
          <ProductTitle>{selectedProduct.name}</ProductTitle>
          <CartProductPrice>
            ${selectedProduct.prices[0].price}
          </CartProductPrice>

          {selectedProduct.attributes.map((attribute, index) => {
            if (attribute.type === "text") {
              return (
                <>
                  <AttributeText key={Symbol().toString()}>
                    {attribute.name}:
                  </AttributeText>
                  <ShowTextAttribute
                    key={index}
                    attribute={attribute}
                    selectedAttributeItemId={
                      selectedProduct.selectedAttributesItems[attribute.id]
                    }
                  />
                </>
              );
            } else if (attribute.type === "swatch") {
              return (
                <>
                  <AttributeText key={Symbol().toString()}>
                    {attribute.name}:
                  </AttributeText>
                  <ShowSwatchAttribute
                    key={index}
                    attribute={attribute}
                    selectedAttributeItemId={
                      selectedProduct.selectedAttributesItems[attribute.id]
                    }
                  />
                </>
              );
            }
          })}
        </div>
        <CountSelector
          selectedProduct={selectedProduct}
          addProductToCart={addProductToCart}
          removeProductFromCart={removeProductFromCart}
        />
        <CartImage
          src={selectedProduct.gallery[0].imageUrl}
          alt={selectedProduct.name}
        />
      </CartProductInfoContainer>
    );
  }
}
