import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
	Video,
	Audio,
} from 'remotion';

import video from '../video/1.mp4';
import audio from '../audio/audio.wav';
import StartText from './components/StartText';

interface Props {
	startText: string;
}

const MyVideo: React.FC<Props> = ({startText}) => {
	return (
		<AbsoluteFill style={{backgroundColor: 'white'}}>
			<Audio src={audio} />
			<Video src={video} />
			<AbsoluteFill
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<StartText />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

export default MyVideo;
