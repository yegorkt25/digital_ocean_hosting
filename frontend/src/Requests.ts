import {
  Category,
  BaseProduct,
  Order,
  Product,
  SelectedProduct,
} from "./Types";

const backendUrl = "http://localhost/graphql";

const fetchAllCategoriesQuery = `
            query {
              categories {
                name
              }
            }
          `;

const fetchProductsQuery = `
query {
  products(category: "$category") {
    id
    name
    isInStock
    gallery {
      imageUrl
    }
    category {
      name
    }
    prices {
      price
      currency {
        label
        symbol
      }
    }
  }
}
`;

const fetchProductQuery = `query {
  product(id: $id) {
        id
        name
        isInStock
        gallery {
            imageUrl
        }
        description
        category {
            name
        }
        attributes {
            id
            name
            type
            attributeItems {
                id
                value
                displayValue
            }
        }
        prices {
            price
            currency {
                label
                symbol
            }
        }
    }
}`;

const addOrderMutation = `mutation CreateOrder {
    createOrder {
        id
    }
}
`;

const addOrderDetailMutation = `mutation AddOrderDetail {
    addOrderDetail(orderId: $orderId, productId: $productId, quantity: $quantity) {
        id
    }
}`;

const addOrderDetailsAttributeMutation = `mutation AddOrderDetailAttribute {
    addOrderDetailAttribute(attributeItemId: $attributeItemId, orderDetailId: $orderDetailId) {
        id
        status
        createdAt
        updatedAt
        orderDetails {
            id
            quantity
            product {
                id
                name
                isInStock
                description
                brand
                category {
                    id
                    name
                }
                gallery {
                    imageUrl
                }
                attributes {
                    id
                    name
                    type
                    attributeItems {
                        id
                        value
                        displayValue
                    }
                }
                prices {
                    price
                    currency {
                        label
                        symbol
                    }
                }
            }
            attributes {
                attributeItem {
                    id
                    value
                    displayValue
                }
            }
        }
    }
}
`;

export const fetchAllCategories = async (): Promise<{
  categories: Category[];
}> => {
  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: fetchAllCategoriesQuery,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return {
      categories: data["data"]["categories"],
    };
  } catch (error) {
    console.log(error);

    return { categories: [] };
  }
};

export const fetchProducts = async (
  category: string
): Promise<{
  products: BaseProduct[];
}> => {
  try {
    const cleanQuery: string = fetchProductsQuery.replace(
      "$category",
      category
    );
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: cleanQuery,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      products: data["data"]["products"],
    };
  } catch (error) {
    console.log(error);

    return { products: [] };
  }
};

export const fetchProduct = async (
  id: number
): Promise<{
  product: Product;
} | null> => {
  try {
    const cleanQuery: string = fetchProductQuery.replace(
      "$id",
      id as any as string
    );
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: cleanQuery,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: { data: { product: Product } } = await response.json();

    return {
      product: data.data.product,
    };
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const addOrder = async (
  selectedProducts: SelectedProduct[]
): Promise<{ order: Order } | null> => {
  try {
    let order: Order | null = null;

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: addOrderMutation,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: {
      data: {
        createOrder: {
          id: number;
        };
      };
    } = await response.json();

    selectedProducts.forEach(async (product) => {
      const cleanAddDetails = addOrderDetailMutation
        .replace("$orderId", data.data.createOrder.id as any as string)
        .replace("$productId", product.id as any as string)
        .replace("$quantity", product.quantity as any as string);

      const resDetails = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: cleanAddDetails,
        }),
      });

      if (!resDetails.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const detailsId: {
        data: {
          addOrderDetail: {
            id: number;
          };
        };
      } = await resDetails.json();

      Object.keys(product.selectedAttributesItems).forEach(
        async (productAttributeIdStr) => {
          const productAttributeId = Number(productAttributeIdStr);

          const cleanAttribute = addOrderDetailsAttributeMutation
            .replace(
              "$attributeItemId",
              product.selectedAttributesItems[
                productAttributeId
              ] as any as string
            )
            .replace(
              "$orderDetailId",
              detailsId.data.addOrderDetail.id as any as string
            );
          const resAddAttr = await fetch(backendUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: cleanAttribute,
            }),
          });

          if (!resAddAttr.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const orderJSON: { data: { addOrderDetailAttribute: Order } } =
            await resAddAttr.json();

          order = orderJSON.data.addOrderDetailAttribute;
        }
      );
    });

    if (!order) return null;

    return { order: order };
  } catch (error) {
    console.log(error);

    return null;
  }
};
