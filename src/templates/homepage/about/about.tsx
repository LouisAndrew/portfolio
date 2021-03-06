import React, { useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
// import styling libs
import { TweenLite } from 'gsap'
import { Flex, Heading, Text } from 'rebass'
import Img, { FixedObject } from 'gatsby-image'
// import local components

// custom styling
import './index.scss'

/**
 * About me section component.
 */
const About: React.FC<unknown> = () => {
    const data = useStaticQuery(graphql`
        query {
            aboutData: markdownRemark(
                frontmatter: { template_key: { eq: "page" } }
            ) {
                frontmatter {
                    about {
                        about_content
                    }
                }
            }
            imgS: markdownRemark(
                frontmatter: { template_key: { eq: "page" } }
            ) {
                frontmatter {
                    about {
                        about_imgs {
                            childImageSharp {
                                fixed(width: 150, height: 150, quality: 100) {
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
                    about {
                        about_imgs {
                            childImageSharp {
                                fixed(width: 200, height: 200, quality: 100) {
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
                    about {
                        about_imgs {
                            childImageSharp {
                                fixed(width: 250, height: 250, quality: 100) {
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
                    about {
                        about_imgs {
                            childImageSharp {
                                fixed(width: 350, height: 350, quality: 100) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
        }
    `)

    const pageData = data.aboutData.frontmatter.about
    const imgS = data.imgS.frontmatter.about.about_imgs[0].childImageSharp.fixed
    const imgM = data.imgM.frontmatter.about.about_imgs[0].childImageSharp.fixed
    const imgL = data.imgL.frontmatter.about.about_imgs[0].childImageSharp.fixed
    const imgXL =
        data.imgXL.frontmatter.about.about_imgs[0].childImageSharp.fixed

    const sources = [
        { ...imgS, media: '(max-width: 640px)' } as FixedObject,
        { ...imgM, media: '(max-width: 960px)' } as FixedObject,
        { ...imgXL, media: '(min-width: 1952px)' } as FixedObject,
        imgL as FixedObject,
    ]

    const wrapperRef = React.createRef<HTMLDivElement>()
    const flexRef = React.createRef<HTMLDivElement>()
    const contentRef = React.createRef<HTMLParagraphElement>()

    useEffect(() => {
        const wrapperEl = wrapperRef.current
        const flexEl = flexRef.current
        const contentEl = contentRef.current

        if (wrapperEl && flexEl && contentEl) {
            TweenLite.from(flexEl, 1, {
                scrollTrigger: {
                    trigger: wrapperEl,
                    start: 'top center',
                },
                opacity: 0,
            })

            TweenLite.from(contentEl, 0.6, {
                scrollTrigger: {
                    trigger: wrapperEl,
                    start: 'top center',
                },
                opacity: 0,
                x: 20,
                delay: 0.5,
            })

            // set the opacity of header-link pointing to this section to 1.
            TweenLite.to('#header-link-about', 0.4, {
                scrollTrigger: {
                    trigger: wrapperEl,
                    start: 'top center',
                    end: 'bottom center',
                    // https://ihatetomatoes.net/scrolltrigger-tutorial-toggleactions-toggleclass/
                    toggleActions: 'play reverse play reverse',
                },
                opacity: 1,
            })
        }
    }, [])

    return (
        <Flex
            ref={wrapperRef}
            variant="wrapper"
            alignItems={['center']}
            id="about"
        >
            <Flex flexDirection="column">
                <Heading
                    as="h2"
                    variant="heading"
                    textAlign="center"
                    mb={[48]}
                    // mt={[5]}
                >
                    About me
                </Heading>
                <Flex
                    flexDirection={['column', 'column', 'row']}
                    alignItems="center"
                    mb={[5]}
                    ref={flexRef}
                >
                    <Img
                        fixed={sources}
                        style={{ flexShrink: 0 }}
                        imgStyle={{ borderRadius: '50%', flexShrink: 0 }}
                        alt="portrait of me"
                    />
                    <Text
                        textAlign={['center', 'center', 'left']}
                        variant="body"
                        mt={[4, 4, 0]}
                        ml={[0, 0, 5]}
                        data-testid="content"
                        as="p"
                        ref={contentRef}
                    >
                        {pageData.about_content}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export { About }
