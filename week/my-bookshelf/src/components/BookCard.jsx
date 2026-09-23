function BookCard({ title, author, rating, comment }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-500 text-sm">著者: {author}</p>
      <p className="text-yellow-500">{"★".repeat(rating)}</p>
      <p className="text-gray-600 mt-2">{comment}</p>
    </div>
  );
}

export default BookCard;