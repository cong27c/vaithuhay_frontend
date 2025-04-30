const ImageBlock = ({ data }) => (
  <img src={data.src} alt={data.alt || ""} style={{ width: "100%" }} />
);
export default ImageBlock;
