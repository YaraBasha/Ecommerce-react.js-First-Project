import { useContext, useState } from 'react'
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';



export default function Checkout() {


    const { getPayment, cartId } = useContext(CartContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setAccessToken } = useContext(AuthContext);
    const [payOnline, setPayOnline] = useState(false);
    const { accessToken } = useContext(AuthContext);



    const initialValues = {
        details: "",
        phone: "",
        city: "",
    };



    const formik = useFormik({
        initialValues,
        onSubmit: handleCheckout,

    });




    async function handleCheckout(values) {
        console.log("submit", values);
        console.log(cartId);        
        try {
            const url = payOnline ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173` : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`
            const res = await getPayment(url, values);
            if(payOnline === true) {
                console.log("hello from pay now")
                setTimeout(() => {
                    window.location.href = res.session.url;
                }, 2000)
            }
            else {
                console.log("Hello from cash order!")
                toast.success("payment done successfully")
                setTimeout(() => {
                    navigate("/allorders");
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
        {console.log(payOnline)}
            <section className="h-screen container mt-14 pt-16">
            <div className="max-w-xl mx-auto">
                <h1 className="text-lg font-bold mb-8">Checkout:</h1>
            

            <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">


                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="details"
                        id="details"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.details}
                    />
                    <label
                        htmlFor="details"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Enter Your Details:
                    </label>

                </div>





                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="city"
                        id="city"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                    />
                    <label
                        htmlFor="city"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        City:
                    </label>

                </div>





                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                    />
                    <label
                        htmlFor="phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Enter Your Phone Number:
                    </label>

                </div>




                {formik.isValid}

                {formik.dirty}


                <input
                    type="checkbox"
                    name=""
                    id="payOnline"
                    onClick={() => setPayOnline(!payOnline)} />
                <label htmlFor="payOnline">
                    Pay Now
                </label>



                <button
                    type="submit"
                    className="btn btn-green w-full mt-2">

                    {/* <i className="fas fa-spinner fa-spin"></i> */}
                    {payOnline ? 'Pay Now' : 'Complete Order'}
                </button>
            </form></div></section>
        </>
    )
}

