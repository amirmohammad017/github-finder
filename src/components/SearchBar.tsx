import { ExternalLink, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { searchUsers } from "../api";
import type { GithubUser } from "../types/github";

type Props = {
  term: string;
  onTermChange: (term: string) => void;
  onSelect: (login: string) => void;
};

export function SearchBar({ term, onTermChange, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const query = useQuery({
    queryKey: ["user-suggestions", term.trim()],
    queryFn: () => searchUsers(term.trim()),
    enabled: term.trim().length > 1,
  });

  const showSuggestions = isOpen && term.trim().length > 1;

  return (
    <section className="search-panel">
      <label htmlFor="search">Search for a GitHub user</label>
      <div className="search-box">
        <Search size={20} />
        <input
          id="search"
          value={term}
          onChange={(e) => {
            onTermChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsOpen(false);
          }}
          placeholder="Try octocat, torvalds..."
        />
      </div>

      {showSuggestions && query.isFetching && (
        <p className="hint">Finding users…</p>
      )}

      {showSuggestions && query.data?.length ? (
        <div className="suggestions">
          {query.data.map((user: GithubUser) => (
            <button
              key={user.login}
              onClick={() => {
                onSelect(user.login);
                setIsOpen(false);
              }}
            >
              <img src={user.avatar_url} alt={user.login} />
              <span>
                <strong>{user.login}</strong>
                <small>{user.name || "GitHub user"}</small>
              </span>
              <ExternalLink size={16} />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
