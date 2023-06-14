import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"

const isBrowser = typeof window !== "undefined"

const StyledSection = styled.section`
  overflow: hidden;
  max-width: 110rem;
  margin: 0 auto;
  padding: 0 2rem;
  color: var(--beige);
  font-family: 'Lexend Deca';
  h1 {
    /* font-family: LexendDeca; */
    font-size: clamp(2.5rem, 1.8vw, 3.5rem);
    /* margin: 4rem 0; */
  }
  h2,
  h3 {
    /* font-family: LexendDeca; */
    margin: 2rem 0;
    font-size: clamp(1.7rem, 1.8vw, 2.2rem);
  }
  p {
    margin: .5em;
    font-size: clamp(1.5rem, 1.8vw, 2rem);

  }
  li {
    font-size: clamp(1.5rem, 1.8vw, 2rem);
    line-height: 1.6;
    font-weight: 200;
  }
  a,
  a:visited {
    color: var(--gold);
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  };
`

const PrivacyPolicy = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { title: { eq: "Privacy Policy" } } }
      ) {
        nodes {
          id
          frontmatter {
            title
          }
          html
        }
      }
    }
  `)
  return (
    <>
      {data.allMarkdownRemark.nodes.map((item) => (
        <StyledSection>
          <Link to={isBrowser && window.innerWidth > 600 ? "/#main" : "/"} id="legal">Home</Link>
          {/* <Link to={ "/"} id="legal">Home</Link> */}
          <section dangerouslySetInnerHTML={{ __html: item.html }} />
          <br />
          <br />
          <br />
          {/* <Link to={"/"}>Home</Link> */}
          <Link to={isBrowser && window.innerWidth > 600 ? "/#main" : "/"} id="legal">Home</Link>
        </StyledSection>
      ))}
    </>
  )
}

export default PrivacyPolicy