"use client"
import { getPosts, toggleLike } from '@/actions/post.action';
import { useUser } from '@clerk/clerk-react';
import React, { useState } from 'react'

type Posts =Awaited<ReturnType<typeof getPosts>>
type Post = Posts[number]


function PostCard({post, dbUserId}:{post:Post; dbUserId: String | null}) {
    const {user} = useUser();
    const [newComment, setNewComment] = useState("");
    const [isCommenting, setIsCommenting] = useState(false);
    const [isLiking, setIsLiking] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [hasLiked, setHasLiked] = useState(post.likes.some(like => like.userId === dbUserId));
    const [optimisticLikes, setOptimisticLikes] = useState(post._count.likes)


    const hndleLike = async ()=>{
        if(isLiking) return
        try {
            setIsLiking(true)
            setHasLiked(prev => !prev)
            setOptimisticLikes(prev => prev + (hasLiked ? -1 : 1))
            await toggleLike(post.id)
        
        } catch (error) {
            setOptimisticLikes(post._count.likes)
            setHasLiked(post.likes.some(like => like.userId === dbUserId))
        
        } finally{
            setIsLiking(false)
        }
    }

  return (
    <div>PostCard</div>
  )
}

export default PostCard