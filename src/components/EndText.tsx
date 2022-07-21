import {
	Img,
	interpolate,
	useCurrentFrame,
	spring,
	useVideoConfig,
} from 'remotion';

import {config} from '../../config.ts';
import {colors} from '../styles/colors';
import logo from '../../public/image/logo_zebra.png';

const textStyle: React.CSSProperties = {
	display: 'block',
	fontSize: '80px',
	margin: '10px',
	color: colors.primaryColor2,
	position: 'absolute',
	zIndex: '2',
};

const backgroundStyle: React.CSSProperties = {
	width: '100%',
	height: '100%',
	position: 'absolute',
	backgroundColor: colors.primaryColor3,
};

const EndText: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const endText = config.text.end_text[0];

	const backgroundOpacity = interpolate(frame, [20, 100], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const logoOpacity = interpolate(frame, [80, 180], [0, 1]);

	const TranslationProgress = spring({
		frame: frame - 25,
		fps,
		config: {
			damping: 100,
		},
	});

	const translate = interpolate(TranslationProgress, [0, 1], [0, 300]); // transform the text under the logo

	return (
		<>
			<div style={{...backgroundStyle, opacity: backgroundOpacity}}></div>

			<h1 style={{...textStyle, transform: `translateY(${translate}px)`}}>
				{endText}
			</h1>

			<Img src={logo} style={{opacity: logoOpacity}} />
		</>
	);
};

export default EndText;
