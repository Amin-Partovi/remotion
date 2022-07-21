import {Composition, continueRender, delayRender} from 'remotion';

import MyVideo from './MyVideo';
import {font} from './styles/font';

const waitForFont = delayRender();
font
	.load()
	.then(() => {
		document.fonts.add(font);
		continueRender(waitForFont);
	})
	.catch((err) => console.log('Error loading font', err));

const videoDurartion = 30;
const fps = 30;
const width = 1920;
const height = 1080;

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="MyVideo"
				component={MyVideo}
				durationInFrames={videoDurartion * fps}
				fps={fps}
				width={width}
				height={height}
			/>
		</>
	);
};
