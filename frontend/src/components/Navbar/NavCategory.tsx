import * as React from "react";
import { NavButton, ActiveButton } from "./styles/NavStyles";
import { Category } from "../../Types";

interface INavCategoryProps {
  setSelectedCategory: (category: Category, fetchInfo: boolean) => void;

  category: Category;
  isSelected: boolean;
}

interface INavCategoryState {}

export default class NavCategory extends React.Component<
  INavCategoryProps,
  INavCategoryState
> {
  constructor(props: INavCategoryProps) {
    super(props);

    this.state = {};
  }

  setCategory = () => {
    this.props.setSelectedCategory(this.props.category, true);
  };

  public render() {
    if (this.props.isSelected) {
      return (
        <ActiveButton>
          {this.props.category.name.toUpperCase()}
        </ActiveButton>
      );
    }
    return (
      <NavButton onClick={this.setCategory}>
        {this.props.category.name.toUpperCase()}
      </NavButton>
    );
  }
}
