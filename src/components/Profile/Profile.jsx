import { useEffect, useState , useContext } from 'react'
import classes from "./Profile.module.css";
import { AuthContext } from '../../context/AuthContext';





export default function getProfile() {
    const { accessToken } = useContext(AuthContext);



    // useEffect(() => {
    //     accessToken && getProfile();
    // }, [accessToken]);





    return (
        <>
            <h1 className="bg-yellow-300">Profile</h1>
        </>
    )
}