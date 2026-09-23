import BookCard from './components/BookCard';

const books = [
  {
    id: 1,
    title: "嫌われる勇気",
    author: "岸見一郎・古賀史健",
    rating: 5,
    comment: "自分の考え方を見直すきっかけになる本です。",
  },
  {
    id: 2,
    title: "星の王子さま",
    author: "サン＝テグジュペリ",
    rating: 4,
    comment: "大切なものについて考えさせられる本です。",
  },
  {
    id: 3,
    title: "こころ",
    author: "夏目漱石",
    rating: 4,
    comment: "人間の心について深く考えられる作品です。",
  },
];

function App() {
  return (
    <main className="max-w-xl mx-auto p-4 space-y-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          rating={book.rating}
          comment={book.comment}
        />
      ))}
    </main>
  );
}

export default App;