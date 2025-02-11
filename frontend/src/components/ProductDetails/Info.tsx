import * as React from "react";
import {
  InfoContainer,
  InfoTitle,
  SubTitle,
  PriceCont,
  AddToCartButton,
  Description,
} from "./styles/ProductDetailsStyles";
import TextSelector from "./TextSelector";
import SwatchSelector from "./SwatchSelector";
import { SelectedProduct } from "../../Types";
import parse from "html-react-parser";

export interface IInfoProps {
  selectedProduct: SelectedProduct;
  setSelectedAttribute: (attributeId: number, attributeItemId: number) => void;
  addProductToCart: (product: SelectedProduct) => void;
  switchCartOverlay: () => void;
}

export default class Info extends React.Component<IInfoProps> {
  constructor(props: IInfoProps) {
    super(props);
  }

  public render() {
    const {
      selectedProduct,
      switchCartOverlay,
      addProductToCart,
      setSelectedAttribute,
    } = this.props;
    const description = parse(selectedProduct.description);

    return (
      <InfoContainer>
        <InfoTitle>{selectedProduct.name}</InfoTitle>
        {selectedProduct.attributes.map((attribute) => {
          if (attribute.type === "text") {
            return (
              <>
                <SubTitle>{attribute.name.toUpperCase()}:</SubTitle>
                <TextSelector
                  attribute={attribute}
                  setSelectedAttribute={setSelectedAttribute}
                  selectedAttributeItems={
                    selectedProduct.selectedAttributesItems
                  }
                />
              </>
            );
          } else if (attribute.type === "swatch") {
            return (
              <>
                <SubTitle>{attribute.name.toUpperCase()}:</SubTitle>
                <SwatchSelector
                  attribute={attribute}
                  setSelectedAttribute={setSelectedAttribute}
                  selectedAttributeItems={
                    selectedProduct.selectedAttributesItems
                  }
                />
              </>
            );
          }
        })}

        <SubTitle>PRICE:</SubTitle>
        <PriceCont>${selectedProduct.prices[0].price.toFixed(2)}</PriceCont>

        <AddToCartButton
          onClick={() => {
            if (
              selectedProduct.isInStock &&
              Object.keys(selectedProduct.selectedAttributesItems).length ===
                selectedProduct.attributes.length
            ) {
              addProductToCart(selectedProduct);
              switchCartOverlay();
            }
          }}
          data-testid="add-to-cart"
          className={
            !selectedProduct.isInStock ||
            Object.keys(selectedProduct.selectedAttributesItems).length <
              selectedProduct.attributes.length
              ? "disabledOrderButton"
              : ""
          }
        >
          ADD TO CART
        </AddToCartButton>

        <Description data-testid="product-description">
          {description}
        </Description>
      </InfoContainer>
    );
  }
}
