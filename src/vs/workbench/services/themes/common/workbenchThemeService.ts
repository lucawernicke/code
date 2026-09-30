/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { refineServiceDecorator } from '../../../../platform/instantiation/common/instantiation.js';
import { Event } from '../../../../base/common/event.js';
import { Color } from '../../../../base/common/color.js';
import { IColorTheme, IThemeService, IFileIconTheme, IProductIconTheme } from '../../../../platform/theme/common/themeService.js';
import { ConfigurationTarget } from '../../../../platform/configuration/common/configuration.js';
import { isBoolean, isString } from '../../../../base/common/types.js';
import { IconContribution, IconDefinition } from '../../../../platform/theme/common/iconRegistry.js';
import { ColorScheme, ThemeTypeSelector } from '../../../../platform/theme/common/theme.js';

export const IWorkbenchThemeService = refineServiceDecorator<IThemeService, IWorkbenchThemeService>(IThemeService);

export const THEME_SCOPE_OPEN_PAREN = '[';
export const THEME_SCOPE_CLOSE_PAREN = ']';
export const THEME_SCOPE_WILDCARD = '*';

export const themeScopeRegex = /\[(.+?)\]/g;

export enum ThemeSettings {
	COLOR_THEME = 'workbench.colorTheme',
	FILE_ICON_THEME = 'workbench.iconTheme',
	PRODUCT_ICON_THEME = 'workbench.productIconTheme',
	COLOR_CUSTOMIZATIONS = 'workbench.colorCustomizations',
	TOKEN_COLOR_CUSTOMIZATIONS = 'editor.tokenColorCustomizations',
	SEMANTIC_TOKEN_COLOR_CUSTOMIZATIONS = 'editor.semanticTokenColorCustomizations',

	PREFERRED_DARK_THEME = 'workbench.preferredDarkColorTheme',
	PREFERRED_LIGHT_THEME = 'workbench.preferredLightColorTheme',
	PREFERRED_HC_DARK_THEME = 'workbench.preferredHighContrastColorTheme', /* id kept for compatibility reasons */
	PREFERRED_HC_LIGHT_THEME = 'workbench.preferredHighContrastLightColorTheme',
	DETECT_COLOR_SCHEME = 'window.autoDetectColorScheme',
	DETECT_HC = 'window.autoDetectHighContrast',

	SYSTEM_COLOR_THEME = 'window.systemColorTheme'
}

export enum ThemeSettingDefaults {
	COLOR_THEME_DARK = 'Wernicke Dark',
	COLOR_THEME_LIGHT = 'Default Light Modern',
	COLOR_THEME_HC_DARK = 'Default High Contrast',
	COLOR_THEME_HC_LIGHT = 'Default High Contrast Light',

	COLOR_THEME_DARK_OLD = 'Default Dark+',
	COLOR_THEME_LIGHT_OLD = 'Default Light+',

	FILE_ICON_THEME = 'vs-seti',
	PRODUCT_ICON_THEME = 'Default',
}

