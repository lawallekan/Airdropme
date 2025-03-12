// Type definitions for Chrome extension API

interface Chrome {
  storage: {
    local: {
      get: (
        keys: string | string[] | object | null,
        callback: (items: { [key: string]: any }) => void,
      ) => void;
      set: (items: object, callback?: () => void) => void;
    };
    onChanged: {
      addListener: (
        callback: (changes: object, namespace: string) => void,
      ) => void;
      removeListener: (
        callback: (changes: object, namespace: string) => void,
      ) => void;
    };
  };
  contextMenus: {
    create: (properties: any) => void;
    onClicked: {
      addListener: (callback: (info: any, tab: any) => void) => void;
    };
  };
  notifications: {
    create: (options: any) => void;
  };
  tabs: {
    create: (properties: any) => void;
  };
  runtime: {
    onMessage: {
      addListener: (
        callback: (
          message: any,
          sender: any,
          sendResponse: any,
        ) => boolean | void,
      ) => void;
    };
    onInstalled: {
      addListener: (callback: () => void) => void;
    };
  };
  alarms: {
    create: (name: string, alarmInfo: { periodInMinutes: number }) => void;
    onAlarm: {
      addListener: (callback: (alarm: { name: string }) => void) => void;
    };
  };
}

declare global {
  interface Window {
    chrome?: Chrome;
  }
  var chrome: Chrome | undefined;
}
