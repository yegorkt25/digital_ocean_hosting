import * as React from "react";
import {
  PhotoGalleryContainer,
  ThumbnailsContainer,
  Thumbnail,
  MainImageContainer,
  MainImage,
  PrevButton,
  NextButton,
} from "./styles/ProductDetailsStyles";

export interface IPhotoGalleryProps {
  images: { imageUrl: string }[];
}

export interface IPhotoGalleryState {
  currentImageIndex: number;
}

export default class PhotoGallery extends React.Component<
  IPhotoGalleryProps,
  IPhotoGalleryState
> {
  constructor(props: IPhotoGalleryProps) {
    super(props);

    this.state = { currentImageIndex: 0 };
  }

  handleThumbnailClick = (index: number) => {
    this.setState({ currentImageIndex: index });
  };

  handlePrevClick = () => {
    this.setState({
      currentImageIndex:
        this.state.currentImageIndex === 0
          ? this.props.images.length - 1
          : this.state.currentImageIndex - 1,
    });
  };

  handleNextClick = () => {
    this.setState({
      currentImageIndex:
        this.state.currentImageIndex === this.props.images.length - 1
          ? 0
          : this.state.currentImageIndex + 1,
    });
  };

  public render() {
    return (
      <PhotoGalleryContainer data-testid="product-gallery">
        <ThumbnailsContainer>
          {this.props.images.map((image, index) => (
            <Thumbnail
              key={index}
              src={image.imageUrl}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => this.handleThumbnailClick(index)}
            />
          ))}
        </ThumbnailsContainer>
        <MainImageContainer>
          <PrevButton onClick={this.handlePrevClick}>❮</PrevButton>
          <MainImage
            src={this.props.images[this.state.currentImageIndex].imageUrl}
            alt={`Image ${this.state.currentImageIndex + 1}`}
          />
          <NextButton
            className="nav-button next"
            onClick={this.handleNextClick}
          >
            ❯
          </NextButton>
        </MainImageContainer>
      </PhotoGalleryContainer>
    );
  }
}
