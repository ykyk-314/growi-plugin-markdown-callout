import React from 'react';
import './src/Callout.css';

// コールアウトのタグと色の対応
const calloutColors: { [key: string]: string } = {
  NOTE: '#478be6',
  TIP: '#57ab5a',
  IMPORTANT: '#986ee2',
  WARNING: '#f18603',
  CAUTION: '#e5534b',
};

// コールアウトをレンダリングする関数
export const renderCallout = (
    OriginalBlockquote: React.FunctionComponent<any>,
): React.FunctionComponent<any> => {
  return ({ children, ...props }: any): JSX.Element | null => {
    // childrenが正しく渡されているかデバッグ
    console.log('children:', children);

    // childrenが存在しない場合を処理
    if (!children || !children[0]?.props?.children?.[0]) {
      return <OriginalBlockquote {...props}>{children}</OriginalBlockquote>;
    }

    const firstChild = typeof children[0].props.children[0] === 'string'
      ? children[0].props.children[0].trim()
      : '';

    // firstChildが正しくパースされているかデバッグ
    console.log('firstChild:', firstChild);

    // [!タグ]の形式にマッチするか確認
    const match = firstChild.match(/^\[!(\w+)\]/);
    console.log('match:', match); // マッチしたかどうかの確認

    if (match) {
      const tag = match[1].toUpperCase(); // タグを大文字に統一
      const color = calloutColors[tag] || '#ccc'; // マッチしないタグはデフォルト色

      // [!タグ]を削除して内容だけ残す
      const newChildren = React.cloneElement(children[0], {
        children: children[0].props.children.slice(1),
      });

      // カスタムスタイルを適用してレンダリング
      return (
        <div className="callout" style={{ backgroundColor: color }}>
          {newChildren}
        </div>
      );
    }

    // 通常の blockquote をレンダリング
    return <OriginalBlockquote {...props}>{children}</OriginalBlockquote>;
  };
};
