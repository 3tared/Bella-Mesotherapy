// Product UI design tokens
export const PRODUCT_UI = {
  card: {
    borderRadius: 'rounded-2xl',
    accentBarWidth: 'w-[3px]',
    imageSectionHeight: 'h-64',
    contentPadding: 'p-6',
  },
  filter: {
    pillHeight: 'h-9',
    pillPadding: 'px-4',
    activeColor: '#C9A96E',   // brand rose gold
    activeText: '#FAF8F5',    // ivory
    inactiveText: '#1A1A1A',  // charcoal
    inactiveBorder: 'rgba(26,26,26,0.2)',
    transitionSpring: { type: 'spring', bounce: 0.12, duration: 0.4 } as const,
  },
  grid: {
    desktop: 'grid-cols-3',
    tablet:  'grid-cols-2',
    mobile:  'grid-cols-1',
    gap:     'gap-6 lg:gap-8',
  },
  animation: {
    cardHover:    { y: -4, boxShadow: '0 20px 48px rgba(0,0,0,0.09)' },
    cardTransition: { duration: 0.25, ease: 'easeOut' },
    gridItemEntry: { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } },
    gridStagger:   0.06,  // seconds between cards
  },
} as const;
