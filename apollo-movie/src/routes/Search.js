import React, {useState, useRef} from "react";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from '../component/Movie';

const SearchInput = styled.input`
    border:none;
    height:3rem;
    width:100%;
    font-size:25px;
    background-color:black;
    color:white;
    font-weight:400;
`;

const Container = styled.div`
  margin:0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TypeOfShow = styled.p`
  
  color:white;
  font-size:1.2rem;
  margin-bottom:2.2rem;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
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

const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 25px;
  width: 90%;
  position: relative;
  top: -50px;
  margin-bottom:2rem;
`;

const SEARCH = gql`
 query search($keyword:String!){
    search(keyword:$keyword){
        movieList{
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
        tvShowList{
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

export default () =>{
    const [keyword, setKeyword] = useState("");
    const {loading, data,error,refetch}=useQuery(SEARCH,{skip:keyword==="",variables:{keyword}});
   

   
    return(
        <>
            <SearchInput onChange={(e)=>setKeyword(e.target.value)} placeholder="Search Movie Or TV Show"/>
            <Container>
                {!loading&&data&&<>
                <TypeOfShow>Movies</TypeOfShow><br/><br/>
                <Section>
                {data?.search.movieList?.map(m => (
                        <Movie
                            key={m.id}
                            id={m.id}
                            title={m.title}
                            rate={m.vote_average}
                            bg={data.search.compImageURL + m.poster_path}
                            release_date={m.release_date}
                            status="movie"
                        />
                ))}
                </Section>
                <TypeOfShow>TVShow</TypeOfShow><br/><br/>
                <Section>
                    {data?.search.tvShowList?.map(m => (
                            <Movie
                                key={m.id}
                                id={m.id}
                                title={m.title}
                                rate={m.vote_average}
                                bg={data.search.compImageURL + m.poster_path}
                                release_date={m.release_date}
                                status="movie"
                            />
                    ))}
                </Section>
                </>}

      </Container>
        </>
    );
}