import { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import ProductList from "./components/ProductList/ProductList";
import Cart from "./components/Cart/Cart";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { Category, BaseProduct, SelectedProduct } from "./Types";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { fetchAllCategories, fetchProducts } from "./Requests";
import { MainContainer } from "./AppStyles";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import MetaTags from "./MetaTags";

export const allCategory = "all";

function isProductSame(
  product: SelectedProduct,
  products: SelectedProduct[]
): { isSame: boolean; index: number | null } {
  let productIndex = 0;
  for (const cartProduct of products) {
    if (product.id === cartProduct.id) {
      let allAttributesMatch = true;
      for (const productAttributeIdStr of Object.keys(
        cartProduct.selectedAttributesItems
      )) {
        const productAttributeId = Number(productAttributeIdStr);
        const isAttributeItemSame =
          cartProduct.selectedAttributesItems[productAttributeId] ===
          product.selectedAttributesItems[productAttributeId];

        if (!isAttributeItemSame) {
          allAttributesMatch = false;
          break;
        }
      }
      if (allAttributesMatch) {
        return { isSame: true, index: productIndex };
      }
    }
    productIndex++;
  }

  return { isSame: false, index: null };
}

interface AppState {
  selectedCategory: Category | null;
  categories: Category[];
  products: BaseProduct[];
  isCartOpen: boolean;
  selectedProducts: SelectedProduct[];
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      selectedCategory: null,
      categories: [],
      isCartOpen: false,
      selectedProducts: [],
      products: [],
    };

    this.addProductToCart = this.addProductToCart.bind(this);
    this.removeProductFromCart = this.removeProductFromCart.bind(this);
    this.clearCart = this.clearCart.bind(this);
  }

  componentDidMount(): void {
    console.log("API URL:", import.meta.env.VITE_API_URL);
    fetchAllCategories().then((data) => {
      this.setState({
        categories: data.categories,
      });

      const pathname = window.location.pathname;

      if (pathname.startsWith("/products/")) {
        return;
      }

      const categoryFromUrl = pathname.split("/")[1];

      if (categoryFromUrl) {
        const matchingCategory = data.categories.find(
          (category) =>
            category.name.toLowerCase() === categoryFromUrl.toLowerCase()
        );
        this.setSelectedCategory(matchingCategory || data.categories[0], true);
      } else {
        this.setSelectedCategory(data.categories[0], true);
      }
    });
  }

  clearCart(): void {
    this.setState({
      selectedProducts: [],
    });
  }

  addProductToCart(product: SelectedProduct): void {
    const { selectedProducts } = this.state;

    const { isSame, index } = isProductSame(product, selectedProducts);

    console.log(isSame, index);

    if (!isSame) {
      const newProduct = {
        ...product,
        selectedAttributesItems: { ...product.selectedAttributesItems },
      };
      const newSelectedProducts = [...selectedProducts, newProduct];
      this.setState({ selectedProducts: newSelectedProducts });
    } else {
      const newSelectedProducts = [...selectedProducts];

      if (typeof index === "number") {
        newSelectedProducts[index].quantity++;
        this.setState({ selectedProducts: newSelectedProducts });
      }
    }
  }

  removeProductFromCart(product: SelectedProduct): void {
    const { selectedProducts } = this.state;

    const { isSame, index } = isProductSame(product, selectedProducts);

    console.log(isSame, index);

    if (!isSame) {
      return;
    }

    const newSelectedProducts = [...selectedProducts];

    if (typeof index === "number") {
      if (newSelectedProducts[index].quantity === 1) {
        const updatedSelectedProducts = [
          ...newSelectedProducts.slice(0, index),
          ...newSelectedProducts.slice(index + 1),
        ];

        this.setState({ selectedProducts: updatedSelectedProducts });
        return;
      }
      newSelectedProducts[index].quantity--;
      this.setState({ selectedProducts: newSelectedProducts });
    }
  }

  setSelectedCategory = async (category: Category, fetchInfo: boolean) => {
    if (fetchInfo) {
      fetchProducts(category.name).then((data) => {
        this.setState({
          selectedCategory: category,
          products: data.products,
        });
      });
    } else {
      this.setState({
        selectedCategory: category,
      });
    }
  };

  switchCartOverlay = () => {
    const { isCartOpen } = this.state;
    this.setState({ isCartOpen: !isCartOpen });
  };

  render() {
    const {
      selectedCategory,
      categories,
      products,
      isCartOpen,
      selectedProducts,
    } = this.state;

    return (
      <HelmetProvider>
        <MetaTags
          title="Scandiweb test"
          description="Scandiweb test application"
        />

        <Router>
          <Navbar
            categories={categories}
            setSelectedCategory={this.setSelectedCategory}
            selectedCategory={selectedCategory}
            switchCartOverlay={this.switchCartOverlay}
            selectedProducts={selectedProducts}
          />
          {isCartOpen && (
            <Cart
              selectedProducts={selectedProducts}
              addProductToCart={this.addProductToCart}
              removeProductFromCart={this.removeProductFromCart}
              clearCart={this.clearCart}
            />
          )}
          <MainContainer>
            <Routes>
              <Route
                path="/:category?"
                element={
                  <ProductList
                    products={products}
                    categories={categories}
                    setSelectedCategory={this.setSelectedCategory}
                    addProductToCart={this.addProductToCart}
                    switchCartOverlay={this.switchCartOverlay}
                  />
                }
              />
              <Route
                path="/products/:id"
                element={
                  <ProductDetails
                    addProductToCart={this.addProductToCart}
                    setSelectedCategory={this.setSelectedCategory}
                    switchCartOverlay={this.switchCartOverlay}
                  />
                }
              />
            </Routes>
          </MainContainer>
        </Router>
      </HelmetProvider>
    );
  }
}

export default App;
