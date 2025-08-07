import { CSSProperties, useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';
import styles from '../../styles/index.module.scss';

export const App = () => {
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
			className={styles.main}
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
