import React, {useState} from "react";
import {useQuery} from '@apollo/react-hooks';
import styled from 'styled-components';
import MoviesSection from "./Movies";
import TvshowSection from "./TvShow";
import CHeader from "../component/CHeader";
import { useParams } from "react-router-dom";
import Search from "./Search";

const Container = styled.div`
  background-color:black;
`;
export default () => {
  const {status} = useParams();
  
  return (
    <Container>
      <CHeader status={status} ></CHeader>
      <br/><br/><br/>
      {(status===""||status==="movie")&&
      <MoviesSection></MoviesSection>
      }
      {status==="tvShow"&&
      <TvshowSection></TvshowSection>
      }
      {status==="search"&&
      <Search></Search>
      }
    </Container>
  );
};
