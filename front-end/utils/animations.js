const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export { fadeInUp, stagger }
