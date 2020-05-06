import React from 'react';
import {useParams} from 'react-router-dom';


import DetailContainer from "../component/Detail";


export default  () => {
    const { status,id} = useParams();
    return (
      <DetailContainer status={status} id={id}/>
    );
};