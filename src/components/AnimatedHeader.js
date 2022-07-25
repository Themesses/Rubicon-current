import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { motion, useAnimation } from "framer-motion"

const isBrowser = typeof window !== "undefined"

const HeaderStylesFull = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: 100vh;

  .static-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
    padding-top: 4em;
    height: 25vh;
    width: 99vw;
  }

  h1 {
    font-size: var(--h1);
    text-align: center;
    background-color: #3d3a3a;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 500;
  }
  h2 {
    font-size: clamp(1.9rem, 1.59vw, 2.4rem);
    text-align: center;
    color: var(--beige);
  }
  /* .header-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
    height: 25vh;
    border: 20px solid green;
    z-index: 999;
  } */

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
`
const HeaderWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  /* justify-content: top; */
  align-items: center;
  height: 25vh;
  width: 50%;
  /* border: 2px solid green; */
`

const AnimatedHeader = ({ isFirstLoad, isScrollFired, setIsFirstLoad, dimensions }) => {
  const [isLoaded, setIsLoaded] = useState(false)
//   const controls = useAnimation()
//   const controlsH1 = useAnimation()
//   const controlsH2 = useAnimation()

  const headerMainText = useRef(null)

  // up translation on opening animation sequence
//   const mainAnimation = {
//     initial: { y: 0 },
//     animate: { y: "-37.5vh", transition: { delay: 1.7, duration: 0.8 } },
//   }
  //h1 animations
//   const h1Animation = {
//     initial: { backgroundColor: "#3d3a3a" },
//     animate: {
//       backgroundColor: "var(--gold)",
//       transition: { type: "tween", duration: 1, ease: "easeIn" },
//     },
//     postAnimate: { backgroundColor: "var(--gold)" },
//   }

  //h2 animations
  const h2FirstHalf = `for those looking to tell the story`

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
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
//   useEffect(() => {
//     window.addEventListener(
//       "scroll",
//       () => {
//         document.body.style.setProperty(
//           "--scroll",
//           window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
//         )
//       },
//       { passive: true }
//     )
//     return () =>
//       window.removeEventListener(
//         "scroll",
//         () => {
//           document.body.style.setProperty(
//             "--scroll",
//             window.pageYOffset /
//               (document.body.offsetHeight - window.innerHeight)
//           )
//         },
//         { passive: true }
//       )
//   }, [])

//   useEffect(() => {
//     if (isScrollFired) {
//       setIsLoaded(true)
//       controls.start("animate")
//       controlsH1.start("animate")
//       setTimeout(() => {
//         headerMainText.current.classList.add("shimmer-static")
//       }, 1600)
//     }
//   }, [isScrollFired, controls, controlsH1, controlsH2])
//   useEffect(() => {
//     if (isScrollFired) {
//       setTimeout(() => {
//         setIsFirstLoad(false)
//       }, 2900)
//     }
//   }, [isScrollFired, setIsFirstLoad])
  return (
      <div>
      <HeaderStylesFull>
        <div className="static-wrapper">
            <h1>
              creativity & execution
            </h1>
              <h2>
                  {h2FirstHalf}
              </h2>
        </div>
      </HeaderStylesFull>
      </div>
  )
}

export default AnimatedHeader
