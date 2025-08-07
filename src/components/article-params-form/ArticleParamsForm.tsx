import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type Props = {
	onSubmit: (settings: ArticleStateType) => void;
	onReset: () => void;
};
type ArticleKey = keyof ArticleStateType;

export const ArticleParamsForm = ({ onSubmit, onReset }: Props) => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef,
		onChange: setIsFormOpen,
	});
	function handleChange(name: ArticleKey, value: OptionType) {
		setArticleState((prev) => ({ ...prev, [name]: value }));
	}
	return (
		<>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => {
					setIsFormOpen((prev) => !prev);
				}}
			/>
			<aside
				ref={rootRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(event) => {
						event.preventDefault();
						onSubmit(articleState);
					}}
					onReset={(event) => {
						event.preventDefault();
						setArticleState(defaultArticleState);
						onReset();
					}}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={articleState.fontFamilyOption}
						onChange={(value) => handleChange('fontFamilyOption', value)}
						options={fontFamilyOptions}
					/>

					<RadioGroup
						name='fontSize'
						title='размер шрифта'
						selected={articleState.fontSizeOption}
						onChange={(value) => handleChange('fontSizeOption', value)}
						options={fontSizeOptions}
					/>
					<Select
						title='цвет шрифта'
						selected={articleState.fontColor}
						onChange={(value) => handleChange('fontColor', value)}
						options={fontColors}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={articleState.backgroundColor}
						onChange={(value) => handleChange('backgroundColor', value)}
						options={backgroundColors}
					/>
					<Select
						title='ширина контента'
						selected={articleState.contentWidth}
						onChange={(value) => handleChange('contentWidth', value)}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
