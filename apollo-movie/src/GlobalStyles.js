import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset}
    *{
        box-sizing:border-box;
    }
    body{
        background-color:#040404;
        color:white;
    }
`