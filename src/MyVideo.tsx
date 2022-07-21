import {useState} from 'react';
import {
	AbsoluteFill,
	Video,
	Audio,
	Sequence,
	interpolate,
	useCurrentFrame,
} from 'remotion';

import video from '../public/video/1.mp4';
import video2 from '../public/video/2.mp4';
import video3 from '../public/video/5.mp4';
import audio from '../public/audio/audio.mp3';
import StartText from './components/StartText';
import {colors} from './styles/colors';
import MiddleText from './components/MiddleText';
import EndText from './components/EndText';

interface Props {
	startText: string;
}

const textContaienrStyle: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'row',
	fontFamily: 'Bodoni',
};

const overLap = 5;
const gap = 50;
const lastVideoStartFrame = 600;

const MyVideo: React.FC<Props> = () => {
	const frame = useCurrentFrame();

	const [startTextDuration, setStartTextDuration] = useState<number>(1);

	const opacity = interpolate(
		frame,
		[lastVideoStartFrame, lastVideoStartFrame + gap],
		[0, 1]
	);

	function getStartTextDuration(duration: number) {
		setStartTextDuration(duration);
	}

	return (
		<AbsoluteFill style={{backgroundColor: colors.primaryColor1}}>
			<Audio src={audio} />

			<Sequence from={0}>
				<Video src={video2} muted endAt={startTextDuration} />
			</Sequence>

			<Sequence from={startTextDuration - overLap}>
				<Video src={video} muted />
			</Sequence>

			<Sequence from={lastVideoStartFrame}>
				<Video src={video3} style={{opacity: opacity}} muted />
			</Sequence>

			<AbsoluteFill style={{...textContaienrStyle}}>
				<StartText getDuration={getStartTextDuration} />
			</AbsoluteFill>

			<Sequence from={startTextDuration + gap}>
				<AbsoluteFill style={{...textContaienrStyle}}>
					<MiddleText />
				</AbsoluteFill>
			</Sequence>

			<Sequence from={lastVideoStartFrame + 2 * gap}>
				<AbsoluteFill style={{...textContaienrStyle}}>
					<EndText />
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	);
};

export default MyVideo;
