import React, { useRef, useEffect, useState } from "react"
import ContactFormPage from "../components/ContactFormPage"
import { motion, AnimatePresence } from "framer-motion"
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
    padding: 1em 2em;
    position: relative;
    border-radius: 20px;
    background: #373434;
    box-shadow: inset 5px 5px 10px #2c2a2a, inset -5px -5px 10px #423e3e;
    z-index: 992;

    h3 {
      font-size: clamp(2rem, 1.6vw, 2.2rem);
      font-weight: 500;
      /* justify-content: center; */
      text-align: center;
      margin-top: 0.5em;
      margin-bottom: 1.5em;
    }
    p {
      margin-bottom: 0.4em;
      font-size: clamp(1.3rem, 1.5vw, 1.3rem);
    }
  }
  @media screen and (max-width: 620px) {
    .modal-wrapper {
      min-width: 90vw;
    }
  }
`
const ModalSayHey = ({ showSayHeyModal, setShowSayHeyModal}) => {
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
        setShowSayHeyModal(false)
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
        {showSayHeyModal ? (
          <Background onClick={() => setShowSayHeyModal((prev) => !prev)}>
            {/* <Background > */}
              <div className="cancel-wrapper">
                <IconButton onClick={() => setShowSayHeyModal((prev) => !prev)}>
                  <CancelIcon
                    aria-label="cancel"
                    sx={{
                      transform: "scale(2)",
                      color: "rgb(84,77,77)",
                    }}
                    onClick={() => setShowSayHeyModal(false)}
                  />
                </IconButton>
              </div>
            <motion.div
              className="modal-wrapper"
              showSayHeyModal={showSayHeyModal}
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
              <h3 id="modal-hey">hey</h3>
              {/* <p>who are you?</p> */}
              <motion.div
                variants={contactFormAnimationVariants}
                initial="hidden"
                animate="visible"
              >
                <ContactFormPage
                  completedSuccessAnimation={completedSuccessAnimation}
                  setCompletedSuccessAnimation={setCompletedSuccessAnimation}
                />
              </motion.div>
            </motion.div>
          </Background>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default ModalSayHey
