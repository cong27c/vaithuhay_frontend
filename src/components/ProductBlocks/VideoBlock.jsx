const VideoBlock = ({ data }) => (
  <iframe
    width="100%"
    height="400"
    src={data.src}
    title="Video sản phẩm"
    frameBorder="0"
    allowFullScreen
  />
);
export default VideoBlock;
