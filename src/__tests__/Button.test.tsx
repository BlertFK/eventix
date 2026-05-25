import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/ui/Button";

describe("Button Component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Submit</Button>);
    fireEvent.click(screen.getByText("Submit"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText("Disabled")).toBeDisabled();
  });

  it("applies fullWidth class when prop is set", () => {
    render(<Button fullWidth>Full</Button>);
    expect(screen.getByText("Full")).toHaveClass("w-full");
  });

  it("renders with secondary variant styling", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByText("Secondary");
    expect(btn.className).toContain("border");
  });
});
