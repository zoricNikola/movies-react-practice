import React from "react";
import { useSelector } from "react-redux";
import { selectMovieById } from "./moviesSlice";
import _ from "lodash";

const createKey = (item, column) => {
  return item._id + (column.path || column.key);
};
const renderCell = (item, column) => {
  if (column.content) return column.content(item);

  return _.get(item, column.path);
};

const MovieRow = ({ itemId, columns }) => {
  const item = useSelector((state) => selectMovieById(state, itemId));
  return (
    <tr key={itemId}>
      {columns.map((column) => (
        <td key={createKey(item, column)}>{renderCell(item, column)}</td>
      ))}
    </tr>
  );
};

export default MovieRow;
