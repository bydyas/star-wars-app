import { Film, Person, ServiceError, Starship } from "./types";

export const handleServiceError = (error: Error | any): ServiceError => {
  if (error instanceof Error) {
    return ({
      isError: true,
      message: error.message,
    });
  }

  console.error(error);
  return ({
    isError: true,
    message: 'Unexpected error',
  });
}

export const toNode = ({ 
  obj, 
  position = { x: 0, y: 0} 
}: { 
  obj: Person | Film | Starship | any, 
  position?: { x: number, y: number}
}) => {
  if ("gender" in obj) {
    return ({
      id: `hero-${obj.id}`,
      position,
      data: { label: obj.name, films: obj.films },
    });
  }

  if ("director" in obj) {
    return ({
      id: `film-${obj.id}`,
      position,
      data: { label: obj.title, starships: obj.starships },
    });
  }

  if ("model" in obj) {
    return ({
      id: `starship-${obj.id}`,
      position,
      data: { label: `${obj.name} (${obj.model})` },
    });
  }

  return {
    id: 'error',
    position: { x: 0, y: 0 },
    data: { label: 'Error' },
    zIndex: -1,
  };
}
