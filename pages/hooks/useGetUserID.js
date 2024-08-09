import { useEffect, useState } from 'react';

export const useGetUserID = () => {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserID = window.localStorage.getItem("userID");
      setUserID(storedUserID);
    }
  }, []);

  return userID;
};
