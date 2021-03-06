import {useState, useEffect} from "react";

export enum USE_FETCH_STATES {
    IDLE,
    SUCCESS,
    LOADING,
    ERROR
}

export function useFetch<D>(props: any, apiRequest : Function) {
    const [status, setStatus] = useState<USE_FETCH_STATES>(USE_FETCH_STATES.IDLE);
    const [data, setData] = useState<D | null>(null);

    useEffect(() => {
        if (!apiRequest) return;

        const load = async () => {
            setStatus(USE_FETCH_STATES.LOADING);
            const response = await apiRequest(props);
            const data = await response.json();
            setData(data.hits);
            setStatus(USE_FETCH_STATES.SUCCESS);
        };

        load();
    }, []);

    return { status, data };
};