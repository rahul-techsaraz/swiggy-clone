import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    return (
        <>
             <div>This path is not found</div>
        <h1>{error.status}: {error.statusText}</h1>
        </>
       
    )
}
export default Error;