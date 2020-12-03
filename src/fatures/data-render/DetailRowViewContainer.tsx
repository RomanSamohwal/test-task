import React, {useCallback} from 'react';
import {DetailRowView} from '../../components/DatailRowView/DetailRowView';
import {SearchContainer} from '../search/SearchContainer';
import {Container, TableStyleContainer} from './TableStyle';

export const DetailRowViewContainerComponent = React.memo((props: any) => {

    const isSelectedHandler = useCallback(() => {
        props.setIsSelectedRow(false)
    }, [props.isSelectedRow])

    return <TableStyleContainer>
        <Container>
            <SearchContainer setRow={props.setRow} setIsSelectedRow={props.setIsSelectedRow}/>
        </Container>
        <DetailRowView closeTable={isSelectedHandler} data={props.data}/>
    </TableStyleContainer>
})