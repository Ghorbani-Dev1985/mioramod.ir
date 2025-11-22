import localFont from "next/font/local";

export const PeydaWebFont = localFont({
    src: [
        {
            path: "../../public/fonts/Thin/Peyda-Thin.woff2",
            weight: "100",
            style: "thin",
        },
        {
            path: "../../public/fonts/ExtraLight/Peyda-ExtraLight.woff2",
            weight: "200",
            style: "extralight",
        },
        {
            path: "../../public/fonts/Light/Peyda-Light.woff2",
            weight: "300",
            style: "light",
        },
        {
            path: "../../public/fonts/Regular/Peyda-Regular.woff2",
            weight: "400",
            style: "regular",
        },
        {
            path: "../../public/fonts/Medium/Peyda-Medium.woff2",
            weight: "500",
            style: "medium",
        },
        {
            path: "../../public/fonts/SemiBold/Peyda-SemiBold.woff2",
            weight: "600",
            style: "semibold",
        },
        {
            path: "../../public/fonts/Bold/Peyda-Bold.woff2",
            weight: "700",
            style: "bold",
        },
        {
            path: "../../public/fonts/ExtraBold/Peyda-ExtraBold.woff2",
            weight: "800",
            style: "extrabold",
        },
        {
            path: "../../public/fonts/Black/Peyda-Black.woff2",
            weight: "900",
            style: "black",
        },
    ],
    variable: "--font-peyda-fd"
})