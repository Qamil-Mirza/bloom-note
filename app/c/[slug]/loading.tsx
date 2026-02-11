export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-romantic-600 mx-auto mb-4" />
        <p className="text-lg text-gray-600">Loading your card...</p>
      </div>
    </div>
  );
}
