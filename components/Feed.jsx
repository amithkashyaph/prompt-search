"use client";

import { useState, useEffect } from "react";
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {
        data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      }
    </div>
  )
};


function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const resposne = await fetch("/api/prompt");
      const data = await resposne.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {

  }

  const handleTagClick = async (tag) => {
    
    setTag(tag);

    try {
      const response = await fetch(`/api/prompt?tag=${tag}`);
      const data = await response.json();

      console.log("data : ", data);
      setPosts(data);
    } catch (error) {
      console(error);
    }
    setTag("");
  }

  return (
   <section className="feed">
    <form className="relative w-full flec-center">
      <input
        type="text"
        placeholder="Enter a tagname or username for searching"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer"
      />
    </form>
    <PromptCardList
      data={posts}
      handleTagClick={handleTagClick} 
    />
   </section>
  )
}

export default Feed