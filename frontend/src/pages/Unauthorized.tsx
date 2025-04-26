import LogoutButton from "../components/buttons/LogoutButton";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md bg-white shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-6">
          Sorry, your email is not recognized as a member of the DTA Tennis
          Club.
        </p>

        <div className="flex flex-col gap-4">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
