import { useComplyAuth } from "@/hooks/useComplyAuth";

export default function ComplyTest() {
  const { user, isAuthenticated, isLoading, token } = useComplyAuth();

  console.log("ComplyTest render:", { user, isAuthenticated, isLoading, token: !!token });

  if (isLoading) {
    return <div className="p-8">Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="p-8">
        <h1>Not Authenticated</h1>
        <p>Please login first</p>
        <a href="/comply/auth" className="text-blue-600 underline">Go to Login</a>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Test - SUCCESS</h1>
      <div className="bg-green-100 p-4 rounded">
        <h2 className="font-semibold">User Info:</h2>
        <p>Email: {user?.email}</p>
        <p>Name: {user?.firstName} {user?.lastName}</p>
        <p>Token: {token ? 'Present' : 'Missing'}</p>
      </div>
      <div className="mt-4">
        <a href="/comply/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded">
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}