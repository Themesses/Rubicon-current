import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";
import posterOpeningLoopVideo from "../assets/video/poster-opening-loop-video.mp4";
import posterOpeningVideo from "../assets/video/poster-opening-video.mp4";
import GrayPlayButton from "../assets/images/GrayPlayButton.svg";
import YellowPlayButton from "../assets/images/YellowPlayButton.svg";
import grayPlayButton from "../assets/images/Triangle.svg";
import goldPlayButton from "../assets/images/GoldPlayButton.svg";
import { motion } from "framer-motion"
import styled from "styled-components"
const isBrowser = typeof window !== "undefined"


const StyledCloseIcon = styled.div`
  .close {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 24px;
    height: 24px;
    opacity: 1;
    z-index: 100;
    cursor: pointer;
    display: none;
  }
  .close:before, .close:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 24px;
    width: 2px;
    background-color: #333;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
`

const StyledSection = styled.div`
  @keyframes fadein {
    from { opacity: 0}
    to   { opacity: 1}
  }
  @keyframes slideInFromBottom {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .play-button{
    cursor: pointer;
    z-index: 103;
  }
`
const StyledButton = styled.div`
  svg {
    position: absolute;
    z-index: 102;
    display: inline-block;
    margin: 0 5px;
    vertical-align: middle;
    top: 50%;
    height: 55px;
    width: 320px;
  }

  .toggle-button {
    position: absolute;
    top: 50%;
    color: var(--gold);
    font-family: Lexend Deca;
    font-size: clamp(1.4rem,2vmax,3.4rem);
    padding: clamp(1rem, 1vmax, 1rem);
    border-radius: 0.5rem;
    background-color: transparent;
    z-index: 101;
    margin-left: -155px;
  }

  ${StyledSection}:hover & .toggle-button{
    z-index: 99;
    filter: blur(1px);
  }

  ${StyledSection}:hover & svg{
    z-index: 100;
    height: 54px;
    width: 319px;
  }

  ${StyledSection}:hover & svg path{
    fill: var(--gray-light);
  }

  @media screen and (max-width: 1200px) {
    ${StyledSection}:hover & svg{
      height: 49px;
      width: 309px;
    }

    svg{
      height: 50px;
      width: 310px;
    }
  }
`

const StyledImage = styled.div`
  svg {
    position: absolute;
    z-index: 100;
    display: inline-block;
    margin: 0 5px;
    vertical-align: middle;
    top: 50%;
  }

  .play-icon {
    position: absolute;
    top: 49%;
    color: var(--gold);
    font-family: Lexend Deca;
    font-size: clamp(1.4rem, 2vmax, 2rem);
    // padding: clamp(1rem, 1vmax, 1rem);
    border-radius: 0.5rem;
    background-color: transparent;
    z-index: 99;
    margin-left: -52px;
    margin-top: 0px;
  }

  .play-icon .gray-play-button {
    display: block;
    margin-left: 23px;
    margin-top: 5px;
    filter: blur(1px);
  }
  .play-icon .gold-play-button {
    display: none;
  }

  .play-icon .gold-play-button svg{
    // height: 74px;
    // width: 67px;
  }

  ${StyledSection}:hover & .play-icon {
    z-index: 101;
  }
  ${StyledSection}:hover & svg{
    z-index: 102;
  }

  ${StyledSection}:hover & svg path{
    // stroke: var(--gold);
    // filter: brightness(110%) drop-shadow(2px 2px 5px #ffb800);
    // -webkit-transform: scale(2.25, 2.25);
    // transform: scale(2.25, 2.25);
  }

  ${StyledSection}:hover & .play-icon .gold-play-button{
    display: block;
    z-index: 102;
    margin-left: 23px;
    margin-top: 5px;
  }

  ${StyledSection}:hover & .play-icon .gray-play-button{
    display: none;
  }

  @media screen and (max-width: 1200px) {
    .gray-play-button{
      height: 55px;
      width: 60px;
    }
    .gold-play-button{
      height: 59px;
      width: 90px;
    }
    ${StyledSection}:hover & .play-icon .gold-play-button{
      margin-left: 11px;
      margin-top: 3px;
    }
  }
`

