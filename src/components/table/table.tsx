import React from "react";
import './table.css'

export type Column<T> = {
    header: string;
    accessor: keyof T;
};

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    actions?: (actRow: T) => React.ReactNode;
}

export const Table= <T extends object> (props: TableProps<T>) : React.JSX.Element => {
    return (
        <div className="table-wrapper">
            <table className="data-table">
                <thead>
                <tr>
                    {props.columns.map((col) => (
                        <th key={col.header}>{col.header}</th>
                    ))}
                    {props.actions && <th>Actions</th>}
                </tr>
                </thead>
                <tbody>
                {props.data.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                        {props.columns.map((col, colIdx) => (
                            <td key={colIdx}>{String(row[col.accessor])}</td>
                        ))}
                        {props.actions && <td>{props.actions(row)}</td>}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}