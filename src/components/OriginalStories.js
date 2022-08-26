import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { BgImage } from "gbimage-bridge"
import { motion } from "framer-motion"
import Footer from "./Footer"
import styled from "styled-components"


const OriginalStories = ({ isBottom }) => {

  const textwrapVariants = {
    initial: {opacity: 0, y: 50, transition: {duration: 0.5}},
    animate: {opacity: 1, y: 0, transition: {duration: 0.5, staggerChildren: 0.1}},
  }

  const wrapperVariants = {
    initial: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
    animate: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  }


  const { backgroundImage } = useStaticQuery(
    graphql`
      query {
        backgroundImage: file(relativePath: { eq: "OriginalStories.png" }) {
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
    <>
        <motion.div key="original-stories" {...wrapperVariants}>
          <StyledBackgrounds >
            <BgImage image={pluginImage} className="masthead">
              <div className="gradient">
                <div className="flex-wrapper">
                  <motion.div id="stories-text-wrapper" initial="initial" animate='animate' variants={textwrapVariants}>
                    <h3>
                      <span className="text-outline">always</span> creative{" "}
                      <br />
                      <span className="text-outline">
                        always
                      </span> responsive <br />
                      <span className="text-outline">always</span> competitive
                    </h3>
                    <button>get the story</button>
                  </motion.div>
                </div>
              </div>
            </BgImage>
              <Footer isBottom={isBottom}/>
          </StyledBackgrounds>
        </motion.div>
    </>
  )
}
const StyledBackgrounds = styled.section`
  min-height: -webkit-fill-available;
  position: relative;
  .masthead {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    opacity: 1 !important;
    z-index: 20;
    overflow: hidden;
    /* border: 1px solid red; */
  }
  .masthead::before,
  .masthead::after {
    margin-left: 25%;
    margin-top: 2%;
    width: 75vw !important;
    /* background-position: 48% center; */
  }
  .gradient {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 20;
    background: linear-gradient(360deg, #161616 15%, rgba(0, 0, 0, 0) 43.45%),
      linear-gradient(180deg, #161616 15%, rgba(0, 0, 0, 0) 38.09%),
      linear-gradient(
        89.93deg,
        #161616 25%,
        rgba(13, 13, 13, 0.597237) 41.07%,
        rgba(0, 0, 0, 0) 73.16%
      );
  }
  .flex-wrapper {
    display: flex;
    flex-direction: column;
    padding-left: 20rem;
  }
  #stories-text-wrapper {
    opacity: 1;
    /* transition: .7s; */
  }
  .masthead h3 {
    font-size: clamp(1.5rem, 2.8vw, 4rem);
    display: block;
    margin-bottom: 1em;
    line-height: 1.3;
    z-index: 999 !important;
  }
  .masthead p {
    font-size: clamp(1.5rem, 2vw, 2.6rem);
    margin: 0;
  }
  .text-outline {
    color: transparent !important;
    text-shadow: 0 0 1px var(--black), 0px 0px 1px white, 0px 0px 1px white,
      0px 0px 1px white;
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
  .footer-wrapper {
    border: 1px solid red;
    height: min-content;

  }

  @media screen and (max-width: 1600px) and (min-width: 1200px) {
    .masthead {
      background: linear-gradient(90deg, #161616 35%, transparent 85%);
    }
    .masthead .flex-wrapper {
      padding-left: 10rem;
    }
  }
  @media screen and (max-width: 1199px) and (min-width: 800px) {
    .masthead {
      background: linear-gradient(90deg, #161616 40%, transparent 83%);
    }
    .masthead .flex-wrapper {
      padding-left: 5rem;
    }
  }
  @media screen and (max-width: 799px) and (min-width: 650px) {
    .masthead {
      background: linear-gradient(90deg, #161616 50%, transparent 85%);
    }
    .masthead .flex-wrapper {
      padding-left: 3rem;
    }
    .masthead .flex-wrapper h3 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }
    .masthead .flex-wrapper p {
      font-size: 1.7rem;
    }
  }
  @media screen and (max-width: 649px) and (min-width: 551px) {
    border: 1px solid green;
    .masthead {
      border: 1px solid red;
      background: linear-gradient(90deg, #161616 42%, transparent 85%);
    }
    .masthead .flex-wrapper {
      padding-left: 2rem;
    }
    .masthead .flex-wrapper h3 {
      font-size: 2.5rem;
      margin-bottom: 2.5rem;
    }
    .masthead .flex-wrapper p {
      font-size: 1.5rem;
    }
  }
  @media screen and (max-width: 550px) {
    margin-top: 25vh;
    padding: 0;
    .masthead {
      height: 100vh;
    }
    .gradient {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      z-index: 20;
      background: linear-gradient(360deg, #161616 1%, rgba(0, 0, 0, 0) 43.45%),
        linear-gradient(180deg, #161616 1%, rgba(0, 0, 0, 0) 38.09%),
        linear-gradient(
          89.93deg,
          #161616 17%,
          rgba(13, 13, 13, 0.597237) 60.07%,
          rgba(0, 0, 0, 0) 80.16%
        );
    }
    .masthead::before,
    .masthead::after {
      background-position: 78% !important;
    }
    .masthead .flex-wrapper {
      padding-left: 2rem;
    }
    .masthead,
    .flex-wrapper h3 {
      font-size: 2.2rem;
    }
    .masthead .flex-wrapper p {
      font-size: 1.5rem;
    }
    button {
      font-size: 1.5rem;
    }
  }
`
export default OriginalStories
