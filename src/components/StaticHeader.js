import React from "react"
import styled from "styled-components"

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  height: 25vh;
  justify-content: top;
  padding-top: 2em;
  margin-bottom: 0em;
  align-items: center;

  // scroll title shimmer conntect to scroll listener on index page
  .shimmer-header {
    display: inline;
    text-align: center;
    color: rgba(255, 255, 255, 0.1);
    background: linear-gradient(
      140deg,
      rgba(255, 185, 4, 0.7) 47%,
      rgba(255, 255, 255, 0.7) 50%,
      rgba(255, 185, 4, 0.7) 53% 100%
    );
    background-size: 500% 300%;
    animation: shimmer-header 0.09s infinite;
    animation-play-state: paused;
    animation-delay: calc(var(--scroll) * -0.5s);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-color: rgba(255, 185, 4, 1);
  }
  @keyframes shimmer-header {
    0% {
      background-position: top right;
    }
    100% {
      background-position: top left;
    }
  }

  h1 {
    font-size: var(--h1);
    text-align: center;
    background-color: var(--gold);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 500;
  }
  h2 {
    font-size: clamp(1.9rem, 1.59vw, 2.4rem);
    text-align: center;
    color: var(--beige);
  }
  @media screen and (min-width: 620px) {
    h1 {
      font-size: var(--h1);
    }
    h2 {
      font-size: clamp(1.9rem, 1.59vw, 2.9rem);
      /* font-size: clamp(3.5rem, 1.59vw, 2.4rem) !important; */
    }
  }
  @media screen and (max-width: 375px) {
    h1 {
      font-size: 22px !important;
    }
    h2 {
      font-size: clamp(1.3rem, 1.59vw, 2.4rem) !important;
    }
  }
  @media screen and (min-width: 620px) and (max-width: 725px) {
    h1 {
      font-size: 50px !important;
    }
    h2 {
      font-size: clamp(3rem, 1.59vw, 2.4rem) !important;
    }
  }
  // scroll title shimmer
  // media query for mobile
  @media screen and (max-width: 619px) {
    height: 150px;
    padding-top: 2em;
    margin-bottom: 1em;
    padding-bottom: 3em;
    h1 {
      font-size: 7vw;
    }
    h2 {
      font-size: 4vw;
    }
  }
  @media screen and (max-width: 500px) {
    height: 110px;
    padding-top: 1em;
    padding-bottom: 0;
    margin-bottom: 0.5em;
  }
  @media screen and (max-width: 375px) {
    height: 90px;
    padding-top: 0em;
    margin-bottom: 0em;
    padding-bottom: 0em;
  }
  // media query for mobile landcape
  @media screen and (min-width: 520px) and (max-width: 959px) and (orientation: landscape) {
    height: 150px;
    padding-top: 1.8em;
    margin-bottom: 3em;
    padding-bottom: 5.5em;
  }
`

const StaticHeader = () => {
  // useEffect(() => {
  //   window.addEventListener(
  //     "scroll",
  //     () => {
  //       document.body.style.setProperty(
  //         "--scroll",
  //         window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
  //       )
  //     },
  //   )
  //   return () =>
  //     window.removeEventListener(
  //       "scroll",
  //       () => {
  //         document.body.style.setProperty(
  //           "--scroll",
  //           window.pageYOffset /
  //             (document.body.offsetHeight - window.innerHeight)
  //         )
  //       },
  //     )
  // }, [])

  return (
    <StyledHeader>
      <h1 className="shimmer-header">creativity & execution</h1>
      {/* <h1>creativity & execution</h1> */}
      {/* <h1>creativity & execution</h1> */}
      <h2>for those looking to tell the story</h2>
    </StyledHeader>
  )
}

export default StaticHeader
