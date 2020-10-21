import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/genres`;

export async function getGenres() {
  const promise = await httpService.get(apiEndpoint);
  return promise;
}

export async function getGenre(genreId) {
  return await httpService.get(`${apiEndpoint}/${genreId}`);
}
