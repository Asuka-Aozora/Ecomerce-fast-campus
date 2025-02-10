import { axiosInstance } from "@/lib/axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useHydration = () => {
    const dispatch = useDispatch();
    const [isHydrated, setIsHydrated] = useState(false)

  const hydrateAuth = async () => {
    try {
      const currentUser = localStorage.getItem("current-user");
  
      if (!currentUser) return;
  
      const userResponse = await axiosInstance.get(`/users/${currentUser}`)
  
      dispatch({
        type: "USER_LOGIN",
        payload: {
          username: userResponse.data.username,
          id: userResponse.data.id,
          role: userResponse.data.role,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsHydrated(true)
    }
  };

  useEffect(() => {
    hydrateAuth()
  })

  return {
    isHydrated,
  }
}