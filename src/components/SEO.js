import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import favicon from "../assets/images/favicon.ico"
import imageMain from "../assets/images/video_poster_fallback.png"
import imageAlternate from "../assets/images/rubicon.png"

export default function SEO({ children, location, description, title, image }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)
  return (
    <Helmet titleTemplate={`${site.siteMetadata.title} - %s`}>
      <html lang="en" />
      <title>{title}</title>

      {/* Fav Icons */}
      <link rel="icon" href={favicon} />

      {/* Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf=8" />
      <meta name="description" content={site.siteMetadata.description} />

      {/* Open Graph */}
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={imageAlternate} />
      {/* <meta property="og:title" content={title} key="ogtitle" /> */}
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Creativity & Execution — for those looking to tell the story"
        key="ogtitle"
      />
      {/* <meta property="og:site_name" content={site.siteMetadata.title} key="ogsitename" /> */}
      <meta property="og:site_name" content="Rubicon Story" key="ogsitename" />
      <meta
        property="og:description"
        content="Media production for quality clients. Rubicon — your limitless source for creative audio/visuals."
        key="ogdesc"
      />

      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.rubiconstory.com/" />
      <meta
        property="og:title"
        content="Creativity & Execution — for those looking to tell the story"
      />
      <meta
        property="og:description"
        content="Media production for quality clients. Rubicon — your limitless source for creative audio/visuals."
      />
      <meta property="og:image" content={imageAlternate} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.rubiconstory.com/" />
      <meta
        property="twitter:title"
        content="Creativity & Execution — for those looking to tell the story"
      />
      <meta
        property="twitter:description"
        content="Media production for quality clients. Rubicon — your limitless source for creative audio/visuals."
      />
      <meta property="twitter:image" content={imageAlternate} />
      {children}
    </Helmet>
  )
}
