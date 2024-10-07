import React from 'react';

import Callout from './src/Callout'; // Calloutコンポーネントをインポート

declare const growiFacade: {
  markdownRenderer?: {
    optionsGenerators: {
      customGenerateViewOptions: (path: string, options: any, toc: any) => any;
      generateViewOptions: (path: string, options: any, toc: any) => any;
    };
  };
};

// コールアウトのタグを処理する関数
const processCallout = (text: string): JSX.Element | null => {
  const match = text.match(/^\[!(\w+)\](.*)/);

  if (match) {
    const type = match[1]; // CAUTION, NOTEなど
    const content = match[2].trim(); // コールアウトの内容

    // Calloutコンポーネントでラップして返す
    return <Callout type={type} content={content} />;
  }

  return null;
};

// プラグインの初期化
const activate = (): void => {
  if (!growiFacade || !growiFacade.markdownRenderer) {
    return;
  }

  const { optionsGenerators } = growiFacade.markdownRenderer;

  // マークダウンレンダリングオプションをカスタマイズ
  optionsGenerators.customGenerateViewOptions = (...args) => {
    const options = optionsGenerators.generateViewOptions(...args);

    // blockquoteの処理をカスタマイズしてコールアウトを処理
    const OriginalBlockquote = options.components.blockquote;

    options.components.blockquote = ({ children, ...props }: any) => {
      const content = children[0].props.children;

      // コールアウトが含まれているか確認
      const calloutElement = processCallout(content);

      // コールアウトの場合はカスタムコンポーネントを返す
      if (calloutElement) {
        return calloutElement;
      }

      // 通常の blockquote 処理
      return React.createElement(OriginalBlockquote, props, children);
    };

    return options;
  };
};

// プラグインの登録
if ((window as any).pluginActivators == null) {
  (window as any).pluginActivators = {};
}

(window as any).pluginActivators['growi-plugin-markdown-callout'] = {
  activate,
};
