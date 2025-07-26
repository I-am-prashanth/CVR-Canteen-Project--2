import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import Token from '../Token';

function TokenVerify() {
  const [tokenNumber, setToken] = useState('');
  const [out, setOut] = useState("");
  const [tokenData, setTokenData] = useState(null);
  const [isValid, setIsValid] = useState(null);
  const [load, setload] = useState(null);


  // Properly structured mutation with loading state
  const { mutate: checkToken, isLoading } = useMutation({
    mutationFn: async (tokenNumber) => {
      // Artificial delay to make spinner visible (remove in production)
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log("skljdfnkjn")
      
      const res = await fetch('/api/admin/gettoken', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ tokenNumber })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Token not found");
      }
      setload(false);
      return res.json();
    },
    onMutate: () => {
      // Reset states when mutation starts
      setOut("");
      setIsValid(null);
      setTokenData(null);
    },
    onSuccess: (data) => {
      setTokenData(data);
      setIsValid(true);
    },
    onError: (error) => {
      setOut(error.message);
      setIsValid(false);
    }
  });

  const handleVerify = () => {
    if (tokenNumber.trim()) {
      console.log("object")
      setload(true);
      checkToken(tokenNumber);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Token Verification</h2>
      
      <div className="mb-4">
        <label htmlFor="token-input" className="block text-sm font-medium text-gray-700 mb-1">
          Enter token to verify
        </label>
        <input
          id="token-input"
          type="text"
          value={tokenNumber}
          onChange={(e) => setToken(e.target.value)}
          className="w-full px-3 py-2 border text-amber-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your token"
        />
      </div>
      
      <button
        onClick={handleVerify}
        disabled={!tokenNumber.trim() || isLoading}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
        } disabled:bg-gray-300 disabled:cursor-not-allowed`}
      >
        {load ? 'Verifying...' : 'Verify Token'}
      </button>

      {/* Loading spinner - will definitely show */}
      {load && (
        <div className="flex justify-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      )}

      {/* Error message */}
      {out && <div className="mt-4 text-amber-600">{out}</div>}

      {/* Validation result */}
      {isValid !== null && (
        <div className={`mt-4 p-3 rounded-md ${
          isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isValid ? '✓ Token is valid' : '✗ Invalid token'}
        </div>
      )}

      {/* Token data display */}
      {tokenData && <Token fromAdmin={true} token={tokenData} data={tokenData}/>}
    </div>
  );
}

export default TokenVerify;