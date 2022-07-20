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

export const RemotionVideo: React.FC = () => {
	const videoDurartion = 30;
	const fps = 30;

	return (
		<>
			<Composition
				id="MyVideo"
				component={MyVideo}
				durationInFrames={videoDurartion * fps}
				fps={fps}
				width={1920}
				height={1080}
			/>
		</>
	);
};
