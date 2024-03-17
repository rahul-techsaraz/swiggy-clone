import { useEffect, useState } from "react";

const useStatusOnline = () => {
    const [onlineStatus, setOnlineStatus] = useState(true);
    useEffect(() => {
        console.log('onlineStatus')
        window.addEventListener('offline', () => setOnlineStatus(false))
      window.addEventListener('online',() => setOnlineStatus(true))
        
    },[onlineStatus])


    return onlineStatus;
}

export default useStatusOnline;