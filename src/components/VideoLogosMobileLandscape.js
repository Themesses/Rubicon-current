import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { getSrc } from "gatsby-plugin-image"
import { AnimatePresence, motion} from "framer-motion"

const StyledSectionLogoScroll = styled.section`
  position: relative;
  z-index: -2;
  background: #161616;
  padding-bottom: 0;
  .video-end {
    height: 1px;
    transform: t4anslateY(-100vh);
    z-index: 999;
  }
  .sticky-title {
    position: sticky;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    top: 15%;
    height: 5rem;
    margin-top: 8rem;
    h3 {
      font-size: var(--h3-banner-clamp);
    }

  }
  canvas {
    margin: 0 auto;
    /* padding-top: 1em; */
    position: sticky;
    z-index: -1;
    top: 30%;
    display: block;
  }
  .shimmer-logos {
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
      -webkit-background-clip: text;
      -moz-background-clip: text;
      background-clip: text;
      animation: shimmer-logos 0.3s;
      animation-play-state: paused;
      animation-delay: calc(var(--scroll) * -1s);
      background-repeat: no-repeat;
      background-position: 0 0;
      background-color: rgba(255, 185, 4, 1);
    }

    @keyframes shimmer-logos {
      0% {
        background-position: top left;
      }
      100% {
        background-position: top right;
      }
    }

  /* @media screen and (max-width: 600px) {
    .sticky-title {
      margin-bottom: 4rem;
    }
  } */
`

const ImageCanvas = ({ scrollHeight, numFrames, width, height, setTrigger }) => {
  const { allFile } = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "framesv4desktop" } }) {
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
    if (frameIndex <= 600) {
      setTrigger(true)
    }
    if (frameIndex > 600) {
      setTrigger(false)
    }
  }, [frameIndex])

  const handleScroll = () => {
    const scrollFraction =
      // (window.scrollY - window.innerHeight) / (scrollHeight - window.innerHeight + 1100)
      (window.scrollY - window.innerHeight) / (scrollHeight - window.innerHeight + 500)
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
                        creative projects
                      </span>{" "}
                      for
                    </motion.h3>
                  )}
                </AnimatePresence>
                {/* <h3>
                  produced 700+ <span className="custom">creative projects</span>{" "}
                  for
                </h3> */}
              </div>
              <div id="video-scroll">
                <ImageCanvas
                  scrollHeight={6500}
                  width="500"
                  height="240"
                  numFrames={680}
                  id="video-scroll"
                  setTrigger={setTrigger}
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
