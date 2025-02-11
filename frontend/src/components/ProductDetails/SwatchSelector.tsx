import * as React from "react";
import {
  ColorSelectorContainer,
  ColorContainer,
  ActiveColorContainer,
} from "./styles/ProductDetailsStyles";
import { Attribute, SelectedAttributeItems } from "../../Types";

export interface IColorSelectorProps {
  attribute: Attribute;
  selectedAttributeItems: SelectedAttributeItems;
  setSelectedAttribute: (attributeId: number, attributeItemId: number) => void;
}

export default class SwatchSelector extends React.Component<IColorSelectorProps> {
  constructor(props: IColorSelectorProps) {
    super(props);
  }

  public render() {
    const { attribute, setSelectedAttribute, selectedAttributeItems } =
      this.props;
    const testId = [
      "product-attribute",
      ...attribute.name.toLowerCase().split(" "),
    ].join("-");

    return (
      <ColorSelectorContainer data-testid={testId}>
        {attribute.attributeItems.map((attributeItem) => {
          const isAttributeItemSelected =
            selectedAttributeItems[attribute.id] === attributeItem.id;

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

          if (isAttributeItemSelected) {
            return (
              <ActiveColorContainer
                key={attributeItem.id}
                style={{ background: attributeItem.value }}
                data-testid={testIdDisplayValue}
              />
            );
          } else {
            return (
              <ColorContainer
                key={attributeItem.id}
                style={{ background: attributeItem.value }}
                onClick={() =>
                  setSelectedAttribute(attribute.id, attributeItem.id)
                }
                data-testid={testIdDisplayValue}
              />
            );
          }
        })}
      </ColorSelectorContainer>
    );
  }
}
