import * as React from "react";
import {
  StyledProductCard,
  ProductCardImage,
  ProductTitle,
  ProductPrice,
  OutOfStockContainer,
  ImageContainer,
  OutOfStockText,
  AddToCartImage,
} from "./styles/ProductListStyles";
import CartButton from "../../assets/cartButton.png";
import {
  BaseProduct,
  SelectedProduct,
  SelectedAttributeItems,
} from "../../Types";
import { fetchProduct } from "../../Requests";

export interface IProductCardProps {
  product: BaseProduct;
  addProductToCart: (product: SelectedProduct) => void;
  switchCartOverlay: () => void;
}

export default class ProductCard extends React.Component<IProductCardProps> {
  constructor(props: IProductCardProps) {
    super(props);
  }

  public render() {
    const { product, addProductToCart, switchCartOverlay } = this.props;

    return (
      <StyledProductCard
        data-testid={"product-" + product.name.toLowerCase().replace(" ", "-")}
      >
        <ImageContainer>
          {product.isInStock ? (
            <ProductCardImage
              src={product.gallery[0].imageUrl}
              alt={product.name}
            />
          ) : (
            <>
              <OutOfStockContainer>
                <OutOfStockText>OUT OF STOCK</OutOfStockText>{" "}
              </OutOfStockContainer>
              <ProductCardImage
                src={product.gallery[0].imageUrl}
                alt={product.name}
              />
            </>
          )}
        </ImageContainer>

        {product.isInStock ? (
          <AddToCartImage
            src={CartButton}
            className="AddToCartButton"
            onClick={(e) => {
              e.preventDefault();

              fetchProduct(product.id).then((data) => {
                if (!data) {
                  return;
                }

                const { product } = data;
                const selectedAttributeItems: SelectedAttributeItems = {};

                product.attributes.forEach((attribute) => {
                  selectedAttributeItems[attribute.id] =
                    attribute.attributeItems[0].id;
                });

                const selectedProduct: SelectedProduct = {
                  ...product,
                  quantity: 1,
                  selectedAttributesItems: selectedAttributeItems,
                };
                addProductToCart(selectedProduct);
                switchCartOverlay();
              });
            }}
          />
        ) : null}

        <ProductTitle>{product.name}</ProductTitle>
        <ProductPrice>{product.prices[0].price.toFixed(2)}$</ProductPrice>
      </StyledProductCard>
    );
  }
}
