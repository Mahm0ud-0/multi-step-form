export const steps = [
    {
        number: 1,
        title: "YOUR INFO",
    },
    {
        number: 2,
        title: "SELECT PLAN",
    },
    {
        number: 3,
        title: "ADD-ONS",
    },
    {
        number: 4,
        title: "SUMMARY",
    },
]

import arcade from "../assets/images/icon-arcade.svg"
import advanced from "../assets/images/icon-advanced.svg"
import pro from "../assets/images/icon-pro.svg"

export const plans = [
    {
        icon: arcade,
        title: "Arcade",
        monthlyPrice: 9,
        yearlyPrice: 90,
    },
    {
        icon: advanced,
        title: "Advanced",
        monthlyPrice: 12,
        yearlyPrice: 120,
    },
    {
        icon: pro,
        title: "Pro",
        monthlyPrice: 15,
        yearlyPrice: 150,
    },
]

export const addOns = [
    {
        title: "Online service",
        text: "Access to multipolayer games",
        monthlyPrice: 1,
        yearlyPrice: 10
    },
    {
        title: "Larger storage",
        text: "Extra 1TB of cloud save",
        monthlyPrice: 2,
        yearlyPrice: 20
    },
    {
        title: "Customizable profile",
        text: "Custom theme on your profile",
        monthlyPrice: 2,
        yearlyPrice: 20
    },
]
