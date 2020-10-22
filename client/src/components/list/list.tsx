import React from "react";

export interface ListObjectInterface {
    values: string[];
}

interface ListProps {
    header?: string;
    tableHeaders: string[];
    listObjects: ListObjectInterface[];
}

export const List = ({ header, tableHeaders, listObjects }: ListProps) => {
    return (
        <div>
            {header && <h2 className="list-header">{header}</h2>}
            <table className="list-table">
                <tr className="list-header-row">
                    {tableHeaders.map((tableHeader) => (
                        <th className="list-header-box">{tableHeader}</th>
                    ))} 
                </tr>
                {listObjects.map((listObject) => (
                    <tr className="list-row">
                        {listObject.values.map((value) => (
                        <td className="list-element-box">{value}</td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    )
}