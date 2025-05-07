import ProfileForm from "@/components/profile/ProfileForm";
import CircularIndeterminate from "@/components/spinner";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileView() {
    const { data, isLoading } = useAuth()
    if (isLoading) return <CircularIndeterminate />
    if (data) return <ProfileForm data={data} />
}
