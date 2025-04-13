"use client"
import { createComment, deletePost, getPosts, toggleLike } from '@/actions/post.action';
import { useUser } from '@clerk/clerk-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

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
    };

    const handleAddComment = async ()=>{
        if(!newComment.trim() || isCommenting) return;
        try {
            setIsCommenting(true);
            const result =  await createComment(post.id, newComment);
            if(result?.success){
                toast.success("Comment posted successfully");
                setNewComment("");
            }
        } catch (error) {
            toast.error("Failed to add comment");
        } finally{
            setIsCommenting(false);
        }
    };

    const handleDeletePost = async ()=>{
        if(isDeleting) return;
        try {
            setIsDeleting(true);
            const result = await deletePost(post.id);
            if(result.success) toast.success("Post delete successfully");
            else throw new Error(result.error)
        } catch (error) {
            toast.error("Failed to delete post")
        } finally {
            setIsDeleting(false);
        }
    }
  return (
    <div>PostCard</div>
  )
}

export default PostCard