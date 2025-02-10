import * as React from "react";
import { Attribute } from "../../Types";
import {
  ActiveColorContainer,
  ColorContainer,
  ColorSelectorContainer,
} from "../ProductDetails/styles/ProductDetailsStyles";

export interface IShowSwatchAttributeProps {
  attribute: Attribute;
  selectedAttributeItemId: number;
}

export default class ShowSwatchAttribute extends React.Component<IShowSwatchAttributeProps> {
  constructor(props: IShowSwatchAttributeProps) {
    super(props);
  }

  public render() {
    const { attribute, selectedAttributeItemId } = this.props;

    const testId = [
      "product-attribute",
      ...attribute.name.toLowerCase().split(" "),
    ].join("-");

    return (
      <ColorSelectorContainer
        className="swatchAttributeContainer"
        data-testid={testId}
      >
        {attribute.attributeItems.map((attributeItem) => {
          const isAttributeItemSelected =
            attributeItem.id === selectedAttributeItemId;

          const testIdDisplayValue = !isAttributeItemSelected
            ? [
                "product-attribute",
                ...attribute.name.toLowerCase().split(" "),
                ...attributeItem.displayValue.split(" "),
              ].join("-")
            : [
                "product-attribute",
                ...attribute.name.toLowerCase().split(" "),
                ...attributeItem.displayValue.split(" "),
                "selected",
              ].join("-");

          const testIdValue = !isAttributeItemSelected
            ? [
                "product-attribute",
                ...attribute.name.toLowerCase().split(" "),
                ...attributeItem.displayValue.split(" "),
              ].join("-")
            : [
                "product-attribute",
                ...attribute.name.toLowerCase().split(" "),
                ...attributeItem.displayValue.split(" "),
                "selected",
              ].join("-");

          if (isAttributeItemSelected) {
            return (
              <div data-testid={testIdValue}>
                <ActiveColorContainer
                  key={attributeItem.id}
                  style={{ background: attributeItem.value }}
                  className="swatchAttribute"
                  data-testid={testIdDisplayValue}
                />
              </div>
            );
          } else {
            return (
              <div data-testid={testIdValue}>
                <ColorContainer
                  key={attributeItem.id}
                  style={{ background: attributeItem.value }}
                  className="swatchAttribute"
                  data-testid={testIdDisplayValue}
                />
              </div>
            );
          }
        })}
      </ColorSelectorContainer>
    );
  }
}
