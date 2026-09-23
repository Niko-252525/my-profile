function MemberCard({ name, role, message }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <p className="text-lg font-bold">{name}</p>
      <p className="text-lg font-bold">{role}</p>
      <p className="text-lg font-bold">{message}</p>
    </div>
  );
}

export default MemberCard;