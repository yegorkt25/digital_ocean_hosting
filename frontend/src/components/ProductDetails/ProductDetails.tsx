import * as React from "react";
import PhotoGallery from "./PhotoGallery";
import { ProductDetailsContainer } from "./styles/ProductDetailsStyles";
import Info from "./Info";
import { Category, SelectedAttributeItems, SelectedProduct } from "../../Types";
import { useParams } from "react-router";
import { fetchProduct } from "../../Requests";

export interface IProductDetailsProps {
  productId: number;
  setSelectedCategory: (category: Category, fetchInfo: boolean) => void;
  addProductToCart: (product: SelectedProduct) => void;
  switchCartOverlay: () => void;
}

export interface IProductDetailsState {
  selectedProduct: SelectedProduct;
  isLoading: boolean;
}

export class ProductDetails extends React.Component<
  IProductDetailsProps,
  IProductDetailsState
> {
  constructor(props: IProductDetailsProps) {
    super(props);

    this.state = {
      selectedProduct: {
        id: 0,
        name: "",
        isInStock: false,
        gallery: [],
        description: "",
        category: { name: "" },
        attributes: [],
        prices: [],
        selectedAttributesItems: {},
        quantity: 1,
      },
      isLoading: true,
    };
  }

  componentDidMount(): void {
    const { productId } = this.props;

    if (isNaN(productId)) {
      return;
    }

    fetchProduct(productId).then((data) => {
      if (data === null) {
        return;
      }

      const { product } = data;
      const selectedAttributeItems: SelectedAttributeItems = {};

      // product.attributes.forEach((attribute) => {
      //   selectedAttributeItems[attribute.id] = attribute.attributeItems[0].id;
      // });

      this.props.setSelectedCategory(product.category, false);

      this.setState({
        selectedProduct: {
          ...product,
          quantity: 1,
          selectedAttributesItems: selectedAttributeItems,
        },
        isLoading: false,
      });
    });
  }

  public setSelectedAttribute(attributeId: number, attributeItemId: number) {
    const { selectedProduct } = this.state;

    selectedProduct.selectedAttributesItems[attributeId] = attributeItemId;

    this.setState({ selectedProduct: selectedProduct });
  }

  public render() {
    const { selectedProduct } = this.state;
    const { gallery } = selectedProduct;
    const { isLoading } = this.state;
    const { addProductToCart, switchCartOverlay } = this.props;

    if (isLoading) {
      return null;
    }

    return (
      <ProductDetailsContainer>
        <PhotoGallery images={gallery} />
        <Info
          addProductToCart={addProductToCart}
          selectedProduct={selectedProduct}
          setSelectedAttribute={this.setSelectedAttribute.bind(this)}
          switchCartOverlay={switchCartOverlay}
        />
      </ProductDetailsContainer>
    );
  }
}

const ProductDetailsWrapper = (props: {
  setSelectedCategory: (category: Category, fetchInfo: boolean) => void;
  addProductToCart: (product: SelectedProduct) => void;
  switchCartOverlay: () => void;
}) => {
  const { id } = useParams<{ id: string }>();

  let productId: number;

  if (id) productId = parseInt(id);
  else productId = NaN;

  return <ProductDetails {...props} productId={productId} />;
};

export default ProductDetailsWrapper;
