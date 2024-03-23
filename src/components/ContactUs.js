import { useRef } from "react";

const ContactUs = () => {
    const inputEmail = useRef()
    return (
        <div>
            <div>
                <span>EMail</span>
                <input ref={inputEmail} onChange={() => console.log(inputEmail.current.value)} type="text" placeholder="Email" />
                
            </div>
          <div>
                <span>Phone Number</span>
                <input type="text" placeholder="Phone Number" />
                
            </div>
            <div>
                <span>Full Name</span>
                <input type="text" placeholder="Full Name" />
                
            </div>
        </div>
    )
}

export default ContactUs;