// She Sharp Design System - Clean and Professional
export const designSystem = {
  // Page theme colors
  pageThemes: {
    home: {
      primary: "purple-dark",
      secondary: "gray",
      accent: "purple-light",
    },
    about: {
      primary: "navy-dark", 
      secondary: "navy-light",
      accent: "gray",
    },
    events: {
      primary: "mint-dark",
      secondary: "mint-light", 
      accent: "gray",
    },
    mentorship: {
      primary: "periwinkle-dark",
      secondary: "periwinkle-light",
      accent: "gray",
    },
    media: {
      primary: "purple-mid",
      secondary: "purple-light",
      accent: "gray",
    },
    donate: {
      primary: "purple-dark",
      secondary: "mint-light",
      accent: "gray",
    },
    contact: {
      primary: "navy-dark",
      secondary: "gray",
      accent: "purple-light",
    },
  },

  // Button styles (no gradients)
  buttons: {
    primary: "bg-[color] text-white hover:bg-[color]/90",
    secondary: "border-2 border-[color] text-[color] hover:bg-[color]/10",
    ghost: "text-[color] hover:text-[color]/80 hover:underline",
  },

  // Animation durations
  animation: {
    duration: "150ms",
    easing: "ease-in-out",
  },

  // Section backgrounds
  backgrounds: {
    white: "bg-white",
    light: "bg-gray-50",
    accent: "bg-[color]/5", // 5% opacity of theme color
  },

  // Component standards
  components: {
    card: "bg-white border border-gray-200 hover:shadow-sm",
    section: "py-16 md:py-24",
    container: "container mx-auto px-4 sm:px-6 lg:px-8",
  },
};