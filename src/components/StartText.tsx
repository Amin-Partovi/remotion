import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {config} from '../../config.ts';

const startTextStyle: React.CSSProperties = {
	display: 'block',
	marginTop: '20px',
	fontSize: '50px',
};

const StartText: React.FC = () => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const startText = config.text.start_text[0];
	const wordArray = startText.split(' ');

	return (
		<>
			<div
				style={{
					transform: `scale(${frame})`,
					position: 'absolute',
					width: '5px',
					height: '5px',
					backgroundColor: 'red',
				}}
			></div>
			{wordArray.map((word: string, i: number) => {
				const delay = i * 45;

				const scale = spring({
					fps: videoConfig.fps,
					frame: frame - delay,
					config: {
						damping: 50,
					},
				});

				return (
					<h1
						key={word}
						style={{
							...startTextStyle,
							color: 'white',
							transform: `scale(${scale})`,
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
