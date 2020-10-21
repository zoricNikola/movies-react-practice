import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/movies`;

function getMovieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function getMovies() {
  const promise = await httpService.get(apiEndpoint);
  return promise;
}

export async function deleteMovie(movie) {
  return await httpService.delete(getMovieUrl(movie._id));
}

export async function getMovie(movieId) {
  return await httpService.get(getMovieUrl(movieId));
}

export async function saveMovie(movie) {
  if (movie._id) return updateMovie(movie);
  else return createMovie(movie);
}

export async function createMovie(movie) {
  return await httpService.post(apiEndpoint, movie);
}

export async function updateMovie(movie) {
  const body = { ...movie };
  delete body._id;
  return await httpService.put(getMovieUrl(movie._id), body);
}
