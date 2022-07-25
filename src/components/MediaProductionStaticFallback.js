import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { getImage, StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { BgImage } from "gbimage-bridge"

const StyledBanner = styled.div`
  display: flex;
  position: relative;
  .masthead {
    display: flex;
    position: relative;
    width: 100%;
    aspect-ratio: 2.5/1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    opacity: 1 !important;
    z-index: 999;
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
    margin-bottom: 1em;
    line-height: 1.3;
  }
  p {
    font-size: clamp(1.5rem, 2vw, 2.6rem);
    max-width: 100%;
    margin: 0;
  }
  .gradient-overlay {
    position: absolute;
    inset: -0.1em 0 -0.1em 0;
    background: transparent;
    z-index: -1;
    background: transparent;
    background: linear-gradient(90deg, #161616 25%, rgba(22, 22, 22, 0) 60%),
        linear-gradient(180deg, #161616 1%, rgba(22, 22, 22, 0) 30%),
        linear-gradient(0deg, #161616 4%, rgba(22, 22, 22, 0) 25%);
  }
  .foareground-image {
    position: absolute;
    border: 1px solid red;
    top: 0;
    z-index: -1;
  }
`

const MediaProductionStaticFallback = () => {

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
          <div className="parallax-content-wrapper">
          <div className="headline-wrapper">
            <h2>
              media production
              <br />
              for quality clients
            </h2>
            <p >
              <span>Rubicon</span>, your limitless source
              <br />
              for creative audio/visuals.
            </p>
          </div>
        {/* <StaticImage
          className="foreground-image"
          src="../assets/images/globeandhand4.webp"
          placeholder="none"
          alt="hand holding a glass globe"
        /> */}
        </div>
        </div>
      </BgImage>
    </StyledBanner>
  )
}

export default MediaProductionStaticFallback
