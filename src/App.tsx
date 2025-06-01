import React, { useRef } from "react";
import { Form } from "./components/Form";
import { TableWithRef, TableHandle } from "./components/Table";

export default function App() {
    const tableRef = useRef<TableHandle>(null);

    return (
        <div className="p-4">
            <Form onAdd={() => tableRef.current?.reload()} />
            <TableWithRef ref={tableRef} />
        </div>
    );
}
