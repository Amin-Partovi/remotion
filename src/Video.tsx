import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';
import {config} from '../config.ts';

// Each <Composition> is an entry in the sidebar!

export const RemotionVideo: React.FC = () => {
	const videoDurartion = 30;
	const fps = 30;

	return (
		<>
			<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.tsx <id> out/video.mp4
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={videoDurartion * fps}
				fps={fps}
				width={1920}
				height={1080}
				// You can override these props for each render:
				// https://www.remotion.dev/docs/parametrized-rendering
				defaultProps={{
					startText: config.text.start_text[0],
					titleColor: 'black',
				}}
			/>
		</>
	);
};
