import { useEffect } from "react";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Background, ReactFlow, useReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { swapiService } from "../services/swapi.service";
import { toNode } from "../lib/utils";

const path = "/heroes/$id";

export const Route = createFileRoute(path)({
  loader: async ({ params }) => swapiService.getHero(params.id),
  component: () => {
    const loaderData = useLoaderData({ from: path });
    const reactFlowInstance = useReactFlow();

    useEffect(() => {
      reactFlowInstance.setCenter(50, 50, { zoom: 1 });
    }, [reactFlowInstance]);

    return (
      <div className="h-screen">
        <ReactFlow nodes={[toNode(loaderData)]}>
          <Background />
        </ReactFlow>
      </div>
    );
  },
});
