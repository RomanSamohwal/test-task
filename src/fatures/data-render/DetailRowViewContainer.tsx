import React, {useCallback} from 'react';
import {DetailRowView} from '../../components/DatailRowView/DetailRowView';

export const DetailRowViewContainer = React.memo((props: any) => {

    const isSelectedHandler = useCallback(() => {
        props.setIsSelectedRow(false)
    }, [props.isSelectedRow])

    return <>
        <DetailRowView closeTable={isSelectedHandler} data={props.data}/>
    </>
})