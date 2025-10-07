import ReactMarkdown from "react-markdown";

const TextBlock = ({ data }) => <ReactMarkdown>{data.content}</ReactMarkdown>;
export default TextBlock;
