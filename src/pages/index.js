import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import StaticHeader from "../components/StaticHeader"
import MediaProduction from "../components/MediaProduction"
import MediaProductionNew from "../components/MediaProductionNew"
import MediaProductionStaticFallback from "../components/MediaProductionStaticFallback"
import ModalMore from "../components/ModalMore"
import ModalSayHey from "../components/ModalSayHey"
import ModalAboutUs from "../components/ModalAboutUs"
import ClientGallery from "../components/ClientGallery"
import VideoLogos from "../components/VideoLogos"
import OriginalStories from "../components/OriginalStories"
import OriginalStoriesMobile from "../components/OriginalStoriesMobile"
import { ParallaxProvider } from "react-scroll-parallax"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import styled from "styled-components"
import VideoLogosMiddle from "../components/VideoLogosMiddle"
import VideoLogosMobile from "../components/VideoLogosMobile"
import VideoLogosMobileLandscape from "../components/VideoLogosMobileLandscape"
import Navigation from "../components/Navigation"
import jankcb from "../components/functions/jankcb.js"
import ClientCarousel from "../components/ClientCarousel"
// import useDeviceDetect from "../components/hooks/useDeviceDetect"

const isBrowser = typeof window !== "undefined"
// the bottom offset used for setting isBottom state, it's an invisible div at the bottom of the page that is used to check if the user has scrolled to the bottom of the page and the ref is used to set the isBottom state through the useInView hook
const StyledBottom = styled.div`
  height: 40px;
  /* border: 1px solid red; */
  /* min-height: -webkit-fill-available; */

  @media (max-width: 620px) {
    /* height: 70px; */
    display: none;
    /* transform: translateY(-100%); */
    /* min-height: -webkit-fill-available;
    border: 1px solid red; */
  }
  @media (max-width: 920px) and (orientation: landscape) {
    display: none;
  }
`
const AnimatedSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
`
const Agency = ({ isVideoVisible }) => {
  // state for checking if user scrolled to the bottom of the page
  const [isBottom, setIsBottom] = useState(false)
  // state for checking if it's a first render
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  // state for checking is the user has scrolled
  const [isScrollFired, setIsScrollFired] = useState(false)
  // local state for timing the delay of opacity on the rest of the page so it can load in the background and be ready to be seen once the opening sequence is finished
  const [isAnimationTriggered, setIsAnimationTriggered] = useState(false)
  // state for checking if window was resized
  const [dimensions, setDimensions] = useState({
    height: isBrowser && window.innerHeight,
    width: isBrowser && window.innerWidth,
  })
  // const [isTop, setIsTop] = useState()
  const [isWindowTop, setIsWindowTop] = useState(false)
  // const [isMobilePortrait, setIsMobilePortrait] = useState(false)
  const [isMedium, setIsMedium] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isMobilePortrait, setIsMobilePortrait] = useState(false)
  const [isMobileLandscape, setIsMobileLandscape] = useState(false)
  // state for checking FPS loss, if true then parallax replaced with static fallback (MediaProductionStaticFallback - incomplete)
  const [isJank, setIsJank] = useState(false)

  // state for toggling the nav
  const [showNav, setShowNav] = useState(false)

  // state for toggling the modal
  const [showModalMore, setShowModalMore] = useState(false)
  const [showSayHeyModal, setShowSayHeyModal] = useState(false)
  const [showAboutUsModal, setShowAboutUsModal] = useState(false)
  console.log("is video visible", isVideoVisible)

  // intersection observer hook for checking if user scrolled to the bottom of the page via handleResize()
  const { ref, inView } = useInView({
    threshold: 1,
  })
  useEffect(() => {
    if (inView) {
      setIsBottom(true)
    } else {
      setIsBottom(false)
    }
  }, [inView])

  //callback for jankcb
  const handleJank = () => {
    setIsJank(true)
  }

  // test fps of the page
  useEffect(() => {
    window.jankcb(handleJank)
  }, [])

  // function for checking if window was resized
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

  // set breakpoints for responsiveness
  //these breakpoints help with placing the correct video logo on render as well as resize
  //resize of the window is hooked into the useEffect hook above
  useEffect(() => {
    console.log("dim current", dimensions.width)
    if (dimensions.width < 620 && dimensions.height > dimensions.width) {
      console.log("mobile")
      setIsMobileLandscape(false)
      setIsMobilePortrait(true)
      setIsMedium(false)
      setIsDesktop(false)
    }
    if (
      dimensions.width >= 620 &&
      dimensions.width < 920 &&
      dimensions.height > dimensions.width
    ) {
      console.log("medium")
      setIsMobileLandscape(false)
      setIsMobilePortrait(false)
      setIsMedium(true)
      setIsDesktop(false)
    }
    if (dimensions.width >= 920 && dimensions.width > dimensions.height) {
      console.log("desktop")
      setIsMobileLandscape(false)
      setIsMobilePortrait(false)
      setIsMedium(false)
      setIsDesktop(true)
    }
    if (
      dimensions.width <= 800 &&
      dimensions.width >= 300 && 
      dimensions.height <= 450 &&
      dimensions.height >= 169
    ) {
      console.log("mobile landscape")
      setIsMobileLandscape(true)
      setIsMobilePortrait(false)
      setIsMedium(false)
      setIsDesktop(false)
    }
  }, [dimensions.width, dimensions.height])

  // check scroll position
  // if window is refreshed anywhere but on top of the page the static header with rest of the page is rendered as opposed to the opening animation

  useEffect(() => {
    if (isBrowser) {
      if (window.scrollY === 0) {
        setIsWindowTop(true)
      } else {
        setIsWindowTop(false)
      }
    }
  }, [])

  //scroll function for isFirstLoad, when fired it also sets isScrollFired to true which is passed to the Header component to start the opening animation after 1s delay
  const handleScroll = () => {
    if (
      isBrowser &&
      isFirstLoad &&
      isWindowTop &&
      !isMobilePortrait &&
      !isMobileLandscape
    ) {
      setIsScrollFired(true)
      // smooth scroll on safari not working atm
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
      })
    } else {
      return
    }
  }

  //scroll event liestener for first load animation only fires if when at the top for the first time
  useEffect(() => {
    if (
      isFirstLoad &&
      window.pageYOffset === 0 &&
      !isMobilePortrait &&
      !isMobileLandscape &&
      isWindowTop
    ) {
      window.addEventListener("scroll", handleScroll, { passive: true })
      setIsAnimationTriggered(true)
      return () => window.removeEventListener("scroll", handleScroll)
    }
    if (!isFirstLoad) {
      console.log("out")
      return
    }
  }, [
    isFirstLoad,
    handleScroll,
    isAnimationTriggered,
    isMobileLandscape,
    isMobilePortrait,
    isWindowTop,
  ])

  //scroll event listenenr for scroll shimmer on page load

  //shimmer is activated on scroll and passess through the main title. Due to perf issues currently turned off.
  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        document.body.style.setProperty(
          "--scroll",
          window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
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
    //select body and set overflow to hidden when modal is open

    if (showSayHeyModal || showAboutUsModal || showModalMore) {
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = "12px"
    } else {
      document.body.style.overflow = "auto"
      document.body.style.paddingRight = "0px"
    }
  }, [showSayHeyModal, showAboutUsModal, showModalMore])

  const componentAnimation = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 1, duration: 0.2 } },
  }

  return (
    // <AnimatePresence exitBeforeEnter>
    <ParallaxProvider>
      {isFirstLoad && isWindowTop && !isMobilePortrait && !isMobileLandscape ? (
        <>
          <Navigation
            isFirstLoad={isFirstLoad}
            isMobilePortrait={isMobilePortrait}
            isDesktop={isDesktop}
            isMedium={isMedium}
          />
          <Header
            isFirstLoad={isFirstLoad}
            setIsFirstLoad={setIsFirstLoad}
            isScrollFired={isScrollFired}
            setIsScrollFired={setIsScrollFired}
            isWindowTop={isWindowTop}
            dimensions={dimensions}
          />
        </>
      ) : (
        // {/* //if it's not the first load, the rest of the page is animated with framer-motion and the header is swapped for a static header */}
        <>
          <Navigation
            isFirstLoad={isFirstLoad}
            setShowSayHeyModal={setShowSayHeyModal}
            setShowAboutUsModal={setShowAboutUsModal}
            isVideoVisible={isVideoVisible.isVideoVisible}
          />

          <StaticHeader />

          <AnimatedSection
            variants={componentAnimation}
            initial="hidden"
            animate="visible"
          >
            <ModalMore
              showModalMore={showModalMore}
              setShowModalMore={setShowModalMore}
            />
            <ModalSayHey
              showSayHeyModal={showSayHeyModal}
              setShowSayHeyModal={setShowSayHeyModal}
            />
            <ModalAboutUs
              showAboutUsModal={showAboutUsModal}
              setShowAboutUsModal={setShowAboutUsModal}
            />
            {!isJank ? (
              <MediaProductionNew
                isMobilePortrait={isMobilePortrait}
                setShowModalMore={setShowModalMore}
              />
            ) : (
              <MediaProductionStaticFallback
                isMobilePortrait={isMobilePortrait}
                setShowModalMore={setShowModalMore}
              />
            )}
            <>
              {!isBottom && isMobilePortrait ? (
                <>
                  <VideoLogosMobile />
                  <ClientGallery isJank={isJank} />
                  <ClientCarousel dimensions={dimensions} />
                  <OriginalStoriesMobile  setShowAboutUsModal={setShowAboutUsModal}/>
                </>
              ) : !isBottom && isMobileLandscape ? (
                <>
                  <VideoLogosMobileLandscape />
                  <OriginalStories setShowAboutUsModal={setShowAboutUsModal} />
                </>
              ) : !isBottom && isMedium ? (
                <>
                  <VideoLogosMiddle isBottom={isBottom} />
                  <ClientGallery />
                  <ClientCarousel dimensions={dimensions} />
                </>
              ) : !isBottom && isDesktop ? (
                <>
                  <VideoLogos isBottom={isBottom} />
                  <ClientGallery />
                  <ClientCarousel dimensions={dimensions} />
                </>
              ) : isBottom && !isMobilePortrait && !isMobileLandscape && !isMedium? (
                <OriginalStories isBottom={isBottom} setShowAboutUsModal={setShowAboutUsModal} />
              ) : isBottom && isMedium ?  (
                <OriginalStoriesMobile isBottom={isBottom} setShowAboutUsModal={setShowAboutUsModal} />
                // <ClientGallery />
                // <div>no match</div>
              ) : <div>no match</div>}

              <StyledBottom ref={ref} className="bottom" />
            </>
          </AnimatedSection>
        </>
      )}
    </ParallaxProvider>
  )
}

export default Agency