export const COLOR_THEME_DARK_INITIAL_COLORS = {
	'actionBar.toggledBackground': '#383a49',
	'activityBar.activeBorder': '#FFFFFF',
	'activityBar.background': '#000000',
	'activityBar.border': '#FFFFFF1A',
	'activityBar.foreground': '#FFFFFF',
	'activityBar.inactiveForeground': '#FFFFFF66',
	'activityBarBadge.background': '#FFFFFF',
	'activityBarBadge.foreground': '#000000',
	'badge.background': '#FFFFFF26',
	'badge.foreground': '#FFFFFF',
	'button.background': '#FFFFFF',
	'button.border': '#FFFFFF00',
	'button.foreground': '#000000',
	'button.hoverBackground': '#E6E6E6',
	'button.secondaryBackground': '#000000',
	'button.secondaryForeground': '#FFFFFF',
	'button.secondaryHoverBackground': '#FFFFFF1A',
	'chat.slashCommandBackground': '#FFFFFF1A',
	'chat.slashCommandForeground': '#FFFFFF',
	'chat.editedFileForeground': '#E2C08D',
	'checkbox.background': '#0A0A0A',
	'checkbox.border': '#FFFFFF33',
	'debugToolBar.background': '#0A0A0A',
	'descriptionForeground': '#FFFFFF99',
	'dropdown.background': '#0A0A0A',
	'dropdown.border': '#FFFFFF1A',
	'dropdown.foreground': '#FFFFFF',
	'dropdown.listBackground': '#0A0A0A',
	'editor.background': '#000000',
	'editor.findMatchBackground': '#9E6A03',
	'editor.foreground': '#FFFFFF',
	'editor.inactiveSelectionBackground': '#FFFFFF1A',
	'editor.selectionHighlightBackground': '#FFFFFF14',
	'editorGroup.border': '#FFFFFF1A',
	'editorGroupHeader.tabsBackground': '#000000',
	'editorGroupHeader.tabsBorder': '#FFFFFF1A',
	'editorGutter.addedBackground': '#2EA043',
	'editorGutter.deletedBackground': '#F85149',
	'editorGutter.modifiedBackground': '#FFFFFF99',
	'editorIndentGuide.activeBackground1': '#FFFFFF4D',
	'editorIndentGuide.background1': '#FFFFFF14',
	'editorLineNumber.activeForeground': '#FFFFFF',
	'editorLineNumber.foreground': '#FFFFFF40',
	'editorOverviewRuler.border': '#FFFFFF1A',
	'editorWidget.background': '#0A0A0A',
	'errorForeground': '#F85149',
	'focusBorder': '#FFFFFF66',
	'foreground': '#FFFFFF',
	'icon.foreground': '#FFFFFF',
	'input.background': '#0A0A0A',
	'input.border': '#FFFFFF1A',
	'input.foreground': '#FFFFFF',
	'input.placeholderForeground': '#FFFFFF66',
	'inputOption.activeBackground': '#FFFFFF26',
	'inputOption.activeBorder': '#FFFFFF66',
	'keybindingLabel.foreground': '#FFFFFF',
	'list.activeSelectionIconForeground': '#FFFFFF',
	'list.dropBackground': '#FFFFFF1A',
	'menu.background': '#0A0A0A',
	'menu.border': '#FFFFFF1A',
	'menu.foreground': '#FFFFFF',
	'menu.selectionBackground': '#FFFFFF1F',
	'menu.separatorBackground': '#FFFFFF1A',
	'notificationCenterHeader.background': '#0A0A0A',
	'notificationCenterHeader.foreground': '#FFFFFF',
	'notifications.background': '#0A0A0A',
	'notifications.border': '#FFFFFF1A',
	'notifications.foreground': '#FFFFFF',
	'panel.background': '#000000',
	'panel.border': '#FFFFFF1A',
	'panelInput.border': '#FFFFFF1A',
	'panelTitle.activeBorder': '#FFFFFF',
	'panelTitle.activeForeground': '#FFFFFF',
	'panelTitle.inactiveForeground': '#FFFFFF99',
	'peekViewEditor.background': '#0A0A0A',
	'peekViewEditor.matchHighlightBackground': '#BB800966',
	'peekViewResult.background': '#0A0A0A',
	'peekViewResult.matchHighlightBackground': '#BB800966',
	'pickerGroup.border': '#FFFFFF1A',
	'ports.iconRunningProcessForeground': '#369432',
	'progressBar.background': '#FFFFFF',
	'quickInput.background': '#0A0A0A',
	'quickInput.foreground': '#FFFFFF',
	'settings.dropdownBackground': '#0A0A0A',
	'settings.dropdownBorder': '#FFFFFF1A',
	'settings.headerForeground': '#FFFFFF',
	'settings.modifiedItemIndicator': '#FFFFFF99',
	'sideBar.background': '#000000',
	'sideBar.border': '#FFFFFF1A',
	'sideBar.foreground': '#FFFFFF',
	'sideBarSectionHeader.background': '#000000',
	'sideBarSectionHeader.border': '#FFFFFF1A',
	'sideBarSectionHeader.foreground': '#FFFFFF',
	'sideBarTitle.foreground': '#FFFFFF',
	'statusBar.background': '#000000',
	'statusBar.border': '#FFFFFF1A',
	'statusBar.debuggingBackground': '#FFFFFF',
	'statusBar.debuggingForeground': '#000000',
	'statusBar.focusBorder': '#FFFFFF66',
	'statusBar.foreground': '#FFFFFF99',
	'statusBar.noFolderBackground': '#000000',
	'statusBarItem.focusBorder': '#FFFFFF66',
	'statusBarItem.prominentBackground': '#FFFFFF26',
	'statusBarItem.remoteBackground': '#FFFFFF',
	'statusBarItem.remoteForeground': '#000000',
	'tab.activeBackground': '#000000',
	'tab.activeBorder': '#000000',
	'tab.activeBorderTop': '#FFFFFF',
	'tab.activeForeground': '#FFFFFF',
	'tab.border': '#FFFFFF1A',
	'tab.hoverBackground': '#FFFFFF0D',
	'tab.inactiveBackground': '#000000',
	'tab.inactiveForeground': '#FFFFFF99',
	'tab.lastPinnedBorder': '#ccc3',
	'tab.selectedBackground': '#222222',
	'tab.selectedBorderTop': '#FFFFFF99',
	'tab.selectedForeground': '#ffffffa0',
	'tab.unfocusedActiveBorder': '#000000',
	'tab.unfocusedActiveBorderTop': '#FFFFFF33',
	'tab.unfocusedHoverBackground': '#FFFFFF0D',
	'terminal.foreground': '#FFFFFF',
	'terminal.inactiveSelectionBackground': '#3A3D41',
	'terminal.tab.activeBorder': '#FFFFFF',
	'textBlockQuote.background': '#FFFFFF0D',
	'textBlockQuote.border': '#FFFFFF33',
	'textCodeBlock.background': '#FFFFFF0D',
	'textLink.activeForeground': '#FFFFFF',
	'textLink.foreground': '#FFFFFFCC',
	'textPreformat.background': '#FFFFFF1A',
	'textPreformat.foreground': '#FFFFFF',
	'textSeparator.foreground': '#FFFFFF1A',
	'titleBar.activeBackground': '#000000',
	'titleBar.activeForeground': '#FFFFFF',
	'titleBar.border': '#FFFFFF1A',
	'titleBar.inactiveBackground': '#000000',
	'titleBar.inactiveForeground': '#FFFFFF66',
	'welcomePage.progress.foreground': '#FFFFFF',
	'welcomePage.tileBackground': '#0A0A0A',
	'widget.border': '#FFFFFF1A'
};

