"use client";

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Cloud, fetchSimpleIcons, renderSimpleIcon, SimpleIcon } from 'react-icon-cloud';

type IconCloudProps = {
    size?: number;
};

type IconData = {
    simpleIcons: Record<string, SimpleIcon>;
};

const slugs = [
    'typescript',
    'javascript',
    'dart',
    'java',
    'react',
    'flutter',
    'android',
    'html5',
    'css3',
    'nodedotjs',
    'express',
    'nextdotjs',
    'prisma',
    'amazonaws',
    'postgresql',
    'firebase',
    'nginx',
    'kubernetes',
    'testinglibrary',
    'jest',
    'cypress',
    'docker',
    'git',
    'jira',
    'github',
    'gitlab',
    'visualstudiocode',
    'androidstudio',
    'python',
    'figma',
];

const IconCloud: React.FC<IconCloudProps> = ({ size = 420 }) => {
    const iconSlugs = slugs;
    const [data, setData] = useState<IconData>({ simpleIcons: {} });
    const [theme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
    }, [iconSlugs]);

    // The icon size remains constant; `size` controls the overall cloud container dimensions (px)
    const ICON_SIZE = 42;
    const imageScale = 2;

    const cloudProps = {
        containerProps: {
            style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: `${size}px`,
                height: `${size}px`,
                padding: 0,
                margin: 0,
            },
        },
        options: {
            reverse: true,
            depth: 1,
            wheelZoom: false,
            imageScale,
            activeCursor: 'default' as const,
            tooltip: 'native' as const,
            initial: [0.1, -0.1],
            clickToFront: 500,
            tooltipDelay: 0,
            outlineColour: '#0000',
            maxSpeed: 0.01,
            minSpeed: 0.005,
        },
    };

    const renderCustomIcon = useCallback((icon: SimpleIcon) => {
        const bgHex = theme === 'light' ? '#f3f2ef' : '#080510';
        const fallbackHex = theme === 'light' ? '#6e6e73' : '#ffffff';
        const minContrastRatio = theme === 'dark' ? 2 : 1.2;

        return renderSimpleIcon({
            icon,
            bgHex,
            fallbackHex,
            minContrastRatio,
            size: ICON_SIZE,
            aProps: {
                href: undefined,
                target: undefined,
                rel: undefined,
                onClick: (e: React.MouseEvent) => e.preventDefault(),
            },
        });
    }, [theme]);

    const renderedIcons = useMemo(() => {
        if (!data || Object.keys(data.simpleIcons).length === 0) return [];
        return Object.values(data.simpleIcons).map((icon) => renderCustomIcon(icon));
    }, [data, renderCustomIcon]);

    return (
        <div className="flex items-center justify-center p-0 m-0">
            <div style={{ width: `${size}px`, height: `${size}px` }} className="m-auto p-0">
                <Cloud {...cloudProps}>
                    {renderedIcons}
                </Cloud>
            </div>
        </div>
    );
};

export default IconCloud;