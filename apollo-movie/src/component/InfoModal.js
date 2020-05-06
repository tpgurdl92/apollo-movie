import React ,{useState} from 'react';
import styled from 'styled-components';
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import {ReactComponent as Logo}  from '../image/play.svg';

const TrailerButton = styled.a`
  font-size:17px;
  text-decoration:none;
  padding:4px;
  display:flex;
  align-items:center;
  color:white;
  &:hover{
    color:grey;
  }

`;

const StyledModal = Modal.styled`
  width: 35rem;
  height: 25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${props => props.opacity};
  transition: opacity ease 1500ms;
`;

const Trailer = styled.iframe`
  width:35rem;
  height:25rem;
  ;
`;

export default (props)=> {
    const [isOpen, setIsOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);
  
    function toggleModal(e) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  
    function afterOpen() {
      setTimeout(() => {
        setOpacity(1);
      }, 10);
    }
  
    function beforeClose() {
      return new Promise(resolve => {
        setOpacity(0);
        setTimeout(resolve, 200);
      });
    }
    
    return (
     
        <TrailerButton href="#" onClick={toggleModal}>
        <Logo style={{marginRight:'1rem'}}/>{props.name}
        <StyledModal
          isOpen={isOpen}
          afterOpen={afterOpen}
          beforeClose={beforeClose}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
          opacity={opacity}
          backgroundProps={{ opacity }}
        >
          <Trailer src={'https://www.youtube.com/embed/'+props.trailerKey+"?autoplay=1"}/>
        </StyledModal>
        </TrailerButton>
    );
  }
