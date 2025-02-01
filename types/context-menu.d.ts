/* MIT License
 * Copyright (c) 2025 Simsv-Software
 *
 * Authors:
 *  XIAYM-gh
 * 
 * 此声明文件包括：
 *  SimMusic 全局使用的菜单组件
 */

/**
 * SimMusic 全局使用的菜单组件类。
 * 
 * 参考:
 *  - https://github.com/zhujin917/3sqrt7-context-menu
 */
declare class ContextMenu {
    /**
     * 构造一个新菜单。
     * 
     * @param items 菜单中所包括的项目。
     */
    constructor(items: MenuAcceptable[]);

    /**
     * 在指定位置以一定偏移量弹出该菜单。
     * 
     * @param param0 位置坐标 `(x,y)`，必填。
     * @param param1 偏移量 `(offsetX, offsetY)`，默认为 `(0, 0)`。
     */
    public popup(
        [x, y]: [number, number],
        [offsetX, offsetY]?: [number, number]
    ): void;
}

/**
 * 请参见具体实现。
 * 
 * @see MenuItem
 * @see MenuSeparator
 */
type MenuAcceptable = MenuItem | MenuSeparator;

/**
 * 代表一个普通的菜单项目。
 */
interface MenuItem {
    /**
     * 代表该项目的显示名称，必填。
     */
    label: string,

    /**
     * 代表该项目是否被禁用，默认为 `false`。
     */
    disabled?: boolean,

    /**
     * 代表点击该项目时要触发的函数。
     */
    click?(): void,

    /**
     * 代表该项目的子菜单。
     */
    submenu?: MenuAcceptable[]
}

/**
 * 代表一条分隔线。
 */
interface MenuSeparator {
    type: 'separator'
}