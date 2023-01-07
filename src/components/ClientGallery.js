//The query pulls data from the 'markdown-pages' folder. Markdown files have a header that contains frontmatter info including alt text. Data is passed to the ClientComponent to generate <figure>. In future additions all that's required is to add a properly formated markdown file to the 'markdown-pages' folder and a logo image to the assets/images folder-sg
import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import ClientComponent from "./ClientComponent"
import { useStaticQuery, graphql } from "gatsby"
import { useInView } from "react-intersection-observer"
import { motion, useAnimation } from "framer-motion"

const StyledSection = styled.section`
  max-width: 110rem;
  margin:  0 auto;
  /* height: 1500px; */
  /* height: 120vh; */
  /* padding-bottom: */
  /* margin-top: 60vh; */
  margin-bottom: 20vh;
  /* margin-bottom: 60vh; */
  /* border: 1px solid red; */

  display: flex;
  flex-direction: column;
  justify-content: center;

  /* .shimmer-communications {
    display: inline;
    text-align: center;
    color: rgba(255, 255, 255, 0.1);
    background: linear-gradient(
      140deg,
      rgba(255, 185, 4, 0.7) 35%,
      rgba(255, 255, 255, 0.7) 50%,
      rgba(255, 185, 4, 0.7) 65% 100%
    );
    background-size: 400% 550%;
    animation: shimmer .012s infinite;
    animation-play-state: paused;
    animation-delay: calc(var(--scroll) * -.11s);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-color: rgba(255, 185, 4, 1);
  } */
  .shimmer-communications {
    display: inline;
    text-align: center;
    color: rgba(255, 255, 255, 0.1);
    background: linear-gradient(
      140deg,
      rgba(255, 185, 4, 0.7) 45%,
      rgba(255, 255, 255, 0.7) 50%,
      rgba(255, 185, 4, 0.7) 65% 100%
    );
    background-size: 400% 550%;
    animation: shimmer .012s infinite;
    animation-play-state: paused;
    animation-delay: calc(var(--scroll) * -.1s);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-color: rgba(255, 185, 4, 1);
  }
  @keyframes shimmer {
    0% {
      background-position: top right;
    }
    100% {
      background-position: top left;
    }
  }
  span {
    color: var(--gold);
  }

  h3 {
    margin: 6rem 0 6rem 0;
    text-align: center;
    font-size: var(--h3-banner-clamp);
  }
  @media screen and (max-width: 900px) {
    max-width: 90vw;
    padding: 0;
    h3 {
      margin: 0 0 3rem 0;
    }
  }
  @media screen and (max-width: 700px) {
    margin-bottom: 15rem;
    h3 {
      margin: 5rem 0;
      font-size: 4.6vw;
    }
  }
  @media screen and (max-width: 439px) {
    h3 {
      font-size: 4.6vw;
      margin: 3rem 0;
      padding: 0;
    }
  }
`
const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
  @media screen and (max-width: 900px) {
    grid-gap: 1rem;
    margin: 0;
  }
`

export default function ClientGallery({isJank}) {
  const [ref2, inView2] = useInView({
    threshold: .3,

    delay: 700,
    triggerOnce: true,
  })

  // const [ref3, inView3] = useInView({
  //   threshold: 1,
  //   rootMargin: "-10% 0px 300px 0px",
  // })

  // const shimmerRef = useRef(null)
  const componentRef = useRef(null)


  useEffect(() => {
    if (inView2) {
      animation.start(() => ({
        opacity: 1,
        // scale: 1,
        // y: 0,
        transition: {
          type: "tween",
          duration: 0.4,
          ease: "easeIn",
        },
      }))
    }
    if (!inView2) {
      animation.start(() => ({
        opacity: 1,
        // scale: .98,
        // y: -35,
        transition: {
          type: "tween",
          duration: 0.4,
          ease: "easeIn",
        },
      }))
    }
  }, [inView2])
  const animation = useAnimation()
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: {
          frontmatter: { title: { in: ["Louis Vuitton", "Essilor Luxottica"] } }
        }
      ) {
        nodes {
          frontmatter {
            title
            slug
            link
            alt
            logo {
              childImageSharp {
                gatsbyImageData(
                  width: 320
                  height: 100
                  placeholder: BLURRED
                  transformOptions: { fit: CONTAIN }
                )
              }
            }
          }
          html
        }
      }
    }
  `)
  return (
    <StyledSection ref={componentRef}>
      <h3 ref={ref2}>
        supporting <span className="shimmer-communications">communications teams</span> at
      </h3>
      <motion.div animate={animation}>
        <StyledWrapper >
          {data.allMarkdownRemark.nodes.map((item) => (
            <ClientComponent
              key={item.frontmatter.slug}
              src={item.frontmatter.logo}
              link={item.frontmatter.link}
              alt={item.frontmatter.alt}
              caption={item.html}
            />
          ))}
        </StyledWrapper>
      </motion.div>
    </StyledSection>
  )
}
