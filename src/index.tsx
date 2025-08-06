import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [appliedArticleState, setAppliedArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	function applySettings(settings: ArticleStateType) {
		setAppliedArticleState(settings);
	}
	function clearSettings() {
		setAppliedArticleState(defaultArticleState);
	}
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedArticleState.fontFamilyOption.value,
					'--font-size': appliedArticleState.fontSizeOption.value,
					'--font-color': appliedArticleState.fontColor.value,
					'--container-width': appliedArticleState.contentWidth.value,
					'--bg-color': appliedArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={applySettings} onReset={clearSettings} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
