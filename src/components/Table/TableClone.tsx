import React from 'react';
import styled from 'styled-components';
import style from './Table.module.css'

const TableWrapper = styled.div`
    width: 90vw;
    border: 1px solid black;
`

export const TableClone = (props: any) => {
    return <TableWrapper>
        <div className={style.thead}>
            <div className={style.tr}>
                <div className={style.th}>ID</div>
                <div className={style.th}>Name</div>
                <div className={style.th}>jobsCount</div>
                <div className={style.th}>startTime</div>
                <div className={style.th}>Process</div>
                <div className={style.th}>delete</div>
            </div>
        </div>
        <div className={style.tbody}>
            <div className={style.tr}>
                <div className={style.td}>121212121</div>
                <div className={style.td}>fnwifwfwf</div>
                <div className={style.td}>10</div>
                <div className={style.td}>131231313</div>
                <div className={style.td}>seccessed</div>
                <div className={style.td}>
                    <button>delete</button>
                </div>
            </div>
        </div>
    </TableWrapper>
}
