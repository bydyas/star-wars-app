import { ServiceError } from "./types";

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

export const toNode = (hero: any) => {
  return ({
    id: hero.id.toString(),
    position: { x: 0, y: 0 },
    data: { label: hero.name },
  });
}
