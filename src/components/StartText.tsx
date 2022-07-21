import {useEffect} from 'react';
import {spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';

import {config} from '../../config.ts';
import {colors} from '../styles/colors';

const startTextStyle: React.CSSProperties = {
	display: 'block',
	fontSize: '80px',
	margin: '10px',
	color: colors.primaryColor4,
};

const backgroundStyle: React.CSSProperties = {
	position: 'absolute',
	width: '1%',
	height: '1%',
	backgroundColor: colors.primaryColor1,
};

const gap = 45; // time gap between each word

interface Props {
	getDuration: (duration: number) => void;
}

const StartText: React.FC<Props> = ({getDuration}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const startText = config.text.start_text[0];
	const wordArray = startText.split(' '); // break the phrase to words

	const startTextDuration = wordArray.length * gap;

	const opacity = frame > startTextDuration ? 0 : 1; // show the text after a specific moment

	const backgroundScale =
		frame < startTextDuration - 2 * gap
			? 0
			: ((frame - startTextDuration + 2 * gap) * 100) / gap;

	const backgroundOpacity = interpolate(
		frame,
		[startTextDuration, startTextDuration + gap],
		[1, 0]
	);

	useEffect(() => {
		getDuration(startTextDuration);
	}, []);

	return (
		<>
			<div
				style={{
					...backgroundStyle,
					transform: `scale(${backgroundScale})`,
					opacity: backgroundOpacity,
				}}
			></div>
			{wordArray.map((word: string, i: number) => {
				const delay = i * gap; // delay between every word rendering

				const scale = spring({
					fps: fps,
					frame: frame - delay,
					config: {
						damping: 100,
						stiffness: 10,
					},
				});

				return (
					<h1
						key={word}
						style={{
							...startTextStyle,
							transform: `scale(${scale})`,
							opacity: opacity,
						}}
					>
						{word}
					</h1>
				);
			})}
		</>
	);
};

export default StartText;
