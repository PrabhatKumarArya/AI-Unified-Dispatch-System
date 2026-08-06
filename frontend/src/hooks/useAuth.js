import { useAuthContext } from "../context/AuthContext";

/**
 * Hook to access auth state and actions from AuthContext
 */
export default function useAuth() {
  return useAuthContext();
}
