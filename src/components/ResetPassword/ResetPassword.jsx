import { useEffect, useState } from 'react'
import classes from "./ResetPassword.module.css";
import { useFormik} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Link , useNavigate } from 'react-router-dom';


export default function ResetPassword() {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); 

    const initialValues = {
        email: "",
        newPassword: "",
    };

   const validationSchema = Yup.object({
    

        email: Yup.string()
            .email().required(),

        newPassword: Yup.string()
            .min(3)
            .max(8)
            .matches(/^[A-Z][a-z0-9]{3,8}$/, "password is incorrect")
            .required(),
    });
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleResetPassword,
    });


    async function handleResetPassword(values) {
        console.log(values);
        setIsLoading(true);
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , values);
            console.log(data);
             navigate('/resetPassword', { state: { token: data.token } });
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message)
        } finally {
            setIsLoading(false);
        }
        
    }

    return (
        <>
        <div className="container">
            



 <form className="max-w-sm mx-auto" onSubmit={formik.handleResetPassword}>
<h1 className="text-center m-6 font-semibold">Reset Your password:</h1>

       <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    <label
                        htmlFor="email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Email:
                    </label>
                    {formik.errors.email && formik.touched.email && (<span className="text-red-600">{formik.errors.email}</span>)}
                </div>


      <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    <label
                        htmlFor="password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        New Password
                    </label>
                    {formik.errors.password && formik.touched.password && (<span className="text-red-600">{formik.errors.password}</span>)}

                                </div>

      <p
        id="helper-text-explanation"
        className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        We’ll never share your details. Read our 
        <a 
          href="#"
          className="font-medium text-blue-600 hover:underline dark:text-blue-500">
          Privacy Policy
        </a>.
      </p>
    

          

<Link to={"/login"}>
                <button
                    // disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                    className="btn btn-green m-4">
                    {isLoading ?
                    // <Link to={"/resetPassword"}>
                    
<i className="fas fa-spinner fa-spin"></i>
                        : "Reset"}
                    
                 </button>       
                        </Link>
                
                 </form>

          </div> 
        </>
    );
}