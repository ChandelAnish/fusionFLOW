import React, { useEffect, useState } from 'react';

const ProgressBar = () => {
    const [scrollPercent, setScrollPercent] = useState(0);

    const updateProgressBar = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        setScrollPercent(scrollProgress);
    };

    useEffect(() => {
        window.addEventListener('scroll', updateProgressBar);
        return () => window.removeEventListener('scroll', updateProgressBar);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-[7px] bg-gray-100 z-50">
            <div
                className="h-full bg-orange-500 transition-width ease-linear duration-300"
                style={{ width: `${scrollPercent}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
