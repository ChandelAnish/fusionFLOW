import { useEffect } from "react";
import { palsSliceAction } from "../store/Pals";
import { useDispatch } from "react-redux";


export default function useAddInitialPals() {

    const dispatch = useDispatch();

    useEffect(() => {
        const addInitialPals = async () => {
            try {
                const response = await fetch("http://localhost:5000/users", {
                    credentials: "include"
                });
                const initialPals = await response.json();
                if (initialPals.signin === false) {
                    window.open('/signin', '_parent')
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
