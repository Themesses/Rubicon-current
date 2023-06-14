import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const HeaderStylesFull = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* border: 1px solid red; */

  .static-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
    transform: translateY(-50%);
    padding-top: 2em;
    height: 25vh;
    width: 99vw;
  }
  //main animation static shimmer
  .shimmer-static {
    display: inline;
    text-align: center;
    color: rgba(255, 255, 255, 0.1);
    background: linear-gradient(
      140deg,
      rgba(255, 185, 4, 0.5) 44%,
      rgba(255, 255, 255, 0.6) 50%,
      rgba(255, 185, 4, 0.5) 52% 100%
    );
    background-size: 300% 200%;

    animation-name: shimmer;
    animation-duration: 2s;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    animation-iteration-count: 1;
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
  @media screen and (max-width: 619px) {
    /* border: 1px solid red; */
  }
`
const H1Styles = styled(motion.h1)`
  position: relative;
  font-size: var(--h1);
  /* font-size: 64px; */
  text-align: center;
  background-color: #3d3a3a;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 500;
  @media screen and (max-width: 619px) {
    font-size: 7vw !important;
  }
  /* @media screen and (min-width: 620px) {
    h1 {
      font-size: 64px !important;
    }
  } */
`
const H2Styles = styled(motion.h2)`
  font-size: clamp(1.9rem, 1.59vw, 2.9rem);
  /* font-size: clamp(3.5rem, 1.59vw, 2.4rem) !important; */
  text-align: center;
  color: var(--beige);
  @media screen and (max-width: 620px) {
    font-size: 4vw;
  }
`
const HeaderWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 25vh;
  width: 50%;
  @media screen and (max-width: 620px) {
   width: 100%;
  }
`

const Header = ({
  isFirstLoad,
  isScrollFired,
  setIsScrollFired,
  setIsFirstLoad,
  dimensions,
  isWindowTop,
  isMobilePortrait,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  const controls = useAnimation()
  const controlsH1 = useAnimation()
  const controlsH2 = useAnimation()

  const headerMainText = useRef(null)
  // const header = useRef(null)

  // up translation on opening animation sequence
  const mainAnimation = {

    // initial:  isMobilePortrait ? {y: "10vh"} :{ y: 0 },
    initial:  { y: 0 },
    animate:  isMobilePortrait ? {y: "-25vh", transition: {delay: 1.7, duration: 0.7}} : { y: "-25vh", transition: { delay: 1.5, duration: 0.7 } },
  }
  //h1 animations
  const h1Animation = {
    initial: { backgroundColor: "#3d3a3a" },
    animate: {
      backgroundColor: "var(--gold)",
      transition: { type: "tween", duration: 1, ease: "easeIn" },
    },
    postAnimate: { backgroundColor: "var(--gold)" },
  }

  //h2 animations
  const h2FirstHalf = `for those looking to tell the story`

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.018,
      },
    },
  }
  const firstHalf = {
    hidden: { opacity: 0.01, y: 50, color: "#585858" },
    visible: {
      opacity: 1,
      y: 0,
      color: "var(--beige)",
    },
  }

  //scroll event listenenr for scroll shimmer on page load
  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        document.body.style.setProperty(
          "--scroll",
          window.pageYOffset / (document.body.offsetHeight - window.innerHeight )
        )
      },
      { passive: true }
    )
    return () =>
      window.removeEventListener(
        "scroll",
        () => {
          document.body.style.setProperty(
            "--scroll",
            window.pageYOffset /
              (document.body.offsetHeight - window.innerHeight)
          )
        },
        { passive: true }
      )
  }, [])

  useEffect(() => {
    if (isScrollFired) {
      setTimeout(() => {
        setIsLoaded(true)
      }, 2000)
      controls.start("animate")
      controlsH1.start("animate")
      setTimeout(() => {
        headerMainText.current.classList.add("shimmer-static")
        // debugger;
      }, 1200)
    }
  }, [isScrollFired, controls, controlsH1, controlsH2])
  useEffect(() => {
    if (isScrollFired) {
      setTimeout(() => {
        // debugger;
        setIsFirstLoad(false)
      }, 3000)
    }
  }, [isScrollFired, setIsFirstLoad])

  //opening animation sequence doesn't play on refresh, only on scroll. This triggers the animation sequence on those occasions. (safari page refresh)
  useEffect(() => {
    if (inView && !isScrollFired) {
      console.log("in view")
      setIsScrollFired(true)
    }
  }, [inView, setIsScrollFired, isScrollFired])

  return (
    <div id="dynamic-header" ref={ref}>
      {/* {isFirstLoad  && ( */}
      <HeaderStylesFull>
        <div className="static-wrapper">
          <HeaderWrapper
            animate={controls}
            variants={mainAnimation}
            initial="initial"
          >
            <H1Styles
              ref={headerMainText}
              variants={h1Animation}
              initial="initial"
              animate={controlsH1}
            >
              creativity & execution
            </H1Styles>
            {isLoaded && (
              <H2Styles variants={sentence} initial="hidden" animate="visible">
                {h2FirstHalf.split("").map((char, index) => {
                  return (
                    <motion.span key={char + "-" + index} variants={firstHalf}>
                      {char}
                    </motion.span>
                  )
                })}
              </H2Styles>
            )}
          </HeaderWrapper>
        </div>
      </HeaderStylesFull>
      {/* )} */}
      {/* {!isFirstLoad && (
        <PostAnimationStyles key="header-postAnimation">
          <div>
            <H1Styles
              className="shimmer"
              ref={headerMainText}
              variants={h1Animation}
              initial="postAnimate"
            >
              creativity & execution
            </H1Styles>
            <H2Styles variants={firstHalf} initial="visible" animate="visible">
              {h2FirstHalf.split("").map((char, index) => {
                return (
                  <motion.span key={char + "-" + index} variants={firstHalf}>
                    {char}
                  </motion.span>
                )
              })}
            </H2Styles>
          </div>
        </PostAnimationStyles>
      )} */}
      {/* {dimensions.width < 500 && (
        <PostAnimationStyles key="header-postAnimation">
          <div>
          <H1Styles
            className="shimmer"
            ref={headerMainText}
            variants={h1Animation}
            initial="postAnimate"
          >
            creativity & execution
          </H1Styles>
          <H2Styles variants={firstHalf} initial="visible" animate="visible">
            {h2FirstHalf.split("").map((char, index) => {
              return (
                <motion.span key={char + "-" + index} variants={firstHalf}>
                  {char}
                </motion.span>
              )
            })}
          </H2Styles>
          </div>
        </PostAnimationStyles>

      )} */}
    </div>
  )
}

export default Header
