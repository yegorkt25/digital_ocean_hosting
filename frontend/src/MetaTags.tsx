import * as React from "react";
import { Helmet } from "react-helmet-async";

export interface IMetaTagsProps {
  title: string;
  description: string;
}

export interface IMetaTagsState {}

export default class MetaTags extends React.Component<
  IMetaTagsProps,
  IMetaTagsState
> {
  constructor(props: IMetaTagsProps) {
    super(props);

    this.state = {};
  }

  public render() {
    const { title, description } = this.props;
    return (
      <Helmet>
        {/* Standard metadata tags */}
        <title>{title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={description} />
        <meta
          name="viewport"
          content="height=device-height,width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
        />
        {/* Open Graph tags (OG) */}
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>
    );
  }
}
