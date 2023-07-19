import React, { useEffect } from 'react';

export function useBackgroundChanger({color}) {
    useEffect(() => {
        document.body.style.background = color;
        return () => {
            document.body.style.background = '';
        };
    }, []);
};

