import { OnBoardingClientNoteType } from "@/types/onBoardingClients";
import { getUserFullNameFromCookie } from "@/utils/cookies";
import { addOnBoardingClientNote } from "@/utils/queries/onBoardingClient/createQueries";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField, Divider } from "@mui/material";
import { useState } from "react";
import { formatDateToTimeZone } from "@/utils/formatting";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

const LeadComment = ({
  onBoardingClientID,
  onBoardingClientNote,
}: {
  onBoardingClientID: string;
  onBoardingClientNote: OnBoardingClientNoteType[];
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newNote, setNewNote] = useState<string>("");
  const [notes, setNotes] =
    useState<OnBoardingClientNoteType[]>(onBoardingClientNote);

  const handleAddCommentToQuery = async () => {
    setLoading(true);
    const newNoteObject = {
      createdBy: getUserFullNameFromCookie(),
      note: newNote,
      createdAt: new Date().toISOString(),
    };
    const response = await addOnBoardingClientNote(
      onBoardingClientID,
      newNoteObject
    );
    if (response.status === 200) {
      toast.success("Comment has been created Successfully", {
        position: "top-right",
        duration: 1500
      });
      setNotes((prevNotes) => [...prevNotes, response.data?.data.data]);
      setNewNote("");
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
      <div className="col-span-full py-4 px-2 my-2 mx-2 rounded-lg">
        {notes.map((note, i) => (
          <div
            className={`col-span-full flex items-end pb-2 justify-start`}
            key={i}
          >
            <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {note.createdBy}
                </span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {formatDateToTimeZone(String(note.createdAt))}
                </span>
              </div>
              <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                {note.note}
              </p>
            </div>
          </div>
        ))}
        <div className="col-span-full">
          <div className="flex items-center space-x-2">
            <TextField
              variant="standard"
              sx={{ ml: 1, flex: 1 }}
              placeholder="Comment"
              inputProps={{ "aria-label": "comment" }}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setNewNote(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <LoadingButton
              loading={loading}
              onClick={handleAddCommentToQuery}
              sx={{
                p: "5px",
                backgroundColor: "#1b68cc",
                ":hover": {
                  backgroundColor: "#1b68cc",
                  opacity: 0.8,
                },
                border: 1,
                color: "#fff",
              }}
              aria-label="directions"
            >
              <Icon icon="heroicons:arrow-right" className="w-5 h-5" />
            </LoadingButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadComment;
