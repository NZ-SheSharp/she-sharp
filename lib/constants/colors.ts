/**
 * She Sharp Color System
 * Based on the organization's brand guidelines
 */

export const colors = {
  // Primary Colors
  purple: {
    dark: '#9b2e83',    // Purple Dark - Primary brand color
    mid: '#c846ab',     // Purple Mid - Secondary actions
    light: '#f7e5f3',   // Purple Light - Backgrounds
  },
  
  // Secondary Colors
  periwinkle: {
    dark: '#8982ff',    // Periwinkle Dark - Accent color
    light: '#f4f4fa',   // Periwinkle Light - Subtle backgrounds
  },
  
  // Navy Colors
  navy: {
    dark: '#1f1e44',    // Navy Dark - Text, headers
    light: '#eaf2ff',   // Navy Light - Backgrounds
  },
  
  // Accent Colors
  mint: {
    dark: '#b1f6e9',    // Mint Dark - Success, highlights
    light: '#effefb',   // Mint Light - Subtle accents
  },
  
  // Utility Colors
  gray: '#9b9b9b',      // Accessible Component Gray - Secondary text
  blue: '#1378d1',      // Accessible Component Blue - Links, CTAs
  white: '#ffffff',     // White - Primary background
  error: '#d72f40',     // Error - Form validation, alerts
  
  // Note: "Utility Black" was listed as white in the palette, 
  // so we'll use navy-dark for black text needs
  black: '#1f1e44',     // Using Navy Dark as functional black
} as const;

// Semantic color assignments
export const semanticColors = {
  // Brand
  primary: colors.purple.dark,
  primaryHover: colors.purple.mid,
  primaryLight: colors.purple.light,
  
  // Interactive
  accent: colors.periwinkle.dark,
  accentLight: colors.periwinkle.light,
  
  // Text
  textPrimary: colors.navy.dark,
  textSecondary: colors.gray,
  textOnDark: colors.white,
  
  // Backgrounds
  bgPrimary: colors.white,
  bgSecondary: colors.navy.light,
  bgAccent: colors.mint.light,
  bgDark: colors.navy.dark,
  
  // States
  success: colors.mint.dark,
  error: colors.error,
  link: colors.blue,
  linkHover: colors.purple.dark,
  
  // Borders
  border: colors.periwinkle.light,
  borderDark: colors.gray,
} as const;

// Gradients
export const gradients = {
  primary: `linear-gradient(135deg, ${colors.purple.dark} 0%, ${colors.periwinkle.dark} 100%)`,
  subtle: `linear-gradient(135deg, ${colors.purple.light} 0%, ${colors.periwinkle.light} 100%)`,
  mint: `linear-gradient(135deg, ${colors.mint.light} 0%, ${colors.mint.dark} 100%)`,
} as const;