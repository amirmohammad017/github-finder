import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser, isFollowing } from "./api";
import { useRecentUsers } from "./hooks/useRecentUsers";
import { useGithubMutations } from "./hooks/useGithubMutations";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { RecentSearches } from "./components/RecentSearches";
import { ProfileCard } from "./components/ProfileCard";
import { EmptyState } from "./components/EmptyState";
import { Footer } from "./components/Footer";

function App() {
  const { recentUsers, addRecentUser } = useRecentUsers();
  const [term, setTerm] = useState("");
  const [selected, setSelected] = useState("");
  
  const canMutate = Boolean(import.meta.env.VITE_GITHUB_TOKEN);

  const profile = useQuery({
    queryKey: ["user", selected],
    queryFn: () => getUser(selected),
    enabled: Boolean(selected),
  });

  const following = useQuery({
    queryKey: ["following", selected],
    queryFn: () => isFollowing(selected),
    enabled: Boolean(selected) && canMutate,
  });

  const mutations = useGithubMutations(selected);

  const selectUser = (login: string) => {
    setSelected(login);
    setTerm(login);
    addRecentUser(login);
  };

  useEffect(() => {
    if (recentUsers[0] && !selected) setSelected(recentUsers[0]);
  }, [recentUsers, selected]);

  return (
    <main className="shell">
      <Header />
      <SearchBar
        term={term}
        onTermChange={(value) => {
          setTerm(value);
          if (!value.trim()) setSelected("");
        }}
        onSelect={selectUser}
      />
      <div className="content">
        <RecentSearches
          users={recentUsers}
          selected={selected}
          onSelect={selectUser}
        />
        <section className="result">
          {profile.isLoading && (
            <div className="card loading">Loading profile…</div>
          )}
          {profile.isError && (
            <div className="card error">
              Could not load this profile. Check the username and try again.
            </div>
          )}
          {profile.data && (
            <ProfileCard
              user={profile.data}
              following={following.data}
              canMutate={canMutate}
              busy={mutations.isBusy}
              onToggleFollow={() =>
                following.data
                  ? mutations.unfollow.mutate()
                  : mutations.follow.mutate()
              }
            />
          )}
          {!selected && !profile.isLoading && <EmptyState />}
        </section>
      </div>
      <Footer />
    </main>
  );
}
export default App;
