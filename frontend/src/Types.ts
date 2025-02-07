export type Gallery = {
  imageUrl: string;
};

export type Category = {
  name: string;
};

export type Attribute = {
  id: number;
  name: string;
  type: string;
  attributeItems: AttributeItem[];
};

export type SelectedAttribute = Attribute & {
  selectedAttributeItem: AttributeItem;
};

export type AttributeItem = {
  id: number;
  value: string;
  displayValue: string;
};

export type Price = {
  price: number;
  currency: Currency[];
};

export type Currency = {
  label: string;
  symbol: string;
};

export type Product = BaseProduct & {
  description: string;
  category: Category;
  attributes: Attribute[];
};

export type SelectedProduct = Product & {
  selectedAttributesItems: SelectedAttributeItems;
  quantity: number;
};

//productAttributeId: productAttrubuteItemId
export type SelectedAttributeItems = Record<number, number>;

export type BaseProduct = {
  id: number;
  name: string;
  isInStock: boolean;
  gallery: Gallery[];
  prices: Price[];
};

export type OrderDetailsAttribute = {
  attributeItem: AttributeItem;
};

export type OrderDetail = {
  id: number;
  product: Product;
  quantity: number;
  attributes: OrderDetailsAttribute[];
};

export type Order = {
  id: number;
  status: {
    value: string;
  };
  createdAt: string;
  updatedAt: string;
  orderDetails: OrderDetail[];
};
