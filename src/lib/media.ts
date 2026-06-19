export const mediaAssets = {
  hero: {
    src: '/media/heroes/etersolis-resource-recovery-hero.png',
    ogSrc: '/media/og/etersolis-home-og.png',
    alt: 'A clean modern materials recovery facility with conveyors carrying sorted recyclable material.',
    credit: 'Generated with OpenAI image generation for EterSolis'
  },
  facility: {
    src: '/media/photos/sims-material-recovery-facility.jpg',
    previewSrc: '/media/photos/sims-material-recovery-facility-1400.jpg',
    alt: 'A high-angle view of an industrial material recovery facility with yellow safety rails and sorting equipment.',
    credit: 'JelloMistress via Wikimedia Commons, CC BY-SA 4.0'
  },
  wastewater: {
    hero: {
      src: '/media/heroes/etersolis-wastewater-treatment-hero.png',
      alt: 'A clean modern wastewater treatment facility with clarifiers, aeration basins and professional water recovery infrastructure.',
      credit: 'Generated with OpenAI image generation for EterSolis'
    },
    aeration: {
      src: '/media/photos/wastewater-aeration-tank-bengaluru.jpg',
      previewSrc: '/media/photos/wastewater-aeration-tank-bengaluru-1600.jpg',
      alt: 'Aeration tanks at a sewage treatment plant with clean industrial walkways and active water treatment infrastructure.',
      credit: 'Vraj Acharya, WELL Labs via Wikimedia Commons, CC BY-SA 4.0'
    },
    aerial: {
      src: '/media/photos/wastewater-stp-aerial-bengaluru.jpg',
      previewSrc: '/media/photos/wastewater-stp-aerial-bengaluru-1600.jpg',
      alt: 'Aerial view of a sewage treatment plant with circular clarifiers and organized water treatment basins.',
      credit: 'Vraj Acharya, WELL Labs via Wikimedia Commons, CC BY-SA 4.0'
    },
    lagoon: {
      src: '/media/photos/biofactoria-santiago-lagoon.jpg',
      previewSrc: '/media/photos/biofactoria-santiago-lagoon-1600.jpg',
      alt: 'Environmental lagoon at a modern biofactory and water recovery site.',
      credit: 'Periodista2252 via Wikimedia Commons, CC BY-SA 4.0'
    }
  },
  helios: {
    icon: {
      src: '/media/helios/helios-icon.png',
      lightSrc: '/media/helios/helios-icon-light.png',
      darkSrc: '/media/helios/helios-icon-dark.png',
      alt: 'Transparent Helios orbital guidance mark.',
      width: 320,
      height: 319,
      credit: 'Helios controlled brand asset'
    },
    lockup: {
      src: '/media/helios/helios-primary-lockup.png',
      alt: 'Transparent Helios primary lockup with orbital mark, wordmark and tagline.',
      width: 960,
      height: 246,
      credit: 'Helios controlled brand asset'
    },
    wordmark: {
      src: '/media/helios/helios-wordmark-tagline.png',
      darkSrc: '/media/helios/helios-wordmark-tagline-dark.png',
      alt: 'Transparent Helios wordmark and guidance tagline.',
      width: 560,
      height: 100,
      credit: 'Helios controlled brand asset'
    },
    earthSplash: {
      src: '/media/helios/helios-earth-splash.png',
      alt: 'Helios orbital guidance mark and wordmark over a connected view of Earth.',
      width: 1400,
      height: 788,
      credit: 'Helios controlled brand asset'
    }
  },
  kymnis: {
    mark: {
      src: '/media/kymnis-logo-mark-only.png',
      alt: 'KYMNIS standalone mark with radiating arrows, circular intelligence rings and central cube.',
      width: 1024,
      height: 1024,
      credit: 'KYMNIS controlled brand asset'
    },
    palette: {
      teal: '#007D79',
      gold: '#D9A520',
      ink: '#2D2D2D',
      white: '#FFFFFF'
    }
  }
} as const;
