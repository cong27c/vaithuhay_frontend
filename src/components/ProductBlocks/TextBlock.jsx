import ReactMarkdown from "react-markdown";

const TextBlock = ({ data }) => (
  <p>
    <ReactMarkdown>{data.content}</ReactMarkdown>
  </p>
);
export default TextBlock;
