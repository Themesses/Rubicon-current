module.exports = {
  siteMetadata: {
    title: `Creativity & Execution`,
    description: `for those looking to tell the story`,
    siteUrl: `https://www.rubiconstory.com`,
  },
  // flags: {
  //   DEV_SSR: true,
  // },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-plugin-layout",
    "gatsby-plugin-smoothscroll",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Lexend Deca",
              variants: ["100,200,300,400,500"],
            },
          ],
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/assets/images/`,
      },
      __key: "images",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
}
