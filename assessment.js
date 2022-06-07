'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }

  // 診断結果表示エリアの作成
  resultDivided.innerText = '';  // 診断結果表示エリアの子要素を全削除する、という動作
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);
  
  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // ツイートエリアの作成
  tweetDivided.innerText = '';

};

const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

// 以下、JSDoc(という形式のコメントの書き方のこと)
/**
 * 名前の文字列を渡すと診断結果を返す関数(関数の処理内容)
 * @param {string} userName ユーザの名前(引数)
 * @return {string} 診断結果(返り値)
 */

function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];
  result = result.replaceAll('{userName}', userName);
  return result;
}

// テストコード
console.assert(
  assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);



/* 学習メモ
■ 'use strict';
  宣言後の記述ミスをエラーとして表示してくれる機能を呼び出すための記述。
  日本語では「厳格モードを使う」という意味。

■ モックアップ
  実際のソフトウェアのような機能を作り込むことなく、見た目だけを作ったもの。

■ ユーザーインターフェース(User Interface) ※略してUI
  利用者が直接触れる部分のこと

■ インタフェース
  関数の内部の処理と、外部からの入力や外部への出力(引数と戻り値等)を定義している「内外の境界」のこと。
  JavaScriptは、「変数の型の情報をソースコードに書かない言語」であり、インタフェースを明らかにするには、上記のようにコメントで明示する必要がある。
  ＊TypeScriptは、ソースコードの中に型の情報を書ける。
  
  ＊JSDocはコメントなので書かなくてもプログラムは作動するが、JSDoc形式でインタフェースが定義されていると読みやすい！
  ＊ソースコードからドキュメントを自動生成する機能や、エディタでカーソルを合わせるとインタフェースが表示される機能等を持っていて便利！

■ replaceAll() 関数
  第一引数の文字列を全て第二引数の文字列に変換する
   '何かしらの文字列や文章'.replaceAll('変えたい文字列', '変える文字列');
   (ex)
   '{userName}のいいところは優しいところです。'.replaceAll('{userName}','太郎')
   → 「太郎のいいところは優しいところです。」と出力される。

■ console.assert
  関数が正しく動いているかテストできる。

■ return;
  関数処理の中で、戻り値なしにそこで処理が終了するという意味。

■ ガード句
  特定の処理の際に、処理を終了させるような処理のこと。
  (ex)
    if (userName.length === 0) {
      //名前が空の時は処理を終了する
      return;
    }

■ JavaScriptの論理評価
  JavaScript で if や while で受け取る値は、true 以外の値でもほとんどの場合 true と評価される。
  しかし、true ではなく false と評価される値もある(下記参照)。

  false
  null
  undefined
  空文字列 ''
  数値の 0
  数値の NaN (非数という、数値にできないことを意味する特殊な値)

  このように if や while の条件式に与えた時、 true になる値のことを truthy な値、 false になる値のことを falsy な値と呼ぶ。

■ まとめ
  ＊ES6では、アロー関数を用いて無名関数を簡単に書くことができる。
  ＊if や while では論理値以外を受け取って、true や false と解釈できる。
  ＊関数を使って処理をまとめ、関数名をつけることで、複雑な処理をわかりやすくできる。
*/
