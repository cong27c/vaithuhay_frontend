const TableBlock = ({ data }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        {data[0].map((header, index) => (
          <th
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "8px",
              textAlign: "left",
              backgroundColor: "#f2f2f2",
            }}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.slice(1).map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <td
              key={cellIndex}
              style={{ border: "1px solid #ccc", padding: "8px" }}
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
