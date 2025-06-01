import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TableWithRef } from "./Table";
import { rest, RestRequest, ResponseComposition, RestContext } from "msw";
import { setupServer } from "msw/node";

const mockData = [
    {
        id: 1,
        name: "Alice",
        email: "a@mail.com",
        age: 25,
        city: "Moscow",
        country: "Russia",
    },
];

const server = setupServer(
    rest.get(
        "http://localhost:3001/data",
        (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
            return res(ctx.status(200), ctx.json(mockData));
        }
    )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("загружает и отображает данные в таблице", async () => {
    render(<TableWithRef />);

    await waitFor(() => {
        expect(screen.getByText("Alice")).toBeInTheDocument();
    });

    expect(screen.getByText("a@mail.com")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("Moscow")).toBeInTheDocument();
    expect(screen.getByText("Russia")).toBeInTheDocument();
});
