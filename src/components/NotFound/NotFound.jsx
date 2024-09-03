
import notFound from "../../assets/finalProject assets/404.png"




export default function NotFound() {

    return (
        <>
        <section className="container h-screen mt-72">
                <img src={notFound} alt="" className="object-fit"></img>
            </section>
        </>
    )
}