const StyledBanner = styled.div`
  .main-parallax-banner {
    aspect-ratio: 2.6/1;
  }

  .parallax-content-wrapper {
    display: flex;
    position: absolute;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .parallax-video {
    width: 100%;
    height: 100%;
  }

  .posterOverlayOpening{
    display: block;
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 100%;
    margin-top: -15px;
  }

  .poster22-overlay,.posterOverlayOpening {
    object-fit: cover;
  }

  .poster22-overlay{
    display: none;

    margin-top: -15px;

  }

  @media screen and (max-width: 1200px) {
    .main-parallax-banner {
      aspect-ratio: 1/1;
    }
  }
  @media screen and (max-width: 920px) {
    .main-parallax-banner {
      aspect-ratio: 1/1;
    }
    .video-class {
      width:89%
    }
  }
  @media screen and (max-width: 520px) {
    .main-parallax-banner {
      aspect-ratio: 1/1;
    }
    .video-class {
      width:89%;
    }
  }
`
const rubiGlowAnimationVariants = {
  hidden: {
    filter: "drop-shadow(0 0 0 var(--black)",
  },
  visible: {
    filter: "drop-shadow(0 0 0.3em var(--gold)",
  },
}

const VideoStyledBanner = styled.div`
  @media screen and (min-width: 1200px) {
    @media screen and (min-height: 876px) {
      .initialVideo {
        width:100% !important
      }
    }
  }
  @media screen and (min-width: 620px){
    .initialVideoDiv {
      height:100vh
    }
  }
`

