import * as React from "react";
import {
  SizeSelectorContainer,
  SizeButton,
  ActiveSizeButton,
} from "./styles/ProductDetailsStyles";
import { Attribute, SelectedAttributeItems } from "../../Types";

export interface ITextSelectorProps {
  attribute: Attribute;
  selectedAttributeItems: SelectedAttributeItems;
  setSelectedAttribute: (attributeId: number, attributeItemId: number) => void;
}

export default class TextSelector extends React.Component<ITextSelectorProps> {
  constructor(props: ITextSelectorProps) {
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
      <SizeSelectorContainer data-testid={testId}>
        {attribute.attributeItems.map((attributeItem) => {
          if (selectedAttributeItems[attribute.id] === attributeItem.id) {
            return (
              <ActiveSizeButton key={attributeItem.id}>
                {attributeItem.value}
              </ActiveSizeButton>
            );
          } else {
            return (
              <SizeButton
                onClick={() =>
                  setSelectedAttribute(attribute.id, attributeItem.id)
                }
                key={attributeItem.id}
              >
                {attributeItem.value}
              </SizeButton>
            );
          }
        })}
      </SizeSelectorContainer>
    );
  }
}
