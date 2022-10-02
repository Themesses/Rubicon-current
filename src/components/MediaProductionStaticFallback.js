import React,{ useEffect, useState} from "react"
import { graphql, useStaticQuery } from "gatsby"
import { getImage, StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { BgImage } from "gbimage-bridge"

const StyledBanner = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  .masthead {
    display: flex;
    position: relative;
    width: 100%;
    aspect-ratio: 2.5/1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    opacity: 1 !important;
    /* z-index: 999; */
  }
  span {
    color: var(--gold);
  }

  .headline-wrapper {
    /* opacity: 0;
    visibility: hidden; */
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding-left: 4em;
  }
  .c-bgImage {
    /* opacity: 0;
    visibility: hidden; */
  }
  h2 {
    font-size: clamp(1.5rem, 2.8vw, 4rem);
    display: block;
    /* margin-bottom: 1em; */
    line-height: 1.3;
  }
  p {
    font-size: clamp(1.5rem, 2vw, 2.6rem);
    /* margin: 0; */
    /* max-width: 60%; */
    margin: 1em 0;
  }
  .gradient-overlay {
    /* opacity: 0;
    visibility: hidden; */
    position: absolute;
    inset: -0.1em 0 -0.1em 0;
    background: transparent;
    background: linear-gradient(90deg, #161616 25%, rgba(22, 22, 22, 0) 60%),
      linear-gradient(180deg, #161616 1%, rgba(22, 22, 22, 0) 30%),
      linear-gradient(0deg, #161616 4%, rgba(22, 22, 22, 0) 25%);
  }
  .foreground-image {
    /* opacity: 0;
    visibility: hidden; */
    justify-content: center;
    align-items: center;
    position: absolute;
    max-width: 80vw;

    top: 0%;
    right: 0%;
    transform: translate( 15%, -11%);
    z-index: -1;
  }
  button {
    background: transparent;
    color: var(--beige);
    font-size: clamp(1.5rem, 2vw, 1.8rem);
    border: 1px solid var(--beige);
    padding: 0.8em 1.2em;
    border-radius: 0.3em;
    transition: 0.3s;
  }

  button:hover {
    background: var(--beige);
    color: var(--black);
  }
  @media screen and (max-width: 619px) {
    .masthead {
      aspect-ratio: .8/1 !important;
    }
    .foreground-image {
      top: 28% !important;
      transform: scale(1.7) translate(15%, 0%);
    }
    .br-desktop {
      display: none;
    }
  }
  @media screen and (min-width: 621px) and (max-width: 1199px) {
    .headline-wrapper {
      padding-left: 1em !important;
      right: 62% !important;
    }
  }
  @media screen and (min-width: 1200px) {
    .headline-wrapper {
      padding-left: 4em !important;
      /* right: 62% !important; */
    }
  }
  @media screen and (max-width: 620px) {
    .headline-wrapper {
      padding-left: 0.3em !important;
      right: 55% !important;
    }
    h2 {
      font-size: clamp(2.2rem, 2vw, 2rem) !important;
    }
    p {
      font-size: clamp(2rem, 0vw, 0rem) !important;
      /* max-width: 100%; */
    }
  }
  @media screen and (max-width: 379px) {
    h2 {
      font-size: clamp(1.2rem, 2vw, 2rem) !important;
    }
    p {
      font-size: clamp(1rem, 0vw, 0rem) !important;
    }
    button {
      font-size: clamp(1.2rem, 2vw, 1.8rem) !important;
      padding: 0.3em 0.6em !important;
    }
    .headline-wrapper {
      right: 68% !important;
    }
  }
  @media screen and (min-width: 380px) and (max-width: 480px) {
    h2 {
      font-size: clamp(1.8rem, 2vw, 2rem) !important;
    }
    p {
      font-size: clamp(1.5rem, 0vw, 0rem) !important;
    }
    button {
      font-size: clamp(1.5rem, 2vw, 1.8rem) !important;
      padding: 0.3em 0.6em !important;
    }
    .headline-wrapper {
      right: 53% !important;
    }
  }
  @media screen and (max-width: 375px) {
    .headline-wrapper {
      right: 55% !important;
      padding-left: 0.1em !important;
    }
  }
`

const MediaProductionStaticFallback = ({setShowModalMore, setParallaxLoaded}) => {
  const [waterfallImage, setWaterfallImage] = useState(false)
  const [handImage, setHandImage] = useState(false)

  const { backgroundImage } = useStaticQuery(
    graphql`
      query {
        backgroundImage: file(relativePath: { eq: "waterfall-poster.jpeg" }) {
          childImageSharp {
            gatsbyImageData(
              width: 2000
              quality: 70
              webpOptions: { quality: 90 }
              )
            }
          }
        }
        `
      )
      useEffect(() => {
        loadAllITems()
      }, [waterfallImage,handImage])

  const pluginImage = getImage(backgroundImage)

  const loadAllITems = () => {
    if (waterfallImage && handImage ) {
      const foreground = document.getElementsByClassName("foreground-image")
      const mainImage = document.getElementsByClassName("c-bgImage")
      const gradientImg = document.getElementsByClassName("gradient-overlay")
      const headling = document.getElementsByClassName("headline-wrapper")
      if (foreground && mainImage && gradientImg && headling) {
        //toggle everying is loaded and animate from index
        setParallaxLoaded(true)
        // foreground[0].style.opacity = 1
        // foreground[0].style.visibility = "visible"
        // mainImage[0].style.opacity = 1
        // mainImage[0].style.visibility = "visible"
        // headling[0].style.opacity = 1
        // headling[0].style.visibility = "visible"
        // gradientImg[0].style.opacity = 1
        // gradientImg[0].style.visibility = "visible"
      }
    }
  }

  return (
    <StyledBanner>
      <BgImage image={pluginImage} className="masthead c-bgImage" onLoad={() => setWaterfallImage(true)}>
        <div className="gradient-overlay">
            <div className="headline-wrapper">
              <h2>
                media production
                <br />
                for quality clients
              </h2>
              <p>
                <span>Rubicon</span> — your limitless source for <br className="br-desktop"/> creative audio/visuals.
              </p>
              <button onClick={() => setShowModalMore(true)}>more...</button>
            </div>
            <StaticImage
              className="foreground-image"
              src="../assets/images/globeandhand4.webp"
              placeholder="none"
              alt="hand holding a glass globe"
              onLoad={() => setHandImage(true)}
            />
          </div>
      </BgImage>
    </StyledBanner>
  )
}

export default MediaProductionStaticFallback
