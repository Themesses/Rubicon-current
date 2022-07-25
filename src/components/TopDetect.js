import React, {useEffect, useState} from "react"
import styled from "styled-components";
import { useInView } from "react-intersection-observer";


const StyledTop = styled.div`
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 1px;
 z-index: 999;
`
const TopDetect = ({ setIsTop }) => {
    const [ref, inView] = useInView({
        threshold: 1,
        // triggerOnce: true,
    })
    useEffect(() => {
        if (inView) {
           setIsTop(true)
        }
    }, [inView])
    return (
        <StyledTop className="top-detect" ref={ref}/>
    )
}

export default TopDetect;