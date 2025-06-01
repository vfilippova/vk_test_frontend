import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Form } from "./Form";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
    rest.post("http://localhost:3001/data", (req, res, ctx) => {
        return res(ctx.status(201));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("добавляет новую запись через форму", async () => {
    render(<Form onAdd={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText(/name/i), {
        target: { value: "Test" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/age/i), {
        target: { value: "30" },
    });
    fireEvent.change(screen.getByPlaceholderText(/city/i), {
        target: { value: "Moscow" },
    });
    fireEvent.change(screen.getByPlaceholderText(/country/i), {
        target: { value: "Russia" },
    });

    fireEvent.click(screen.getByText(/add record/i));

    await waitFor(() =>
        expect(screen.getByText(/add record/i)).not.toBeDisabled()
    );
});
