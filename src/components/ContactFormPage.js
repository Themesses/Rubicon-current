import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Button from "@mui/material/Button"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { NetlifyForm } from "react-netlify-forms"
const isBrowser = typeof window !== "undefined"

function CircularProgressSuccess({ progress }) {
  const circleLength = useTransform(progress, [0, 100], [0, 1])
  const checkmarkPathLength = useTransform(progress, [0, 95, 100], [0, 0, 1])
  const circleColor = useTransform(
    progress,
    [0, 95, 100],
    ["#66BB66", "#66BB66", "#66BB66"]
  )

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 258 258"
    >
      <motion.path
        transform="translate(60 85)"
        d="M3 50L45 92L134 3"
        fill="transparent"
        stroke="#7BB86F"
        strokeWidth={8}
        style={{ pathLength: checkmarkPathLength }}
      />
      <motion.path
        d="M 130 6 C 198.483 6 254 61.517 254 130 C 254 198.483 198.483 254 130 254 C 61.517 254 6 198.483 6 130 C 6 61.517 61.517 6 130 6 Z"
        fill="transparent"
        strokeWidth="8"
        stroke={circleColor}
        style={{
          pathLength: circleLength,
        }}
      />
    </motion.svg>
  )
}
function CircularProgressFailure({ progress }) {
  const circleLength = useTransform(progress, [0, 100], [0, 1])
  const checkmarkPathLength = useTransform(progress, [0, 95, 100], [0, 0, 1])
  const circleColor = useTransform(
    progress,
    [0, 95, 100],
    ["#FFCC66", "#FFCC66", "#FFCC66"]
  )

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 258 258"
    >
      <motion.path
        transform="translate(50 60)"
        d="M 0 0 L 150, 150"
        fill="transparent"
        stroke="#FFCC66"
        strokeWidth={8}
        style={{ pathLength: checkmarkPathLength }}
      />
      <motion.path
        d="M 130 6 C 198.483 6 254 61.517 254 130 C 254 198.483 198.483 254 130 254 C 61.517 254 6 198.483 6 130 C 6 61.517 61.517 6 130 6 Z"
        fill="transparent"
        strokeWidth="8"
        stroke={circleColor}
        style={{
          pathLength: circleLength,
        }}
      />
    </motion.svg>
  )
}

