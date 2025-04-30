import ImageBlock from "./ImageBlock";
import ListBlock from "./ListBlock";
import SubTitleBlock from "./SubTitleBlock";
import TableBlock from "./TableBlock";
import TextBlock from "./TextBlock";
import VideoBlock from "./VideoBlock";

const BlockRenderer = ({ blocks }) => {
  return blocks.map((block, index) => {
    switch (block.type) {
      case "text":
        return <TextBlock key={index} data={block} />;
      case "subTitle":
        return <SubTitleBlock key={index} data={block} />;
      case "image":
        return <ImageBlock key={index} data={block} />;
      case "video":
        return <VideoBlock key={index} data={block} />;
      case "list":
        return <ListBlock key={index} data={block} />;
      case "table":
        return <TableBlock key={index} data={block.data} />;
      default:
        return null;
    }
  });
};

export default BlockRenderer;
