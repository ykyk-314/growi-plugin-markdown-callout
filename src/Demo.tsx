import React, { useEffect } from 'react';

import ReactDOM from 'react-dom';

import Callout from './Callout';

const Demo = () => {
  useEffect(() => {
    // ページ内の blockquote 要素を取得
    const blockquotes = document.querySelectorAll('blockquote');

    blockquotes.forEach((blockquote) => {
      const paragraph = blockquote.querySelector('p');

      if (paragraph) {
        const text = paragraph.innerHTML;

        // コールアウトタグのパターンにマッチ
        const match = text.match(/^\[!(\w+)\](.*)/);
        if (match) {
          const type = match[1]; // コールアウトの種類 (CAUTION, NOTE など)
          const content = match[2].trim(); // コールアウトの内容

          // Callout コンポーネントを作成
          const calloutElement = React.createElement(Callout, { type, content });

          // 既存の blockquote を Callout コンポーネントで置き換える
          ReactDOM.render(calloutElement, blockquote);
        }
      }
    });
  }, []);

  return (
    <div>
      <h1>GROWI Plugin: Markdown Callout Demo</h1>
      {/* ここで実際のマークダウンによる blockquote が置かれることを想定 */}
      <blockquote>
        <p>[!CAUTION] これはコールアウトのテストです</p>
      </blockquote>
      <blockquote>
        <p>[!NOTE] これはノートのテストです</p>
      </blockquote>
    </div>
  );
};

export default Demo;
