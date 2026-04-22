import { createContext, useContext, useEffect, useState } from "react";
import { observeAuthState } from "../firebase/auth";
import { getUserFromFirestore } from "../firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = observeAuthState(async (user) => {
      setCurrentUser(user);

      if (user) {
        const profile = await getUserFromFirestore(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}