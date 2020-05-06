import React from "react";
import styled, { keyframes } from "styled-components";
import { tvshowIcon } from "./Icon";

const Animation = keyframes`
    0%{
        opacity:1
    }
    50%{
        opacity:0
    }
    100%{
        opacity:1;
    }
`;

const Loader = styled.div`
    animation:${Animation} 0.5s linear infinite;
`;

export default ({status}) => (
    <Loader>
        {status="movie"&& <movieIcon/>}
        {status="tvShow"&& <tvshowIcon/>}
    </Loader>
)