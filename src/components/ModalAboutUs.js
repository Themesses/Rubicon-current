import React, {  useEffect, useState } from "react"
import {  graphql, useStaticQuery } from "gatsby"
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
    width: 45vw;
    height: 80vh;
    position: relative;
    background: #373434;
    z-index: 992;

    h2 {
      color: var(--beige);
    }
    h3 {
      font-size: clamp(2rem, 1.6vw, 2.2rem);
      font-weight: 500;
      text-align: center;
      margin-top: 0.5em;
      margin-bottom: 1.5em;
    }
    p {
      margin-bottom: 0.4em;
      font-size: clamp(1.6rem, 1.5vw, 1.6rem);
      line-height: 1.4;
    }
  }
  .modal-content {
    position: relative;
    overflow-y: auto;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .modal-content h2 {
    /* margin-bottom: 50rem; */
  }
  .modal-content-title {
    text-align: center;
    margin-top: 2em;
  }
  .modal-content-top-paragraph-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 2em;
  }
  .modal-content-top-paragraph-wrapper p {
    padding: 0.5em 4em 0.5em 4em;
    text-align: center;
  }
  .modal-content-bottom-absolute-wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    width: 100%;
    height: 35%;
    top: 50%;
    bottom: 0;
    left: 0;
  }
  .modal-content-bottom-title {
    position: relative;
    margin-top: 1em;
    padding-bottom: 2em;
    text-align: center;
  }
  .modal-button-rubi {
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    width: 2.6em;
    height: 2.6em;
    border-radius: 50%;
    position: relative;
  }
  .modal-content-skewed-wrapper p {
    padding: 0 2em;
    position: absolute;
    transform-style: preserve-3d;
    transform: rotateX(50deg);
    text-align: center;
    line-height: 1.5;
  }
  .modal-logo {
    position: relative;
    height: auto;
    margin: 0;
    padding: 0;
    width: 2.8em;
    border-radius: 50%;
    /* box-shadow: inset 0px 0px 10px 10px var(--gold); */
    /* filter: drop-shadow(0 0 0.6em var(--gold)); */
    /* border-radius: 50%; */
    /* margin:1.em 1em 1em 1em; */
    /* height:1em; */
  }
  .modal-button-h2 {
    position: absolute;
    display: flex;
    color: var(--black) !important;
    font-weight: 600;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateY(-5%);
  }
  .modal-bottom-paragraph {
    background: transparent;
    /* background: radial-gradient(circle at center, ) */
    background: radial-gradient(closest-side, rgba(255, 184, 0, 0.7), rgba(247,220, 150 , 0.6), transparent);
    /* background: radial-gradient(
      circle,
      rgba(2, 0, 36, 1) 0%,
      rgba(249, 246, 189, 0.2332268370607029) 25%,
      rgba(255, 255, 255, 0.01) 70%
    ); */
    position: absolute;
    display: flex;
    border-radius: 60%;
    align-items: center;
    justify-content: center;
    /* width: 80%; */
    width: 80%;
    height: 35vh;
    margin: 0 auto;
    top: 55%;
    /* bottom: 50%; */
    /* border: 1px solid red; */
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateY(-50%);
  }
  .modal-bottom-paragraph {
    text-align: center;
  }
  .modal-bottom-paragraph p {
    /* color: var(--black);
    font-weight: 400; */
  }
  /* .modal-content-skewed-crawl {
    position: relative;
    transform-origin: 50% 100%;
  } */

  /* img {
    width: 3em;
    height: auto;
    margin-top: 4em;
  } */
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
  }
  @media screen and (max-width: 620px) {
    .modal-wrapper {
      width: 95vw;
    }
    h2 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.4rem !important;
    }
    .modal-content-top-paragraph-wrapper p {
      padding: .4em 1em .4em 1em;
    }
  }
  @media screen and (max-width: 500px) {
     p br {
      display: none;
    }

  }
