import React, { useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { getImage, StaticImage } from "gatsby-plugin-image"
import { BgImage } from "gbimage-bridge"
import { motion, AnimatePresence } from "framer-motion"
import { IconButton } from "@mui/material"
import CancelIcon from "@mui/icons-material/Cancel"
import styled from "styled-components"

const sayHeyAnimationVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    transition: {
      type: "spring",
      stiffness: 110,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 110,
    },
  },
}
const contactFormAnimationVariants = {
  hidden: {
    opacity: 0,
    transition: {
      type: "tween",
      duration: 1,
      filter: "blur(10px)",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.7,
      duration: 0.3,
      type: "tween",
      filter: "blur(0px)",
    },
  },
}

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(7px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden !important;
  z-index: 999;
  .cancel-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 60px;
    width: 60px;
    top: 0;
    left: 0;
  }
  .modal-wrapper {
    overflow: hidden;
    border-radius: 15px;
    width: 65vw;
    height: 85vh;
    min-height:80vh;
    position: relative;
    background: #373434;
    z-index: 992;
  }
  .modal-content {
    position: relative;
    overflow-y: auto;
    height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .modal-content-top-paragraph-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 1em;
    width: 100%;
    height: 55%;
  }
  .modal-content-top-paragraph-wrapper p {
    margin-right: 1em;
    margin-left: 1em;
    font-size: 2.5rem;
    font-size: clamp(1.6rem, 1.6vw, 2.5rem);
    line-height: 2.2em;
    font-weight: 400;
  }
  .left.p-content {
    text-align: right;
    background-color: red;
    background: linear-gradient(
      115deg,
      rgba(175, 66, 97, 1) 45%,
      rgba(243, 236, 120, 1) 100%
    );
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    .shape-left {
      width: 10px;
      height: 100%;
      float: right;
      shape-outside: polygon(100% 0, 0 100%, 100% 100%);
      clip-path: polygon(100% 0, 0 100%, 100% 100%);
      margin-left: 2rem;
    }
    width: 50%;
  }
  .right.p-content {
    background-color: red;
    background: linear-gradient(
      72deg,
      rgba(243, 236, 120, 1) 0%,
      rgba(175, 66, 97, 1) 51%
    );
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    .shape-right {
      width: 10px;
      height: 100%;
      float: left;
      shape-outside: polygon(100% 100%, 0 100%, 0 0);
      clip-path: polygon(100% 100%, 0 100%, 0 0);
      margin-right: 2rem;
    }
    width: 50%;
  }
  .modal-content-bottom-absolute-wrapper {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 38%;
    bottom: 0;
    width: 100%;
  }

  .modal-content-bottom-absolute-wrapper p {
    /* padding: 0.5em 5.5em 0.5em 5.5em; */
    padding-top: 2em;
    font-size: 15px;
    width: 50%;
    height: 100%;
    line-height: 1.8;
    font-weight: 300;
  }
  .modal-content-bottom-absolute-wrapper p:first-of-type {
    margin-right: 7em;
  }
  .left.p-content-bottom {
    text-align: right;
    background-color: red;
    background: linear-gradient(
      100deg,
      rgba(175, 66, 97, 1) 25%,
      rgba(243, 236, 120, 1) 100%
    );
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    .bottom-shape-left {
      width: 5px;
      height: 100%;
      float: right;
      shape-outside: polygon(100% 0, 0 100%, 100% 100%);
      clip-path: polygon(100% 0, 0 100%, 100% 100%);
      margin-left: 2rem;
    }
    width: 50%;
  }
  .right.p-content-bottom {
    background-color: red;
    background: linear-gradient(
      72deg,
      rgba(243, 236, 120, 1) 0%,
      rgba(175, 66, 97, 1) 70%
    );
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    .bottom-shape-right {
      width: 5px;
      height: 100%;
      float: left;
      shape-outside: polygon(100% 100%, 0 100%, 0 0);
      clip-path: polygon(100% 100%, 0 100%, 0 0);
      margin-right: 2rem;
    }
    width: 50%;
  }
  @media screen and (max-width: 1270px) {
    .modal-wrapper {
      min-width: 50vw;
    }
  }
  @media screen and (max-width: 1150px) {
    .modal-wrapper {
      width: 75vw;
    }
  }
  @media screen and (max-width: 1050px) {
    .modal-wrapper {
      width: 95vw;
    }
    .modal-content-bottom-absolute-wrapper {
      padding-top: 5vh;
    }
    .modal-content-bottom-absolute-wrapper p {
      /* padding-top: 15vh; */
      /* padding: 0.5em 5.5em 0.5em 5.5em; */
      /* padding-top: 2.5em;
      font-size: 14px;
      width: 50%;
      height: 100%;
      line-height: 1.6;
      font-weight: 200; */
    }
  }
  @media screen and (max-width: 790px) {
    .modal-wrapper {
      width: 99vw;
    }
    .modal-content-bottom-absolute-wrapper {
      padding-top: 0vh;
    }

    .modal-content-top-paragraph-wrapper p {
      /* padding: 0.5em 2.8em 0.5em 4em; */
      margin-right: 0.5em;
      margin-left: 0.5em;
      font-size: 2rem;
      /* font-size: clamp(1.6rem, 1.6vw, 2.5rem); */
      line-height: 2.4em;
      font-weight: 400;
    }
    .left.p-content {
      text-align: right;
      background-color: red;
      background: linear-gradient(
        115deg,
        rgba(175, 66, 97, 1) 40%,
        rgba(243, 236, 120, 1) 100%
      );
      background-size: 100%;
      background-repeat: repeat;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
    }
    .right.p-content {
      background-color: red;
      background: linear-gradient(
        72deg,
        rgba(243, 236, 120, 1) 0%,
        rgba(175, 66, 97, 1) 61%
      );
      background-size: 100%;
      background-repeat: repeat;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
    }
    .modal-content-bottom-absolute-wrapper p {
      /* padding: 0.5em 5.5em 0.5em 5.5em; */
      padding-top: 2.5em;
      font-size: 14px;
      width: 50%;
      height: 100%;
      line-height: 1.6;
      font-weight: 200;
    }
    .modal-content-bottom-absolute-wrapper p:first-of-type {
      margin-right: 6vw;
    }
    .left.p-content-bottom {
      background-color: red;
      background: linear-gradient(
        100deg,
        rgba(175, 66, 97, 1) 10%,
        rgba(243, 236, 120, 1) 100%
      );
      background-size: 100%;
      background-repeat: repeat;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
    }
    .right.p-content-bottom {
    background-color: red;
    background: linear-gradient(
      72deg,
      rgba(243, 236, 120, 1) 0%,
      rgba(175, 66, 97, 1) 90%
    );
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;

    }
  }
  @media screen and (max-width: 620px) {
    .modal-wrapper {
      width: 99vw;
    }
    .modal-content-top-paragraph-wrapper p {
      /* padding: 0.5em 2.8em 0.5em 4em; */
      /* margin-right: 0.5em;
      margin-left: 0.5em; */
      font-size: 1.8rem;
      /* font-size: clamp(1.6rem, 1.6vw, 2.5rem); */
      line-height: 2.4em;
      font-weight: 400;
    }
    .modal-content-bottom-absolute-wrapper p {
      /* padding: 0 .5em 0 .5em; */
      padding-top: 1.5em;
      font-size: 14px;
      width: 50%;
      height: 100%;
      line-height: 1.6;
      font-weight: 200;
    }
    .modal-content-bottom-absolute-wrapper p:first-of-type {
      padding-left: 2.5em;
    }
    .modal-content-bottom-absolute-wrapper p:last-of-type {
      padding-right: 2em;
    }
    .br-bottom {
      display: none;
    }
  }
  @media screen and (max-width: 550px) {
    .modal-wrapper {
      height: 85vh;
      margin-top: -1rem;
    }
  .modal-content-top-paragraph-wrapper {
    margin-top: 3.5em;
  }
    .left.p-content {
      text-align: right;
      background-color: red;
      background: linear-gradient(
        115deg,
        rgba(175, 66, 97, 1) 1%,
        rgba(243, 236, 120, 1) 90%
      );
      background-size: 100%;
      background-repeat: repeat;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
    }
    .right.p-content {
      background-color: red;
      background: linear-gradient(
        72deg,
        rgba(243, 236, 120, 1) 1%,
        rgba(175, 66, 97, 1) 99%
      );
      background-size: 100%;
      background-repeat: repeat;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
    }

    .modal-content-bottom-absolute-wrapper p {
      padding-top: 0em;
      font-size: 14px;
      width: 50%;
      height: 100%;
      line-height: 1.4;
      font-weight: 300;
    }
    .modal-content-bottom-absolute-wrapper p:first-of-type {
      padding-left: 1em;
      padding-right: .7em;
    }
    .modal-content-bottom-absolute-wrapper p:last-of-type {
      padding-right: 1em;
      padding-left: .7em;
    }
    .left.p-content-bottom {
      background-color: red;
      background: linear-gradient(
        102deg,
        rgba(175, 66, 97, 1) 0%,
        rgba(243, 236, 120, 1) 70%
      );
      background-size: 100%;
      background-repeat: repeat;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
    }
    .right.p-content-bottom {
    background-color: red;
    background: linear-gradient(
      72deg,
      rgba(243, 236, 120, 1) 40%,
      rgba(175, 66, 97, 1) 100%
    );
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;

    }
    .br-bottom {
      display: none;
    }

    /* p br {
      display: none;
    } */
  }
  @media (max-width: 920px) and (orientation: landscape) {
    z-index: 998;
    .masthead::after,
    .masthead::before {
      height: 150% !important;
      margin-top: -6em !important;
    }
    .modal-wrapper {
      height: 85vh;
      margin-top: -1rem;
    }
    .cancel-wrapper {
      z-index: 999;
    }
  .modal-content-top-paragraph-wrapper {
    margin-top: 0.1em;
    height: 60%;
  }
  .modal-content-top-paragraph-wrapper p {
    line-height: 2em;
  }
    .left.p-content {
      text-align: right;
      background-color: red;
      background: linear-gradient(
        115deg,
        rgba(175, 66, 97, 1) 1%,
        rgba(243, 236, 120, 1) 90%
      );
      background-size: 100%;
      background-repeat: repeat;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
    }
    .right.p-content {
      background-color: red;
      background: linear-gradient(
        72deg,
        rgba(243, 236, 120, 1) 1%,
        rgba(175, 66, 97, 1) 99%
      );
      background-size: 100%;
      background-repeat: repeat;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
    }

    .modal-content-bottom-absolute-wrapper p {
      padding-top: 0em;
      font-size: 14px;
      width: 50%;
      height: 100%;
      line-height: 1.4;
      font-weight: 300;
    }
    .modal-content-bottom-absolute-wrapper p:first-of-type {
      padding-left: 1em;
      padding-right: .7em;
    }
    .modal-content-bottom-absolute-wrapper p:last-of-type {
      padding-right: 1em;
      padding-left: .7em;
    }
    .left.p-content-bottom {
      background-color: red;
      background: linear-gradient(
        102deg,
        rgba(175, 66, 97, 1) 0%,
        rgba(243, 236, 120, 1) 70%
      );
      background-size: 100%;
      background-repeat: repeat;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
    }
    .right.p-content-bottom {
    background-color: red;
    background: linear-gradient(
      72deg,
      rgba(243, 236, 120, 1) 40%,
      rgba(175, 66, 97, 1) 100%
    );
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;

    }
    .br-bottom {
      display: none;
    }

    /* p br {
      display: none;
    } */
  }
