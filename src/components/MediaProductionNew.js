import React, {  useEffect, useRef } from "react"
import { ParallaxBanner } from "react-scroll-parallax"
import {  StaticImage } from "gatsby-plugin-image"
import video from "../assets/video/waterfall.mp4"
import videoLarge from "../assets/video/waterfall.mp4"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"
import useDeviceDetect from "./hooks/useDeviceDetect"

const StyledBanner = styled.div`
  display: flex;
  position: relative;
  .main-parallax-banner {
    aspect-ratio: 2.6/1;
  }
  .shimmer-rubicon {
    display: inline;
    text-align: center;
    color: rgba(255, 255, 255, 0.1);
    background: linear-gradient(
      140deg,
      rgba(255, 185, 4, 0.7) 35%,
      rgba(255, 255, 255, 0.7) 50%,
      rgba(255, 185, 4, 0.7) 65% 100%
    );
    background-size: 500% 350%;
    animation: shimmer 0.09s infinite;
    animation-play-state: paused;
    animation-delay: calc(var(--scroll) * -0.9s);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-color: rgba(255, 185, 4, 1);
  }
  @keyframes shimmer {
    0% {
      background-position: top right;
    }
    100% {
      background-position: top left;
    }
  }
  span {
    color: var(--gold);
    /* background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */
  }

  .parallax-content-wrapper {
    display: flex;
    position: absolute;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .headline-wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding-left: 4em;
    /* border: 1px solid red; */
  }
  h2 {
    font-size: clamp(1.5rem, 2.8vw, 4rem);
    display: block;
    margin-bottom: 1em;
    line-height: 1.3;
  }
  p {
    font-size: clamp(1.5rem, 2vw, 2.6rem);
    max-width: 100%;
    margin: 0;
  }
  .background-fallback-image {
    /* height: 100%; */
    /* width: 100%;
    aspect-ratio: auto 2.2/1; */
  }
  .parallax-video {
    width: 100%;
  }
  .gradient-overlay {
    position: absolute;
    inset: -0.1em 0 -0.1em 0;
    background: transparent;
    z-index: -1;
    background: linear-gradient(90deg, #161616 25%, rgba(22, 22, 22, 0) 60%),
      linear-gradient(180deg, #161616 1%, rgba(22, 22, 22, 0) 30%),
      linear-gradient(0deg, #161616 4%, rgba(22, 22, 22, 0) 25%);
  }
  .foreground-image {
    display:none;
    position: relative;
    transform: translateY(-10%);
  }
  .sphere-wrapper {
    position: absolute;
    top: 30.9%;

    left: 31.1%;
    width: 20.5vw;
    height: 20.5vw;

    opacity: 100%;
    z-index: -1;

    /* clip-path: circle(50%);
    border-radius: 50%; */

    // make a circle for the sphere
    mask-image: radial-gradient(circle, white 100%, black, 100%);
    -webkit-mask-image: -webkit-radial-gradient(circle, white 100%, black 100%);
    transform: rotate(0.000001deg);
    -webkit-transform: rotate(0.000001deg);
    border-radius: 50% !important;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
  }
  .flare {
    display: none;
    position: absolute;
    left: 35%;
    top: 50%;
    width: 10%;
    background: rgba(255, 255, 250, .7);
    transform: scale(2.1);
    box-shadow: 0 0 8px 5px rgba(255, 255, 250, .8);
    transition: opacity 0.5s ease-in-out;
    &:after,
    &:before {
      content: " ";
      position: absolute;
      left: 20%;
      top: -2px;
      width: 3px;
      height: 3px;
      background: rgba(255, 255, 250, 1);
      border-radius: 50%;
      box-shadow: 0 0 15px 20px rgba(255, 255, 250, 1),
        0 0 2px 7px rgba(255, 255, 250, 0.3);
    }
    &:before {
      width: 10%;
      left: 10%;
      box-shadow: 0 0 10px 5px rgba(255, 255, 250, 1);
    }
  }
  @media screen and (max-width: 920px) {
    .main-parallax-banner {
      aspect-ratio: 2.8/1;
    }
  }
  @media screen and (max-width: 520px) {
    .main-parallax-banner {
      aspect-ratio: 2.6/1;
    }
  }
`

const MediaProduction = () => {
  const { ref, inView } = useInView({
    threshold: 1,
    rootMargin: "-32% 0px -32% 0px",
  })
  
  const flairRef = useRef(null)
  useEffect(() => {
    const flair = flairRef.current
      if (inView && flair) {
        flair.style.opacity = "1"
      }
      if (!inView && flair) {
        flair.style.opacity = "0"
      }

  }, [inView, flairRef]);


  const background = {
    translateY: [-30, -5],
    children: (
      <video
      autoPlay
        loop
        muted
        playsInline
        src={videoLarge}
        className="parallax-video"
        onPlay={() => {
            const playButton = document.getElementsByClassName("foreground-image");
            if(playButton) playButton[0].style.display = "flex"
            flairRef.current.style.display = "inline-block"
        }}
        />      
    ),
  }

  const handForeground = {
    translateY: [0, 19],
    translateX: [21, 21],
    rotate: [-5, 5],
    scale: [0.85, 0.85],
  }
    
  const foreground = { 
    translateY: [0, 19],
    translateX: [21, 21],
    rotate: [-5, 5],
    scale: [0.85, 0.85],
  }
  const gradientOverlay = {
    expanded: false,
    children: <div className="gradient-overlay" />,
  }

  const headline = {
    translateY: [2, -2],
  }

  // adgjust parallax banner x rotation based on device type
  const { isMac } = useDeviceDetect()
  return (
    <StyledBanner>
      <ParallaxBanner
        disabled={true}
        layers={[
          {
            ...background,
            rotateX: isMac && [-35, 35],
          },
          {
            ...foreground,
            children: (
              <>
                <div className="sphere-wrapper">
                    <video
                      style={{
                        transform: "rotate(180deg) translateX(50%)",
                      }}
                      width="500%"
                      muted
                      autoPlay
                      loop
                      playsInline
                      src={video}                      
                    />
                  <div className="flare" ref={flairRef}/>
                </div>                
              </>
            ),
          },
          {
            ...handForeground,
            children: (
              <StaticImage
                  className="foreground-image"
                  src="../assets/images/globeandhand4.webp"
                  placeholder="none"
                  alt="hand holding a glass globe"
              />           
            )
          },
          gradientOverlay,
          {
            ...headline,
            children: (
              <div className="headline-wrapper">
                <h2>
                  media production
                  <br />
                  for quality clients
                </h2>
                <p ref={ref}>
                  <span>Rubicon</span>, your
                  limitless source
                  <br />
                  for creative audio/visuals.
                </p>
              </div>
            ),
          },
        ]}
        className="main-parallax-banner"
      />
    </StyledBanner>
  )
}

export default MediaProduction