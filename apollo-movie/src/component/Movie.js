import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { gql } from "apollo-boost"
import starfull from "../image/star-full.svg"
import starhalf from "../image/star-half.svg"

const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`

/*
const Container = styled.div`
    heigth:420px;
    width: 100%;
    `;

    const Poster = styled.div`
    background-image: url(${props => props.bg});
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center center;
    border-radius: 7px;
  `;

*/

const Container = styled.div`
  height: ${(props) => (props.small ? "100px" : "150px")};
  border-radius: 7px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
  margin-bottom: 3rem;
`

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
  font-weight: 5;
  position: relative;
  transition: all 0.1s linear;
`
const Star = styled.img`
  position: relative;
  float: left;
  width: 1rem;
  height: 1rem;
`

const Rating = styled.span`
  position: absolute;
  right: 7px;
  bottom: 7px;
  opacity: 0;
  font-size: 0.8rem;
  color: white;
`

const ImgContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  margin-bottom: 5px;
  &:hover {
    ${Poster} {
      opacity: 0.2;
    }
    ${Rating} {
      opacity: 1;
    }
  }
`
const Title = styled.span`
  display: block;
  font-size: 12px;
  margin-bottom: 3px;
  color: white;
`

const Year = styled.span`
  font-size: 12px;
  color: rgba(225, 225, 225, 0.5);
  margin-bottom: 3px;
`

export default ({
  id,
  bg,
  isLiked,
  small,
  title,
  rate,
  release_date,
  status,
}) => {
  const [isMouseOn, setMouseOn] = useState(false)
  const [toggleLike] = useMutation(LIKE_MOVIE, {
    variables: { id: parseInt(id), isLiked },
  })
  const star_num = parseInt(rate / 2)
  const makeStar = (isFull, key) => <Star key={key} src={isFull} />
  let star = []

  if (rate > 1) {
    let i = 0
    for (i; i < star_num; i++) {
      star.push(makeStar(starfull, i))
    }
    if (parseInt(rate % 2) > 1) {
      star.push(makeStar(starhalf, i + 1))
    }
  }

  return (
    <Container small={small}>
      <ImgContainer>
        <Link to={`/${status}/${id}`}>
          <Poster
            onMouseOver={() => setMouseOn(true)}
            onMouseOut={() => setMouseOn(false)}
            bg={bg}
            small={small}
          ></Poster>
          <Rating>
            <span role="img" aria-label="rating">
              ⭐
            </span>
            {rate}/10
          </Rating>
        </Link>
      </ImgContainer>
      <Title>{title}</Title>
      <Year>{release_date && release_date.substring(0, 4)}</Year>
    </Container>
  )
}
