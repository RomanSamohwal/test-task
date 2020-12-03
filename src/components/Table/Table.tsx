import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {ButtonComponent} from '../Button/Button';

export const Table = React.memo((props: any) => {
        return <table className='table table-striped' style={{cursor: "pointer"}}>
            <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'id')}>
                    ID{' '}
                    {props.sortField === "id" ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'name')}>NAME{' '}
                    {props.sortField === 'name' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'jobsCount')}>JOBS COUNT{' '}
                    {props.sortField === 'jobsCount' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'startTime')}>START TIME{' '}
                    {props.sortField === 'startTime' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'status')}>STATUS{' '}
                    {props.sortField === 'status' ? <small>{props.sort}</small> : null}
                </th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {props.data.map((item: any) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.jobsCount}</td>
                    <td>{item.startTime}</td>
                    <td>{item.status}</td>
                    <td>
                        <ButtonComponent
                            onClick={() => props.onRowSelect(item.id)}
                            text={'jobs'}
                        />
                    </td>
                    <td>
                        <ButtonComponent
                            onClick={() => {
                                props.delete(item.id)
                            }}
                            text={'delete'}
                        />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    }
)