import React, { useRef, useEffect, useState } from "react"
// import { Context } from "../components/Context"
import { motion, AnimatePresence } from "framer-motion"
// import { IconButton, CancelIcon } from "@mui/material"
import { IconButton } from "@mui/material"
import CancelIcon from "@mui/icons-material/Cancel"
import styled from "styled-components"

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const sayHeyAnimationVariants = {
  hidden: {
    opacity: 0,
    // x: 40,
    // height: "0",
    // width: "0",
    scale: 0,
    transition: {
      type: "spring",
      // duration: 1,
      stiffness: 110,
    },
  },
  visible: {
    opacity: 1,
    // x:  0,
    // height: "max-content",
    // width: "max-content",
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
  /* background: rgba(255, 255, 255, 0.5); */
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
  /* overflow: hidden !important; */
  /* border: 1px solid red; */
  z-index: 999;
  /* transition: 1s; */
  /* z-index: 991; */
  .cancel-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 60px;
    width: 60px;
    /* border: 1px solid red; */
    top: 0;
    left: 0;
  }
  .modal-wrapper {
    padding: 3em 2em;
    position: relative;
    border-radius: 20px;
    background: #373434;
    box-shadow: inset 5px 5px 10px #2c2a2a, inset -5px -5px 10px #423e3e;
    z-index: 992;
    max-width: 800px;

    h3 {
      font-size: clamp(2rem, 1.6vw, 2.2rem);
      font-weight: 200;
      /* justify-content: center; */
      text-align: center;
      margin-top: 0.5em;
      margin-bottom: 1.5em;
    }
    p {
      margin-bottom: 0.4em;
      font-size: clamp(1.3rem, 1.5vw, 1.3rem);
    }
    ul {
      list-style: none;
      font-size: 16px;
      font-weight: 200;
    }
    .with-border {
      display: grid;
      grid-template-columns: 1.5fr 1.5fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: .5em 1em;
      grid-auto-flow: row;
      grid-template-areas:
        "main sub1 sub2"
        "main sub3 sub4";
      margin: 0 0 2em 0;
      padding: 0;
    }

    .main {
      grid-area: main;

    }

    .sub1 {
      grid-area: sub1;
    }

    .sub2 {
      grid-area: sub2;
    }

    .sub3 {
      grid-area: sub3;
    }

    .sub4 {
      grid-area: sub4;
    }

    .with-border li {
      border: 1px solid var(--gold);
      border-radius: 5px;
      text-align: center;
      padding: 0.25em 1em;
    }
    .main-group {
      display: flex;
      justify-content: space-around;
      padding: 0;
    }
    .main-group li {
      /* justify-content: center; */
      text-align: left;
      font-weight: 400;
      padding: 0.25em 0;
    }
    .sub-group {
      display: flex;
      flex-direction: column;
      margin: .5em 0 0 0;
      padding: 0;
      /* justify-content: center; */
    }
    .sub-group li {
      text-align: left;
      font-weight: 200;
    }
  }
  @media screen and (max-width: 620px) {
    .modal-wrapper {
      min-width: 50vw;
      ul {
        font-size: 14px;
      }
      .with-border {
        gap: .3em;
      }
      .with-border li {
        font-size: 12px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
    }
  }
`
const ModalMore = ({ showModalMore, setShowModalMore }) => {
  // const [showSayHeyModal, setShowSayHeyModal] = useState(true)
  // export const ModalSayHey = ({ showSayHeyModal, setShowSayHeyModal }) => {
  // const { showSayHeyModalContext, setShowSayHeyModalContext } = useContext(Context)
  // console.log("modal", showSayHeyModal)
  const sayHeyModalRef = useRef()
  const [completedSuccessAnimation, setCompletedSuccessAnimation] =
    useState(false)
  useEffect(() => {
    if (completedSuccessAnimation) {
      console.log("animation complete")
      setTimeout(() => {
        setShowModalMore(false)
        setCompletedSuccessAnimation(false)
      }, 1700)
    }
  }, [completedSuccessAnimation])

  // useEffect(() => {
  //   if (showSayHeyModal) {
  //     document.body.style.overflow = "hidden"
  //     document.body.style.marginRight = "12px"
  //   }
  //   if (!showSayHeyModal) {
  //     document.body.style.overflow = "unset"
  //     document.body.style.marginRight = "0px"
  //   }
  // }, [showSayHeyModal])
  return (
    // <AnimatePresence exitBeforeEnter>
    <>
      <AnimatePresence exitBeforeEnter>
        {showModalMore ? (
          <Background onClick={() => setShowModalMore((prev) => !prev)}>
            {/* <Background > */}
            <div className="cancel-wrapper">
              <IconButton onClick={() => setShowModalMore((prev) => !prev)}>
                <CancelIcon
                  aria-label="cancel"
                  sx={{
                    transform: "scale(2)",
                    color: "rgb(84,77,77)",
                  }}
                  onClick={() => setShowModalMore(false)}
                />
              </IconButton>
            </div>
            <motion.div
              className="modal-wrapper"
              showSayHeyModal={showModalMore}
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
              <h3 id="modal-hey">
                Focused on creative storytelling, Rubicon supports:
              </h3>
              {/* <p>who are you?</p> */}
              <motion.div
                variants={contactFormAnimationVariants}
                initial="hidden"
                animate="visible"
              >
                <ul className="with-border">
                  <li className="main">
                    communications teams<br/>at large corporations
                  </li>
                  <li className="sub1">production companies</li>
                  <li className="sub2">producers</li>
                  <li className="sub3">smb marketing teams</li>
                  <li className="sub4">artists</li>
                </ul>
                <ul className="main-group">
                  <li>
                    providing
                    <ul className="sub-group">
                      <li>ideation & scripting</li>
                      <li>pre-production</li>
                      <li>production</li>
                      <li>post-production</li>
                    </ul>
                  </li>
                  <li>
                    delivering
                    <ul className="sub-group">
                      <li>film / video</li>
                      <li>graphics & illustration</li>
                      <li>audio / music</li>
                      <li>web & game products</li>
                    </ul>
                  </li>
                </ul>
                {/* <ContactFormPage
                  completedSuccessAnimation={completedSuccessAnimation}
                  setCompletedSuccessAnimation={setCompletedSuccessAnimation}
                /> */}
              </motion.div>
            </motion.div>
          </Background>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default ModalMore
