//The query pulls data from the 'markdown-pages' folder. Markdown files have a header that contains frontmatter info including alt text. Data is passed to the ClientComponent to generate <figure>. In future additions all that's required is to add a properly formated markdown file to the 'markdown-pages' folder and a logo image to the assets/images folder-sg
import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import ClientComponent from "./ClientComponentCarousel"
import { useStaticQuery, graphql } from "gatsby"
import { useInView } from "react-intersection-observer"
import { motion, useAnimation } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Grid, Pagination, Navigation } from "swiper"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/grid"

const StyledSection = styled.section`
  max-width: 80vw;
  margin: 0 auto;
  margin-bottom: 15rem;

  span {
    color: var(--gold);
  }

  h3 {
    margin: 6rem 0 6rem 0;
    text-align: center;
    font-size: var(--h3-banner-clamp);
  }
  .shimmer-marketing {
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
    animation: shimmer 0.012s infinite;
    animation-play-state: paused;
    animation-delay: calc(var(--scroll) * -0.21s);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-color: rgba(255, 185, 4, 1);
  }

  .swiper {
    padding: 0 45px;
  }
  @media screen and (max-width: 620px) {
    .swiper {
      padding: 0 0.7em;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: rgb(240, 228, 195, 0.15);
  }
  .swiper-button-disabled {
    visibility: hidden;
  }
  .swiper-horizontal {
    /* background: var(--gold) */
    /* bottom: 0; */
    padding-bottom: 4rem;
  }
  .swiper-pagination-bullet {
    background: var(--beige);
    width: 12px;
    height: 12px;
  }
  .swiper-pagination-bullet-active {
    background: var(--gold);
  }
  @keyframes shimmer {
    0% {
      background-position: top right;
    }
    100% {
      background-position: top left;
    }
  }
  @media screen and (max-width: 900px) {
    max-width: 90vw;
    padding: 0;
    h3 {
      margin: 0 0 3rem 0;
    }
  }
  @media screen and (max-width: 700px) {
    margin-bottom: 0rem;
    h3 {
      margin: 5rem 0;
      font-size: 4.6vw;
    }
  }
  @media screen and (max-width: 620px) {
   margin-bottom: -13rem;
  }
  @media screen and (max-width: 439px) {
  .shimmer-marketing {
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
    animation: shimmer 0.018s infinite;
    animation-play-state: paused;
    animation-delay: calc(var(--scroll) * -0.15s);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-color: rgba(255, 185, 4, 1);
  }
    h3 {
      font-size: 4.6vw;
      margin: 3rem 0;
      padding: 0;
    }
  }
`

export default function ClientCarousel({ isJank, dimensions }) {
  const pagination = {
    clickable: true,
  }
  const [ref2, inView2] = useInView({
    threshold: 0.3,

    delay: 700,
    triggerOnce: true,
  })

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
          frontmatter: {
            title: {
              in: [
                "Schools"
                "ARHT Media"
                "Publicis Groupe"
                "Wealthy"
                "Hazelview"
                "Venici"
              ]
            }
          }
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
                  width: 200
                  height: 90
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
        supporting <span className="shimmer-marketing">marketing teams </span>at{" "}
      </h3>
      <Swiper
        navigation={dimensions.width > 900 ? true : false}
        grabCursor={true}
        pagination={pagination}
        modules={[Pagination, Navigation]}
        spaceBetween={46}
        slidesPerView={
          dimensions.width > 1300 ? 3 : dimensions.width > 620 ? 2 : 1
        }
      >
        {data.allMarkdownRemark.nodes.map((item) => (
          <SwiperSlide>
            <ClientComponent
              key={item.frontmatter.id}
              src={item.frontmatter.logo}
              link={item.frontmatter.link}
              alt={item.frontmatter.alt}
              caption={item.html}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledSection>
  )
}
