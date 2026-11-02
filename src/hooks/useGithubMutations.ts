import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { followUser, unfollowUser } from "../api";

export function useGithubMutations(login: string) {
  const queryClient = useQueryClient();
  
  const onSuccess = (message: string) => {
    toast.success(message);
    queryClient.invalidateQueries({ queryKey: ["following", login] });
  };

  const follow = useMutation({
    mutationFn: () => followUser(login),
    onSuccess: () => onSuccess(`You are now following ${login}`),
    onError: (error: Error) => toast.error(error.message),
  });

  const unfollow = useMutation({
    mutationFn: () => unfollowUser(login),
    onSuccess: () => onSuccess(`You no longer follow ${login}`),
    onError: (error: Error) => toast.error(error.message),
  });

  return { follow, unfollow, isBusy: follow.isPending || unfollow.isPending };
}
