import React from 'react';

export const Table = React.memo((props: any) => {
        return <table className = "table table-bordered" style={{cursor: "pointer"}}>
            <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'id')}>ID</th>
                <th onClick={props.onSort.bind(null, 'name')}>Name</th>
                <th onClick={props.onSort.bind(null, 'jobsCount')}>jobsCount</th>
                <th onClick={props.onSort.bind(null, 'startTime')}>startTime</th>
                <th>Process</th>
                <th>jobs list</th>
            </tr>
            </thead>
            <tbody>
            {props.data.map((item: any) => (
                <tr key ={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.jobsCount}</td>
                    <td>{item.startTime}</td>
                    <td>{item.status}</td>
                    <td onClick={() => props.onRowSelect(item.id)}>jobs list</td>
                    <td><button onClick={()=>{props.delete(item.id)}}>delete</button> </td>
                </tr>
            ))}
            </tbody>
        </table>
    }
)