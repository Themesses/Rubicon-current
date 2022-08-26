import React, {useState,useEffect} from "react"
import GlobalStyles from "../styles/GlobalStyles"
import Typography from "../styles/Typography"
// import Video from "../components/Video"
import VideoTopSection from "../components/VideoTopSection"
import Story from "../assets/video/Story-lg.mp4"
import { useInView } from "react-intersection-observer"

export default function Layout({children}) {
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, {
        isVideoVisible: {isVideoVisible},
        // anything you want to pass down can go here
    }),
);
  const [ ref, inView] = useInView({
    threshold: 0.001,
  })

  useEffect(() => {
    if (inView) {
      setIsVideoVisible(true)
    }
    if (!inView) {
      setIsVideoVisible(false)
    }
  }, [ref, inView])

  return (
    <>
      <GlobalStyles />
      <Typography />
      <div ref={ref}>
        {/* <Video src={Story} noControls={true} /> */}
        <VideoTopSection src={Story} noControls={true}/>
      </div>
      {childrenWithProps}
    </>
  )
}
