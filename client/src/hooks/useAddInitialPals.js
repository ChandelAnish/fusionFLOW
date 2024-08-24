import { useEffect } from "react";
import { palsSliceAction } from "../store/Pals";
import { useDispatch } from "react-redux";


export default function useAddInitialPals() {

    const dispatch = useDispatch();

    useEffect(() => {
        const addInitialPals = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
                    credentials: "include"
                });
                const initialPals = await response.json();
                if (initialPals.signin === false) {
                    // window.open('/signin', '_parent')
                    window.open('https://fusionflow-signin.onrender.com', '_parent')
                    return;
                }
                dispatch(palsSliceAction.addInitialPals(initialPals))
            } catch (error) {
                console.log("error occurred : ", error)
            }
        }
        addInitialPals()
    }, [])
}
