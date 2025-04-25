import { getUser } from "@/services/AuthService"
import { useQuery } from "@tanstack/react-query"


export const useAuth = () => {
    const {data, isError, isLoading} = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false, //se le puede poner 1 tmb para q intente una vez mas
        refetchOnWindowFocus: false
    })
    return {data, isError, isLoading}
}