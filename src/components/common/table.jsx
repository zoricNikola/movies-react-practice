import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, /*data*/ dataIds }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody /*data={data}*/ dataIds={dataIds} columns={columns} />
    </table>
  );
};

export default Table;
