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
`;

const Subtitle = styled.h3`
  font-size: 35px;
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
const GetMovieInfoa = gql`
  query getMovieInfo{
    getMovieInfo{
      nowPlaying{
        popularity
        video
        vote_count
        poster_path
        id
        adult
        backdrop_path
        original_language
        original_title
        genre_ids
        title
        vote_average
        overview
        release_date
      }
      nowPopular{
        popularity
        video
        vote_count
        poster_path
        id
        adult
        backdrop_path
        original_language
        original_title
        genre_ids
        title
        vote_average
        overview
        release_date
      }
      topRated{
        popularity
        video
        vote_count
        poster_path
        id
        adult
        backdrop_path
        original_language
        original_title
        genre_ids
        title
        vote_average
        overview
        release_date
      }
      upcoming{
        popularity
        video
        vote_count
        poster_path
        id
        adult
        backdrop_path
        original_language
        original_title
        genre_ids
        title
        vote_average
        overview
        release_date
      }
      compImageURL
      orgImageURL
    }
  }
`;

export default () => {

  const {loading,data}  = (useQuery(GetMovieInfoa));
  console.log(data)
  //let { loading, data } = useQuery(GET_MOVIES,{variables:{genre}});
  


  return (
    <div>
    
    <Container>
      
      {loading && <Loader status={"movie"}/>}
      {!loading&&
      <>
      <TypeOfShow>nowPlaying</TypeOfShow><br/><br/>
      <Movies>
        {data?.getMovieInfo.nowPlaying?.map(m => (
          <Movie
            key={m.id}
            id={m.id}
            title={m.title}
            rate={m.vote_average}
            bg={data.getMovieInfo.compImageURL + m.poster_path}
            release_date={m.release_date}
            status="movie"
          />
        ))}
      </Movies>
      <TypeOfShow>nowPopular</TypeOfShow><br/><br/>
      <Movies>
        {data?.getMovieInfo.nowPopular?.map(m => (
          <Movie
            key={m.id}
            id={m.id}
            title={m.title}
            rate={m.vote_average}
            bg={data.getMovieInfo.compImageURL + m.poster_path}
            release_date={m.release_date}
            status="movie"
          />
        ))}
      </Movies>
      <TypeOfShow>topRated</TypeOfShow><br/><br/>
      <Movies>
        {data?.getMovieInfo.topRated?.map(m => (
          <Movie
            key={m.id}
            id={m.id}
            title={m.title}
            rate={m.vote_average}
            bg={data.getMovieInfo.compImageURL + m.poster_path}
            release_date={m.release_date}
            status="movie"
          />
        ))}
      </Movies>
      <TypeOfShow>upcoming</TypeOfShow><br/><br/>
      <Movies>
        {data?.getMovieInfo.upcoming?.map(m => (
          <Movie
            key={m.id}
            id={m.id}
            title={m.title}
            rate={m.vote_average}
            bg={data.getMovieInfo.compImageURL + m.poster_path}
            release_date={m.release_date}
            status="movie"
          />
        ))}
      </Movies></>}
    </Container>
    </div>
  );
};
