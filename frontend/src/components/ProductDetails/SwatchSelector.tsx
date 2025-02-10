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
      "product attribute ",
      ...attribute.name.toLowerCase().split(" "),
    ].join("-");

    return (
      <ColorSelectorContainer data-testid={testId}>
        {attribute.attributeItems.map((attributeItem) => {
          if (selectedAttributeItems[attribute.id] === attributeItem.id) {
            return (
              <ActiveColorContainer
                key={attributeItem.id}
                style={{ background: attributeItem.value }}
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
              />
            );
          }
        })}
      </ColorSelectorContainer>
    );
  }
}
