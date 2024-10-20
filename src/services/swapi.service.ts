import { Heroes } from "../lib/types";
import { handleServiceError } from "../lib/utils";
import { Service } from "./index.service";

class SwapiService extends Service {
  base_url: string = import.meta.env.VITE_SWAPI_URL;

  async getHeroes(page: number): Promise<Heroes | undefined> {
    try {
      const res = await fetch(`${this.base_url}/people/?page=${page}`);

      if (!res.ok) {
        throw new Error('Failed fetching the heroes list.')
      }

      return await res.json();
    } catch (error) {
      handleServiceError(error);
    }
  }

  async getHero(id: string): Promise<any> {
    try {
      const res = await fetch(`${this.base_url}/people/${id}`);

      if (!res.ok) {
        throw new Error(`Failed fetching the hero (id=${id}).`)
      }

      return await res.json();
    } catch (error) {
      handleServiceError(error);
    }
  }
}

export const swapiService = new SwapiService();
