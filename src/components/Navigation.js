import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import Icon from "../assets/images/rubi-icon.png"
import useDeviceDetect from "./hooks/useDeviceDetect"
const isBrowser = typeof window !== "undefined"

const rubiAnimationVariants = {
  hidden: {
    opacity: 0,
    // x: 40,
    transition: {
      type: "tween",
      duration: 0.15,
    },
  },
  visible: {
    opacity: 1,
    // x: 0,
    transition: {
      // type: "tween",
      delay: 0.5,

      duration: 1,
      type: "spring",
      stiffness: "100",
    },
  },
}
const rubiGlowAnimationVariants = {
  hidden: {
    filter: "drop-shadow(0 0 0 var(--black)",
  },
  visible: {
    filter: "drop-shadow(0 0 0.3em var(--gold)",
    scale: [1.05, 1],
    transition: {
      filter: "drop-shadow(0 0 0em var(--black)",
      yoyo: Infinity,
      duration: 1,
    },
  },
}
const ctaAnimationVariants = {
  hidden: {
    opacity: 0,
    x: 40,
    transition: {
      type: "tween",
      duration: 0.15,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: "100",
    },
  },
}

const StyledNavigation = styled.div`
  display: flex;
  position: sticky;
  position: -webkit-sticky;
  /* background: var(--black); */
  background-color: var(--nav-color);
  /* border: 1px solid red; */
  /* background: transparent; */
  justify-content: flex-end;
  padding-right: 0.2em;
  align-items: center;
  top: 80px;
  transform: translateY(-80px);
  height: 70px;
  z-index: 99;
  @media screen and (max-width: 620px) {
    height: 6vh;
    transform: translateY(-8vh);
    transform: translateY(var(--transformVh));
    /* transform: translateY(calc(-23 * var(--navVh, 1vh))); */
    /* transform: (calc(40 * var(--navVh, 1vh))); */
    top: 8vh;
    top: var(--topVh);
    transition: all .1s;
    /* top: calc(var(--navVh, 1vh) * 23); */

  }
`
const StyledCta = styled.div`
  .nav-rubi-cta {
    margin-right: 1em;
    /* border: 1px solid red; */
    display: flex;
    height: 70px;
    /* width: 40%; */
  }
  @keyframes slideInFromRight {
    0%   { transform: translateX(0); }
    40%  { transform: translateX(-15px); }
    100% { transform: translateX(10); }
  }
  .rubi-cta-list {
    display: none;
    flex-direction: row;
    align-items: center;
    list-style: none;
  }
  .rubi-cta-list-two {
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
    /* transition: 0.7s; */
    /* border: 1px solid red; */
    /* opacity: 0;
    transform: translateX(40px); */
  }

  @media screen and (min-width: 920px) {
    .nav-rubi-ct:hover, .button-rubi:hover {
      .rubi-cta-list {
        display: flex;
      }
    }
  }
  li {
    margin-right: 0.8em;
  }
  /* a {
    text-decoration: none;
    color: var(--gold);
    font-size: clamp(1.8rem, 1.6vw, 2.3rem);
    transition: 0.3s;

    &:hover,
    &:focus {
      color: var(--gold);
    }
  } */
  .button-rubi {
    background-color: transparent;
    padding: 0;
    height: 3.5em;
    width: 3.5em;
    transform: translateY(25%);
  }
  img {
    width: 100%;
    height: auto;
    /* transition: 1s; */
  }
  .button-about-us,
  .button-say-hey {
    font-family: "Lexend Deca", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    font-weight: 100;
    background-color: transparent;
    padding: 0;
    width: max-content;
    color: var(--beige);
    font-size: clamp(1.6rem, 1.5vw, 2rem);
    text-align: center;
    display: inline-block;
    height: max-content;
    margin-top: 0 !important;
    &:hover {
      color: var(--gold);
    }
  }
  .button-about-us p {
    border: 1px solid red;
    font-size: clamp(1.8rem, 1.6vw, 2.3rem);
  }

  @media screen and (max-width: 620px) {
    margin: 0;
    padding: 0;
    /* transform: translateX(-5px); */
    .nav-rubi-cta {
      margin-right: .5em;
      display: flex;
      height: 40px;
    }
    .rubi-cta-list {
      display: none;
      flex-direction: row;
      align-items: center;
      list-style: none;
    }
    .rubi-cta-list-two {
      display: flex;
      flex-direction: row;
      align-items: center;
      list-style: none;
    }
    li {
      margin-right: 0.3em;
    }
    a {
      text-decoration: none;
      color: var(--gold);
      font-size: clamp(1.8rem, 1.6vw, 2.3rem);
      transition: 0.3s;

      &:hover,
      &:focus {
        color: var(--gold);
      }
    }
    .button-rubi {
      background-color: transparent;
      padding: 0;
      height: 2.3em;
      width: 2.3em;
      transform: translateY(9px);
    }
    img {
      width: 100%;
      height: auto;
    }
    .button-about-us,
    .button-say-hey {
      background-color: transparent;
      padding: 0;
      width: max-content;
      font-size: clamp(1.8rem, 1.6vw, 2.3rem);
      text-align: center;
      display: inline-block;
      height: max-content;
      margin-top: 0 !important;
    }
  }
`
const StyledNavigationHidden = styled(StyledNavigation)`
  visibility: hidden;
`
const Navigation = ({
  isFirstLoad,
  isDesktop,
  isMedium,
  isMobilePortrait,
  setShowSayHeyModal,
  setShowAboutUsModal,
  isVideoVisible,
}) => {
  const [showCta, setShowCta] = useState(false)
  const [showRubyListAnimate, setShowRubyListAnimate] = useState("hidden")
  const [isClick, setIsClick] = useState(false)
  const [isTop, setIsTop] = useState(true)

  //user agent detection for bottom rubi correction (see isTop)
  const { isMobile, isSafari } = useDeviceDetect()

  useEffect(() => {
    let rubiList = document.getElementById('rubi-cta-list')
    if(rubiList){
      // setIsClick(false)
      if(isMobilePortrait) {
        setShowRubyListAnimate("visible")
      } else {
        rubiList.style.display = "none"
        setShowRubyListAnimate("hidden")
      }
    }
  },[isMobilePortrait, isClick]);
  // useEffect(() => {
  //   console.log('page:', window.pageYOffset)
  // })

  //sets the background color of the nav based on state passed from layout
  useEffect(() => {
    if (isVideoVisible) {
      document.documentElement.style.setProperty('--nav-color', 'transparent')
    }
    if (!isVideoVisible) {
      document.documentElement.style.setProperty('--nav-color', 'var(--black)')
    }

  }, [isVideoVisible])

  useEffect(() => {
    const navVh = isBrowser ? window.innerHeight * 0.01: "";
    document.documentElement.style.setProperty('--navVh', `${navVh}px`)
  })

  useEffect(() => {
    // console.log()
    if (isMobilePortrait) {
      window.addEventListener('scroll', function() {

          // console.log(window.scrollY)
          if (window.scrollY <= 5) {
            setIsTop(true)
    // document.documentElement.style.setProperty('--transformVh', `-170px`)
    // document.documentElement.style.setProperty('--topVh', `170px`)
          } else {
            setIsTop(false)

    // document.documentElement.style.setProperty('--transformVh', `-80px`)
    // document.documentElement.style.setProperty('--topVh', `80px`)

          }
      })

    }
  }, [isMobilePortrait])
  useEffect(() => {
    //uses user agent (isMobile) to detect if its served on mobile, in future might optimize between firefox and rest
    if (isTop & isMobilePortrait & isSafari) {
    document.documentElement.style.setProperty('--transformVh', `-160px`)
    document.documentElement.style.setProperty('--topVh', `160px`)
    }
    if (!isTop & isMobilePortrait & isSafari) {

      document.documentElement.style.setProperty('--transformVh', `-80px`)
      document.documentElement.style.setProperty('--topVh', `80px`)
    }
    if (isMobilePortrait & !isSafari) {

      document.documentElement.style.setProperty('--transformVh', `-80px`)
      document.documentElement.style.setProperty('--topVh', `80px`)
    }

  }, [isTop, isMobilePortrait, isSafari])


  return (
    <>
      { (isFirstLoad && isDesktop) || (isFirstLoad && isMedium) ? (
        <StyledNavigationHidden>
          <div>""</div>
        </StyledNavigationHidden>
      ) : (
        <StyledNavigation>
        {!isVideoVisible && (
            <StyledCta>
              <motion.div
                className="nav-rubi-cta"
                variants={rubiAnimationVariants}
                initial="hidden"
                animate="visible"
                transition={{duration: 0.2}}
                // onMouseLeave={() => {
                //   if(!isMobilePortrait && !isClick) {
                //     let rubiList = document.getElementById('rubi-cta-list')
                //     if(rubiList)
                //       rubiList.style.display = "none"
                //     setShowRubyListAnimate("hidden")
                //   }
                // }}
              >
                {
                  !isClick &&
                  <motion.ul
                    style={{
                      animation: "0.7s ease-out 0s 1 slideInFromRight",
                    }}
                    className="rubi-cta-list"
                    id="rubi-cta-list"
                    variants={ctaAnimationVariants}
                    initial="hidden"
                    animate="visible"
                  >
                      <li>
                        <button
                          className="button-about-us"
                          onClick={() => setShowAboutUsModal(true)}
                        >
                          get the story
                        </button>
                      </li>
                      <li style={{ color: "var(--gold)" }}>|</li>
                      <li>
                        <button
                          className="button-say-hey"
                          style={{ fontWeight: "100 !important" }}
                          onClick={() => setShowSayHeyModal(true)}
                        >
                          say hey
                        </button>
                      </li>
                  </motion.ul>
                }
                {
                  isClick &&
                  <motion.ul
                    className="rubi-cta-list-two"
                    id="rubi-cta-list-two"
                    variants={ctaAnimationVariants}
                    initial="hidden"
                    animate="visible"
                  >
                      <li>
                        <button
                          className="button-about-us"
                          onClick={() => setShowAboutUsModal(true)}
                        >
                          get the story
                        </button>
                      </li>
                      <li style={{ color: "var(--gold)" }}>|</li>
                      <li>
                        <button
                          className="button-say-hey"
                          style={{ fontWeight: "100 !important" }}
                          onClick={() => setShowSayHeyModal(true)}
                        >
                          say hey
                        </button>
                      </li>
                  </motion.ul>
                }
                <>
                  <motion.button
                    // onClick={async () => {
                    //   console.log("showRubyListAnimate", showRubyListAnimate)
                    //   await setShowCta(true)
                    //   if(!isMobilePortrait && !isClick) {
                    //     let rubiList = document.getElementById('rubi-cta-list')
                    //     if(rubiList){
                    //       rubiList.style.display = "flex"
                    //     }
                    //     setTimeout(async() => {
                    //       await setShowRubyListAnimate("visible")
                    //     }, 2000);
                    //   }
                    // }}

                    onClick={async (e) => {
                      let animation = showRubyListAnimate === "visible" ? "hidden" : "visible"
                      await setShowRubyListAnimate(animation)
                      await setIsClick(isClick === true? false : true)
                      setShowCta((showCta) => !showCta)
                    }}
                    className="button-rubi"
                    whileHover={{
                      filter: "brightness(120%)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    <motion.img
                      variants={rubiGlowAnimationVariants}
                      initial="hidden"
                      animate="visible"
                      className="icon-image"
                      src={Icon}
                      whileHover={{
                        rotate: 45,
                        scale: 1.03,
                        transition: { duration: 0.3 },
                        filter: "drop-shadow(0 0 0.01em var(--black)",
                      }}
                    />
                  </motion.button>
                </>
              </motion.div>
            </StyledCta>
           )}
        </StyledNavigation>
      )}
    </>
  )
}
export default Navigation
