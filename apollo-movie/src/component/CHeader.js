import React ,{useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const QHeader = styled.div`
    position: fixed;
    background-color:black;
    top:0px;
    height:1.7rem;
    width:100%;
    display:inline-flex;
    z-index: 9999;
    
`;

const MenuButton = styled.a`
    cursor:pointer;
    color:white;
    margin-left:1rem;
    margin-right:1rem;
    font-size:1.2rem;
    text-decoration:none;
    border-bottom: ${props=>props.isSelected?"2px solid #33ffff ":"none"};
    
`;
const contentList =[
                    {name:"movie", button:"MOVIE", isSelected:false},
                    {name:"tvShow", button:"TVSHOW", isSelected:false},
                    {name:"search", button:"SEARCH", isSelected:false}
                ];
const initContentList =[
                    {name:"movie", button:"MOVIE", isSelected:true},
                    {name:"tvShow", button:"TVSHOW", isSelected:false},
                    {name:"search", button:"SEARCH", isSelected:false}
                ]                
                
export default ({status}) => {
    const [buttonList, setButton] = useState(contentList);
    let tempContentList = JSON.parse(JSON.stringify(contentList));
    
    return(
        <QHeader>
            {buttonList.map(item=>(
                <Link to={`/${item.name}`} style={{ textDecoration: 'none' }}>
                    <MenuButton isSelected={item.name===status} >
                        {item.button}
                    </MenuButton>
                </Link>
            ))}
        </QHeader>
    )
}