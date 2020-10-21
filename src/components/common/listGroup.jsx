import React from "react";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { selectGenreById } from "../../features/genres/genreSlice";

const ListGroupItem = ({
  itemId,
  onSelectedItemChange,
  selectedItem,
  textProperty,
}) => {
  const item = useSelector((state) => selectGenreById(state, itemId));
  return (
    <li
      onClick={() => onSelectedItemChange(item)}
      className={
        item._id === selectedItem._id
          ? "list-group-item active"
          : "clickable list-group-item"
      }
    >
      {item[textProperty]}
    </li>
  );
};

const ListGroup = ({
  // items,
  itemIds,
  textProperty,
  valueProperty,
  selectedItem,
  onSelectedItemChange,
  specialItem,
}) => {
  return (
    <ul className="list-group">
      {/* {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onSelectedItemChange(item)}
          className={
            item._id === selectedItem._id
              ? "list-group-item active"
              : "clickable list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))} */}
      <li
        onClick={() => onSelectedItemChange(specialItem)}
        className={
          specialItem._id === selectedItem._id
            ? "list-group-item active"
            : "clickable list-group-item"
        }
      >
        {specialItem[textProperty]}
      </li>
      {itemIds.map((itemId) => (
        <ListGroupItem
          key={itemId}
          itemId={itemId}
          onSelectedItemChange={onSelectedItemChange}
          selectedItem={selectedItem}
          textProperty={textProperty}
        />
      ))}
    </ul>
  );
};

ListGroup.propTypes = {
  items: PropTypes.array,
  itemIds: PropTypes.array,
  selectedItem: PropTypes.object,
  onSelectedItemChange: PropTypes.func,
};

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name",
};

export default ListGroup;
