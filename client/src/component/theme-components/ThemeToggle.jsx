// src/components/ThemeToggle.js
import React, { useEffect } from 'react';
import { MdDarkMode, MdOutlineWbSunny } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../Redux/slices/themeSlice'; // Adjusted import path

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <button className="" onClick={handleThemeToggle}>
            {theme === 'light' ? (
                <MdDarkMode className="text-2xl" />
            ) : (
                <MdOutlineWbSunny className="text-2xl" />
            )}
        </button>
    );
};

export default ThemeToggle;
