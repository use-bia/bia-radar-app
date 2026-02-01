import { Spinner } from "@heroui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/guides/")({
  component: RouteComponent,
  loader: () => {
    // You can add any data fetching logic here if needed in the future
    return (
      <>
        <Spinner size="md" />
      </>
    );
  },
});

function RouteComponent() {
  return <div>Hello "/dashboard/guides/"!</div>;
}
