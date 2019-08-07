declare namespace swan {
    /** 同步获取系统信息 */
    function getSystemInfoSync(): ISysInfo;
    /** 键盘事件 */
    function showKeyboard(info: any): void;
    function onKeyboardConfirm(callback: Function): void;
    function onKeyboardComplete(callback: Function): void;
    function onKeyboardInput(callback: Function): void;
    function offKeyboardComplete(): void;
    function offKeyboardConfirm(): void;
    function offKeyboardInput(): void;
    function hideKeyboard(obj?: any): void;
    /** 生命周期 */
    function onShow(callback: Function): void;
    function onHide(callback: Function): void;
    /** 网络请求 */
    function request(obj: IRequestObject): void;
    interface ISysInfo {
        language: string;
        system: string;
        platform: string;
        screenWidth:number;
        screenHeight:number;
    }
    interface IRequestObject {
        url: string;
        data?: any;
        method?: string;
        header?: any;
        dataType?: string;
        responseType?: string;
        success?: Function;
        fail?: Function;
    }

}
