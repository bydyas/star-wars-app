import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactFlowProvider } from "@xyflow/react";

export const Route = createRootRoute({
  component: () => (
    <div className="p-6">
      <ReactFlowProvider>
        <Outlet />
      </ReactFlowProvider>
      <TanStackRouterDevtools />
    </div>
  ),
});
