import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
// import styling libs
import { Box, Flex, Heading } from 'rebass'
// import local components
import Skillcard from 'components/skillcard'

import './index.scss'

/**
 * component to showcase my skills on the homepage.
 */
const MySkills: React.FC<unknown> = () => {
    const data = useStaticQuery(graphql`
        query {
            markdownRemark(frontmatter: { template_key: { eq: "page" } }) {
                frontmatter {
                    skills
                }
            }
        }
    `)

    const mySkills: string[] = data.markdownRemark.frontmatter.skills

    return (
        <Flex variant="wrapper" id="skills">
            <Box width="100%">
                <Heading
                    as="h2"
                    variant="heading"
                    textAlign={['center', 'left']}
                >
                    Some Things I'm Familiar With
                </Heading>
                <Flex
                    my={[4]}
                    flexWrap="wrap"
                    justifyContent={['space-between']}
                >
                    {mySkills.map(skill => (
                        <Skillcard
                            techName={skill}
                            key={`homepage-skill-${skill}`}
                        />
                    ))}
                </Flex>
            </Box>
        </Flex>
    )
}

export { MySkills }