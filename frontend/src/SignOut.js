import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const SignOut = ({setUser}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        localStorage.removeItem("authToken"); // Unset token
        navigate("/"); // Navigate to the login page
        setIsLoading(false);
    }, [navigate]);

    setUser(null);

    // Render loading spinner if isLoading is true, otherwise render nothing
    return isLoading ? <div>Loading...</div> : null;
};

export default SignOut;
