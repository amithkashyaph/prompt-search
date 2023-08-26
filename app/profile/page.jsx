"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


import Profile from "@components/Profile";

const MyProfile = () => {

  const { data : session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
        const resposne = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await resposne.json();
        setPosts(data);
      };
      if(session?.user.id) {
        fetchPosts();
      }
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you wanto to delete?");

    if(hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE"
        });

        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile 
        name="My"
        desc= "Welcome to your personalized profile"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />

  )
}

export default MyProfile