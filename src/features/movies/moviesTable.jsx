import React, { Component } from "react";
import { Link } from "react-router-dom";
import LikeButton from "../../components/common/likeButton";
import Table from "../../components/common/table";
import auth from "../../services/authService";
import { selectUser } from "../user/userSlice";
import { useSelector, connect } from "react-redux";

const mapStateToProps = (state) => ({
  user: selectUser(state),
});

class MoviesTable extends Component {
  state = {
    columns: [
      {
        path: "title",
        label: "Title",
        content: (movie) => (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ),
      },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rate" },
      {
        key: "like",
        content: (movie) => (
          <LikeButton
            liked={movie.liked}
            onClick={() => this.props.onLike(movie)}
          />
        ),
      },
    ],
  };

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  componentDidMount() {
    const user = this.props.user;
    if (user && user.isAdmin) {
      const columns = [...this.state.columns, this.deleteColumn];
      this.setState({ columns });
    }
  }

  constructor() {
    super();
    // const user = auth.getCurrentUser();
    // if (user && user.isAdmin) {
    //   this.columns.push(this.deleteColumn);
  }

  render() {
    const { /*movies,*/ movieIds, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.state.columns}
        // data={movies}
        dataIds={movieIds}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default connect(mapStateToProps, null)(MoviesTable);
