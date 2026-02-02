import { useEffect, useState } from "react";

export const useFetch = (fetchFn) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchFn()
        .then((res) => setData(res.data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }, []);

    return { data, loading, error, setData };
};