export const COLOR_THEME_LIGHT_INITIAL_COLORS = {
	'actionBar.toggledBackground': '#dddddd',
	'activityBar.activeBorder': '#005FB8',
	'activityBar.background': '#F8F8F8',
	'activityBar.border': '#E5E5E5',
	'activityBar.foreground': '#1F1F1F',
	'activityBar.inactiveForeground': '#616161',
	'activityBarBadge.background': '#005FB8',
	'activityBarBadge.foreground': '#FFFFFF',
	'badge.background': '#CCCCCC',
	'badge.foreground': '#3B3B3B',
	'button.background': '#005FB8',
	'button.border': '#0000001a',
	'button.foreground': '#FFFFFF',
	'button.hoverBackground': '#0258A8',
	'button.secondaryBackground': '#E5E5E5',
	'button.secondaryForeground': '#3B3B3B',
	'button.secondaryHoverBackground': '#CCCCCC',
	'chat.slashCommandBackground': '#ADCEFF7A',
	'chat.slashCommandForeground': '#26569E',
	'chat.editedFileForeground': '#895503',
	'checkbox.background': '#F8F8F8',
	'checkbox.border': '#CECECE',
	'descriptionForeground': '#3B3B3B',
	'diffEditor.unchangedRegionBackground': '#f8f8f8',
	'dropdown.background': '#FFFFFF',
	'dropdown.border': '#CECECE',
	'dropdown.foreground': '#3B3B3B',
	'dropdown.listBackground': '#FFFFFF',
	'editor.background': '#FFFFFF',
	'editor.foreground': '#3B3B3B',
	'editor.inactiveSelectionBackground': '#E5EBF1',
	'editor.selectionHighlightBackground': '#ADD6FF80',
	'editorGroup.border': '#E5E5E5',
	'editorGroupHeader.tabsBackground': '#F8F8F8',
	'editorGroupHeader.tabsBorder': '#E5E5E5',
	'editorGutter.addedBackground': '#2EA043',
	'editorGutter.deletedBackground': '#F85149',
	'editorGutter.modifiedBackground': '#005FB8',
	'editorIndentGuide.activeBackground1': '#939393',
	'editorIndentGuide.background1': '#D3D3D3',
	'editorLineNumber.activeForeground': '#171184',
	'editorLineNumber.foreground': '#6E7681',
	'editorOverviewRuler.border': '#E5E5E5',
	'editorSuggestWidget.background': '#F8F8F8',
	'editorWidget.background': '#F8F8F8',
	'errorForeground': '#F85149',
	'focusBorder': '#005FB8',
	'foreground': '#3B3B3B',
	'icon.foreground': '#3B3B3B',
	'input.background': '#FFFFFF',
	'input.border': '#CECECE',
	'input.foreground': '#3B3B3B',
	'input.placeholderForeground': '#767676',
	'inputOption.activeBackground': '#BED6ED',
	'inputOption.activeBorder': '#005FB8',
	'inputOption.activeForeground': '#000000',
	'keybindingLabel.foreground': '#3B3B3B',
	'list.activeSelectionBackground': '#E8E8E8',
	'list.activeSelectionForeground': '#000000',
	'list.activeSelectionIconForeground': '#000000',
	'list.focusAndSelectionOutline': '#005FB8',
	'list.hoverBackground': '#F2F2F2',
	'menu.border': '#CECECE',
	'menu.selectionBackground': '#005FB8',
	'menu.selectionForeground': '#ffffff',
	'notebook.cellBorderColor': '#E5E5E5',
	'notebook.selectedCellBackground': '#C8DDF150',
	'notificationCenterHeader.background': '#FFFFFF',
	'notificationCenterHeader.foreground': '#3B3B3B',
	'notifications.background': '#FFFFFF',
	'notifications.border': '#E5E5E5',
	'notifications.foreground': '#3B3B3B',
	'panel.background': '#F8F8F8',
	'panel.border': '#E5E5E5',
	'panelInput.border': '#E5E5E5',
	'panelTitle.activeBorder': '#005FB8',
	'panelTitle.activeForeground': '#3B3B3B',
	'panelTitle.inactiveForeground': '#3B3B3B',
	'peekViewEditor.matchHighlightBackground': '#BB800966',
	'peekViewResult.background': '#FFFFFF',
	'peekViewResult.matchHighlightBackground': '#BB800966',
	'pickerGroup.border': '#E5E5E5',
	'pickerGroup.foreground': '#8B949E',
	'ports.iconRunningProcessForeground': '#369432',
	'progressBar.background': '#005FB8',
	'quickInput.background': '#F8F8F8',
	'quickInput.foreground': '#3B3B3B',
	'searchEditor.textInputBorder': '#CECECE',
	'settings.dropdownBackground': '#FFFFFF',
	'settings.dropdownBorder': '#CECECE',
	'settings.headerForeground': '#1F1F1F',
	'settings.modifiedItemIndicator': '#BB800966',
	'settings.numberInputBorder': '#CECECE',
	'settings.textInputBorder': '#CECECE',
	'sideBar.background': '#F8F8F8',
	'sideBar.border': '#E5E5E5',
	'sideBar.foreground': '#3B3B3B',
	'sideBarSectionHeader.background': '#F8F8F8',
	'sideBarSectionHeader.border': '#E5E5E5',
	'sideBarSectionHeader.foreground': '#3B3B3B',
	'sideBarTitle.foreground': '#3B3B3B',
	'statusBar.background': '#F8F8F8',
	'statusBar.border': '#E5E5E5',
	'statusBar.debuggingBackground': '#FD716C',
	'statusBar.debuggingForeground': '#000000',
	'statusBar.focusBorder': '#005FB8',
	'statusBar.foreground': '#3B3B3B',
	'statusBar.noFolderBackground': '#F8F8F8',
	'statusBarItem.compactHoverBackground': '#CCCCCC',
	'statusBarItem.errorBackground': '#C72E0F',
	'statusBarItem.focusBorder': '#005FB8',
	'statusBarItem.hoverBackground': '#B8B8B850',
	'statusBarItem.prominentBackground': '#6E768166',
	'statusBarItem.remoteBackground': '#005FB8',
	'statusBarItem.remoteForeground': '#FFFFFF',
	'tab.activeBackground': '#FFFFFF',
	'tab.activeBorder': '#F8F8F8',
	'tab.activeBorderTop': '#005FB8',
	'tab.activeForeground': '#3B3B3B',
	'tab.border': '#E5E5E5',
	'tab.hoverBackground': '#FFFFFF',
	'tab.inactiveBackground': '#F8F8F8',
	'tab.inactiveForeground': '#868686',
	'tab.lastPinnedBorder': '#D4D4D4',
	'tab.selectedBackground': '#ffffffa5',
	'tab.selectedBorderTop': '#68a3da',
	'tab.selectedForeground': '#333333b3',
	'tab.unfocusedActiveBorder': '#F8F8F8',
	'tab.unfocusedActiveBorderTop': '#E5E5E5',
	'tab.unfocusedHoverBackground': '#F8F8F8',
	'terminal.foreground': '#3B3B3B',
	'terminal.inactiveSelectionBackground': '#E5EBF1',
	'terminal.tab.activeBorder': '#005FB8',
	'terminalCursor.foreground': '#005FB8',
	'textBlockQuote.background': '#F8F8F8',
	'textBlockQuote.border': '#E5E5E5',
	'textCodeBlock.background': '#F8F8F8',
	'textLink.activeForeground': '#005FB8',
	'textLink.foreground': '#005FB8',
	'textPreformat.background': '#0000001F',
	'textPreformat.foreground': '#3B3B3B',
	'textSeparator.foreground': '#21262D',
	'titleBar.activeBackground': '#F8F8F8',
	'titleBar.activeForeground': '#1E1E1E',
	'titleBar.border': '#E5E5E5',
	'titleBar.inactiveBackground': '#F8F8F8',
	'titleBar.inactiveForeground': '#8B949E',
	'welcomePage.tileBackground': '#F3F3F3',
	'widget.border': '#E5E5E5'
};

