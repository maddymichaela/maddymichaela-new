import { useEffect, useState } from 'react';
import { Warp, warpPresets, type WarpProps } from '@paper-design/shaders-react';

const cauldronPreset = warpPresets.find((preset) => preset.name === 'Cauldron Pot')!;

type Theme = 'light' | 'dark';

const PALETTES: Record<Theme, Pick<WarpProps, 'colors'>> = {
	light: { colors: ['#ffffff', '#e4e4e7', '#a1a1aa'] },
	dark: { colors: ['#0d0d10', '#3f3f46', '#a1a1aa'] },
};

function getTheme(): Theme {
	if (typeof document === 'undefined') return 'light';
	return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export default function WarpBackground(props: WarpProps) {
	const [theme, setTheme] = useState<Theme>(getTheme);

	useEffect(() => {
		const root = document.documentElement;
		setTheme(getTheme());
		const observer = new MutationObserver(() => setTheme(getTheme()));
		observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
		return () => observer.disconnect();
	}, []);

	const defaultProps: WarpProps = {
		...cauldronPreset.params,
		style: { width: '100%', height: '100%' },
		...PALETTES[theme],
	};

	return <Warp {...defaultProps} {...props} style={{ ...defaultProps.style, ...props.style }} />;
}
