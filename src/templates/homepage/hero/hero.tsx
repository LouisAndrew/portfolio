import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
// import styling libs
import Img, { FixedObject } from 'gatsby-image'
import { Box, Heading, Flex, Text } from 'rebass'
// import local components

// custom very specific styling
import './index.scss'

/**
 * Hero section of the mainpage
 */
const Hero: React.FC<unknown> = () => {
    const data = useStaticQuery(graphql`
        {
            heroData: markdownRemark(
                frontmatter: { template_key: { eq: "page" } }
            ) {
                frontmatter {
                    hero {
                        hero_content
                        hero_headline
                    }
                }
            }
            imgS: markdownRemark(
                frontmatter: { template_key: { eq: "page" } }
            ) {
                frontmatter {
                    hero {
                        hero_imgs {
                            childImageSharp {
                                fixed(width: 200, height: 200, quality: 100) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
            imgM: markdownRemark(
                frontmatter: { template_key: { eq: "page" } }
            ) {
                frontmatter {
                    hero {
                        hero_imgs {
                            childImageSharp {
                                fixed(width: 150, height: 150, quality: 100) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
            imgL: markdownRemark(
                frontmatter: { template_key: { eq: "page" } }
            ) {
                frontmatter {
                    hero {
                        hero_imgs {
                            childImageSharp {
                                fixed(width: 300, height: 300, quality: 100) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
            imgXL: markdownRemark(
                frontmatter: { template_key: { eq: "page" } }
            ) {
                frontmatter {
                    hero {
                        hero_imgs {
                            childImageSharp {
                                fixed(width: 500, height: 500, quality: 100) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
        }
    `)

    // extract all queries here.
    const pageData = data.heroData.frontmatter.hero
    const imgS = data.imgS.frontmatter.hero.hero_imgs[0].childImageSharp.fixed
    const imgM = data.imgM.frontmatter.hero.hero_imgs[0].childImageSharp.fixed
    const imgL = data.imgL.frontmatter.hero.hero_imgs[0].childImageSharp.fixed
    const imgXL = data.imgXL.frontmatter.hero.hero_imgs[0].childImageSharp.fixed

    const sources = [
        { ...imgS, media: '(max-width: 640px)' } as FixedObject,
        {
            ...imgM,
            media:
                '(max-width: 840px) and (max-height: 420px) and (orientation: landscape)',
        } as FixedObject,
        {
            ...imgXL,
            media: '(min-width: 1952px)',
        } as FixedObject,
        imgL as FixedObject,
    ]
    const { hero_content: heroContent, hero_headline: heroHeadline } = pageData

    // TODO: add custom styling for iphone 5
    return (
        <Flex variant="wrapper">
            <Flex
                minHeight={['100vh', '100vh', '100vh', 'fit-content']}
                flexDirection={['column']}
                justifyContent={['center']}
                py={['unset', 'unset', 'unset', 6, 6, 7]}
            >
                <Flex
                    flexDirection={['column', 'row', 'column', 'row']}
                    alignItems={['center']}
                    className="hero__flex-wrapper"
                >
                    <Box
                        bg="secondary"
                        width="fit-content"
                        sx={{ borderRadius: '50%', flexShrink: 0 }}
                    >
                        <Img fixed={sources} />
                    </Box>
                    <Box
                        mt={['2vh', 0, 4, 0]}
                        ml={[0, 4, 0, 5]}
                        px={[1]}
                        sx={{
                            textAlign: ['center', 'left', 'center', 'left'],
                            textOverflow: 'wrap',
                        }}
                        width="100%"
                        className="hero__details-box"
                    >
                        <Heading as="h1" variant="primHeading" my={[3, 3, 4]}>
                            {heroHeadline
                                .split('\\n')
                                .map((text: string, i: number) => (
                                    <React.Fragment key={`hero-heading-${i}`}>
                                        {text}
                                        <br />
                                    </React.Fragment>
                                ))}
                        </Heading>
                        <Text as="p" variant="body" data-testid="content">
                            {heroContent}
                        </Text>
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    )
}

export { Hero }