import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { motion } from "framer-motion";

const StyledShowcase = styled.figure`
  border-radius: 2rem;
  margin: 3rem;
  /* border: 1px solid #e6e6e6; */
  .logo-wrapper {
    border-top-right-radius: 2rem;
    border-top-left-radius: 2rem;
    display: flex;
    padding: 0;
    justify-content: center;
    align-items: center;
    background-color: black;
  }
  a {
    text-decoration: none !important;
  }
  figcaption {
    background-color: var(--black-light);
    padding: 3rem 3rem;
    line-height: 1.5;
    text-align: center;
    /* height: 20rem; */
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }
  figcaption p {
    font-weight: 200;
    color: var(--beige);
  }
   @media screen and (max-width: 900px) {
    margin: 1rem;
    .logo-wrapper {
      padding: 0 2em;
    }
    figcaption {
      /* height: 19rem; */
      padding: .4em 2.7vw;
    }
    figcaption p {
      font-size: 1.7rem;
    }
  }
   @media screen and (max-width: 800px) {
    margin: 1rem;
    .logo-wrapper {
      padding: 0 2em;
    }
    figcaption {
      /* height: 19rem; */
      padding: .2em 2.5vw;
    }
    figcaption p {
      line-height: 1.4;
      font-size: 1.5rem;
    }
  }
  @media screen and (max-width: 700px){
    margin: 1rem 10vw;
    .logo-wrapper {
      padding: 0 15vw;
    }
    figcaption {
      padding: 1em 2.5em;
      /* height: 9em; */

    }
    figcaption p {
      font-size: 1.7rem;
    }
  }
  @media screen and (max-width: 550px){
    margin: 1rem 10vw;
    .logo-wrapper {
      padding: 0 15vw;
    }
    figcaption {
      padding: .5em 1em;
      /* height: 9em; */

    }
    figcaption p {
      font-size: 1.6rem;
    }
  }

  @media screen and (max-width: 450px){
    margin: 1rem 4vw;
    .logo-wrapper {
      padding: 0 13vw;
    }
    figcaption {
      /* height: 10em; */
      padding: .4em .9em;
    }
    figcaption p {
      font-size: 1.7rem;
    }
  }

`;
export default function ClientComponent({ src, alt, caption}) {
  const image = getImage(src);
  return (
      <motion.div whileHover={{ scale: 1.03, transition: {duration: .3}}}>
        <StyledShowcase>
          <div className="logo-wrapper">
            <GatsbyImage image={image} alt={alt} />
          </div>
          <figcaption dangerouslySetInnerHTML={{ __html: caption }} />
        </StyledShowcase>
      </motion.div>
  );
}
