import Head from "next/head";

export type BasedHeadProps = {
  url?: string;
  type?: string;
  title?: string;
  description?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  audio?: string;
  musicDuration?: number;
  musicMusician?: string;
};

export default function BasedHead(props: BasedHeadProps) {
  // prettier-ignore
  return (
    <Head>
      <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml"  />

      {props.title === undefined ? null : (
      <title>{props.title}</title>)}
      {props.title === undefined ? null : (
      <meta key="title" name="title" content={props.title} />)}
      {props.description === undefined ? null : (
      <meta key="description" name="description" content={props.description} />)}
      {props.title === undefined ? null : (
      <meta key="og:title" property="og:title" content={props.title} />)}
      {props.description === undefined ? null : (
      <meta key="og:description" property="og:description" content={props.description} />)}

      {props.type === undefined ? null : (
      <meta key="og:type" property="og:type" content={props.type} />)}
      {props.url === undefined ? null : (
      <meta key="og:url" property="og:url" content={props.url} />)}

      {props.image === undefined ? null : (
      <meta key="og:image" property="og:image" content={props.image} />)}
      {props.imageWidth === undefined ? null : (
      <meta key="og:image:width" property="og:image:width" content={props.imageWidth + ""} />)}
      {props.imageHeight === undefined ? null : (
      <meta key="og:image:height" property="og:image:height" content={props.imageHeight + ""} />)}
      {props.imageAlt === undefined ? null : (
      <meta key="og:image:alt" property="og:image:alt" content={props.imageAlt} />)}

      {props.audio === undefined ? null : (
      <meta key="og:audio" property="og:audio" content={props.audio} />)}
      {props.musicDuration === undefined ? null : (
      <meta key="og:music:duration" property="og:music:duration" content={props.musicDuration + ""} />)}
      {props.musicMusician === undefined ? null : (
      <meta key="og:music:musician" property="og:music:musician" content={props.musicMusician} />)}
    </Head>
  );
}