const renderVideo = ({
  noControls,
  src,
  vidButtonRef,
  vidRef,
  handleToggleVideo,
  onEnded,
  handleVideoEnd,
}) => (
  <>
    {noControls ?
    (
      <div
      className="video video_play-button"
      style={{
        position: "relative",
        // cursor: "pointer",
      }}
      >
        <ParallaxProvider>
          <StyledBanner>
            <ParallaxBanner
              className="video-class main-parallax-banner"
              layers={[
                {
                  children: (
                    <video
                      id="posterOverlayOpening"
                      autoPlay
                      muted
                      playsInline
                      src={posterOpeningVideo}
                      className="parallax-video posterOverlayOpening"
                      onEnded = {() => {
                        const posterOverlay = isBrowser ? document.getElementsByClassName("poster22-overlay") : "";
                        const playButton = isBrowser ? document.getElementsByClassName("play-button") : "";
                        playButton[0].style.display = "flex"
                        posterOverlay[0].style.display = "block"
                      }}
                    />
                  ),
                },
                {
                  children: (
                    <video
                      id="posterOpeningOverlay"
                      autoPlay
                      loop
                      muted
                      playsInline
                      src={posterOpeningLoopVideo}
                      className="parallax-video poster22-overlay"
                      />
                  ),
                },
              ]}
              style={{
                display: "block",
                position: "absolute",
                zIndex: "1",
                height: "100%",
                width: "100%",
              }}
            />
          </StyledBanner>
        </ParallaxProvider>
        <StyledSection>
          <motion.div>
            <div
              className="button play-button"
              id="button"
              style={{
                display: "none",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StyledButton>
                <motion.button
                  whileHover={{
                    scale: 1
                  }}
                  ref={vidButtonRef}
                  className="toggle-button"
                  style={{
                    animation: "1s ease-out 0s 1 slideInFromBottom",
                  }}
                  onClick={handleToggleVideo}
                  >
                  <svg width="260" height="47" viewBox="0 0 260 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                  <path d="M34.9747 14.2944L29.7996 29.6445H27.7236L23.8057 20.7269L20.1509 29.6445H18.1042L12.8706 14.2944L15.9114 14.2652L19.3615 24.8495L23.0455 16.7212H24.8583L28.5131 24.7325L31.934 14.2944H34.9747ZM45.7579 13.9728C47.1419 13.9728 48.214 14.2554 48.9742 14.8207C49.7344 15.386 50.2606 16.1462 50.553 17.1013C50.8649 18.0564 51.0208 19.1187 51.0208 20.2883V29.6445H48.0093V20.4929C48.0093 19.7522 47.9118 19.0895 47.7169 18.5047C47.522 17.92 47.1906 17.4619 46.7228 17.1305C46.255 16.7992 45.602 16.6627 44.7638 16.7212C43.9842 16.7212 43.2922 16.8869 42.6879 17.2183C42.0837 17.5496 41.6061 17.9882 41.2553 18.534C40.9044 19.0798 40.729 19.684 40.729 20.3468V29.6445H37.7174V8.0082H40.729V16.7212C41.1968 16 41.879 15.3665 42.7756 14.8207C43.6723 14.2554 44.6664 13.9728 45.7579 13.9728ZM69.4037 14.2944V29.6445H66.3629V27.2762C65.8951 27.9195 65.2032 28.5237 64.287 29.089C63.3709 29.6543 62.3086 29.9369 61.1 29.9369C59.8136 29.9369 58.6343 29.5958 57.5622 28.9136C56.5096 28.2313 55.6715 27.286 55.0477 26.0775C54.424 24.8689 54.1121 23.485 54.1121 21.9256C54.1121 20.3662 54.4337 18.9921 55.077 17.803C55.7202 16.5945 56.6071 15.6589 57.7376 14.9962C58.8682 14.3139 60.1547 13.9728 61.5971 13.9728C62.6692 13.9728 63.6048 14.2067 64.404 14.6745C65.2226 15.1423 65.8756 15.6881 66.3629 16.3119V14.2944H69.4037ZM61.8018 27.1593C62.7374 27.1593 63.5561 26.9351 64.2578 26.4868C64.9595 26.019 65.5053 25.3952 65.8951 24.6155C66.285 23.8164 66.4799 22.9197 66.4799 21.9256C66.4799 20.951 66.285 20.0739 65.8951 19.2942C65.5053 18.5145 64.9595 17.9005 64.2578 17.4522C63.5561 16.9844 62.7374 16.7504 61.8018 16.7504C60.9051 16.7504 60.1059 16.9746 59.4042 17.4229C58.7025 17.8712 58.1567 18.4853 57.7669 19.2649C57.377 20.0446 57.1821 20.9315 57.1821 21.9256C57.1821 22.9197 57.377 23.8164 57.7669 24.6155C58.1567 25.3952 58.7025 26.019 59.4042 26.4868C60.1059 26.9351 60.9051 27.1593 61.8018 27.1593ZM78.5206 29.6445H75.509V17.2183H72.3221V14.2944H75.509V10.3765H78.5206V14.2944H82.0877V17.2183H78.5206V29.6445ZM95.042 10.9613C94.3598 10.9613 93.853 10.7858 93.5216 10.435C93.1903 10.0841 93.0246 9.62605 93.0246 9.06078C93.0246 8.57348 93.1903 8.1349 93.5216 7.74506C93.853 7.35521 94.3598 7.16029 95.042 7.16029C95.7243 7.16029 96.2311 7.33572 96.5624 7.68658C96.8938 8.03744 97.0595 8.49551 97.0595 9.06078C97.0595 9.54809 96.8938 9.98666 96.5624 10.3765C96.2311 10.7663 95.7243 10.9613 95.042 10.9613ZM96.5917 29.6445H93.5801V14.2944H96.5917V29.6445ZM110.021 18.3293C109.476 17.7835 108.852 17.3352 108.15 16.9844C107.468 16.6335 106.834 16.4581 106.25 16.4581C105.84 16.4581 105.431 16.5068 105.022 16.6043C104.632 16.7017 104.3 16.8869 104.028 17.1598C103.755 17.4132 103.618 17.7933 103.618 18.3001C103.638 19.0018 103.95 19.4988 104.554 19.7912C105.178 20.0836 105.948 20.3468 106.864 20.5807C107.663 20.7951 108.443 21.068 109.203 21.3993C109.963 21.7112 110.587 22.179 111.074 22.8028C111.581 23.407 111.834 24.2647 111.834 25.3757C111.834 26.3309 111.561 27.1495 111.016 27.8318C110.489 28.514 109.797 29.0403 108.94 29.4106C108.101 29.7615 107.215 29.9369 106.279 29.9369C105.168 29.9369 104.067 29.742 102.975 29.3521C101.903 28.9428 100.987 28.2508 100.227 27.2762L102.273 25.5219C102.8 26.1262 103.394 26.6037 104.057 26.9546C104.739 27.286 105.567 27.4517 106.542 27.4517C106.912 27.4517 107.283 27.3932 107.653 27.2762C108.023 27.1398 108.335 26.9351 108.589 26.6622C108.862 26.3698 108.998 25.98 108.998 25.4927C108.998 25.0249 108.852 24.6643 108.559 24.4109C108.287 24.138 107.916 23.9236 107.448 23.7676C106.981 23.5922 106.464 23.4363 105.899 23.2998C105.061 23.0659 104.232 22.7833 103.414 22.4519C102.614 22.1011 101.942 21.6137 101.396 20.99C100.87 20.3468 100.607 19.4794 100.607 18.3878C100.607 17.4717 100.86 16.692 101.367 16.0487C101.893 15.386 102.575 14.8792 103.414 14.5283C104.252 14.158 105.148 13.9728 106.103 13.9728C107.02 13.9728 108.014 14.1677 109.086 14.5576C110.158 14.9474 111.045 15.5712 111.746 16.4288L110.021 18.3293ZM128.26 29.6445H125.248V17.2183H122.061V14.2944H125.248V10.3765H128.26V14.2944H131.827V17.2183H128.26V29.6445ZM142.61 13.9728C143.994 13.9728 145.066 14.2554 145.826 14.8207C146.586 15.386 147.112 16.1462 147.405 17.1013C147.717 18.0564 147.873 19.1187 147.873 20.2883V29.6445H144.861V20.4929C144.861 19.7522 144.764 19.0895 144.569 18.5047C144.374 17.92 144.042 17.4619 143.575 17.1305C143.107 16.7992 142.454 16.6627 141.616 16.7212C140.836 16.7212 140.144 16.8869 139.54 17.2183C138.935 17.5496 138.458 17.9882 138.107 18.534C137.756 19.0798 137.581 19.684 137.581 20.3468V29.6445H134.569V8.0082H137.581V16.7212C138.049 16 138.731 15.3665 139.627 14.8207C140.524 14.2554 141.518 13.9728 142.61 13.9728ZM165.144 27.6271H165.115C164.491 28.2313 163.634 28.7674 162.542 29.2352C161.451 29.703 160.31 29.9369 159.121 29.9369C157.523 29.9369 156.11 29.6055 154.882 28.9428C153.673 28.2606 152.728 27.3347 152.046 26.1652C151.363 24.9762 151.022 23.6312 151.022 22.1303C151.022 20.415 151.383 18.9531 152.104 17.7446C152.825 16.5165 153.781 15.5809 154.97 14.9377C156.159 14.2749 157.455 13.9436 158.858 13.9436C160.145 13.9436 161.314 14.2652 162.367 14.9084C163.419 15.5322 164.258 16.3996 164.881 17.5106C165.505 18.6217 165.817 19.9179 165.817 21.3993L165.788 22.6858H154.034C154.209 24.0698 154.775 25.1711 155.73 25.9897C156.704 26.7889 157.932 27.1885 159.414 27.1885C160.486 27.1885 161.353 26.9936 162.016 26.6037C162.679 26.1944 163.224 25.8046 163.653 25.4342L165.144 27.6271ZM158.858 16.7212C157.708 16.7212 156.704 16.9941 155.847 17.5399C154.989 18.0662 154.424 18.9823 154.151 20.2883H162.747V20.0836C162.688 19.4209 162.464 18.8361 162.074 18.3293C161.704 17.8225 161.236 17.4327 160.671 17.1598C160.106 16.8674 159.501 16.7212 158.858 16.7212ZM186.144 18.3293C185.598 17.7835 184.974 17.3352 184.272 16.9844C183.59 16.6335 182.957 16.4581 182.372 16.4581C181.963 16.4581 181.553 16.5068 181.144 16.6043C180.754 16.7017 180.423 16.8869 180.15 17.1598C179.877 17.4132 179.741 17.7933 179.741 18.3001C179.76 19.0018 180.072 19.4988 180.676 19.7912C181.3 20.0836 182.07 20.3468 182.986 20.5807C183.785 20.7951 184.565 21.068 185.325 21.3993C186.085 21.7112 186.709 22.179 187.196 22.8028C187.703 23.407 187.957 24.2647 187.957 25.3757C187.957 26.3309 187.684 27.1495 187.138 27.8318C186.612 28.514 185.92 29.0403 185.062 29.4106C184.224 29.7615 183.337 29.9369 182.401 29.9369C181.29 29.9369 180.189 29.742 179.097 29.3521C178.025 28.9428 177.109 28.2508 176.349 27.2762L178.396 25.5219C178.922 26.1262 179.516 26.6037 180.179 26.9546C180.861 27.286 181.69 27.4517 182.664 27.4517C183.035 27.4517 183.405 27.3932 183.775 27.2762C184.146 27.1398 184.458 26.9351 184.711 26.6622C184.984 26.3698 185.12 25.98 185.12 25.4927C185.12 25.0249 184.974 24.6643 184.682 24.4109C184.409 24.138 184.039 23.9236 183.571 23.7676C183.103 23.5922 182.586 23.4363 182.021 23.2998C181.183 23.0659 180.355 22.7833 179.536 22.4519C178.737 22.1011 178.064 21.6137 177.518 20.99C176.992 20.3468 176.729 19.4794 176.729 18.3878C176.729 17.4717 176.982 16.692 177.489 16.0487C178.015 15.386 178.698 14.8792 179.536 14.5283C180.374 14.158 181.271 13.9728 182.226 13.9728C183.142 13.9728 184.136 14.1677 185.208 14.5576C186.28 14.9474 187.167 15.5712 187.869 16.4288L186.144 18.3293ZM196.188 29.6445H193.176V17.2183H189.989V14.2944H193.176V10.3765H196.188V14.2944H199.755V17.2183H196.188V29.6445ZM217.061 21.9549C217.061 23.5142 216.71 24.8982 216.008 26.1067C215.326 27.2957 214.39 28.2313 213.201 28.9136C212.032 29.5958 210.716 29.9369 209.254 29.9369C207.792 29.9369 206.467 29.5958 205.278 28.9136C204.089 28.2313 203.143 27.2957 202.442 26.1067C201.76 24.8982 201.418 23.5142 201.418 21.9549C201.418 20.3955 201.76 19.0213 202.442 17.8323C203.143 16.6237 204.089 15.6784 205.278 14.9962C206.467 14.3139 207.792 13.9728 209.254 13.9728C210.716 13.9728 212.032 14.3139 213.201 14.9962C214.39 15.6784 215.326 16.6237 216.008 17.8323C216.71 19.0213 217.061 20.3955 217.061 21.9549ZM213.991 21.9549C214.01 20.9218 213.806 20.0154 213.377 19.2357C212.968 18.4365 212.402 17.8225 211.681 17.3937C210.96 16.9454 210.151 16.7212 209.254 16.7212C208.358 16.7212 207.539 16.9454 206.798 17.3937C206.077 17.8225 205.502 18.4365 205.073 19.2357C204.664 20.0154 204.469 20.9218 204.488 21.9549C204.469 22.9685 204.664 23.8748 205.073 24.674C205.502 25.4537 206.077 26.0677 206.798 26.516C207.539 26.9644 208.358 27.1885 209.254 27.1885C210.151 27.1885 210.96 26.9644 211.681 26.516C212.402 26.0677 212.968 25.4537 213.377 24.674C213.806 23.8748 214.01 22.9685 213.991 21.9549ZM228.939 17.5399C228.744 17.4424 228.5 17.3645 228.208 17.306C227.935 17.228 227.642 17.189 227.33 17.189C226.707 17.189 226.093 17.3547 225.488 17.6861C224.884 17.9979 224.377 18.456 223.968 19.0603C223.578 19.645 223.383 20.3468 223.383 21.1654V29.6445H220.342V14.2944H223.383V17.189C223.812 16.2534 224.455 15.4835 225.313 14.8792C226.19 14.2749 227.106 13.9728 228.061 13.9728C228.783 13.9728 229.338 14.0703 229.728 14.2652L228.939 17.5399ZM234.708 36.3693L237.222 30.6094L237.31 30.4047L230.176 14.2944H233.684L238.48 25.5804C238.538 25.6974 238.597 25.8436 238.655 26.019C238.713 26.1944 238.782 26.3893 238.86 26.6037C238.938 26.3893 239.006 26.1847 239.064 25.9897C239.142 25.7753 239.22 25.5707 239.298 25.3757L243.304 14.2944H246.871L240.555 29.6445L237.953 36.3693H234.708Z" fill="#FFB800"/>
                  </g>
                  <defs>
                  <filter id="filter0_d_8695_13801" x="7.02344" y="5.21094" width="245.695" height="40.9043" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="3.89844"/>
                  <feGaussianBlur stdDeviation="2.92383"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8695_13801"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8695_13801" result="shape"/>
                  </filter>
                  </defs>
                  </svg>
                </motion.button>
              </StyledButton>
              <StyledImage>
                <motion.button
                  ref={vidButtonRef}
                  className="play-icon"
                  style={{
                    animation: "1s ease-out 0s 1 slideInFromBottom",
                  }}
                  onClick={handleToggleVideo}
                  >

                  <motion.img
                    variants={rubiGlowAnimationVariants}
                    initial="hidden"
                    animate="visible"
                    className="gold-play-button"
                    src={YellowPlayButton}
                  />


                  <img src={GrayPlayButton} alt="play-Video" className="gray-play-button" />
                    {/* <img src={goldPlayButton} alt="play-Video" className="gold-play-button" />
                    <img src={grayPlayButton} alt="play-Video" className="gray-play-button" /> */}
                </motion.button>
              </StyledImage>
            </div>
          </motion.div>
        </StyledSection>
        <StyledCloseIcon>
          <div className="close" onClick={handleVideoEnd}>
          </div>
        </StyledCloseIcon>
        <VideoStyledBanner>
          <div className="initialVideoDiv">
            <video
              ref={vidRef}
              className="initialVideo"
              controlsList="nodownload"
              preload="metadata"
              onEnded={handleVideoEnd}
              src={src}
              style={{
                position: "relative",
                width: "90%",
                maxHeight: "100vh",
                // objectFit: "fill",
                opacity: 0,
                display: "block",
                visibility: "hidden",
                zIndex: 2
              }}
            >
              {/* <source src={src} type="video/mp4"  /> */}
            </video>
          </div>
        </VideoStyledBanner>
      </div>
    ) : (
      <video src={src} onClick={handleToggleVideo} controls controlsList="nodownload"></video>
    )}
  </>
)


export default function VideoTopSection({ src, poster, noControls, onEnded }) {
  const vidRef = useRef(null)
  const vidButtonRef = useRef(null)
  const navigation = isBrowser ? document.getElementById("header") : ""
  const posterOverlay = isBrowser
    ? document.getElementsByClassName("poster22-overlay")
    : ""
  const posterOpening = isBrowser
  ? document.getElementsByClassName("posterOverlayOpening")
  : "";
  const videoClass = isBrowser
    ? document.getElementsByClassName("video-class")
    : ""
  const playButton = isBrowser
    ? document.getElementsByClassName("play-button")
    : ""

  const closeIcon = isBrowser
    ? document.getElementsByClassName("close")
    : ""
  const initialVideo = isBrowser ? document.getElementsByClassName("initialVideo") : "";

  useEffect(() => {
    function handleEsc(event) {
      if (event.keyCode === 27) {
        handleVideoEnd()
      }
    }
    window.addEventListener("keydown", handleEsc)
    return (_) => {
      window.removeEventListener("keydown", handleEsc)
    }

  }, [])

    // React doesn't always insert the "muted" attribute. Without it, the video won't autoplay on certain browsers.This checks inserts that attribute, checks if the video is playing, if it still isnt it shows the play button
  useEffect(() => {
    const video = document.getElementById("posterOverlayOpening")
    if (video) {
      video.setAttribute("muted", "")
      let startPlayPromise = video.play()
      if (startPlayPromise !== undefined) {
        startPlayPromise
        .then(() => {
          console.log("video is playing!!!!!!!!!!!!!!!")
        })
        .catch((error) => {
          if (error.name === "NotAllowedError") {
          const posterOverlay = isBrowser ? document.getElementsByClassName("poster22-overlay") : "";
          const playButton = isBrowser ? document.getElementsByClassName("play-button") : "";
          playButton[0].style.display = "flex"
          posterOverlay[0].style.display = "block"
          }
        })
      }
    }
  })


  const handleVideoEnd = () => {
    console.log("VIDEO ENDED")
    const posterOverlay = isBrowser
    ? document.getElementsByClassName("poster22-overlay")
    : "";

    const playButton = isBrowser
    ? document.getElementsByClassName("play-button")
    : ""

    const posterOpening = isBrowser
    ? document.getElementsByClassName("posterOverlayOpening")
    : "";

    const videoClass = isBrowser
    ? document.getElementsByClassName("video-class")
    : ""

    vidButtonRef.current.classList.remove("is-playing")
    vidButtonRef.current.style.display = "flex"
    vidRef.current.load()
    vidRef.current.controls = false
    playButton[0].style.display = "flex"
    posterOverlay[0].style.display = "block"
    posterOpening[0].style.display = "block"
    videoClass[0].style.height = "100%"
    videoClass[0].style.zIndex = 1
    initialVideo[0].style.width = "90%"
    initialVideo[0].style.opacity = 0
    closeIcon[0].style.display = "none"
    initialVideo[0].style.visibility = "hidden"
  }

  const handlePlay = () => {
    vidRef.current.play()
    vidRef.current.controls = true
    vidButtonRef.current.classList.add("is-playing")
    vidButtonRef.current.style.display = "none"
    posterOverlay[0].style.display = "none"
    posterOpening[0].style.display = "none"
    videoClass[0].style.height = "95%"
    initialVideo[0].style.width = "100%"
    initialVideo[0].style.opacity = 1
    initialVideo[0].style.visibility = "visible"
    playButton[0].style.display = "none"
    closeIcon[0].style.display = "block"

    initialVideo[0].style.minWidth = "100%"
    initialVideo[0].style.minHeight = "100%"
    initialVideo[0].style.right = "0"
    initialVideo[0].style.bottom = "0"

    console.log("navigation", navigation)
    navigation ? console.log('there', navigation): console.log ('not', navigation)
}

const handlePause = () => {
    vidRef.current.pause()
    vidRef.current.controls = false
    vidButtonRef.current.classList.remove("is-playing")
    vidButtonRef.current.style.display = "flex"
    posterOverlay[0].style.display = "block"
    videoClass[0].style.height = "100%"
    initialVideo[0].style.width = "100%"
    initialVideo[0].style.opacity = 1
    initialVideo[0].style.visibility = "visible"
    closeIcon[0].style.display = "block"
    playButton[0].style.display = "flex"

    initialVideo[0].style.minWidth = "100%"
    initialVideo[0].style.minHeight = "100%"
    initialVideo[0].style.right = "0"
    initialVideo[0].style.bottom = "0"
  }

  const handleToggleVideo = () => {
    videoClass[0].style.zIndex = 0
    vidRef.current.paused ? handlePlay() : handlePause()
  }

  return (
    <>
      {renderVideo({
        noControls,
        // poster,
        src,
        vidButtonRef,
        vidRef,
        handleToggleVideo,
        onEnded,
        handleVideoEnd,
      })}
    </>
  )
}

VideoTopSection.propTypes = {
  noControls: PropTypes.bool,
  videoUrl: PropTypes.string,
}