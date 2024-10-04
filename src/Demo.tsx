import React from 'react';

import ReactDOM from 'react-dom/client';

import { renderCallout } from './Callout';

// サンプルのblockquoteコンポーネント（デフォルトのもの）
const DefaultBlockquote: React.FunctionComponent<any> = ({ children }) => {
  return <blockquote>{children}</blockquote>;
};

// コールアウト対応のblockquoteを作成
const CalloutBlockquote = renderCallout(DefaultBlockquote);

// サンプルのコンテンツを用意
const sampleContent = (
  <CalloutBlockquote>
    <p>[!IMPORTANT] これは重要なコールアウトです。</p>
  </CalloutBlockquote>
);

const Demo = () => {
  return (
    <div>
      <h1>GROWI Plugin: Markdown Callout Demo</h1>
      {sampleContent}
      <CalloutBlockquote>
        <p>[!NOTE] これはノートです。</p>
      </CalloutBlockquote>
      <CalloutBlockquote>
        <p>[!TIP] これはヒントです。</p>
      </CalloutBlockquote>
      <CalloutBlockquote>
        <p>[!WARNING] これは警告です。</p>
      </CalloutBlockquote>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>,
);