export interface IWorkbenchTheme {
	readonly id: string;
	readonly label: string;
	readonly extensionData?: ExtensionData;
	readonly description?: string;
	readonly settingsId: string | null;
}

export interface IWorkbenchColorTheme extends IWorkbenchTheme, IColorTheme {
	readonly settingsId: string;
	readonly tokenColors: ITextMateThemingRule[];
}

export interface IColorMap {
	[id: string]: Color;
}

export interface IWorkbenchFileIconTheme extends IWorkbenchTheme, IFileIconTheme {
}

export interface IWorkbenchProductIconTheme extends IWorkbenchTheme, IProductIconTheme {
	readonly settingsId: string;

	getIcon(icon: IconContribution): IconDefinition | undefined;
}

export type ThemeSettingTarget = ConfigurationTarget | undefined | 'auto' | 'preview';


export interface IWorkbenchThemeService extends IThemeService {
	readonly _serviceBrand: undefined;
	setColorTheme(themeId: string | undefined | IWorkbenchColorTheme, settingsTarget: ThemeSettingTarget): Promise<IWorkbenchColorTheme | null>;
	getColorTheme(): IWorkbenchColorTheme;
	getColorThemes(): Promise<IWorkbenchColorTheme[]>;
	getMarketplaceColorThemes(publisher: string, name: string, version: string): Promise<IWorkbenchColorTheme[]>;
	readonly onDidColorThemeChange: Event<IWorkbenchColorTheme>;

