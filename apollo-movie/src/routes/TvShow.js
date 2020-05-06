import React, {useState} from "react";
import { gql } from "apollo-boost";
import {useQuery} from '@apollo/react-hooks';
import Movie from '../component/Movie';
import styled from "styled-components";
import Loader from "../component/Loader";



const Container = styled.div`
  margin:0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;



const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
  color:"white";
`;

const Subtitle = styled.h3`
  font-size: 35px;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 25px;
  width: 90%;
  position: relative;
  top: -50px;
  margin-bottom:2rem;
`;

const genreList =[
  'ALL'
 ,'COMEDY'
 ,'SCI-FI'
 ,'HORROR'
 ,'ROMANCE'
 ,'ACTION'
 ,'THRILLER'
];

 const GenreSelector = () =>{
   const [value, setValue] = useState("ALL");
   const optionList = genreList.map((item)=>{
    return(<option value={item}>{item}</option>);
   });

   const onValueChange = (e) => {
     setValue(e.value);
   }
  return {selector:(<select value={value} onChange={(e)=>{onValueChange(e)}}>{optionList}</select>)};
 }
const TypeOfShow = styled.p`
  
  color:white;
  font-size:1.2rem;
  margin-bottom:2.2rem;
`;

const getTvshowInfo = gql`
  query getTvshowInfo{
        getTvshowInfo{
            tvOnTheAir{
                id
                name
                vote_average
                original_name
                overview
                first_air_date
                poster_path
                backdrop_path
                original_language
                genres{
                  id 
                  name
                }
            }
            tvPopular{
                id
                name
                vote_average
                original_name
                overview
                first_air_date
                poster_path
                backdrop_path
                original_language
                genres{
                  id 
                  name
                }
            }
            tvTopRated{
                id
                name
                vote_average
                original_name
                overview
                first_air_date
                poster_path
                backdrop_path
                original_language
                genres{
                  id 
                  name
                }
            }
            compImageURL
            orgImageURL
        }
  }
`;

export default () => {

  const {loading,data}  = (useQuery(getTvshowInfo));
  console.log(data)


  return (
    <div>
    
    <Container>
      
      {loading && <Loader status={"tvShow"}/>}
      {!loading&&<>
      <TypeOfShow>onAir</TypeOfShow><br/><br/>
      <Movies>
        {data?.getTvshowInfo.tvOnTheAir?.map(m => (
          <Movie
            key={m.id}
            id={m.id}
            title={m.name}
            rate={m.vote_average}
            bg={data.getTvshowInfo.compImageURL + m.poster_path}
            release_date={m.first_air_date}
            status="tvShow"
          />
        ))}
      </Movies>
      <TypeOfShow>nowPopular</TypeOfShow><br/><br/>
      <Movies>
        {data?.getTvshowInfo.tvPopular?.map(m => (
          <Movie
            key={m.id}
            id={m.id}
            title={m.name}
            rate={m.vote_average}
            bg={data.getTvshowInfo.compImageURL + m.poster_path}
            release_date={m.first_air_date}
            status="tvShow"
          />
        ))}
      </Movies>
      <TypeOfShow>topRated</TypeOfShow><br/><br/>
      <Movies>
        {data?.getTvshowInfo.tvTopRated?.map(m => (
          <Movie
            key={m.id}
            id={m.id}
            title={m.name}
            rate={m.vote_average}
            bg={data.getTvshowInfo.compImageURL + m.poster_path}
            release_date={m.first_air_date}
            status="tvShow"
          />
        ))}
      </Movies>
      </>}
    </Container>
    </div>
  );
};
