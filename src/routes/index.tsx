import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <main>
        <h1>Blog Admin Portal</h1>
        
      </main>
    </div>
  );
}
