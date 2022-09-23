import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { getSrc } from "gatsby-plugin-image"
import { motion, AnimatePresence } from "framer-motion"

const StyledSectionLogoScroll = styled.section`
  position: relative;
  z-index: -2;
  background: #161616;
  /* background:white ; */
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
    top: 5%;
    height: 5rem;
    padding-top: 5rem;
    margin-top: 8rem;
    opacity: 1;
    h3 {
      font-size: var(--h3-banner-clamp);
    }
  }
  canvas {
    margin: 0 auto;
    padding-top: 1em;
    position: sticky;
    z-index: -1;
    top: 25%;
    display: block;
  }
  .shimmer-logos {
    display: inline;
    text-align: center;
    color: rgba(255, 255, 255, 0.1);
    background: linear-gradient(
      140deg,
      rgba(255, 185, 4, 0.7) 40%,
      rgba(255, 255, 255, 0.7) 50%,
      rgba(255, 185, 4, 0.7) 60% 100%
    );
    background-size: 500% 200%;
    animation: shimmer-logos 1s;
    animation-play-state: paused;
    animation-delay: calc(var(--scroll) * -1s);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-color: rgba(255, 185, 4, 1);
  }
  @keyframes shimmer-logos {
    0% {
      /* background-position: top center; */
      background-position: 80% top;
    }
    100% {
      background-position: left top;
    }
  }
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
      allFile(filter: { relativeDirectory: { eq: "framesv2desktop" } }) {
        nodes {
          base
          childImageSharp {
            gatsbyImageData(
              webpOptions: { quality: 100 }
              quality: 80
              width: 900
            )
          }
        }
      }
    }
  `)
  const canvasRef = useRef(null)
  const [images, setImages] = useState([])
  const [frameIndex, setFrameIndex] = useState(0)
  // const [trigger, setTrigger] = useState(false)
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

  //set frame number for toggling the title
  useEffect(() => {
    if (frameIndex <= 630) {
      setTrigger(true)
    }
    if (frameIndex > 630) {
      setTrigger(false)
    }
  }, [frameIndex])

  const handleScroll = () => {
    const scrollFraction =
      (window.scrollY - window.innerHeight * 1.5) /
      (scrollHeight - window.innerHeight + 1200)
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

const VideoLogos = ({ isBottom }) => {
  const [trigger, setTrigger] = useState(false)
  //   const { isVideoTitleHidden, setIsVideoTitleHidden} = useContext(Context)
  //   const [isMobileLandscape, setIsMobileLandscape] = useState(false)
  //   const [isMobilePortrait, setIsMobilePortrait] = useState(false)
  //   const [width, setWidth] = useState()
  //   const [height, setHeight] = useState(700)
  // const [scrollHeight, setScrollHeight] = useState(8000)
  useEffect(() => {
    console.log("triger from video", trigger)
  }, trigger)

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
      {/* {!isBottom && ( */}
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
                <AnimatePresence>
                  {trigger && (
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ ease: "easeOut", duration: 0.3 }}
                      exit={{ opacity: 0}}
                    >
                      produced 700+{" "}
                      <span className="custom shimmer-logos">
                        custom projects
                      </span>{" "}
                      for
                    </motion.h3>
                  )}
                </AnimatePresence>
              </div>
              <div id="video-scroll">
                <ImageCanvas
                  scrollHeight={10000}
                  width="900"
                  height="430"
                  // height="7745"
                  // numFrames={485}
                  numFrames={685}
                  id="video-scroll"
                  setTrigger={setTrigger}
                />
              </div>
            </StyledSectionLogoScroll>
          </div>
        </motion.div>
      {/* )} */}
      {/* </> */}
    </>
  )
}

export default VideoLogos
