import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "@/components/ui/Modal";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

jest.mock("lucide-react", () => ({
  X: () => <span data-testid="x-icon">X</span>,
}));

describe("Modal Component", () => {
  it("renders children when open", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Hidden Content</p>
      </Modal>
    );
    expect(screen.queryByText("Hidden Content")).not.toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="My Modal">
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByText("My Modal")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    const closeBtn = screen.getByTestId("x-icon").closest("button");
    if (closeBtn) fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });
});