`
const ModalAboutUs = ({ showAboutUsModal, setShowAboutUsModal }) => {
  const [isParagraphVisible, setIsParagraphVisible] = useState(false)
  const { backgroundImage } = useStaticQuery(
    graphql`
      query {
        backgroundImage: file(relativePath: { eq: "GetStoryBG.png" }) {
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
            {/* <Background > */}
              <div className="cancel-wrapper">
                <IconButton onClick={() => setShowAboutUsModal((prev) => !prev)}>
                  <CancelIcon
                    aria-label="cancel"
                    sx={{
                      // position: "absolute",
                      transform: "scale(2)",
                      // top: "0",
                      // left: "0",
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
              // style={
              //   showSayHeyModal
              //     ? { transform: "translateX(0px)", opacity: 1 }
              //     : { opacity: "0", transform: "translateX(100px)" }
              // }
            >
              <BgImage image={pluginImage} className="masthead">
                {/* <div className="cancel-wrapper">
                <IconButton>
                  <CancelIcon
                    aria-label="cancel"
                    sx={{
                      position: "absolute",
                      transform: "scale(1.3)",
                      top: "0",
                      left: "0",
                      color: "rgb(84,77,77)",
                    }}
                    onClick={() => setShowAboutUsModal(false)}
                  />
                </IconButton>
              </div> */}
                {/* <h3 id="modal-hey">hey</h3> */}
                {/* <p>who are you?</p> */}

                <motion.div
                  variants={contactFormAnimationVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="modal-content">
                    <div className="modal-content-title">
                      <h2>
                        The <span>story</span> of work & career
                        <br />
                        has changed forever.
                      </h2>
                    </div>
                    <div className="modal-content-top-paragraph-wrapper">
                      <p>
                        People are no longer
                        <br />
                        resources to achieve
                        <br />
                        business objectives.
                      </p>
                      <p>
                        Business objectives
                        <br />
                        are opportunities to live
                        <br />
                        your passion.
                      </p>
                    </div>
                    <div className="modal-content-bottom-absolute-wrapper">
                      <p className="modal-content-bottom-title">
                        <span>Rubicon Story Inc.</span> is restoring passion to the forefront of the <br/>
                        creative industry, rethinking how creative individuals are discovered, <br className="mb-remove"/>
                        developed, managed and empowered with a first of its kind <br/>
                        professional creativity platform — {" "}
                        <span onClick={() => setShowAboutUsModal(false)} style={{fontWeight: '400', cursor: 'pointer'}}>Rubi</span>
                      </p>
                      {/* {(isParagraphVisible) ? (
                        <div className="modal-bottom-paragraph">
                          <p>
                            Powered by a proprietary "networkflow",
                            <br />
                            Rubi digitize and integrates a smart network with{" "}
                            <br />a smart workflow, rethinking how creative
                            individuals
                            <br />
                            are discovered, developed, managed and empowered.
                          </p>
                        </div>
                      ): null
                      } */}
                      {/* <button className="modal-button-rubi" onClick={toggleParagraphVisible}> */}
                      {/* <button className="modal-button-rubi" onClick={() => {(<Link to="/platform" />)}}> */}
                      {/* <Link to="/platform#main" className="modal-button-rubi"> */}
                        <StaticImage
                          src="../assets/images/rubi-icon.png"
                          className="modal-logo"
                          onClick={() => setShowAboutUsModal(false)}
                        />
                      {/* </Link> */}
                      {/* </button> */}
                      {/* <div className="modal-content-skewed-wrapper"> */}
                      {/* <div className="modal-content-skewed-crawl"> */}
                      {/* <p>
                          <span style={{fontSize: "1.7rem", color: "var(--beige)" }}>Powered by a proprietary "networkflow",<br /></span>Rubi digitize
                          and integrates a smart network with <br />a smart workflow,
                          rethinking how creative individuals<br />are discovered,
                          developed, managed and empowered.
                        </p> */}
                      {/* </div> */}
                      {/* </div> */}
                      {/* <img src={Icon} alt="rubi logo"/> */}
                    </div>
                  </div>
                  {/* <ContactFormPage
                  completedSuccessAnimation={completedSuccessAnimation}
                  setCompletedSuccessAnimation={setCompletedSuccessAnimation}
                /> */}
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