`
const ModalAboutUs = ({ showAboutUsModal, setShowAboutUsModal }) => {
  const [isParagraphVisible, setIsParagraphVisible] = useState(false)
  const { backgroundImage } = useStaticQuery(
    graphql`
      query {
        backgroundImage: file(relativePath: { eq: "GetStoryBGNew.png" }) {
          childImageSharp {
            gatsbyImageData(quality: 100, webpOptions: { quality: 90 })
          }
        }
      }
    `
  )

  const pluginImage = getImage(backgroundImage)
  // function toggleParagraphVisible() {
  //   setIsParagraphVisible((prev) => !prev)
  // }
  const [completedSuccessAnimation, setCompletedSuccessAnimation] =
    useState(false)
  useEffect(() => {
    if (completedSuccessAnimation) {
      console.log("animation complete")
      setTimeout(() => {
        setShowAboutUsModal(false)
        setCompletedSuccessAnimation(false)
      }, 1700)
    }
  }, [completedSuccessAnimation])

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {showAboutUsModal ? (
          <Background onClick={() => setShowAboutUsModal((prev) => !prev)}>
            <div className="cancel-wrapper">
              <IconButton onClick={() => setShowAboutUsModal((prev) => !prev)}>
                <CancelIcon
                  aria-label="cancel"
                  sx={{
                    transform: "scale(2)",
                    color: "rgb(84,77,77)",
                  }}
                  onClick={() => setShowAboutUsModal(false)}
                />
              </IconButton>
            </div>
            <motion.div
              className="modal-wrapper"
              showAboutUsModal={showAboutUsModal}
              variants={sayHeyAnimationVariants}
              initial="hidden"
              animate="visible"
              onClick={(e) => e.stopPropagation()}
            >
              <BgImage image={pluginImage} className="masthead">
                <motion.div
                  variants={contactFormAnimationVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="modal-content">
                    <div className="modal-content-top-paragraph-wrapper">
                      <p className="p-content left">
                        <div className="shape-left" />
                        PEOPLE
                        <br />
                        ARE NOT
                        <br />
                        RESOURCES
                        <br />
                        TO BE USED
                        <br />
                        FOR BUSINESS
                      </p>
                      <p className="p-content right">
                        <div className="shape-right" />
                        BUSINESS
                        <br />
                        IS A WAY
                        <br />
                        FOR PEOPLE
                        <br />
                        TO LIVE FROM
                        <br />
                        THEIR PASSION
                      </p>
                    </div>
                    <div className="modal-content-bottom-absolute-wrapper">
                      <p className="p-content-bottom left">
                        <div className="bottom-shape-left" />
                        Rubicon Story Inc. is restoring
                        <br className="br-bottom"/>
                        {" "}passion to the forefront of the creative
                        <br className="br-bottom"/>
                        {" "}industry rethinking how creative individuals
                        <br className="br-bottom"/>
                        {" "}are discovered developed managed and
                        <br className="br-bottom"/>
                        {" "}empowered with first of its kind
                        <br className="br-bottom"/>
                        {" "}creativity platform — Rubi.
                      </p>
                      <p className="p-content-bottom right">
                        <div className="bottom-shape-right" />
                        {" "}Rubi is the virtual character
                        <br className="br-bottom"/>
                        {" "}who supports creatives in producing
                        <br className="br-bottom"/>
                        {" "}passion projects through Studio,
                        <br className="br-bottom"/>
                        {" "}paying projects through Service and
                        <br className="br-bottom"/>
                        {" "}supporting creatives through Software
                        <br className="br-bottom"/>— the 3 divisions of Rubicon.
                      </p>

                    </div>
                  </div>
                </motion.div>
              </BgImage>
            </motion.div>
          </Background>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default ModalAboutUs
