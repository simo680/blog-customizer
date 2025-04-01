import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { clsx } from 'clsx';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { useState, useRef } from 'react';
import {
	backgroundColors,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const firstSelectRef = useRef<HTMLSelectElement>(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState(defaultArticleState);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		onApply(formState);
	}

	function handleChange<T extends keyof ArticleStateType>(
		key: T,
		value: ArticleStateType[T]
	) {
		setFormState((prev) => ({ ...prev, [key]: value }));
	}

	function handleReset() {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	}

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<RadioGroup
						name='radio'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) =>
							handleChange('fontSizeOption', value)
						}></RadioGroup>
					<Select
						selected={formState.fontFamilyOption}
						title='Шрифт'
						options={fontFamilyOptions}
						onChange={(value) =>
							handleChange('fontFamilyOption', value)
						}></Select>
					<Select
						selected={formState.fontColor}
						title='Цвет шрифта'
						options={fontColors}
						onChange={(value) => handleChange('fontColor', value)}></Select>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						title='Цвет фона'
						options={backgroundColors}
						onChange={(value) =>
							handleChange('backgroundColor', value)
						}></Select>
					<Select
						selected={formState.contentWidth}
						title='ширина контента'
						options={contentWidthArr}
						onChange={(value) => handleChange('contentWidth', value)}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
