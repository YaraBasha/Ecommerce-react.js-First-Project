import { createContext, useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";



export const AuthContext = createContext(null);

export default function AuthContextProvider({children}) {

    const [accessToken, setAccessToken] = useState(null)
console.log(accessToken);



useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

if (accessToken){
    setAccessToken(accessToken);
}
//     const decoded = jwtDecode(accessToken);

//     console.log(decoded.id);
// }

} , []);

    return( 
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
{children}
    </AuthContext.Provider>
    ); 
}