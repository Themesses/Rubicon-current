import  {useEffect, useState} from 'react'



// The parallax is a bit sensitive and since it's composed of multiple elements, it introduces potential for jank. One of the main culprits is the x rotation on the main parallax banner. However, that rotation also sales the effect of a 'gimble' that is important to Jeremy. The X rotation also introduces majot jank on pc's. This hook detects the pcs and thus is used very sparringly to only turn off this effect.

export default function useDeviceDetect() {
    const [isMac, setIsMac] = useState(false)
    const [isSafari, setIsSafari] = useState(false)
    const [isFirefox, setIsFirefox] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        // console.log(`user device is: ${navigator.userAgent}`)
        const userAgent = navigator.userAgent
        const mac = Boolean(userAgent.match(/Macintosh|Linux|Firefox/i))
        const safari = Boolean(userAgent.match(/Safari/i))
        const firefox = Boolean(userAgent.match(/Firefox/i))
        const mobile = Boolean(userAgent.match(/mobi/i))
        setIsMac(mac)
        setIsSafari(safari)
        setIsFirefox(firefox)
        setIsMobile(mobile)
    }, [])
    return {isMac, isSafari, isFirefox, isMobile}
}