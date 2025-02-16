import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClientNote } from "@/types/client";
import { getUserFullNameFromCookie } from "@/utils/cookies";
import { formatDateToTimeZone } from "@/utils/formatting";
import { addAClientNote } from "@/utils/queries/client/createQueries";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ClientNotes = ({
    clientID,
    initialClientNotes,
}: {
    clientID: string;
    initialClientNotes: ClientNote[];
}) => {
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [clientNotes, setClientNotes] = useState<any>(initialClientNotes);

    const handleAddNote = async () => {
        setLoading(true);
        const response = await addAClientNote(clientID, {
            note: note,
            createdBy: getUserFullNameFromCookie(),
        });
        const newNote = {
            note: note,
            createdBy: getUserFullNameFromCookie(),
            createdAt: new Date().toISOString(),
        };
        if (response.status === 200) {
            toast.success("Note added", {
                position: "top-right",
                duration: 1500,
            });
            setClientNotes((prevNotes: any) => [...prevNotes, newNote]);
            setLoading(false);
            setNote("");
        } else {
            setLoading(false);
            toast.error("Failed to add note", {
                position: "top-right",
                duration: 1500,
            });
        }
    };
    return (
        <>
            <div className="grid grid-cols-4 gap-x-5">
                {clientNotes.length === 0 && (
                    <div className="col-span-4 flex items-center justify-center pt-4">
                        <div
                            role="alert"
                            className="rounded border-s-4 border-red-500 bg-red-50 p-4"
                        >
                            <strong className="block font-medium text-red-800">
                                {" "}
                                No Notes found for this client
                                {" "}
                            </strong>
                        </div>
                    </div>
                )}

                {clientNotes.map((note: any, index: number) => (
                    <div
                        key={index}
                        className="relative block overflow-hidden rounded-lg bg-slate-100 border border-gray-100 p-4 sm:p-6 lg:p-4"
                    >
                        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

                        <div className="mt-4">
                            <p className="text-pretty text-sm text-gray-500">{note.note}</p>
                        </div>

                        <div className="mt-6 gap-4 sm:gap-6 flex flex-row items-center space-x-6 justify-between">
                            <p className="text-xs text-gray-500">
                                {formatDateToTimeZone(note.createdAt)}
                            </p>
                            <p className="mt-1 text-xs font-medium text-gray-600">
                                By {note.createdBy}
                            </p>
                        </div>
                    </div>
                ))}

                <div className="col-span-4 flex flex-col items-center mt-2 space-y-3 justify-center">
                    <Input
                        disabled={loading}
                        value={note}
                        type="text"
                        className="w-full"
                        placeholder="Write Note Here...."
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNote(e.target.value)
                        }
                    />
                    <Button
                        onClick={handleAddNote}
                    >
                        Add Note
                    </Button>
                </div>

            </div>
        </>
    );
};

export default ClientNotes;
