import type Lenis from 'lenis'

/** The page's Lenis instance, while one is running. */
export const scroller: { lenis: Lenis | null } = { lenis: null }
