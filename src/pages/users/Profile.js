import { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { getRequest } from "../../utilities/requests";

const Dashboard = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const { isLoggedIn } = useToken();
  
    useEffect(() => {
      if (isLoggedIn) {
        const getCurrentUser = async () => {
          const res = await getRequest("users/myself");
          setCurrentUser(res.user);
        };
        getCurrentUser();
      } else {
        setCurrentUser(null)
      }
    }, [isLoggedIn]);
  


    return (
        <>Profile</>
    )    
}

export default Dashboard