import { createFileRoute } from "@tanstack/react-router";
import { HeroesList } from "../components/shared/HeroesList";

export const Route = createFileRoute("/")({
  component: () => <HeroesList />,
});
