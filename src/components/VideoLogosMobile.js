import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { getSrc } from "gatsby-plugin-image"
import { motion, AnimatePresence } from "framer-motion"

const StyledSectionLogoScroll = styled.section`
  position: relative;
  z-index: -2;
  background: #161616;
  /* background: white; */
  padding-bottom: 0;
  /* .video-end {
    height: 1px;
    transform: translateY(-100vh);
    z-index: 999;
  } */

  .sticky-title {
    position: sticky;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    top: 80px;
    margin-top: 10rem;
    /* border: 1px solid red; */
    h3 {
      font-size: var(--h3-banner-clamp);
    }

  }
  canvas {
    margin: 0 auto;
    /* padding-top: 1em; */
    position: sticky;
    z-index: -1;
    top: 200px;
    display: block;
    /* border: 1px solid yellow; */
    margin-top: 10rem;
  }
  .shimmer-logos-mobile {
    display: inline;
    text-align: center;
    color: rgba(255, 255, 255, 0.1);
    background: linear-gradient(
      140deg,
      rgba(255, 185, 4, 0.7) 45%,
      rgba(255, 255, 255, 0.7) 50%,
      rgba(255, 185, 4, 0.7) 55% 100%
    );
    background-size: 400% 200%;
    animation: shimmer-logos-mobile .02s;
    animation-play-state: paused;
    animation-delay: calc(var(--scroll) * -.04s);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-color: rgba(255, 185, 4, 1);
  }
  @keyframes shimmer-logos-mobile {
    0% {
      background-position: 150% top;
    }
    100% {
      background-position: left top;
    }
  }

  /* @media screen and (max-width: 600px) {
    .sticky-title {
      margin-bottom: 4rem;
    }
  } */
`

const ImageCanvas = ({
  scrollHeight,
  numFrames,
  width,
  height,
  setTrigger,
}) => {
  const { allFile } = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "framesv4mobile" } }) {
        nodes {
          base
          childImageSharp {
            gatsbyImageData(
              webpOptions: { quality: 55 }
              quality: 50
              width: 360
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
      (frame) => frame.base === `${index.toString().padStart(5, "0")}.jpeg`
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
  useEffect(() => {
    if (frameIndex <= 420) {
      setTrigger(true)
    }
    if (frameIndex > 420) {
      setTrigger(false)
    }
  }, [frameIndex])

  const handleScroll = () => {
    const scrollFraction =
      (window.scrollY - window.innerHeight  * 1.2) /
      (scrollHeight - window.innerHeight + 1000)
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
  const [trigger, setTrigger] = useState(false)
  //   const { isVideoTitleHidden, setIsVideoTitleHidden} = useContext(Context)
  //   const [isMobileLandscape, setIsMobileLandscape] = useState(false)
  //   const [isMobilePortrait, setIsMobilePortrait] = useState(false)
  //   const [width, setWidth] = useState()
  //   const [height, setHeight] = useState(700)
  // const [scrollHeight, setScrollHeight] = useState(8000)

  const wrapperVariants = {
    initial: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
    animate: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 1 },
    },
  }
  return (
    <>
      {/* {!isBottom && (
        <motion.div
          key="video-logos"
          transition={{ duration: 3}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          {...wrapperVariants}
        > */}
      <div>
        <StyledSectionLogoScroll>
          <div className="sticky-title" id="videoscroll-title">
            <AnimatePresence>
              {trigger && (
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                  exit={{ opacity: 0 }}
                >
                  produced 700+{" "}
                  <span className="custom shimmer-logos-mobile">creative projects</span>{" "}
                  for
                </motion.h3>
              )}
            </AnimatePresence>
          </div>
          <div id="video-scroll">
            <ImageCanvas
              scrollHeight={3100}
              width="360"
              height="470"
              numFrames={500}
              setTrigger={setTrigger}
              id="video-scroll"
            />
          </div>
        </StyledSectionLogoScroll>
      </div>
      {/* </motion.div> */}
      {/* // )} */}
      {/* </> */}
    </>
  )
}

export default VideoLogosMobile
