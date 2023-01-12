import React, { useState, useEffect } from "react"
import GlobalStyles from "../styles/GlobalStyles"
import Typography from "../styles/Typography"
// import Video from "../components/Video"
import VideoTopSection from "../components/VideoTopSection"
import VideoTopSectionMobile from "../components/VideoTopSectionMobile"
import Story from "../assets/video/Story-lg.mp4"
import { useInView } from "react-intersection-observer"
import Navigation from "../components/Navigation"
import ContactFormPage from "../components/ContactFormPage"

//modals
import ModalSayHey from "../components/ModalSayHey"
import ModalAboutUs from "../components/ModalAboutUs"

const isBrowser = typeof window !== "undefined"

export default function Layout({ children }) {
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const [videoFailed, setVideoFailed] = useState()

  const [dimensions, setDimensions] = useState({
    height: isBrowser && window.innerHeight,
    width: isBrowser && window.innerWidth,
  })

  const [isMobilePortrait, setIsMobilePortrait] = useState(false)

  const [showSayHeyModal, setShowSayHeyModal] = useState(false)
  const [showAboutUsModal, setShowAboutUsModal] = useState(false)
  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      isVideoVisible: { isVideoVisible },
      videoFailed: { videoFailed },
      // anything you want to pass down can go here
    })
  )
  const [ref, inView] = useInView({
    threshold: 0.001,
  })

  useEffect(() => {
    function handleResize() {
      console.log("resize")
      setDimensions({
        height: isBrowser && window.innerHeight,
        width: isBrowser && window.innerWidth,
      })
    }
    window.addEventListener("resize", handleResize)

    return (_) => {
      window.removeEventListener("resize", handleResize)
    }
  }, [dimensions])

  useEffect(() => {
    if (dimensions.width / dimensions.height < 1) {
      setIsMobilePortrait(true)
    } else {
      setIsMobilePortrait(false)
    }
  }, [dimensions.width, dimensions.height])

  useEffect(() => {
    if (inView) {
      setIsVideoVisible(true)
    }
    if (!inView) {
      setIsVideoVisible(false)
    }
  }, [ref, inView])

  // uVjseEffect(() => {
  //   window.addEventListener('scroll', function()) {
  //     if (document)
  //   }
  // })
  useEffect(() => {
    //select body and set overflow to hidden when modal is open

    if (showSayHeyModal || showAboutUsModal ) {
      document.body.style.overflow = "hidden"
      // document.body.style.paddingRight = "12px"
    } else {
      document.body.style.overflow = "auto"
      // document.body.style.paddingRight = "0px"
    }
  }, [showSayHeyModal, showAboutUsModal])

  const componentAnimation = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7 } },
  }

  return (
    <div>
      <GlobalStyles />
      <Typography />
      {/* NetlifyForm needs to be in the dom for netlify to find it. dont remove */}
       <div style={{display: "none"}}>
        <ContactFormPage />
       </div>
      <div ref={ref}>
        <VideoTopSectionMobile
          src={Story}
          noControls={true}
          setVideoFailed={setVideoFailed}
          isMobilePortrait={isMobilePortrait}
          videoFailed={videoFailed}
        />
        {/* <Video src={Story} noControls={true} /> */}
        {/* {isMobilePortrait ? (
          <VideoTopSectionMobile src={Story} noControls={true} setVideoFailed={setVideoFailed} videoFailed={videoFailed}/>
          ) : (
            <VideoTopSection src={Story} noControls={true} setVideoFailed={setVideoFailed} videoFailed={videoFailed}/>
          )} */}
        {/* <Video src={Story} noControls={true} /> */}
      </div>
      <Navigation
        isVideoVisible={isVideoVisible}
        setShowSayHeyModal={setShowSayHeyModal}
        setShowAboutUsModal={setShowAboutUsModal}
        isMobilePortrait={isMobilePortrait}
      />
      <ModalSayHey
        showSayHeyModal={showSayHeyModal}
        setShowSayHeyModal={setShowSayHeyModal}
      />
      <ModalAboutUs
        showAboutUsModal={showAboutUsModal}
        setShowAboutUsModal={setShowAboutUsModal}
      />
      {childrenWithProps}
    </div>
  )
}
