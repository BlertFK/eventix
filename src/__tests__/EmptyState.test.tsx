import { render, screen } from "@testing-library/react";
import EmptyState from "@/components/ui/EmptyState";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe("EmptyState Component", () => {
  it("renders title and description", () => {
    render(
      <EmptyState
        icon={<span data-testid="icon">Icon</span>}
        title="No items found"
        description="Try a different search"
      />
    );
    expect(screen.getByText("No items found")).toBeInTheDocument();
    expect(screen.getByText("Try a different search")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    render(
      <EmptyState
        icon={<span data-testid="icon">Icon</span>}
        title="Empty"
        description="Nothing here"
      />
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders action button when actionLabel and actionHref are provided", () => {
    render(
      <EmptyState
        icon={<span>Icon</span>}
        title="Empty"
        description="Nothing"
        actionLabel="Browse Events"
        actionHref="/events"
      />
    );
    expect(screen.getByText("Browse Events")).toBeInTheDocument();
  });

  it("does not render action button when props are missing", () => {
    render(
      <EmptyState
        icon={<span>Icon</span>}
        title="Empty"
        description="Nothing"
      />
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
