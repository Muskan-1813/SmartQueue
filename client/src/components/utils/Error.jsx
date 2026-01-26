function Error({ err }) {
  return (
    <div className="mb-4 rounded-lg bg-red-100 px-4 py-2">
      <p className="text-sm font-semibold text-red-600">{err}</p>
    </div>
  );
}

export default Error;
