import React, { Component } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  selectAllMovies,
  fetchMovies,
  selectMovieIds,
  selectPageData,
  deleteMovie,
  movieLiked,
} from "./moviesSlice";
import {
  selectAllGenres,
  fetchGenres,
  selectGenreIds,
} from "../genres/genreSlice";
// import { getMovies, deleteMovie } from "./../services/movieService";
import Paggination from "../../components/common/paggination";
import ListGroup from "../../components/common/listGroup";
import { getGenres } from "../../services/genreService";
import MoviesTable from "./moviesTable";
import SearchBox from "../../components/common/searchBox";
import { toast } from "react-toastify";
import { selectUser } from "../user/userSlice";

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => {
    dispatch(fetchMovies());
  },
  fetchGenres: () => {
    dispatch(fetchGenres());
  },
  deleteMovie: (movie) => {
    dispatch(deleteMovie(movie));
  },
  movieLiked: (movieId) => {
    dispatch(movieLiked(movieId));
  },
});

const mapStateToProps = (state) => ({
  movieStatus: state.movies.status,
  error: state.movies.error,
  movieIds: selectMovieIds(state),
  movies: selectAllMovies(state),
  selectPageData: (options) => selectPageData(state, options),
  genreIds: selectGenreIds(state),
  genres: selectAllGenres(state),
  user: selectUser(state),
});

const allGenresGenre = { _id: "", name: "All genres" };

class Movies extends Component {
  state = {
    options: {
      currentPage: 1,
      pageSize: 4,
      searchQuery: "",
      selectedGenre: allGenresGenre,
      sortColumn: { path: "title", order: "asc" },
    },
  };

  // already fetched when starting app (index.js)
  // componentDidMount() {
  //   if (this.props.movieStatus === "idle") {
  //     this.props.fetchMovies();
  //     this.props.fetchGenres();
  //   }
  // }

  handleDelete = async (movie) => {
    // const originalMovies = this.state.movies;
    // const movies = originalMovies.filter((m) => m._id !== movie._id);
    // this.setState({ movies });
    // try {
    //   await deleteMovie(movie._id);
    // } catch (ex) {
    //   if (ex.response && ex.response.status === 404)
    //     toast.error("This movie has already been deleted.");
    //   this.setState({ movies: originalMovies });
    // }
    this.props.deleteMovie(movie);
  };

  handleLike = (movie) => {
    // 1.
    // const movies = [...this.state.movies];
    // const index = movies.indexOf(movie);
    // movies[index] = { ...movie };
    // movies[index].liked = !movies[index].liked;
    // 2.
    // const movies = this.state.movies.map((m) => {
    //   if (m._id === movie._id) m.liked = !m.liked;
    //   return m;
    // });
    // this.setState({ movies });
    this.props.movieLiked(movie._id);
  };

  handlePageChange = (page) => {
    this.setState({ options: { ...this.state.options, currentPage: page } });
  };

  handleSelectedGenreChange = (genre) => {
    this.setState({
      options: {
        ...this.state.options,
        selectedGenre: genre,
        searchQuery: "",
        currentPage: 1,
      },
    });
  };

  handleSearch = (query) => {
    this.setState({
      options: {
        ...this.state.options,
        searchQuery: query,
        selectedGenre: allGenresGenre,
        currentPage: 1,
      },
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ options: { ...this.state.options, sortColumn } });
  };

  getPageData = () => {
    return this.props.selectPageData(this.state.options);
  };

  render() {
    const { movieStatus, error } = this.props;

    if (movieStatus === "pending") return <div>Loading...</div>;
    else if (movieStatus === "failed") return <div>{error}</div>;
    else if (movieStatus === "succeded") {
      const { length: count } = this.props.movieIds;

      if (!count) return <p>There are no movies in the database</p>;

      const {
        currentPage,
        pageSize,
        searchQuery,
        selectedGenre,
        sortColumn,
      } = this.state.options;

      const { user, genreIds } = this.props;

      const { totalCount, filteredIds } = this.getPageData();

      return (
        <div className="row">
          <div className="col-2">
            <ListGroup
              // items={genres}
              itemIds={genreIds}
              specialItem={allGenresGenre}
              selectedItem={selectedGenre}
              onSelectedItemChange={this.handleSelectedGenreChange}
            />
          </div>
          <div className="col">
            {user && (
              <button
                style={{ marginBottom: 10 }}
                className="btn btn-primary"
                onClick={() => this.props.history.push("/movies/new")}
              >
                New Movie
              </button>
            )}
            <p>Showing {totalCount} movies in the database</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              // movies={movies}
              movieIds={filteredIds}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Paggination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      );
    } else return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
