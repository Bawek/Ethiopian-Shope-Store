'use client'
import React, { useState } from 'react';
import PersonalDetail from '../components/prompts/prompt1';
import Autoplay from 'embla-carousel-autoplay'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { BarChart, Briefcase, LayoutDashboard, ShieldCheck } from 'lucide-react';
import ShopRegistration from '../components/prompts/prompt2';
import { useSearchParams } from 'next/navigation';
const Images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQxXf28FCYTQ5vrRKnaK_XJAm8X_Y88fTJtA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrDWxMOdi5xdfF8I4IdmqNozyVyf10X4sNJA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-kadN-N5H6dPYsQrIyOB0fQAqOut3VLMa8w&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS40jswRvC7NjQH5tKE6Z8J1jpxyPK2zA7SQ&s'
]
const MerchantRegistrationPrompt = () => {
    const [currentPrompt, setCurrentPrompt] = useState(1)
    const searchParams = useSearchParams();
    const accountId = searchParams.get('accountId');
    const mode = 'register'
    return (
        <div className='w-[95%] mx-auto flex flex-col md:flex-row'>
            <div className='w-full md:w-2/3 flex flex-col items-center'>
                <PersonalDetail mode={mode} buttonVisible={true} />
            </div>
            <section className="w-1/2 hidden md:block">
                <Carousel
                    className="w-full h-[280px]"
                    plugins={[
                        Autoplay({
                            delay: 2000,
                        }),
                    ]}
                >
                    <CarouselContent className="w-full rounded-md">
                        {Images.map((image, index) => (
                            <CarouselItem key={index} className="w-full rounded-md h-[280px]">
                                <div className="w-full overflow-hidden">
                                    <img
                                        className="w-full object-cover rounded-md"
                                        src={image}
                                        alt="carouselImage"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="w-full md:w-1/2 mt-3">
                    <h2 className="text-xl font-semibold mb-4">Why Choose Our Platform?</h2>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <Briefcase className="text-orange-500" size={24} />
                            <span>Powerful Business Tools</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <LayoutDashboard className="text-green-500" size={24} />
                            <span>Intuitive Dashboard & Analytics</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <BarChart className="text-purple-500" size={24} />
                            <span>Real-time Sales & Growth Tracking</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <ShieldCheck className="text-yellow-500" size={24} />
                            <span>Secure & Reliable Transactions</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>

    );
};

export default MerchantRegistrationPrompt;
