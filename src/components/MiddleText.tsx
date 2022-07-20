import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

import {config} from '../../config.ts';
import {colors} from '../styles/colors';

const textStyle: React.CSSProperties = {
	position: 'absolute',
	fontSize: '80px',
	color: colors.primaryColor3,
};

const gap = 60;
const letterWidth = 100;

const MiddleText: React.FC = () => {
	const frame = useCurrentFrame();
	const {width} = useVideoConfig();

	const middleText = config.text.middle_text[0].main;
	const letterArray = middleText.split('');
	const phraseWidth = (letterArray.length - 1) * 100;

	return (
		<>
			{letterArray.map((letter: string, index: number) => {
				const rightPosition = interpolate(
					frame - index * 5,
					[0, gap, 2 * gap, 3 * gap],
					[
						-20,
						(width + phraseWidth / 2 - index * letterWidth) / 2,
						(width + phraseWidth / 2 - index * letterWidth) / 2,
						width + 20,
					]
				);

				return (
					<h1
						key={index}
						style={{
							...textStyle,
							right: rightPosition,
						}}
					>
						{letter}
					</h1>
				);
			})}
		</>
	);
};

export default MiddleText;
