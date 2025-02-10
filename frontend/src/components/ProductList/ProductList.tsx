import * as React from "react";
import {
  MainHeader,
  ProductListContainer,
  ProductCardsContainer,
} from "./styles/ProductListStyles";
import ProductCard from "./ProductCard";
import { Category, BaseProduct, SelectedProduct } from "../../Types";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { allCategory } from "../../App";

interface IProductListProps {
  products: BaseProduct[];
  categories: Category[];
  category: string;
  setSelectedCategory: (category: Category, fetchInfo: boolean) => void;
  addProductToCart: (product: SelectedProduct) => void;
  switchCartOverlay: () => void;
}

function capitalizeFirstLetter(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export class ProductList extends React.Component<IProductListProps> {
  constructor(props: IProductListProps) {
    super(props);
  }

  componentDidMount(): void {
    this.updateCategory();
  }

  componentDidUpdate(prevProps: IProductListProps): void {
    if (prevProps.categories.length === 0 && this.props.categories.length > 0) {
      this.updateCategory();
    }
  }

  updateCategory(): void {
    const { category, categories, setSelectedCategory } = this.props;

    if (categories.length === 0) {
      return;
    }

    const categoryEntity = categories.find((x) => x.name === category);
    if (categoryEntity) {
      setSelectedCategory(categoryEntity, true);
    }
  }

  public render() {
    const { products, category, addProductToCart, switchCartOverlay } =
      this.props;

    return (
      <ProductListContainer>
        <MainHeader>
          {capitalizeFirstLetter(category ? category : "")}
        </MainHeader>
        <ProductCardsContainer>
          {products.map((product) => {
            return (
              <NavLink
                to={`/products/${product.id}`}
                key={product.id}
                className="productCardLink"
                data-testid={[
                  "product",
                  ...product.name.toLowerCase().split(" "),
                ].join("-")}
              >
                <ProductCard
                  product={product}
                  addProductToCart={addProductToCart}
                  switchCartOverlay={switchCartOverlay}
                />
              </NavLink>
            );
          })}
        </ProductCardsContainer>
      </ProductListContainer>
    );
  }
}

const ProductListWrapper = (props: {
  products: BaseProduct[];
  categories: Category[];
  addProductToCart: (product: SelectedProduct) => void;
  setSelectedCategory: (category: Category, fetchInfo: boolean) => void;
  switchCartOverlay: () => void;
}) => {
  const { category } = useParams<{ category: string }>();
  return <ProductList {...props} category={category || allCategory} />;
};

export default ProductListWrapper;
