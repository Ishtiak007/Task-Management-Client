import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useTasks = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()

    const { data: tasks, refetch, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tasks/${user?.email}`)
            return res.data
        }
    })
    return { tasks, refetch, isLoading }
};
export default useTasks;