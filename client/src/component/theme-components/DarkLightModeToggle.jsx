// DarkLightModeToggle.js

import React, { useState, useEffect } from 'react';
import { MdDarkMode } from "react-icons/md";
import { IoSunnySharp } from "react-icons/io5";
const DarkLightModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(isDarkModeEnabled);
        document.body.classList.toggle('dark', isDarkModeEnabled);
    }, []);

    const toggleMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
        document.body.classList.toggle('dark', newMode);
    };

    return (
        <button onClick={toggleMode} className="px-4 py-2 bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-300 rounded">
            {isDarkMode ? <IoSunnySharp /> : <MdDarkMode />}
        </button>
    );
};

export default DarkLightModeToggle;
