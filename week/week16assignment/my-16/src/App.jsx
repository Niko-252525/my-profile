import { useState, useEffect } from 'react'

// 1. おみくじのデータ一覧（配列）
// 確率を考慮して、大吉〜凶までのデータを用意しています。
const OMIKUJI_DATA = [
  {
    fortune: '大吉',
    color: 'text-red-600',
    bg: 'bg-red-50 border-red-300',
    item: '赤い文房具',
    advice: '絶好調の一日！新しいことに挑戦してみよう。',
    weight: 15, // 15%の確率
  },
  {
    fortune: '中吉',
    color: 'text-orange-600',
    bg: 'bg-orange-50 border-orange-300',
    item: '温かいお茶',
    advice: '努力が実を結びそう。焦らず着実に進もう。',
    weight: 30, // 30%の確率
  },
  {
    fortune: '小吉',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50 border-yellow-300',
    item: 'お気に入りの音楽',
    advice: 'ささやかな幸せが訪れる日。周りの人に感謝しよう。',
    weight: 30, // 30%の確率
  },
  {
    fortune: '吉',
    color: 'text-green-600',
    bg: 'bg-green-50 border-green-300',
    item: '観葉植物',
    advice: '平常心が鍵。いつも通りのリズムを大切に。',
    weight: 15, // 15%の確率
  },
  {
    fortune: '凶',
    color: 'text-blue-600',
    bg: 'bg-blue-50 border-blue-300',
    item: '折りたたみ傘',
    advice: '慎重に行動すれば問題なし！気分転換を意識して。',
    weight: 10, // 10%の確率
  },
]

export default function App() {
  // ----------------------------------------------------
  // 2. 状態管理（state）
  // ----------------------------------------------------

  // 現在引き当てたおみくじの結果（最初は null）
  const [result, setResult] = useState(null)

  // おみくじを引いている最中（アニメーション中）かどうかのフラグ
  const [isLoading, setIsLoading] = useState(false)

  // 過去に引いたおみくじの履歴（初期値は localStorage から取得）
  const [history, setHistory] = useState(() => {
    // コンポーネント読み込み時に localStorage から保存済みデータを取得
    const saved = localStorage.getItem('omikuji_history')
    return saved ? JSON.parse(saved) : []
  })

  // ----------------------------------------------------
  // 3. 副作用の処理（useEffect）
  // ----------------------------------------------------

  // history の値が更新されるたびに localStorage に保存する
  useEffect(() => {
    localStorage.setItem('omikuji_history', JSON.stringify(history))
  }, [history])

  // ----------------------------------------------------
  // 4. おみくじを引くロジック（確率計算・アニメーション制御）
  // ----------------------------------------------------

  const drawOmikuji = () => {
    // すでに抽選中の場合は連打を防止する
    if (isLoading) return

    // 1. シャッフル中フラグを true にして、おみくじの箱を揺らす
    setIsLoading(true)
    setResult(null)

    // 2. 1秒間（1000ミリ秒）待ってから結果を計算・表示する
    setTimeout(() => {
      // 【確率計算の仕組み（重み付きランダム）】
      // 全ての weight の合計（15 + 30 + 30 + 15 + 10 = 100）を算出
      const totalWeight = OMIKUJI_DATA.reduce((sum, item) => sum + item.weight, 0)

      // 0 以上 100 未満のランダムな数値を生成
      let randomNum = Math.random() * totalWeight

      // ランダムな数値がどの範囲に入るかによって結果を決定する
      let selectedFortune = OMIKUJI_DATA[0]
      for (const item of OMIKUJI_DATA) {
        if (randomNum < item.weight) {
          selectedFortune = item
          break
        }
        randomNum -= item.weight
      }

      // 日時情報付きの結果オブジェクトを作成
      const newResult = {
        ...selectedFortune,
        date: new Date().toLocaleTimeString('ja-JP', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      }

      // state を更新（結果表示 ＆ 履歴追加）
      setResult(newResult)
      setHistory((prevHistory) => [newResult, ...prevHistory])
      setIsLoading(false) // シャッフル終了
    }, 1000)
  }

  // 履歴を全削除する関数
  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('omikuji_history')
  }

  // ----------------------------------------------------
  // 5. 画面（JSX）の描写
  // ----------------------------------------------------

  return (
    <div className="min-h-screen bg-amber-50 text-gray-800 p-4 sm:p-8 flex flex-col items-center">
      {/* ヘッダー */}
      <header className="text-center my-6">
        <h1 className="text-3xl md:text-4xl font-bold text-red-700 tracking-wider">
          🏯 令和おみくじ 🏯
        </h1>
        <p className="text-sm text-gray-600 mt-2">今日のあなたの運勢を占ってみましょう！</p>
      </header>

      <main className="w-full max-w-md flex flex-col items-center gap-6">
        {/* おみくじの箱 ＆ 引くボタン */}
        <div className="bg-white p-6 rounded-2xl shadow-md w-full text-center border border-amber-200">
          <div className="text-6xl mb-4 select-none">
            {/* isLoading が true のとき、Tailwindの animate-shake で箱が揺れます */}
            <span className={`inline-block ${isLoading ? 'animate-shake' : ''}`}>
              🧧
            </span>
          </div>

          <button
            onClick={drawOmikuji}
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-xl font-bold text-lg text-white transition-all shadow-md ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 active:scale-95'
            }`}
          >
            {isLoading ? 'おみくじを振っています...' : 'おみくじを引く！'}
          </button>
        </div>

        {/* 結果表示カード */}
        {result && (
          <div
            className={`w-full p-6 rounded-2xl border-2 shadow-lg text-center transition-all animate-fade-in ${result.bg}`}
          >
            <p className="text-xs text-gray-500 font-semibold mb-1">【 今日の運勢 】</p>
            <h2 className={`text-5xl font-extrabold my-2 ${result.color}`}>
              {result.fortune}
            </h2>

            <div className="mt-4 pt-4 border-t border-gray-200/60 space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-bold text-gray-900">一言助言：</span>
                {result.advice}
              </p>
              <p>
                <span className="font-bold text-gray-900">ラッキーアイテム：</span>
                <span className="bg-white/80 px-2 py-0.5 rounded border border-gray-300">
                  {result.item}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* 過去の履歴一覧 */}
        {history.length > 0 && (
          <div className="w-full bg-white p-5 rounded-2xl shadow-sm border border-amber-200 mt-2">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-700 text-sm">📜 最近引いた結果（履歴）</h3>
              <button
                onClick={clearHistory}
                className="text-xs text-red-500 hover:underline"
              >
                履歴を消去
              </button>
            </div>

            <ul className="divide-y divide-gray-100 max-h-48 overflow-y-auto">
              {history.map((item, index) => (
                <li key={index} className="py-2 flex justify-between items-center text-sm">
                  <span className="text-gray-400 text-xs">{item.date}</span>
                  <span className={`font-bold ${item.color}`}>{item.fortune}</span>
                  <span className="text-gray-600 text-xs truncate max-w-[140px]">
                    {item.item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  )
}