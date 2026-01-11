/**
 * Tailwind CSS Preset
 * Auto-generated from design tokens
 * DO NOT EDIT DIRECTLY
 */

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        color: {
            base: {
                white: "oklch(1 0 0)",
                black: "oklch(0 0 0)",
                transparent: "transparent"
            },
            gray: {
                "50": "oklch(0.985 0.002 248.57)",
                "100": "oklch(0.967 0.003 264.51)",
                "200": "oklch(0.928 0.006 264.52)",
                "300": "oklch(0.872 0.009 258.38)",
                "400": "oklch(0.714 0.019 261.34)",
                "500": "oklch(0.551 0.023 264.37)",
                "600": "oklch(0.446 0.026 256.82)",
                "700": "oklch(0.373 0.031 259.74)",
                "800": "oklch(0.278 0.03 256.86)",
                "900": "oklch(0.21 0.032 264.67)",
                "950": "oklch(0.13 0.027 261.7)"
            },
            blue: {
                "50": "oklch(0.97 0.014 254.66)",
                "100": "oklch(0.932 0.032 255.61)",
                "200": "oklch(0.882 0.057 254.14)",
                "300": "oklch(0.809 0.096 251.83)",
                "400": "oklch(0.714 0.143 254.63)",
                "500": "oklch(0.623 0.188 259.82)",
                "600": "oklch(0.546 0.215 262.89)",
                "700": "oklch(0.488 0.217 264.38)",
                "800": "oklch(0.424 0.181 265.64)",
                "900": "oklch(0.379 0.138 265.53)",
                "950": "oklch(0.282 0.087 267.94)"
            },
            green: {
                "50": "oklch(0.982 0.018 156.09)",
                "100": "oklch(0.962 0.043 156.85)",
                "200": "oklch(0.925 0.081 156.05)",
                "300": "oklch(0.871 0.136 154.48)",
                "400": "oklch(0.8 0.182 151.73)",
                "500": "oklch(0.723 0.192 149.6)",
                "600": "oklch(0.627 0.17 149.23)",
                "700": "oklch(0.527 0.137 150.09)",
                "800": "oklch(0.448 0.108 151.35)",
                "900": "oklch(0.393 0.09 152.56)",
                "950": "oklch(0.266 0.063 152.96)"
            },
            red: {
                "50": "oklch(0.971 0.013 17.04)",
                "100": "oklch(0.936 0.031 17.58)",
                "200": "oklch(0.885 0.059 18.27)",
                "300": "oklch(0.808 0.103 19.54)",
                "400": "oklch(0.711 0.166 22.2)",
                "500": "oklch(0.637 0.208 25.32)",
                "600": "oklch(0.577 0.215 27.32)",
                "700": "oklch(0.505 0.19 27.51)",
                "800": "oklch(0.444 0.161 26.89)",
                "900": "oklch(0.396 0.133 25.71)",
                "950": "oklch(0.258 0.089 26.03)"
            },
            yellow: {
                "50": "oklch(0.987 0.026 102.28)",
                "100": "oklch(0.973 0.069 103.22)",
                "200": "oklch(0.945 0.124 101.55)",
                "300": "oklch(0.905 0.166 98.12)",
                "400": "oklch(0.861 0.173 91.94)",
                "500": "oklch(0.795 0.162 86.05)",
                "600": "oklch(0.681 0.142 75.83)",
                "700": "oklch(0.554 0.121 66.44)",
                "800": "oklch(0.476 0.103 61.9)",
                "900": "oklch(0.421 0.09 57.7)",
                "950": "oklch(0.286 0.064 53.8)"
            },
            purple: {
                "50": "oklch(0.977 0.014 308.06)",
                "100": "oklch(0.946 0.033 307.08)",
                "200": "oklch(0.902 0.06 306.66)",
                "300": "oklch(0.827 0.108 306.36)",
                "400": "oklch(0.722 0.177 305.49)",
                "500": "oklch(0.627 0.233 303.9)",
                "600": "oklch(0.558 0.253 302.32)",
                "700": "oklch(0.496 0.237 301.92)",
                "800": "oklch(0.438 0.198 303.72)",
                "900": "oklch(0.381 0.166 304.98)",
                "950": "oklch(0.291 0.143 302.71)"
            }
        },
        dark: {
            color: {
                background: {
                    default: "oklch(0.13 0.027 261.7)",
                    subtle: "oklch(0.21 0.032 264.67)",
                    muted: "oklch(0.278 0.03 256.86)",
                    inverse: "oklch(0.985 0.002 248.57)"
                },
                foreground: {
                    default: "oklch(0.985 0.002 248.57)",
                    muted: "oklch(0.714 0.019 261.34)",
                    subtle: "oklch(0.551 0.023 264.37)",
                    inverse: "oklch(0.21 0.032 264.67)"
                },
                primary: {
                    default: "oklch(0.623 0.188 259.82)",
                    hover: "oklch(0.714 0.143 254.63)",
                    active: "oklch(0.809 0.096 251.83)",
                    foreground: "oklch(0.13 0.027 261.7)"
                },
                secondary: {
                    default: "oklch(0.278 0.03 256.86)",
                    hover: "oklch(0.373 0.031 259.74)",
                    active: "oklch(0.446 0.026 256.82)",
                    foreground: "oklch(0.985 0.002 248.57)"
                },
                destructive: {
                    default: "oklch(0.577 0.215 27.32)",
                    hover: "oklch(0.637 0.208 25.32)",
                    active: "oklch(0.711 0.166 22.2)",
                    foreground: "oklch(0.985 0.002 248.57)"
                },
                success: {
                    default: "oklch(0.627 0.17 149.23)",
                    hover: "oklch(0.723 0.192 149.6)",
                    active: "oklch(0.8 0.182 151.73)",
                    foreground: "oklch(0.985 0.002 248.57)"
                },
                warning: {
                    default: "oklch(0.795 0.162 86.05)",
                    hover: "oklch(0.861 0.173 91.94)",
                    active: "oklch(0.905 0.166 98.12)",
                    foreground: "oklch(0.21 0.032 264.67)"
                },
                muted: {
                    default: "oklch(0.278 0.03 256.86)",
                    foreground: "oklch(0.714 0.019 261.34)"
                },
                accent: {
                    default: "oklch(0.381 0.166 304.98)",
                    hover: "oklch(0.438 0.198 303.72)",
                    foreground: "oklch(0.946 0.033 307.08)"
                },
                card: {
                    default: "oklch(0.21 0.032 264.67)",
                    foreground: "oklch(0.985 0.002 248.57)"
                },
                popover: {
                    default: "oklch(0.21 0.032 264.67)",
                    foreground: "oklch(0.985 0.002 248.57)"
                },
                border: {
                    default: "oklch(0.278 0.03 256.86)",
                    strong: "oklch(0.373 0.031 259.74)",
                    muted: "oklch(0.21 0.032 264.67)"
                },
                input: {
                    default: "oklch(0.278 0.03 256.86)",
                    focus: "oklch(0.714 0.143 254.63)"
                },
                ring: {
                    default: "oklch(0.714 0.143 254.63)"
                },
                chart: {
                    "1": "oklch(0.714 0.143 254.63)",
                    "2": "oklch(0.8 0.182 151.73)",
                    "3": "oklch(0.722 0.177 305.49)",
                    "4": "oklch(0.861 0.173 91.94)",
                    "5": "oklch(0.711 0.166 22.2)"
                }
            }
        },
        semantic: {
            color: {
                background: {
                    default: "oklch(1 0 0)",
                    subtle: "oklch(0.985 0.002 248.57)",
                    muted: "oklch(0.967 0.003 264.51)",
                    inverse: "oklch(0.21 0.032 264.67)"
                },
                foreground: {
                    default: "oklch(0.21 0.032 264.67)",
                    muted: "oklch(0.551 0.023 264.37)",
                    subtle: "oklch(0.714 0.019 261.34)",
                    inverse: "oklch(1 0 0)"
                },
                primary: {
                    default: "oklch(0.546 0.215 262.89)",
                    hover: "oklch(0.488 0.217 264.38)",
                    active: "oklch(0.424 0.181 265.64)",
                    foreground: "oklch(1 0 0)"
                },
                secondary: {
                    default: "oklch(0.967 0.003 264.51)",
                    hover: "oklch(0.928 0.006 264.52)",
                    active: "oklch(0.872 0.009 258.38)",
                    foreground: "oklch(0.21 0.032 264.67)"
                },
                destructive: {
                    default: "oklch(0.577 0.215 27.32)",
                    hover: "oklch(0.505 0.19 27.51)",
                    active: "oklch(0.444 0.161 26.89)",
                    foreground: "oklch(1 0 0)"
                },
                success: {
                    default: "oklch(0.627 0.17 149.23)",
                    hover: "oklch(0.527 0.137 150.09)",
                    active: "oklch(0.448 0.108 151.35)",
                    foreground: "oklch(1 0 0)"
                },
                warning: {
                    default: "oklch(0.795 0.162 86.05)",
                    hover: "oklch(0.681 0.142 75.83)",
                    active: "oklch(0.554 0.121 66.44)",
                    foreground: "oklch(0.21 0.032 264.67)"
                },
                muted: {
                    default: "oklch(0.967 0.003 264.51)",
                    foreground: "oklch(0.551 0.023 264.37)"
                },
                accent: {
                    default: "oklch(0.946 0.033 307.08)",
                    hover: "oklch(0.902 0.06 306.66)",
                    foreground: "oklch(0.381 0.166 304.98)"
                },
                card: {
                    default: "oklch(1 0 0)",
                    foreground: "oklch(0.21 0.032 264.67)"
                },
                popover: {
                    default: "oklch(1 0 0)",
                    foreground: "oklch(0.21 0.032 264.67)"
                },
                border: {
                    default: "oklch(0.928 0.006 264.52)",
                    strong: "oklch(0.872 0.009 258.38)",
                    muted: "oklch(0.967 0.003 264.51)"
                },
                input: {
                    default: "oklch(0.928 0.006 264.52)",
                    focus: "oklch(0.623 0.188 259.82)"
                },
                ring: {
                    default: "oklch(0.623 0.188 259.82)"
                },
                chart: {
                    "1": "oklch(0.623 0.188 259.82)",
                    "2": "oklch(0.723 0.192 149.6)",
                    "3": "oklch(0.627 0.233 303.9)",
                    "4": "oklch(0.795 0.162 86.05)",
                    "5": "oklch(0.637 0.208 25.32)"
                }
            }
        }
    },
    spacing: {
        "0": "0",
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "7": "1.75rem",
        "8": "2rem",
        "9": "2.25rem",
        "10": "2.5rem",
        "11": "2.75rem",
        "12": "3rem",
        "14": "3.5rem",
        "16": "4rem",
        "20": "5rem",
        "24": "6rem",
        "28": "7rem",
        "32": "8rem",
        "36": "9rem",
        "40": "10rem",
        "44": "11rem",
        "48": "12rem",
        "52": "13rem",
        "56": "14rem",
        "60": "15rem",
        "64": "16rem",
        "72": "18rem",
        "80": "20rem",
        "96": "24rem",
        px: "1px",
        "0.5": "0.125rem",
        "1.5": "0.375rem",
        "2.5": "0.625rem",
        "3.5": "0.875rem",
        sm: "0.5rem",
        md: "0.5rem",
        lg: "0.75rem",
        x: "0.75rem",
        y: "0.25rem",
        padding: "1.5rem"
    },
    fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
        "7xl": "4.5rem",
        "8xl": "6rem",
        "9xl": "8rem",
        md: "1rem",
        fontSize: "0.75rem"
    },
    fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
        fontWeight: "500"
    },
    fontFamily: {
        sans: [
            "Inter",
            "ui-sans-serif",
            "system-ui",
            "sans-serif"
        ],
        serif: [
            "ui-serif",
            "Georgia",
            "serif"
        ],
        mono: [
            "ui-monospace",
            "SFMono-Regular",
            "Menlo",
            "monospace"
        ]
    },
    borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
        borderRadius: "9999px"
    },
    boxShadow: {
        none: "none",
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
    },
    lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2"
    },
    letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em"
    }
}
  }
};