	getPreferredColorScheme(): ColorScheme | undefined;

	setFileIconTheme(iconThemeId: string | undefined | IWorkbenchFileIconTheme, settingsTarget: ThemeSettingTarget): Promise<IWorkbenchFileIconTheme>;
	getFileIconTheme(): IWorkbenchFileIconTheme;
	getFileIconThemes(): Promise<IWorkbenchFileIconTheme[]>;
	getMarketplaceFileIconThemes(publisher: string, name: string, version: string): Promise<IWorkbenchFileIconTheme[]>;
	readonly onDidFileIconThemeChange: Event<IWorkbenchFileIconTheme>;

	setProductIconTheme(iconThemeId: string | undefined | IWorkbenchProductIconTheme, settingsTarget: ThemeSettingTarget): Promise<IWorkbenchProductIconTheme>;
	getProductIconTheme(): IWorkbenchProductIconTheme;
	getProductIconThemes(): Promise<IWorkbenchProductIconTheme[]>;
	getMarketplaceProductIconThemes(publisher: string, name: string, version: string): Promise<IWorkbenchProductIconTheme[]>;
	readonly onDidProductIconThemeChange: Event<IWorkbenchProductIconTheme>;
}

export interface IThemeScopedColorCustomizations {
	[colorId: string]: string;
}

export interface IColorCustomizations {
	[colorIdOrThemeScope: string]: IThemeScopedColorCustomizations | string;
}