const THIS_PAGE = "/"
const ContactFormPage = ({ setCompletedSuccessAnimation }) => {
  const [toggle, setToggle] = useState(true)
  const [error, setError] = useState(false)
  const [processing, setProcessing] = useState(false)
  let progress = useMotionValue(90)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  // }
  useEffect(() => {
    console.log("name:",formData.name)

  }, [formData.name])
  useEffect(() => {
    if (
      formData.name.length > 1 ||
      formData.email.length > 4 ||
      formData.message.length > 2
    ) {
      setProcessing(true)
    }
    if (
      formData.name.length < 2 ||
      formData.email.length < 5 ||
      formData.message.length < 3
    ) {
      setProcessing(false)
    }
  }, [formData.name, formData.email, formData.message])
  const [statusText, setStatusText] = useState("")
  const handleChange = (event) => {
    const key = event.target.name
    const updatedFormValue = event.target.value
    const newFormData = { ...formData, [key]: updatedFormValue }
    setFormData(newFormData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('submit')
    setToggle(false)
    if (isBrowser) {
      const hey = document.getElementById("modal-hey")
      hey.style.display = 'none'
    }

    const form = event.target

    fetch(THIS_PAGE, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        // "form-name": form.getAttribute("name"),
        "form-name": "Contact-Rubicon",
        ...formData,
      }).toString(),
    }).then((response) => {
      if (response.ok) {
        console.log("animation complete")
        setError(false)
        setCompletedSuccessAnimation(true)
      }
      if (!response.ok) {
        setError(true)
      }

      setStatusText("Thank You")
    })
  }

  return (
    <StyledForm>
      {toggle && !error ? (
        <NetlifyForm
         name='Contact-Rubicon'
        // <form
          onSubmit={(e) => handleSubmit(e)}
          action={THIS_PAGE}
        >
          <input type="hidden" name="form-name" value="Contact-Rubicon" />
          <div>
            <p>who are you?</p>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div>
            <p>what are you looking to do?</p>
            <textarea
              type="text"
              name="message"
              placeholder="message"
              value={formData.message}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="icon-wrapper">
            <Button
              onClick={handleSubmit}
              type="submit"
              aria-label="submit"
              sx={{ width: "100%", fontSize: '.55em' }}
              disabled={!processing}
            >
              connect
            </Button>
          </div>
          </NetlifyForm>
        // </form>
      ) : !toggle && !error ? (
        <StyledSuccess>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: 100 }}
            style={{ x: progress }}
            transition={{ duration: 1 }}
          />
          <CircularProgressSuccess progress={progress} />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
          ></motion.p>
        </StyledSuccess>
      ) : !toggle && error ? (
        <StyledError>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: 100 }}
            style={{ x: progress }}
            transition={{ duration: 1 }}
          />
          <CircularProgressFailure progress={progress} />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
          >
            contact@rubiconstory.com
          </motion.p>
        </StyledError>
      ) : null}
    </StyledForm>
  )
}
const StyledError = styled.section`
  box-sizing: border-box;
  min-width: 20vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const StyledSuccess = styled.section`
  box-sizing: border-box;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledForm = styled.section`
  box-sizing: border-box;

  textarea {
    display: flex;
    width: 100%;
    height: 6em;
    padding: 10px;
    box-sizing: border-box;
    background-color: transparent;
    background: #322f2f;
    box-shadow: inset 8px 8px 25px #252323, inset -8px -8px 25px #3f3b3b;
    border: 0.5px solid var(--beige);
    border-radius: 0.3em;
    resize: none;
  }
  input {
    display: flex;
    width: 100%;
    height: 2em;
    background-color: transparent;
    background: #322f2f;
    box-shadow: inset 8px 8px 25px #252323, inset -8px -8px 25px #3f3b3b;
    border: 0.5px solid var(--beige);
    border-radius: 0.3em;
    margin-bottom: 0.75em;
    padding: 10px;
    box-sizing: border-box;
  }
  textarea::placeholder,
  input::placeholder {
    color: var(--beige);
    font-weight: 200;
    font-family: "Lexend Deca", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    color: rgba(255, 255, 255, 0.3);
  }
  /* textarea::placeholder {
  } */
  textarea[type="text"],
  input[type="email"],
  input[type="text"] {
    min-width: 22vw;
    color: var(--beige);
    font-size: 0.75em !important;
    font-weight: 200;
  }

  button {
    color: var(--beige);
    background-color: transparent;
    text-decoration: none;
    transition: all 0.1s;
  }

  button:disabled {
    color: var(--gray)
  }

  textarea[type="text"],
  input[type="email"],
  input[type="text"] {
    color: var(--beige);
    font-size: var(--p-main-clamp);
  }
  .post-message {
    color: var(--beige);
  }
  .cancel-wrapper {
    position: absolute;
    display: flex;
    top: -0.25em;
    left: -0.25em;
    border-radius: 50%;
    background-color: var(--black);
  }
  .icon-wrapper {
    margin-top: 1.5em;
    margin-bottom: 1em;
    height: 30px;
    border-radius: 5px;
    background: rgb(48, 45, 45);
    box-shadow: 0.5px 0.5px 5px var(--black),
      -1px -1px 5px rgba(90, 90, 90, 0.8);
    transition: 0.4s;
  }
  .icon-wrapper:hover {
    background: #373434;
    box-shadow: inset 5px 5px 10px #2c2a2a, inset -5px -5px 10px #423e3e;
  }
  .icon_wrapper:active {
    background: rgb(48, 45, 45);
    box-shadow: 0.5px 0.5px 5px var(--black),
      -1px -1px 5px rgba(90, 90, 90, 0.8);
  }
  @media screen and (max-width: 1199px) and (min-width: 1000px) {
    font-size: 1.5rem;
    input {
      height: 3rem;
      margin: 0 0 1.5rem;
    }
    textarea[type="text"],
    input[type="email"],
    input[type="text"] {
      min-width: 28vw;
      color: var(--beige);
      font-weight: 200;
    }
  }
  @media screen and (max-width: 999px) and (min-width: 800px) {
    font-size: 1.5rem;
    color: rgb(252, 252, 252);
    button {
      font-size: .70em;
    }
    input {
      height: 3rem;
      margin: 0 0 1.5rem;
    }
    textarea[type="text"],
    input[type="email"],
    input[type="text"] {
      min-width: 32vw;
      color: var(--beige);
      font-size: 0.75em !important;
      font-weight: 200;
    }
  }
  @media screen and (max-width: 799px) and (min-width: 650px) {
    button {
      font-size: 1.1rem !important;
    }
    font-size: 1.4rem;
    color: rgb(252, 252, 252);
    input {
      height: 3rem;
      margin: 0 0 1rem;
    }
    textarea[type="text"],
    input[type="email"],
    input[type="text"] {
      min-width: 40vw;
      color: var(--beige);
      font-size: 0.75em !important;
      font-weight: 200;
    }
  }
  @media screen and (max-width: 649px) and (min-width: 440px) {
    font-size: 1.4rem;
    color: rgb(252, 252, 252);
    button {
      font-size: 1.3rem !important;
      padding: 0.6rem 1.2rem !important;
    }
    input {
      height: 2.5rem;
      margin: 0 0 1rem;
    }
  }
  @media screen and (max-width: 439px) {
    font-size: 1.3rem;
    color: rgb(252, 252, 252);
    button {
      font-size: 1.3rem !important;
      padding: 0.6rem 1.2rem !important;
    }
    input {
      height: 2.1rem;
      margin: 0 0 1rem;
    }
  }
`

export default ContactFormPage
