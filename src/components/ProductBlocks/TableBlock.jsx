const TableBlock = ({ data }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <tbody>
      {data?.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row?.map((cell, cellIndex) => (
            <td
              key={cellIndex}
              style={{
                border: "2px solid #888",
                padding: "8px",
              }}
            >
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default TableBlock;
