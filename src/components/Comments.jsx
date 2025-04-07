"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Reply, ThumbsUp, ThumbsDown, Send, ChevronDown, ChevronUp } from "lucide-react"
import "../styles/Comments.css"

function Comments({ productId }) {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        name: "Emma Thompson",
        avatar: "https://via.placeholder.com/40",
      },
      date: "2023-11-15",
      text: "I absolutely love this chair! The craftsmanship is exceptional, and it fits perfectly in my living room. The wood finish is exactly as pictured, and it's very comfortable.",
      likes: 12,
      dislikes: 1,
      replies: [
        {
          id: 101,
          user: {
            name: "AC&MAD Support",
            avatar: "https://via.placeholder.com/40",
            isAdmin: true,
          },
          date: "2023-11-16",
          text: "Thank you for your kind words, Emma! We're thrilled to hear that you're enjoying your Artisan Chair. Feel free to share photos with us on social media!",
          likes: 3,
          dislikes: 0,
        },
      ],
      userRating: 5,
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "https://via.placeholder.com/40",
      },
      date: "2023-10-28",
      text: "The quality is good, but I was expecting the seat to be a bit more padded. It's still comfortable enough for short periods, but I wouldn't sit in it for hours. The design is beautiful though.",
      likes: 8,
      dislikes: 2,
      replies: [],
      userRating: 4,
    },
    {
      id: 3,
      user: {
        name: "Sarah Johnson",
        avatar: "https://via.placeholder.com/40",
      },
      date: "2023-09-14",
      text: "Delivery was quick and the chair came well-packaged. Assembly was straightforward. The only issue I had was a small scratch on one of the legs, but customer service was very helpful and sent a replacement part promptly.",
      likes: 15,
      dislikes: 0,
      replies: [],
      userRating: 4,
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [newRating, setNewRating] = useState(5)
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [showReplies, setShowReplies] = useState({})

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const newCommentObj = {
      id: comments.length + 1000,
      user: {
        name: "You", // In a real app, this would be the logged-in user
        avatar: "https://via.placeholder.com/40",
      },
      date: new Date().toISOString().split("T")[0],
      text: newComment,
      likes: 0,
      dislikes: 0,
      replies: [],
      userRating: newRating,
    }

    setComments([newCommentObj, ...comments])
    setNewComment("")
    setNewRating(5)
  }

  const handleAddReply = (commentId) => {
    if (!replyText.trim()) return

    const newReply = {
      id: Date.now(),
      user: {
        name: "You", // In a real app, this would be the logged-in user
        avatar: "https://via.placeholder.com/40",
      },
      date: new Date().toISOString().split("T")[0],
      text: replyText,
      likes: 0,
      dislikes: 0,
    }

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        }
      }
      return comment
    })

    setComments(updatedComments)
    setReplyingTo(null)
    setReplyText("")
  }

  const handleLike = (commentId, isReply = false, replyId = null) => {
    const updatedComments = comments.map((comment) => {
      if (isReply && comment.replies) {
        if (comment.id === commentId) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === replyId) {
              return { ...reply, likes: reply.likes + 1 }
            }
            return reply
          })
          return { ...comment, replies: updatedReplies }
        }
      } else if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 }
      }
      return comment
    })

    setComments(updatedComments)
  }

  const handleDislike = (commentId, isReply = false, replyId = null) => {
    const updatedComments = comments.map((comment) => {
      if (isReply && comment.replies) {
        if (comment.id === commentId) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === replyId) {
              return { ...reply, dislikes: reply.dislikes + 1 }
            }
            return reply
          })
          return { ...comment, replies: updatedReplies }
        }
      } else if (comment.id === commentId) {
        return { ...comment, dislikes: comment.dislikes + 1 }
      }
      return comment
    })

    setComments(updatedComments)
  }

  const toggleReplies = (commentId) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date) - new Date(a.date)
    } else if (sortBy === "oldest") {
      return new Date(a.date) - new Date(b.date)
    } else if (sortBy === "mostLiked") {
      return b.likes - a.likes
    } else if (sortBy === "highestRated") {
      return b.userRating - a.userRating
    } else if (sortBy === "lowestRated") {
      return a.userRating - b.userRating
    }
    return 0
  })

  const renderStars = (rating) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`star ${star <= rating ? "filled" : "empty"}`}>
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="comments-section">
      <h2>Customer Reviews</h2>

      <div className="comments-header">
        <div className="comments-count">
          {comments.length} {comments.length === 1 ? "Review" : "Reviews"}
        </div>
        <div className="comments-sort">
          <label htmlFor="sort-select">Sort by:</label>
          <select id="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="mostLiked">Most Liked</option>
            <option value="highestRated">Highest Rated</option>
            <option value="lowestRated">Lowest Rated</option>
          </select>
        </div>
      </div>

      <div className="add-comment-form">
        <h3>Write a Review</h3>
        <div className="rating-selector">
          <span>Your Rating:</span>
          <div className="star-rating-selector">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= newRating ? "filled" : "empty"}`}
                onClick={() => setNewRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <form onSubmit={handleAddComment}>
          <textarea
            placeholder="Share your thoughts about this product..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
          <motion.button
            type="submit"
            className="submit-comment-button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Post Review
          </motion.button>
        </form>
      </div>

      <div className="comments-list">
        {sortedComments.map((comment) => (
          <div className="comment" key={comment.id}>
            <div className="comment-header">
              <div className="comment-user">
                <img src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} className="user-avatar" />
                <div className="user-info">
                  <div className="user-name">
                    {comment.user.name}
                    {comment.user.isAdmin && <span className="admin-badge">Admin</span>}
                  </div>
                  <div className="comment-date">{formatDate(comment.date)}</div>
                </div>
              </div>
              {comment.userRating && <div className="user-rating">{renderStars(comment.userRating)}</div>}
            </div>

            <div className="comment-content">
              <p>{comment.text}</p>
            </div>

            <div className="comment-actions">
              <button className="action-button" onClick={() => handleLike(comment.id)}>
                <ThumbsUp size={16} />
                <span>{comment.likes}</span>
              </button>
              <button className="action-button" onClick={() => handleDislike(comment.id)}>
                <ThumbsDown size={16} />
                <span>{comment.dislikes}</span>
              </button>
              <button
                className="action-button"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              >
                <Reply size={16} />
                <span>Reply</span>
              </button>
            </div>

            {replyingTo === comment.id && (
              <div className="reply-form">
                <textarea
                  placeholder={`Reply to ${comment.user.name}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="reply-form-actions">
                  <button className="cancel-reply-button" onClick={() => setReplyingTo(null)}>
                    Cancel
                  </button>
                  <button
                    className="submit-reply-button"
                    onClick={() => handleAddReply(comment.id)}
                    disabled={!replyText.trim()}
                  >
                    <Send size={14} />
                    Reply
                  </button>
                </div>
              </div>
            )}

            {comment.replies && comment.replies.length > 0 && (
              <div className="comment-replies">
                <button className="toggle-replies-button" onClick={() => toggleReplies(comment.id)}>
                  {showReplies[comment.id] ? (
                    <>
                      <ChevronUp size={16} />
                      Hide {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} />
                      Show {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
                    </>
                  )}
                </button>

                {showReplies[comment.id] && (
                  <div className="replies-list">
                    {comment.replies.map((reply) => (
                      <div className="reply" key={reply.id}>
                        <div className="comment-header">
                          <div className="comment-user">
                            <img
                              src={reply.user.avatar || "/placeholder.svg"}
                              alt={reply.user.name}
                              className="user-avatar"
                            />
                            <div className="user-info">
                              <div className="user-name">
                                {reply.user.name}
                                {reply.user.isAdmin && <span className="admin-badge">Admin</span>}
                              </div>
                              <div className="comment-date">{formatDate(reply.date)}</div>
                            </div>
                          </div>
                        </div>

                        <div className="comment-content">
                          <p>{reply.text}</p>
                        </div>

                        <div className="comment-actions">
                          <button className="action-button" onClick={() => handleLike(comment.id, true, reply.id)}>
                            <ThumbsUp size={16} />
                            <span>{reply.likes}</span>
                          </button>
                          <button className="action-button" onClick={() => handleDislike(comment.id, true, reply.id)}>
                            <ThumbsDown size={16} />
                            <span>{reply.dislikes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments

