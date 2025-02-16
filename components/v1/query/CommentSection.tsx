import { Comment } from "@/types/clientQuery";
import { TextField, Button } from "@mui/material";
import {
  addACommentToQuery,
  getASingleClientQueries,
} from "@/utils/queries/clientQuery/clientQueries";
import { useEffect, useState } from "react";
import { getUserFullNameFromCookie } from "@/utils/cookies";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import { SendIcon } from "lucide-react";

const CommentSection = ({
  queryID,
  initialComments,
  createdBy,
}: {
  queryID: number;
  initialComments: Comment[];
  createdBy: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>(initialComments);


  const handleAddCommentToQuery = async () => {
    setLoading(true);
    const commentData: any = {
      commentDate: new Date(),
      commentedBy: getUserFullNameFromCookie(),
      commentText: newComment,
    };
    const response = await addACommentToQuery(queryID, commentData);
    if (response.status === 200) {
      toast.success("Comment has been created Successfully", {
        position: "top-right",
        duration: 1500,
      });
      setComments((prevComments) => [...prevComments, response.data.data]);
      setNewComment("");
      setLoading(false);
    } else {
      toast.error("Failed to upload a comment", {
        position: "top-right",
        duration: 1500
      });
      setLoading(false);
    }
  };
  return (
    <>
      <div className="col-span-full py-4 px-2 bg-white rounded-lg">
        {comments.map((comment, i) => (
          <div
            className={`col-span-full flex items-end pb-2 ${
              comment.commentedBy === createdBy
                ? "justify-start"
                : "justify-end"
            }`}
            key={i}
          >
            <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {comment.commentedBy}
                </span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {new Date(comment.commentDate).toLocaleString()}
                </span>
              </div>
              <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                {comment.commentText}
              </p>
            </div>
          </div>
        ))}
        <div className="col-span-full">
          <p className="text-sm font-bold">Comments</p>
          <div className="flex">
            <TextField
              id="standard-multiline-static"
              fullWidth
              variant="standard"
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setNewComment(e.target.value)}
            />
            <LoadingButton
              loading={loading}
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleAddCommentToQuery}
            >
              Add
            </LoadingButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentSection;
