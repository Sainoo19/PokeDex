import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { FingerPrintIcon, LockClosedIcon } from '@heroicons/react/outline'
const people = [
    {
        name: 'Nguyen Viet Trung',
        role: 'Team Lead/Fullstack Developer',
        imageUrl: 'https://cdn.icon-icons.com/icons2/4222/PNG/512/lionel_messi_avatar_icon_263208.png',

    },
    {
        name: 'Truong Thi Huyen Thu',
        role: 'Fullstack Developer',
        imageUrl: 'https://cdn.icon-icons.com/icons2/4222/PNG/512/lionel_messi_avatar_icon_263208.png',

    },
    {
        name: 'Vu Nha Vy',
        role: 'UX/UI Designer,Fullstack Developer',
        imageUrl: 'https://cdn.icon-icons.com/icons2/4222/PNG/512/lionel_messi_avatar_icon_263208.png',

    },
    {
        name: 'Tran Thi Yen Nhi',
        role: 'Fullstack Developer',
        imageUrl: 'https://cdn.icon-icons.com/icons2/4222/PNG/512/lionel_messi_avatar_icon_263208.png',

    },
    // More people...
]
const features = [
    {
        name: 'Push to deploy',
        description:
            'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
        icon: LockClosedIcon,
    },
    {
        name: 'SSL certificates',
        description:
            'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
        icon: LockClosedIcon,
    },
    {
        name: 'Simple queues',
        description:
            'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
        icon: LockClosedIcon,
    },
    {
        name: 'Advanced security',
        description:
            'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
        icon: FingerPrintIcon,
    },
]
const About = () => {
    return (
        <>
            <Header />
            <div className="mt-20"></div>
            <main className="container mx-auto px-4 py-8">
                <section className="mb-2 mx-2">
                    <div className="relative bg-cover bg-center h-128 w-full rounded-lg overflow-hidden" style={{ backgroundImage: "url('/assets/images/background/about.jpg')" }}>
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
                            <h2 className="text-3xl font-bold mb-2">ABOUT US</h2>
                            <p className="text-lg italic">"Your Ultimate Pokémon Companion – Explore, Discover, Master!"</p>
                        </div>
                    </div>
                </section>
                <section className="relative isolate overflow-hidden bg-white px-6 py-12 sm:py-16 lg:px-8 mb-8">
                    {/* Giảm py xuống 12, thêm mb-8 để tạo khoảng cách với section tiếp theo */}
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
                    <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
                    <div className="mx-auto max-w-2xl lg:max-w-4xl">
                        <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl">Our Mission</h2>
                        <figure className="mt-10">
                            <blockquote className="text-center text-xl/8 font-semibold text-gray-900 sm:text-2xl/9">
                                <p>
                                    "Welcome to our Pokédex! This project is dedicated to providing fans with a detailed and easy-to-use database of Pokémon, complete with moves, abilities, types, and more. Whether you're a seasoned trainer or new to the world of Pokémon, we hope this Pokédex will be a helpful and fun resource on your journey."
                                </p>
                            </blockquote>
                            <figcaption className="mt-10">
                                <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                                    <div className="font-semibold text-gray-900">Sainoo19</div>
                                    <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-900">
                                        <circle r={1} cx={1} cy={1} />
                                    </svg>
                                    <div className="text-gray-600">Group 15</div>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                </section>


                <div className="bg-white py-12 sm:py-32">
                    <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
                        <div className="max-w-xl">
                            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                                Meet Group 15
                            </h2>
                            <p className="mt-6 text-lg/8 text-gray-600">
                                We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
                                best results for our clients.
                            </p>
                        </div>
                        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                            {people.map((person) => (
                                <li key={person.name}>
                                    <div className="flex items-center gap-x-6">
                                        <img alt="" src={person.imageUrl} className="h-16 w-16 rounded-full" />
                                        <div>
                                            <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">{person.name}</h3>
                                            <p className="text-sm/6 font-semibold text-indigo-600">{person.role}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>



                <div className="bg-white py-5 sm:py-16 mb-8">
                    {/* Giảm py xuống 12 và thêm mb-8 */}
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base/7 font-semibold text-indigo-600">Deploy faster</h2>
                            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
                                Everything you need to deploy your app
                            </p>
                            <p className="mt-6 text-lg/8 text-gray-600">
                                Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
                                pulvinar et feugiat blandit at. In mi viverra elit nunc.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-16">
                                        <dt className="text-base/7 font-semibold text-gray-900">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                                <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                                            </div>
                                            {feature.name}
                                        </dt>
                                        <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>



            </main>
            <Footer />
        </>
    );
}
export default About;