// @ts-ignore
export function TalkToBack(data: any,resolve): any {

        //@ts-ignore
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            resolve("ok")
            const tab_id = tabs[0].id;
            //@ts-ignore
            chrome.tabs.sendMessage(tab_id, data, resolve);
        });

}
