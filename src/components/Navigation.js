import React, {useState} from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import Icon from "../assets/images/rubi-icon.png"

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
      }
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
  position: -webkit-sticky;
  /* border: 1px solid red; */
  position: sticky;
  background: var(--black);
  justify-content: flex-end;
  padding-right: .2em;
  align-items: center;
  top: 0;
  height: 70px;
  z-index: 999;
`
const StyledCta = styled.div`
  /* border: 1px solid yellow; */
  .nav-rubi-cta {
    margin-right: 1em;
    /* border: 1px solid red; */
    display: flex;
    height: 70px;
    /* width: 40%; */
  }
  .rubi-cta-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
    /* transition: 0.7s; */
    /* border: 1px solid red; */
    /* opacity: 0;
    transform: translateX(40px); */
  }
  li {
    margin-right: 0.8em;
  }
  a {
    text-decoration: none;
    color: var(--gold);
    font-weight: 200;
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
    height: 4em;
    width: 4em;
    transform: translateY(15%);
  }
  img {
    width: 100%;
    height: auto;
    /* transition: 1s; */
  }
  .button-about-us,
  .button-say-hey {
    /* border: 1px solid red; */
    background-color: transparent;
    padding: 0;
    width: max-content;
    color: var(--gold);
    font-weight: 200;
    font-size: clamp(1.8rem, 1.6vw, 2.3rem);
    /* transition: 0.3s; */
    text-align: center;
    display: inline-block;
    height: max-content;
    margin-top: 0 !important;
  }
  @media screen and (max-width: 600px) {
    /* border: 1px solid red; */
    margin: 0;
    padding: 0;
    transform: translateX(-45px);
    .nav-rubi-cta {
      margin-right: 0em;
      /* border: 1px solid red; */
      display: flex;
      height: 40px;
      /* width: 50vw; */
    }
    .rubi-cta-list {
      display: flex;
      flex-direction: row;
      align-items: center;
      list-style: none;
      /* transition: 0.7s; */
      /* border: 1px solid red; */
      /* opacity: 0;
    transform: translateX(40px); */
    }
    li {
      margin-right: 0.3em;
    }
    a {
      text-decoration: none;
      color: var(--gold);
      font-weight: 200;
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
      height: 1.7em;
      width: 1.7em;
      transform: translateY(5px);
    }
    img {
      width: 100%;
      height: auto;
      /* transition: 1s; */
    }
    .button-about-us,
    .button-say-hey {
      /* border: 1px solid red; */
      background-color: transparent;
      padding: 0;
      width: max-content;
      color: var(--gold);
      font-weight: 200;
      font-size: clamp(1.8rem, 1.6vw, 2.3rem);
      /* transition: 0.3s; */
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
const Navigation = ({ isFirstLoad }) => {
    const [showCta, setShowCta] = useState(false)
  return (
    <>
      {isFirstLoad ? (
        <StyledNavigationHidden>
          <div>""</div>
        </StyledNavigationHidden>
      ) : (
        <StyledNavigation>
          <StyledCta>
            <motion.div
              className="nav-rubi-cta"
              variants={rubiAnimationVariants}
              initial="visible"
              animate="visible"
            >
              <motion.ul
                className="rubi-cta-list"
                id="rubi-cta-list"
                variants={ctaAnimationVariants}
                initial="hidden"
                animate= "visible"
              >
                <li>
                  <button
                    className="button-say-hey"
                  >
                    say hey
                  </button>
                </li>
              </motion.ul>
              <>
                <motion.button
                  onMouseEnter={() => setShowCta(true)}
                  onClick={() => setShowCta((showCta) => !showCta)}
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
        </StyledNavigation>
      )}
    </>
  )
}
export default Navigation
