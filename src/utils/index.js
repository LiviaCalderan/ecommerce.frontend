import { current } from "@reduxjs/toolkit";
import { bannerImageOne, bannerImageThree, bannerImageTwo, bannerImageFour } from "./constant";
import { AiFillDashboard } from "react-icons/ai";
import { FaBoxOpen } from "react-icons/fa";
import { FaThList, FaStore } from "react-icons/fa";
import { FaCashRegister } from "react-icons/fa6";


export const bannerList = [
    {
        id: 1,
        image: bannerImageOne,
        title: "Headphones",
        subtitle: "Listen to the amazing music sound.",
        description: "Experience music like never before",
    },
    {
        id: 2,
        image: bannerImageTwo,
        title: "Sports & Fitness",
        subtitle: "More than just a game. It's a lifestyle.",
        description: "No matter if you’re a beginner or a Tour pro, your golf swing is uniquely yours—just like a fingerprint.",
    },
    {
        id: 3,
        image: bannerImageThree,
        title: "Clothing",
        subtitle: "Bring the warmth.",
        description: "Everyone needs a good winter jacket. Find yours with our collection and more.",
    },
    {
        id: 4,
        image: bannerImageFour,
        title: "Books",
        subtitle: "A world of stories in your hands.",
        description: "From inspiring stories to powerful knowledge, discover books that expand your mind and transform the way you see the world.",
    }
]

export const adminNavigation = [
    { to: "/admin", label: "Dashboard", icon: AiFillDashboard, current: true },
    { to: "/admin/products", label: "Products", icon: FaBoxOpen },
    { to: "/admin/categories", label: "Categories", icon: FaThList },
    { to: "/admin/sellers", label: "Sellers", icon: FaStore },
    { to: "/admin/orders", label: "Orders", icon: FaCashRegister }
]

export const sellerNavigation = [
    { to: "/admin/orders", label: "Orders", icon: FaCashRegister,  current: true },
    { to: "/admin/products", label: "Products", icon: FaBoxOpen }
]