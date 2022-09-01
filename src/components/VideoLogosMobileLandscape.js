import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { getSrc } from "gatsby-plugin-image"
import { motion} from "framer-motion"

const StyledSectionLogoScroll = styled.section`
  position: relative;
  z-index: -2;
  background: #161616;
  /* background: white; */
  padding-bottom: 0;
  .video-end {
    height: 1px;
    transform: translateY(-100vh);
    z-index: 999;
  }
  .sticky-title {
    position: sticky;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    /* top: 10%; */
    top: 5%;
    height: 5rem;
    /* padding-top: 5rem; */
    margin-top: 8rem;
    /* opacity: 0; */
    /* transition: opacity 0.3s; */
    h3 {
      font-size: var(--h3-banner-clamp);
    }
    .shimmer-custom {
      display: inline;
      text-align: center;
      color: rgba(255, 255, 255, 0.1);
      background: linear-gradient(
        140deg,
        rgba(255, 185, 4, 0.5) 35%,
        rgba(255, 255, 255, 0.6) 50%,
        rgba(255, 185, 4, 0.5) 65% 100%
      );
      background-size: 600% 400%;
      /* animation-name: shimmer; */
      /* animation-duration: 2s; */
      -webkit-background-clip: text;
      -moz-background-clip: text;
      background-clip: text;
      animation: shimmer-custom 0.1s infinite;
      animation-play-state: paused;
      animation-delay: calc(var(--scroll) * -0.4s);
      /* animation-iteration-count: 1; */
      background-repeat: no-repeat;
      background-position: 0 0;
      background-color: rgba(255, 185, 4, 1);
    }

    @keyframes shimmer-custom {
      0% {
        background-position: top left;
      }
      100% {
        background-position: top right;
      }
    }
  }
  canvas {
    margin: 0 auto;
    /* padding-top: 1em; */
    position: sticky;
    z-index: -1;
    top: 15%;
    display: block;
  }

  /* @media screen and (max-width: 600px) {
    .sticky-title {
      margin-bottom: 4rem;
    }
  } */
`

const ImageCanvas = ({ scrollHeight, numFrames, width, height }) => {
  const { allFile } = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "framesv2desktop" } }) {
        nodes {
          base
          childImageSharp {
            gatsbyImageData(
              webpOptions: { quality: 55 }
              quality: 50
              width: 500
            )
          }
        }
      }
    }
  `)
  const canvasRef = useRef(null)
  const [images, setImages] = useState([])
  const [frameIndex, setFrameIndex] = useState(0)
  function getCurrentFrame(index) {
    const imageFrame = allFile.nodes.find(
      (frame) => frame.base === `${index.toString().padStart(5, "0")}.webp`
    )
    const srcImage = getSrc(imageFrame)
    return srcImage
  }
  function preloadImages() {
    for (let i = 1; i <= numFrames; i++) {
      const img = new Image()
      const imgSrc = getCurrentFrame(i)
      img.src = imgSrc
      setImages((prevImages) => [...prevImages, img])
    }
  }

  const handleScroll = () => {
    const scrollFraction =
      (window.scrollY - window.innerHeight) / (scrollHeight - window.innerHeight + 1100)
      // window.innerWidth < 600
      //   ? (window.scrollY - window.innerHeight - 150) /
      //     (scrollHeight - window.innerHeight)
      //   : (window.scrollY - window.innerHeight * 2.1) /
      //     (scrollHeight - window.innerHeight + 1000)
    const index = Math.min(numFrames - 1, Math.ceil(scrollFraction * numFrames))

    if (index <= 0 || index > numFrames) {
      return
    }

    setFrameIndex(index)
  }

  const renderCanvas = () => {
    const context = canvasRef.current.getContext("2d")
    context.canvas.width = width
    context.canvas.height = height
  }

  useEffect(() => {
    preloadImages()
    renderCanvas()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || images.length < 1) {
      return
    }

    const context = canvasRef.current.getContext("2d")
    let requestId

    const render = () => {
      context.drawImage(images[frameIndex], 0, 0)
      requestId = requestAnimationFrame(render)
    }

    render()

    return () => cancelAnimationFrame(requestId)
  }, [frameIndex, images])

  return (
    <div style={{ height: scrollHeight }}>
      <canvas ref={canvasRef} />
    </div>
  )
}

const VideoLogosMobile = ({ isBottom }) => {
  //   const { isVideoTitleHidden, setIsVideoTitleHidden} = useContext(Context)
  //   const [isMobileLandscape, setIsMobileLandscape] = useState(false)
  //   const [isMobilePortrait, setIsMobilePortrait] = useState(false)
  //   const [width, setWidth] = useState()
  //   const [height, setHeight] = useState(700)
  const [scrollHeight, setScrollHeight] = useState(8000)

  const wrapperVariants = {
    initial: {
      opacity: 0,
      transition: { duration: .5 }
    },
    animate: {
      opacity: 1,
      transition: { duration: .5, staggerChildren: .1 }
    },
    exit: {
      opacity: 0,
      transition: {  duration: 1 }
    }
  }
  return (
    <>
      {!isBottom && (
        <motion.div
          key="video-logos"
          // transition={{ duration: 3}}
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // exit={{ opacity: 0 }}
          {...wrapperVariants}
        >
          <div>
            <StyledSectionLogoScroll>
              <div className="sticky-title" id="videoscroll-title">
                <h3>
                  delivered 700 <span className="custom">custom projects</span>{" "}
                  for
                </h3>
              </div>
              <div id="video-scroll">
                <ImageCanvas
                  scrollHeight={4500}
                  width="500"
                  height="230"
                  numFrames={485}
                  id="video-scroll"
                />
              </div>
            </StyledSectionLogoScroll>
          </div>
        </motion.div>
      )}
      {/* </> */}
    </>
  )
}

export default VideoLogosMobile
