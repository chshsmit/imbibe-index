import { useQuery } from "@tanstack/react-query";
import { Auth, User as FirebaseUser, signOut } from "firebase/auth";
import { GetUserResponseData } from "imbibe-index-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { ApiError } from "../../api/types";
import { auth } from "../../firebase";


interface UseAuthReturnValues {
  isSignedIn: boolean;
  pending: boolean;
  user: FirebaseUser;
  auth: Auth;
  userData: GetUserResponseData;
  logOut: () => void;
}


export function useAuth(): UseAuthReturnValues {
  const [authState, setAuthState] = useState<any>({
    isSignedIn: false,
    pending: true,
    user: null,
  });

  const { data: userData, refetch: refetchUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      setAuthState({ user, pending: false, isSignedIn: !!user });
      if (user) {
        const token = await user.getIdToken();
        console.log({token});
      }
      if (user) {
        refetchUser();
      }
    });

    return () => unregisterAuthObserver();
  }, [refetchUser]);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Error signing out", err);
      });
  };

  return { auth, ...authState, userData, logOut };
}

// --------------------------------------------------------------------------------

const useUser = () => {
  return useQuery<GetUserResponseData, ApiError>({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });
};

// --------------------------------------------------------------------------------

const fetchUser = async () => {
  const response = await axiosClient.get("/user");
  return response.data;
};