import React from 'react';
import styled from 'styled-components';
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import InfoModal from '../InfoModal';
import CHeader from "../CHeader";
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';


const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display:flex;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display:  flex;
  align-items:center;
  justify-content:center;
  
`;
const ImageContainer = styled.div`
  
  background-position:50% 50%;
  background-repeat: no-repeat;
  background-size:100% 100%;
  filter: blur(3px);
  opacity: 0.5;
  background-image: url(${props=>props.bg?props.bg:""});
  width:100%;
  height:100%;
  position: absolute;
`;

const Item = styled.div`
  margin:3rem;
  flex: ${props=>props.flex};
`;
const Poster = styled.img`
  width:20rem;
  height:28rem;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 60%;
`;

const Title = styled.h1`
  font-size: 45px;
  font-weight: 600;
  margin-bottom: 15px;
`;
const Summary = styled.div`
  align-items:center;
`;
const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
    width: 75%;
    font-size: 17px;
    line-height: 1.5;
    padding:10px;
`;

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${props => props.opacity};
  transition: opacity ease 1500ms;
`;


export default  ({loading,data,status}) => {
    let content;
    let video;
    let orgImageURL;
    let compImageURL;
    if(!loading){
      if(status==="movie"){
        content = data.getDetail.movie;
        video = data.getDetail.video;
        orgImageURL= data.getDetail.orgImageURL;
        compImageURL = data.getDetail.orgImageURL;
      }else if(status==="tvShow"){
        content = data.getTvshowDetail.tvShow;
        video = data.getTvshowDetail.video;
        orgImageURL= data.getTvshowDetail.orgImageURL;
        compImageURL = data.getTvshowDetail.orgImageURL;
        console.log(content);
        console.log(video)
      }
    }
    
    return (
      <ModalProvider backgroundComponent={FadingBackground}>
        <Wrapper>
            <CHeader ></CHeader>
            {!loading &&
            <>
            <ImageContainer bg={orgImageURL+content.backdrop_path}/>
            <Container bg={orgImageURL+content.backdrop_path}>
              <Item flex={1}>
                {<Poster src={compImageURL+content.poster_path}/>} 
              </Item>
              <Item flex={2}>
                <Title>
                  {content.title}
                </Title>
                <Summary>
                  {status==="movie"?content.release_date.substring(0,4):content.first_air_date}
                  ・{content.runtime+" min"}
                  <Tooltip title={content.vote_average} placement="top">
                  <span>
                  ・<Rating name="read-only"  precision={0.1} value={content.vote_average/2} readOnly />
                  </span>
                  </Tooltip>
                  ・{content.genres.map(genre=>"   "+ genre.name+"/")}
                </Summary>
                <Description>
                  {content.overview}
                </Description>
                {video.map(item=><InfoModal key={item.id} name={item.name} trailerKey={item.key}/>)}
              </Item>
          </Container></>}
        </Wrapper>
      </ModalProvider>

    );
};