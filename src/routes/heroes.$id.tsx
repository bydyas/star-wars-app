import { useEffect, useState } from "react";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Background, Controls, ReactFlow, useReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { swapiService } from "../services/swapi.service";
import { toNode } from "../lib/utils";
import { Edge, Film, Person } from "../lib/types";

const path = "/heroes/$id";

export const Route = createFileRoute(path)({
  loader: async ({ params }) => {
    const person: Person = await swapiService.getHero(params.id);
    const personNode = toNode({ obj: person });
    return [personNode];
  },
  component: () => {
    const loaderData = useLoaderData({ from: path });
    const [nodes, setNodes] = useState(loaderData);
    const [edges, setEdges] = useState<Edge[]>([]);
    const reactFlowInstance = useReactFlow();

    useEffect(() => {
      reactFlowInstance.setCenter(50, 50, { zoom: 1 });
    }, [reactFlowInstance]);

    const handleNodeClick = async (e: any, node: any) => {
      const type = node.id.split("-")[0];
      if (type === "hero") {
        const films: Film[] = await Promise.all(
          node.data.films.map((v: number) => swapiService.getFilm(v))
        );

        const filmNodes = films.map((v, i) =>
          toNode({ obj: v, position: { x: i * 200 - 100, y: 100 } })
        );

        setNodes((prev) => [...prev, ...filmNodes]);

        const newEdges = filmNodes.map((v) => ({
          id: `${loaderData[0].id}-${v.id}`,
          source: loaderData[0].id,
          target: v.id,
        }));
        setEdges(newEdges);
      }

      if (type === "film") {
        const starships: any[] = await Promise.all(
          node.data.starships.map((v: number) => swapiService.getStarship(v))
        );

        const starshipsNodes = starships.map((v, i) => {
          if (v) {
            return toNode({
              obj: v,
              position: { x: node.posisiton.x, y: 100 * i + node.posisiton.y },
            });
          }
          return toNode({ obj: {} });
        });

        setNodes((prev) => [...prev, ...starshipsNodes]);
      }
    };

    return (
      <div className="h-screen">
        <ReactFlow nodes={nodes} onNodeClick={handleNodeClick} edges={edges}>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    );
  },
});
