import React from "react"
import GlobalStyles from "../styles/GlobalStyles"
import Typography from "../styles/Typography"
// import Video from "../components/Video" 
import VideoTopSection from "../components/VideoTopSection"
import Story from '../assets/video/Story-lg.mp4'

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyles />
      <Typography />
      {/* <Video src={Story} noControls={true}/> */}
      <VideoTopSection src={Story} noControls={true}/>
      {children}
    </>
  )
}