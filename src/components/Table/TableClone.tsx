import React from 'react';
import style from './Table.module.css'

export const TableClone = (props: any) => {
    return <div className={style.table}>
        <div className={style.item}>
                <div onClick={props.onSort.bind(null, 'id')} style={{width: '30%', border: '1px solid red'}}>ID</div>
                <div onClick={props.onSort.bind(null, 'name')} style={{width: '10%', border: '1px solid blue'}}>Name</div>
                <div onClick={props.onSort.bind(null, 'jobsCount')} style={{width: '10%', border: '1px solid green'}}>jobsCount</div>
                <div onClick={props.onSort.bind(null, 'startTime')} style={{width: '10%', border: '1px solid brown'}}>startTime</div>
                <div style={{width: '15%', border: '1px solid yellow'}}>Process</div>
                <div style={{width: '10%', border: '1px solid black'}}>list jobs</div>
                <div style={{width: '15%', border: '1px solid orange'}}>delete</div>
        </div>
        <div className={style.body}>
        {props.data.map((item: any) => (
               <div key={item.id} className={style.item}>
                   <div  className={style.item}>
                       <div style={{width: '30%',border: '1px solid red'}}>{item.id}</div>
                       <div style={{width: '10%', border: '1px solid blue'}}>{item.name}</div>
                       <div style={{width: '10%', border: '1px solid green'}}>{item.jobsCount}</div>
                       <div style={{width: '10%', border: '1px solid brown'}}>{item.startTime}</div>
                       <div style={{width: '15%', border: '1px solid yellow'}}>any process..</div>
                       <div onClick={() => props.onRowSelect(item.id)}
                            style={{width: '10%', border: '1px solid black'}}>show jobs</div>
                       <div style={{width: '15%', border: '1px solid orange'}}>
                         <button  onClick={()=>{props.delete(item.id)}}>delete</button>
                     </div>
                   </div>
               </div>
        ))}
        </div>
    </div>
}
