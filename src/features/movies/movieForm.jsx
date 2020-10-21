import React from "react";
import Form from "../../components/common/form";
import Joi, { errors } from "joi-browser";
import { getMovie } from "../../services/movieService";
import { getGenres } from "../../services/genreService";
import { saveMovie } from "../../services/movieService";
import { useSelector, connect } from "react-redux";
import {
  selectMovieById,
  addNewMovie,
  updateMovie,
  movieSaved,
} from "./moviesSlice";
import { selectAllGenres } from "../../features/genres/genreSlice";

const mapDispatchToProps = (dispatch) => {
  return {
    addNewMovie: (movie) => {
      dispatch(addNewMovie(movie));
    },
    updateMovie: (movie) => {
      dispatch(updateMovie(movie));
    },
    movieSaved: () => {
      dispatch(movieSaved());
    },
  };
};

const mapStateToProps = (state) => ({
  genres: selectAllGenres(state),
  selectMovieById: (movieId) => selectMovieById(state, movieId),
  saveMovieStatus: state.movies.saveMovieStatus,
});

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  // async populateGenres() {
  //   const { data: genres } = await getGenres();
  //   this.setState({ genres });
  // }

  /*async*/ populateMovie() {
    // try {
    //   const id = this.props.match.params.id;
    //   if (id === "new") return;
    //   const { data: movie } = await getMovie(id);
    //   this.setState({ data: this.mapToViewModel(movie) });
    // } catch (ex) {
    //   if (ex.response && ex.response.status === 404)
    //     this.props.history.replace("/not-found");
    // }
    const id = this.props.match.params.id;
    if (id) {
      if (id === "new") return;
      const movie = this.props.selectMovieById(id);
      this.setState({ data: this.mapToViewModel(movie) });
    }
  }

  /*async*/ componentDidMount() {
    // await this.populateGenres();
    /*await*/ this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    if (this.state.data._id) this.props.updateMovie(this.state.data);
    else this.props.addNewMovie(this.state.data);
  };

  render() {
    if (this.props.saveMovieStatus === "succeded") {
      this.props.movieSaved();
      this.props.history.push("/");
      return null;
    } else {
      const genres = this.props.genres;
      return (
        <div>
          <h1>Movie Form</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title")}
            {this.renderSelect("genreId", "Genre", genres)}
            {this.renderInput("numberInStock", "Number in Stock", "number")}
            {this.renderInput("dailyRentalRate", "Rate")}
            {this.renderButton("Save")}
          </form>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieForm);
