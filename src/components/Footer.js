import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import EmailIcon from "@mui/icons-material/Email"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import InstagramIcon from "@mui/icons-material/Instagram"
import FacebookIcon from "@mui/icons-material/Facebook"
import { motion} from "framer-motion"


const StyledFooter = styled(motion.footer)`
  overflow: hidden;
  position: absolute;
  bottom: 0%;
  left: 0%;
  right: 0%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.9em;
  color: var(--beige);
  justify-content: center;
  /* margin: 0; */
  box-sizing: border-box;
  z-index: 999;
  ul {
    list-style: none;
  }
  ul {
    color: var(--beige);
  }
  .footer-main {
    display: flex;
    flex-direction: row;
    margin-left: 0;
    margin: 0;
    margin-bottom: 0.5em;
    padding: 0;
    justify-content: center;
  }
  .socials {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 5px 0 0 0;
    margin: 0 0 0 1em;

    font-size: inherit;
  }
  .socials li {
    margin: 0 0.2em;
  }
  .socials li a {
    color: var(--beige);
  }
  a {
    color: inherit;
    font-size: inherit;
    text-decoration: none;
  }
  .MuiIcon-root {
    font-size: 2em !important;
  }
  p {
    margin: 0 0 .3em 0;
    padding: 0;
    font-size: 1.3rem;
    color: rgba(84, 78, 78, .8);
  }
  @media screen and (max-width: 620px) {
      /* border: 1px solid red; */
      width: 100%;
      font-size: 1.5rem;
  }
  @media screen and (max-width: 1000px) and (min-width: 520px) and (orientation: landscape) {
      font-size: 1.6rem;
  }
`

export default function Footer({isBottom}) {

  const footerAnimation = {
    initial: {opacity: 0, y: 10,  transition: { duration: 0.5}},
    animate: {opacity: 1, y: -15, transition: { delay: .7, duration: 0.5, staggerChildren: 0.1}},
  }

  return (
    <StyledFooter initial='initial' animate='animate' variants={footerAnimation}>
      <ul className="footer-main">
        <li>
          <h2>rubicon story</h2>
        </li>
        <li>
          <ul className="socials">
            <li>
              <a href="#">
                <EmailIcon fontSize="large" />
              </a>
            </li>
            <li>
              <a href="#">
                <LinkedInIcon fontSize="large" />
              </a>
            </li>
            <li>
              <a href="#">
                <InstagramIcon fontSize="large" />
              </a>
            </li>
            <li>
              <a href="#">
                <FacebookIcon fontSize="large" />
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <p>
        &copy;{" "}
        {new Date().getFullYear()}
        {" "}|{" "}
        <Link to="/privacy-policy">Privacy Policy</Link>
      </p>
    </StyledFooter>
  )
}
