/* MIT License
 * Copyright (c) 2025 Simsv-Software
 *
 * Authors:
 *  XIAYM-gh
 * 
 * 此声明文件包括：
 *  SimMusic 快捷对话框组件
 */

/**
 * 给用户弹出一个提示，类似于 W3C 标准中的 `alert` 函数，但不会阻塞渲染进程。
 * 
 * @param text 必填，要显示的提示文本。
 * @param callback 关闭时触发的回调函数。
 */
declare function alert(text: string, callback?: () => void): void;

/**
 * 给用户弹出一个提示并要求确认，类似于 W3C 标准中的 `confirm` 函数，但不会阻塞渲染进程。
 * 
 * @param text 必填，要显示的提示文本。
 * @param callback 用户点击确定时触发的回调函数。
 */
declare function confirm(text: string, callback?: () => void): void;

/**
 * 给用户弹出一个提示并要求输入文字，类似于 W3C 标准中的 `prompt` 函数，但不会阻塞渲染进程。
 * 
 * @param text 必填，要显示的提示文本。
 * @param callback 用户点击确定时触发的回调函数。
 */
declare function prompt(text: string, callback?: (input: string) => void): void;

/**
 * 要传入 `webview` 函数的参数类型定义。
 */
interface WebviewOptions {
    /**
     * 整数，指定 Webview 窗口的宽度。
     */
    width: number,

    /**
     * 整数，指定 Webview 窗口的高度。
     */
    height: number
}

interface WebviewResult {
    /**
     * Webview 点击完成时所在的 URL。
     */
    url: string,

    /**
     * Webview 所获取到的所有 Cookie。
     */
    cookies: WebviewCookie[]
}

/**
 * Webview 所返回的 Cookie 对象，由 Electron 提供，在此不多赘述。
 * 
 * 参考：
 *  - https://www.electronjs.org/zh/docs/latest/api/cookie#cookiessetdetails
 */
interface WebviewCookie {
    domain: string,
    /**
     * 注意：类型为浮点数，整数部分精确到秒。
     */
    expirationDate: number,
    hostOnly: boolean,
    httpOnly: boolean,
    name: string,
    path: string,
    sameSite: 'unspecified' | 'no_restriction' | 'lax' | 'strict',
    secure: boolean,
    session: boolean,
    value: string
}

/**
 * 打开一个自定义的 Webview 窗口，并在用户点击完成按钮后触发回调。
 * 
 * @param url Webview 窗口要打开的网址。
 * @param options Webview 窗口相关的参数。
 * @param callback 用户点击完成时触发的回调函数。
 */
declare function webview(url: string, options?: WebviewOptions, callback?: (result: WebviewResult) => void): void;