import { useEffect, useState } from 'react'
import classes from "./Footer.module.css";
import img1 from "../../assets/finalProject assets/images/google-play.png"
import img2 from "../../assets/finalProject assets/images/app-store.jpg";

export default function Footer() {

    return (
        <>

            <footer className="bg-gray-100 py-8 bottom-0 end-0 start-0">
                <div className="container mx-auto px-4 ">
                    {/* App Link Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-300 pb-6 mb-6">
                        <div className="text-center md:text-left mb-4 md:mb-0">
                            <h5 className="text-xl font-semibold text-gray-900">
                                Get the FreshCart app
                            </h5>
                            <p className="text-sm text-gray-600">
                                We will send you a link, open it on your phone to download the app.
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Email .."
                                className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                            <button className="bg-green-500 text-white px-3 py-2 rounded-lg mt-4 md:mt-0 md:ml-4">
                                Share App Link
                            </button>
                        </div>
                    </div>

                    {/* Payment Partners and App Store Links */}
                    <div className="flex flex-col md:flex-row justify-between items-center text-center">
                        <div className="mb-4 md:mb-0">
                            <p className="text-sm text-gray-600 font-semibold mb-2">
                                Payment Partners
                            </p>
                            <div className="flex justify-center space-x-4">

                                <li className="my-2 lg:my-0">
                                    <a href="" className="fab fa-brands fa-amazon-pay mx-2"></a>
                                    <a href="" className="fab fa-cc-amex mx-2"></a>
                                    <a href="" className="fab  fa-brands fa-cc-mastercard mx-2"></a>
                                    <a href="" className="fab fa-brands fa-paypal mx-2"></a>
                                </li>


                            </div>
                        </div>
                        <div className="text-center md:text-right">
                            <p className="text-sm text-gray-600 font-semibold mb-2">
                                Get deliveries with FreshCart
                            </p>
                            <div className="flex justify-center md:justify-end space-x-4">
                                <img
                                    src=
                                    {img2}
                                    alt="App Store"
                                    className="h-8"
                                />
                                <img
                                    src={img1}
                                    alt="Google Play"
                                    className="h-10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}