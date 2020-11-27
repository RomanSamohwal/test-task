import React from 'react';

export const DetailRowView = (props: any) => {
    return <>
        <table className="table" style={{ cursor: "pointer" }}>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>processId</th>
                <th>status</th>
                <th onClick={()=>{props.closeTable()}}>X</th>
            </tr>
            </thead>
            <tbody>
            {props.data.map((item: any) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.processId}</td>
                    <td>{item.status}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </>
}