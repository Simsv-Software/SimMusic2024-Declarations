/* MIT License
 * Copyright (c) 2025 Simsv-Software
 *
 * Authors:
 *  XIAYM-gh
 * 
 * 此声明文件包括：
 *  SimMusic 的配置
 */

// ===== Config =====

/**
 * SimMusic 的全局配置对象，可通过调用 `getItem`, `setItem` 等函数进行操作。  
 * *注意：由于该对象全局共享，您需要确保您的扩展配置项使用唯一的键名。*
 * 
 * 参考：
 *  - https://docs.simsv.com/sim-music/dev-docs.html
 */
declare const config: {
    /**
     * 根据键名来获取配置项，当内部对象不存在此键时，将会从 `defaultConfig` 对象中获取。
     * 
     * @param key 配置项的键名。
     * @see defaultConfig
     */
    getItem(key: string): any | undefined;

    /**
     * 写入配置项。
     * 
     * @param key 配置项的键名。
     * @param value 配置项的值。
     */
    setItem(key: string, value: any | undefined): void;

    /**
     * 通过键名来监听某个配置项的变化，并在其变化时调用传入的 `callback` 函数。  
     * *注意：指定配置项先前的监听回调函数会被覆盖。*
     * 
     * @param key 配置项的键名。
     * @param callback 当指定配置项变化时所调用的函数。
     */
    listenChange(key: string, callback: (value: any) => void): void;
};

/**
 * SimMusic 的全局配置回退对象，通过直接写入进行操作。
 * 
 * 注意：
 *  - 由于该对象全局共享，您需要确保您的扩展配置项使用唯一的键名。
 *  - 该对象不会被储存，您需要在扩展每次载入时设置相应的值。
 * 
 * 写入示例:
 * ```javascript
 * defaultConfig.myCustomConfig = 'custom-value';
 * defaultConfig['ext.test.key1'] = 0721;
 * ```
 * 
 * 参考：
 *  - https://docs.simsv.com/sim-music/dev-docs.html
 */
declare const defaultConfig: object;

// ===== Settings =====

/**
 * SimMusic 的软件设置页面对象，目前只有 `data` 对象可供扩展使用。
 */
declare const SettingsPage: {
    /**
     * SimMusic 软件设置页面数据，可存储标题、功能项（仅有按钮）、配置项等。
     * 
     * 写入示例：
     * ```javascript
     * SettingsPage.data.push(
     *   { type: 'title', text: '我的第一个扩展' },
     *   { type: 'input', text: '一个配置项', description: '嘤嘤嘤…', configItem: 'myCustomConfig' }
     * );
     * ```
     * 
     * 参考：
     *  - https://docs.simsv.com/sim-music/dev-docs.html
     */
    data: SettingAcceptable[]
}

/**
 * 请参见具体实现。
 * 
 * @see SettingTitle
 * @see SettingBoolean
 * @see SettingSelect
 * @see SettingRange
 * @see SettingInput
 * @see SettingColor
 * @see SettingButton
 */
type SettingAcceptable = { type: string } & (
    SettingTitle | SettingBoolean | SettingSelect | SettingRange | SettingInput | SettingColor | SettingButton
);

/**
 * 代表一个标题项。
 */
interface SettingTitle {
    type: 'title',

    /**
     * 必填，代表该标题项的文本。
     */
    text: string
}

/**
 * [Abstract] 代表任何一个类型不为 `title` 的设置项。
 */
interface SettingAbstract {
    /**
     * 必填，代表该设置项的标题。
     */
    text: string,

    /**
     * 选填，代表该设置项的描述。
     */
    description?: string,

    /**
     * 选填，代表该设置项旁的小标记。
     * 
     * 目前支持 `experimental` 和 `pending`，其它内容则**直接作为 HTML 内容渲染**。
     */
    badges?: string[],

    /**
     * 选填，代表该设置项的前提设置项，前提设置项必须为 `boolean` 类型。
     * 
     * 当前提设置项不为 `true` 时，该设置项将不会渲染。  
     * 可以参考官方设置项中 `歌词翻译字号` 的表现。
     */
    attachTo?: string
}

/**
 * 代表一个仅有按钮的功能设置项。
 */
interface SettingButton extends SettingAbstract {
    type: 'button',

    /**
     * 必填，按钮显示的内容。
     */
    button: string,

    /**
     * 必填，用户点击按钮后的处理逻辑。
     */
    onclick(): void
}

/**
 * [Abstract] 代表任意一个包括 `configItem` 键的 `SettingAbstract` 对象（即类型非 `title` 或 `button`）。
 */
interface SettingBindable extends SettingAbstract {
    /**
     * 必填，为该设置项所绑定的配置项的键名。
     */
    configItem: string
}

/**
 * 代表一个开关设置项，配置存储为 `true` 或 `false`。
 */
interface SettingBoolean extends SettingBindable {
    type: 'boolean'
}

/**
 * 代表一个选项框设置项。
 */
interface SettingSelect extends SettingBindable {
    type: 'select',

    /**
     * 必填，代表该选项框所包含的选项。
     * 
     * 示例：
     * ```javascript
     * { ..., options: [[ val1, display1 ], [ val2, display2 ]] }
     * ```
     * 
     * 解释：
     *  - `valN`: 要向配置项写入的值。
     *  - `displayN`: 在设置页面展示的选项名。
     */
    options: [any, string][]
}

/**
 * 代表一个滑块设置项。
 */
interface SettingRange extends SettingBindable {
    type: 'range',

    /**
     * 必填，滑块的最小值，可以为小数，必须小于最大值。
     */
    min: number,

    /**
     * 必填，滑块的最大值，可以为小数，必须大于最小值。
     */
    max: number
}

/**
 * 代表一个输入框设置项。
 */
interface SettingInput extends SettingBindable {
    type: 'input',

    /**
     * 选填，设置渲染的 `input` DOM 元素中 `type` 的值，默认为 `input`。
     * 
     * 参考：
     *  - https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input
     */
    inputType?: string
}

/**
 * 代表一个颜色选择设置项。
 */
interface SettingColor extends SettingBindable {
    type: 'color'
}