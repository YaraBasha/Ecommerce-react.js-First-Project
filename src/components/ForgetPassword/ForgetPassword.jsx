import { useState } from 'react'
import { useFormik} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Link , useNavigate } from 'react-router-dom';


export default function ForgetPassword() {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); 

    const initialValues = {
        email: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
    });
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleForgetPassword,
    });


    async function handleForgetPassword(values) {
        console.log(values);
        setIsLoading(true);
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , values);
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
            



 <form className="max-w-sm mx-auto" onSubmit={formik.handleForgetPassword}>
<h1 className="text-center m-6 font-semibold">ForgotPassword?</h1>

      <label 
        htmlFor="email" 
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        	
Please enter your email address to Reset your Password.
      </label>
      
      <input
        type="email"
        id="email" name="email" 
        aria-describedby="helper-text-explanation"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="name@email.com"
      />

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
    

          

<Link to={"/resetPassword"}>
                <button
                    // disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                    className="btn btn-green m-4">
                    {isLoading ?
                    // <Link to={"/resetPassword"}>
                    
<i className="fas fa-spinner fa-spin"></i>
                        : "Send"}
                    
                 </button>       
                        </Link>
                
                 </form>

          </div> 
        </>
    );
}

