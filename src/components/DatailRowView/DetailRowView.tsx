import React from 'react';
import {ButtonComponent} from '../Button/Button';

export const DetailRowView = React.memo((props: any) => {
    return <>
        <table className="table" style={{cursor: "pointer"}}>
            <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PROCESS ID</th>
                <th>STATUS</th>
                <th>
                    <ButtonComponent
                        onClick={() => {
                            props.closeTable()
                        }}
                        text={'close'}/>
                </th>
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
})