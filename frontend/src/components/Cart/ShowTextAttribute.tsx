import * as React from "react";
import { Attribute } from "../../Types";
import {
  ActiveSizeButton,
  SizeButton,
  SizeSelectorContainer,
} from "../ProductDetails/styles/ProductDetailsStyles";

export interface IShowTextAttributeProps {
  attribute: Attribute;
  selectedAttributeItemId: number;
}

export default class ShowTextAttribute extends React.Component<IShowTextAttributeProps> {
  constructor(props: IShowTextAttributeProps) {
    super(props);
  }

  public render() {
    const { attribute, selectedAttributeItemId } = this.props;
    const testId = `cart-item-attribute-${attribute.name
      .toLowerCase()
      .replace(" ", "-")}`;

    return (
      <SizeSelectorContainer
        className="textAttributeContainer"
        data-testid={testId}
      >
        {attribute.attributeItems.map((attributeItem) => {
          const isAttributeItemSelected =
            attributeItem.id === selectedAttributeItemId;
          const testId = `cart-item-attribute-${attributeItem.displayValue.toLowerCase()}${
            isAttributeItemSelected ? "-selected" : ""
          }`;

          if (isAttributeItemSelected) {
            return (
              <ActiveSizeButton
                key={attributeItem.id}
                className="selectedTextAttr"
                data-testid={testId}
              >
                {attributeItem.value}
              </ActiveSizeButton>
            );
          } else {
            return (
              <SizeButton
                key={attributeItem.id}
                className="textAttribute"
                data-testid={testId}
              >
                {attributeItem.value}{" "}
              </SizeButton>
            );
          }
        })}
      </SizeSelectorContainer>
    );
  }
}
