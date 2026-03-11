import React from 'react'
import { TbBrandAppleFilled } from "react-icons/tb";
import { SiNike, SiSony, SiAdidas, SiSamsung, SiZara } from "react-icons/si";
import Orb1sLogo from '../../assets/ORB1S.png'
import DeliveryImg from '../../assets/delivery.png'

const About = () => {

    const brands = [
        { name: "NIKE", symbol: <SiNike /> },
        { name: "SONY", symbol: <SiSony /> },
        { name: "APPLE", symbol: <TbBrandAppleFilled /> },
        { name: "ADIDAS", symbol: <SiAdidas /> },
        { name: "SAMSUNG", symbol: <SiSamsung /> },
        { name: "ZARA", symbol: <SiZara /> },

    ];

    const values = [
        { title: "Speed First", desc: "We ship fast and iterate faster. Velocity is our competitive advantage without sacrificing quality." },
        { title: "Radical Transparency", desc: "Open pricing, honest reviews, no dark patterns. We treat our customers like intelligent adults." },
        { title: "Sustainable by Design", desc: "Packaging and partnerships chosen with the planet in mind — because we'll be around for the long run." },
        { title: "Community Driven", desc: "Our roadmap is shaped by the people who buy from us. Your feedback isn't a ticket — it's direction." },
        { title: "Curation Over Quantity", desc: "Every product on ORB1S earns its place. We say no to clutter so you never have to." },
        { title: "Trust as Default", desc: "30-day returns, guaranteed authenticity, and a support team that actually picks up the phone." },
    ];


    return (
        <div className='lg:px-[160px] sm:px-[32px] 2xl:w-[100%] 2x1:mx-auto bg-gray-100 font-raleway'>
            <div className="lg:px-[160px] px-8 pt-16 pb-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    <div className="flex flex-col gap-6">

                        <h1 className="text-5xl lg:text-7xl font-black text-black font-anton-sc">
                            we built<br />
                            <span className="text-blue-500">the store</span><br />
                            we wanted.
                        </h1>

                        <p className="text-slate-600 text-md max-w-md font-raleway">
                            Orbis was created from the idea of building an e-commerce platform that connects people to products from different parts of the world in a simple, reliable, and accessible way. The project began when its founders noticed that many consumers were looking for variety and quality in one place, but often found platforms that were either too complex or limited in their product offerings.
                        </p>
                        <p className="text-slate-600 text-md max-w-md font-raleway">
                            With this vision in mind, Orbis was born as a platform designed to bring together multiple product categories in a modern, intuitive, and secure environment. From the beginning, the goal was to provide a smooth shopping experience where users could easily browse through categories such as electronics, fashion, books, and more, quickly finding exactly what they need.
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                            <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white shadow-sm -ml-0" />
                            <div className="w-12 h-12 rounded-full bg-slate-300 border-2 border-white shadow-sm -ml-4" />
                            <div className="w-12 h-12 rounded-full bg-slate-400 border-2 border-white shadow-sm -ml-4" />
                            <span className="text-sm text-slate-500 font-medium ml-2">Created as a personal project in 2026.</span>
                        </div>
                    </div>


                    <img src={Orb1sLogo} alt="" className='rounded-2xl border border-solid border-gray-300 shadow-xl' />
                </div>
            </div>

            {/* IMAGE BREAK */}
            <div className="lg:px-[160px] px-8 py-20">
                <div className="grid lg:grid-cols-5 gap-8 items-center">
                    <img src={DeliveryImg} alt="" className="lg:col-span-3 rounded-2xl border border-solid border-gray-300 shadow-xl" />

                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Behind the scenes</span>
                        <h3 className="text-3xl lg:text-4xl font-black text-black leading-tight">
                            Built with obsession, delivered with care.
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            From our warehouse in São Paulo to your doorstep, every step of the ORB1S journey is deliberate. We pack our own orders, we write our own descriptions, and we stand behind every single item we sell.
                        </p>
                        <ul className="flex flex-col gap-3 mt-2">
                            {["Same-day dispatch on orders before 2PM", "Carbon-neutral packaging since 2022", "Every item quality-checked before shipping"].map(item => (
                                <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                                    <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>


            {/* VALUES */}
            <div className="bg-white lg:px-[160px] px-8 py-20">
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">What guides us</span>
                            <h2 className="text-4xl lg:text-5xl font-black text-black mt-2 tracking-wide font-anton-sc">Our Values</h2>
                        </div>
                        <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
                            These aren't words on a wall. They're the criteria we use to make every product decision, hire every team member, and serve every customer.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {values.map(({ title, desc }, i) => (
                            <div
                                key={title}
                                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-3 hover:border-black hover:shadow-md transition-all duration-300 group"
                            >
                                <h4 className="font-black text-black text-lg">{title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className="lg:px-[160px] px-8 py-20">
                <div className="flex flex-col items-center gap-12">

                    <div className="text-center flex flex-col gap-3">
                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400 font-raleway">Trusted by the world's most innovative teams</span>
                        <h2 className="text-3xl lg:text-4xl font-black text-black font-anton-sc tracking-[0.05em]">Brands that share our standard.</h2>
                        <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed font-raleway">
                            We partner exclusively with brands that meet our quality bar — no exceptions, no compromises.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {brands.slice(0, 6).map(b => (
                            <span>{b.symbol}</span>
                        ))}
                    </div>

                    {/* Divider quote */}
                    <div className="w-full max-w-2xl text-center pt-4 border-t border-slate-200 font-raleway">
                        <p className="text-slate-400 text-sm italic leading-relaxed ">
                            "The brands we carry aren't just products — they're proof that uncompromising quality and great design can coexist."
                        </p>
                        <span className="text-xs font-bold text-slate-500 mt-2 block">— ORB1S Founding Team</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default About