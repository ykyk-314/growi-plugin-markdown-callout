import React from 'react';
import './Callout.css'; // コールアウト用のCSSファイル

interface CalloutProps {
  type: string;
  content: string;
}

// コールアウトの種類に応じたスタイルの適用
const calloutStyles: { [key: string]: string } = {
  CAUTION: 'callout-caution',
  NOTE: 'callout-note',
  IMPORTANT: 'callout-important',
  TIP: 'callout-tip',
  WARNING: 'callout-warning',
};

// コールアウトコンポーネント
const Callout: React.FC<CalloutProps> = ({ type, content }) => {
  const className = calloutStyles[type.toUpperCase()] || '';

  return (
    <div className={`callout ${className}`}>
      <p>{content}</p>
    </div>
  );
};

export default Callout;
