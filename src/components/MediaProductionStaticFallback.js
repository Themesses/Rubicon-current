import React from "react"
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
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding-left: 4em;
  }
  h2 {
    font-size: clamp(1.5rem, 2.8vw, 4rem);
    display: block;
    /* margin-bottom: 1em; */
    line-height: 1.3;
  }
  p {
    font-size: clamp(1.5rem, 2vw, 2.6rem);
    max-width: 100%;
    /* margin: 0; */
    margin: 1em 0;
  }
  .gradient-overlay {
    position: absolute;
    inset: -0.1em 0 -0.1em 0;
    background: transparent;
    background: transparent;
    background: linear-gradient(90deg, #161616 25%, rgba(22, 22, 22, 0) 60%),
      linear-gradient(180deg, #161616 1%, rgba(22, 22, 22, 0) 30%),
      linear-gradient(0deg, #161616 4%, rgba(22, 22, 22, 0) 25%);
  }
  .foreground-image {
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
  @media screen and (min-width: 621px) and (max-width: 1199px) {
    .headline-wrapper {
      padding-left: 1em !important;
      right: 62% !important;
    }
  }
  @media screen and (min-width: 1200px) {
    .headline-wrapper {
      padding-left: 2em !important;
      right: 62% !important;
    }
  }
  @media screen and (max-width: 620px) {
    .headline-wrapper {
      padding-left: 0.3em !important;
      right: 62% !important;
    }
  }
  @media screen and (max-width: 480px) {
    h2 {
      font-size: clamp(1.2rem,2vw,2rem) !important;
    }
    p {
      font-size: clamp(1rem,0vw,0rem) !important;
    }
    button {
      font-size: clamp(1.2rem,2vw,1.8rem) !important;
      padding: 0.3em 0.6em !important;
    }
    .headline-wrapper {
      right: 69% !important;
    }
  }
`

const MediaProductionStaticFallback = ({setShowModalMore}) => {
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

  const pluginImage = getImage(backgroundImage)

  return (
    <StyledBanner>
      <BgImage image={pluginImage} className="masthead">
        <div className="gradient-overlay">
            <div className="headline-wrapper">
              <h2>
                media production
                <br />
                for quality clients
              </h2>
              <p>
                <span>Rubicon</span> — your limitless source for creative audio/visual.
              </p>
              <button onClick={() => setShowModalMore(true)}>more...</button>
            </div>
            <StaticImage
              className="foreground-image"
              src="../assets/images/globeandhand4.webp"
              placeholder="none"
              alt="hand holding a glass globe"
            />
          </div>
      </BgImage>
    </StyledBanner>
  )
}

export default MediaProductionStaticFallback
