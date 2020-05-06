import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {GETMOVIEDETAIL,GETTVSHOWDETAIL} from "./DetailQueries";
import DetailPresenter from "./DetailPresenter";

export default  ({status, id}) => {
    console.log(id);
    let query="";
    if(status==="movie"){
        query=GETMOVIEDETAIL;
    }else if(status==="tvShow"){
        query=GETTVSHOWDETAIL;
    }
    const {loading, data,error} = useQuery(query,{
        variables: {id}
    });
    return (
        <DetailPresenter id={id} loading={loading} data={data} status={status} />
    );
};