export interface IThemeScopedTokenColorCustomizations {
	[groupId: string]: ITextMateThemingRule[] | ITokenColorizationSetting | boolean | string | undefined;
	comments?: string | ITokenColorizationSetting;
	strings?: string | ITokenColorizationSetting;
	numbers?: string | ITokenColorizationSetting;
	keywords?: string | ITokenColorizationSetting;
	types?: string | ITokenColorizationSetting;
	functions?: string | ITokenColorizationSetting;
	variables?: string | ITokenColorizationSetting;
	textMateRules?: ITextMateThemingRule[];
	semanticHighlighting?: boolean; // deprecated, use ISemanticTokenColorCustomizations.enabled instead
}

export interface ITokenColorCustomizations {
	[groupIdOrThemeScope: string]: IThemeScopedTokenColorCustomizations | ITextMateThemingRule[] | ITokenColorizationSetting | boolean | string | undefined;
	comments?: string | ITokenColorizationSetting;
	strings?: string | ITokenColorizationSetting;
	numbers?: string | ITokenColorizationSetting;
	keywords?: string | ITokenColorizationSetting;
	types?: string | ITokenColorizationSetting;
	functions?: string | ITokenColorizationSetting;
	variables?: string | ITokenColorizationSetting;
	textMateRules?: ITextMateThemingRule[];
	semanticHighlighting?: boolean; // deprecated, use ISemanticTokenColorCustomizations.enabled instead
}

export interface IThemeScopedSemanticTokenColorCustomizations {
	[styleRule: string]: ISemanticTokenRules | boolean | undefined;
	enabled?: boolean;
	rules?: ISemanticTokenRules;
}

export interface ISemanticTokenColorCustomizations {
	[styleRuleOrThemeScope: string]: IThemeScopedSemanticTokenColorCustomizations | ISemanticTokenRules | boolean | undefined;
	enabled?: boolean;
	rules?: ISemanticTokenRules;
}

export interface IThemeScopedExperimentalSemanticTokenColorCustomizations {
	[themeScope: string]: ISemanticTokenRules | undefined;
}

export interface IExperimentalSemanticTokenColorCustomizations {
	[styleRuleOrThemeScope: string]: IThemeScopedExperimentalSemanticTokenColorCustomizations | ISemanticTokenRules | undefined;
}

export type IThemeScopedCustomizations =
	IThemeScopedColorCustomizations
	| IThemeScopedTokenColorCustomizations
	| IThemeScopedExperimentalSemanticTokenColorCustomizations
	| IThemeScopedSemanticTokenColorCustomizations;

export type IThemeScopableCustomizations =
	IColorCustomizations
	| ITokenColorCustomizations
	| IExperimentalSemanticTokenColorCustomizations
	| ISemanticTokenColorCustomizations;

export interface ISemanticTokenRules {
	[selector: string]: string | ISemanticTokenColorizationSetting | undefined;
}

export interface ITextMateThemingRule {
	name?: string;
	scope?: string | string[];
	settings: ITokenColorizationSetting;
}

export interface ITokenColorizationSetting {
	foreground?: string;
	background?: string;
	fontStyle?: string; /* [italic|bold|underline|strikethrough] */
}

export interface ISemanticTokenColorizationSetting {
	foreground?: string;
	fontStyle?: string; /* [italic|bold|underline|strikethrough] */
	bold?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	italic?: boolean;
}

export interface ExtensionData {
	extensionId: string;
	extensionPublisher: string;
	extensionName: string;
	extensionIsBuiltin: boolean;
}

export namespace ExtensionData {
	export function toJSONObject(d: ExtensionData | undefined): any {
		return d && { _extensionId: d.extensionId, _extensionIsBuiltin: d.extensionIsBuiltin, _extensionName: d.extensionName, _extensionPublisher: d.extensionPublisher };
	}
	export function fromJSONObject(o: any): ExtensionData | undefined {
		if (o && isString(o._extensionId) && isBoolean(o._extensionIsBuiltin) && isString(o._extensionName) && isString(o._extensionPublisher)) {
			return { extensionId: o._extensionId, extensionIsBuiltin: o._extensionIsBuiltin, extensionName: o._extensionName, extensionPublisher: o._extensionPublisher };
		}
		return undefined;
	}
	export function fromName(publisher: string, name: string, isBuiltin = false): ExtensionData {
		return { extensionPublisher: publisher, extensionId: `${publisher}.${name}`, extensionName: name, extensionIsBuiltin: isBuiltin };
	}
}

export interface IThemeExtensionPoint {
	id: string;
	label?: string;
	description?: string;
	path: string;
	uiTheme?: ThemeTypeSelector;
	_watch: boolean; // unsupported options to watch location
}
