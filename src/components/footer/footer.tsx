import React, { useEffect } from 'react'
import { TweenLite } from 'gsap'
// import styling libs
import { Flex, Box } from 'rebass'
// import local components
import Socials from './socials'
import Links from './links'
import EmailMe from './email-me'

// custom styling for iphone 5s
import './index.scss'

/**
 * Footer reusablae component
 */
const Footer: React.FC<unknown> = () => {
    const ref = React.useRef<HTMLDivElement>()

    // apply animation when the component is mounted
    useEffect(() => {
        const el = ref.current
        if (el) {
            TweenLite.to('#header-link-contact', 0.4, {
                scrollTrigger: {
                    trigger: el,
                    toggleActions: 'play reverse play reverse',
                },
                opacity: 1,
            })
        }
    }, [])

    return (
        <Flex
            variant="wrapper"
            as="footer"
            py={[5, 5, 5, 5, 5, 6]}
            bg="secondary"
            ref={ref}
            sx={{ borderColor: 'accent' }}
        >
            <Flex
                className="footer__inner-section"
                flexDirection={['column-reverse', 'row']}
                justifyContent={['space-between']}
                width="100%"
            >
                <Box width={['100%', '50%']} mt={[4, 0]} sx={{ flexGrow: 0 }}>
                    <Links />
                    <Socials />
                </Box>
                <EmailMe />
            </Flex>
        </Flex>
    )
}

export { Footer }
