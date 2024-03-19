import { useEffect,useState } from "react";

const User = (props) => {
    const [count, setCount] = useState(0)
    const [count1,setCount1]=useState(0)
    
    const fetch = () => {
    console.log('fetch')
    }
     const fetch1 = () => {
    console.log('fetch')
}
    
    useEffect(() => {
       const timer = setInterval(() => {
           console.log('setInterval')
       }, 1000)
        //Unmount
        
        return () => {
            clearInterval(timer)
        }
    }, [])
    useEffect(() => {
        fetch1();
    },[count1])
   
    return (
        <div className="user-card">
            <h3>{props.name}</h3>
            <h4>User Location</h4>
            <h5>Contacts</h5>
        </div>
    )
}
export default User;