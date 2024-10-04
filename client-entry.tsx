import { useEffect } from 'react';

import { renderCallout } from './src/Callout';
import './src/Callout.css';

declare const growiFacade: {
  markdownRenderer?: {
    optionsGenerators: {
      customGenerateViewOptions: (path: string, options: any, toc: any) => any;
      generateViewOptions: (path: string, options: any, toc: any) => any;
    };
  };
};

// プラグインの初期化
const activate = (): void => {
  if (!growiFacade || !growiFacade.markdownRenderer) {
    return;
  }

  const { optionsGenerators } = growiFacade.markdownRenderer;

  // 既存のビューオプション生成関数をラップする
  optionsGenerators.customGenerateViewOptions = (...args) => {
    const options = optionsGenerators.generateViewOptions(...args);

    // コールアウトレンダリング関数を追加
    options.components.blockquote = renderCallout(options.components.blockquote);
    return options;
  };
};

// プラグインの終了処理（今回は不要）
const deactivate = (): void => {};

// プラグインを登録
if ((window as any).pluginActivators == null) {
  (window as any).pluginActivators = {};
}
(window as any).pluginActivators['growi-plugin-markdown-callout'] = {
  activate,
  deactivate,
};
