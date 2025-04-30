import ReactMarkdown from "react-markdown";

const ListBlock = ({ data }) => {
  return (
    <ul>
      {data.items.map((item, index) => (
        <li key={index}>
          <ReactMarkdown>{item}</ReactMarkdown>
        </li>
      ))}
    </ul>
  );
};
export default ListBlock;
