import React, { useRef } from "react"
import PropTypes from "prop-types"
import { StaticImage } from "gatsby-plugin-image"
import { motion } from "framer-motion"

const isBrowser = typeof window !== "undefined"

const renderVideo = ({
  noControls,
  src,
  vidButtonRef,
  vidRef,
  handleToggleVideo,
  handlePause,
}) => (
  <>
    {noControls ?

    (
      <div
      // ref={vidScreenRef}
      className="video video_play-button"
      // onClick={handleToggleVideo}
      style={{
        position: "relative",
        // cursor: "pointer",
      }}
      >
        {/* <div
        ref={posterRef}
        style={{
          display: 'hidden',
        }}
      > */}
        <StaticImage
          src="../assets/images/video_poster.png"
          alt=""
          id="posterOverlay"
          className="poster22-overlay"
          style={{
            display: "block",
            position: "absolute",
            zIndex: "1",
            height: "100%",
            width: "100%",
          }}
        />
        {/* </div> */}

        <div
          className="button play-button"
          id="button"
          // className="button"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              // transition: { duration: 0.3 },
            }}
            ref={vidButtonRef}
            className="toggle-button"
            onClick={handleToggleVideo}
            style={{
              position: "absolute",
              top: "50%",
              color: "var(--gold)",
              fontFamily: "Lexend Deca",
              fontSize: "clamp(1.4rem, 2vmax, 2rem)",
              padding: "clamp(1.4rem, 2vmax, 2rem)",
              borderRadius: "0.5rem",
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: "100",
            }}
          >
            watch reel
          </motion.button>
        </div>
        <video
          ref={vidRef}
          controlsList="nodownload"
          preload="metadata"
          // onPause={() => {
          //   const navigation = isBrowser
          //   ? document.getElementById("header")
          //   : ""
          //   const posterOverlay = isBrowser
          //   ? document.getElementsByClassName("poster22-overlay")
          //   : ""
          //   console.log("nav", navigation)
          //   posterOverlay[0].style.display = "block"
          //   vidButtonRef.current.classList.remove("is-playing")
          //   vidButtonRef.current.style.display = "flex"
          // }}
          onEnded={() => {
            const posterOverlay = isBrowser
            ? document.getElementsByClassName("poster22-overlay")
            : ""
            vidButtonRef.current.classList.remove("is-playing")
            vidButtonRef.current.style.display = "flex"
            vidRef.current.load()
            vidRef.current.controls = false
            posterOverlay[0].style.display = "block"
          }}
          style={{
            position: "relative",
            width: "100%",
            maxHeight: "100vh",
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
          {/* <Navigation /> */}
      </div>
    ) : (
      <video src={src} controls controlsList="nodownload"></video>
      // <video src={src} ></video>
      )}
  </>
)

export default function Video({ src, poster, noControls, onEnded }) {
  const vidRef = useRef(null)
  const vidButtonRef = useRef(null)
  const navigation = isBrowser ? document.getElementById("header") : ""
  const posterOverlay = isBrowser
    ? document.getElementsByClassName("poster22-overlay")
    : ""


  const handlePlay = () => {
    vidRef.current.play()
    vidRef.current.controls = true
    vidButtonRef.current.classList.add("is-playing")
    vidButtonRef.current.style.display = "none"
    posterOverlay[0].style.display = "none"
    console.log("navigation", navigation)
    navigation ? console.log('there', navigation): console.log ('not', navigation)
  }

  const handlePause = () => {
    vidRef.current.pause()
    vidRef.current.controls = false
    vidButtonRef.current.classList.remove("is-playing")
    vidButtonRef.current.style.display = "flex"
    posterOverlay[0].style.display = "block"
    // navigation.style.display = "flex"
  }
  const handleToggleVideo = () =>
    vidRef.current.paused ? handlePlay() : handlePause()
  return (
    <>
      {renderVideo({
        noControls,
        // poster,
        src,
        vidButtonRef,
        vidRef,
        handleToggleVideo,
        onEnded,
      })}
    </>
  )
}

Video.propTypes = {
  noControls: PropTypes.bool,
  videoUrl: PropTypes.string,
}
