import React from "react";
import "../assets/css/table.module.css"; //css file
function Table(props) {
  let { data } = props;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Lead Source</th>
          </tr>
        </thead>
        <tbody>
          {data.map((elem, index) =>
            index >= props.index.min && index < props.index.max ? (
              <tr key={`row-${index}`}>
                <td>{`${elem.First_Name} ${elem.Last_Name}`}</td>
                <td>{elem.Email}</td>
                <td>{elem.Phone}</td>
                <td>{elem.Company}</td>
                <td>{elem.Lead_Source}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </>
  );
}

export default Table;
