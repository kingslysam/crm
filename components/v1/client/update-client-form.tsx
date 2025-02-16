import { ClientResponseInterface } from "@/types/client";
import { useState } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { updateClient } from "@/utils/queries/client/updateQueries";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import HashLoader from "react-spinners/HashLoader";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Flag } from "@/components/svg";
import UpdateClientDateInput from "@/components/v1/client/update-client-date";


const UpdateClientForm = ({ client }: { client: ClientResponseInterface }) => {
    const [fullName, setFullName] = useState(client.fullName);
    const [companyName, setCompanyName] = useState(client.companyName);
    const [businessCategory, setBusinessCategory] = useState(
        client.businessCategory
    );
    const [emailUsedForComms, setEmailUsedForComms] = useState(
        client.emailUsedForComms
    );
    const [emailUsedForLogin, setEmailUsedForLogin] = useState(
        client.emailUsedForLogin
    );
    const [platform, setPlatform] = useState(client.platform);
    const [phoneNumber, setPhoneNumber] = useState(client.phoneNumber);
    const [address, setAddress] = useState(client.address);
    const [dateOnBoarded, setDateOnBoarded] = useState<Dayjs | null>(
        dayjs(client.dateOnBoarded)
    );
    const [tin, setTin] = useState(client.tin);
    const [vrn, setVrn] = useState(client.vrn);
    const [certificatePassword, setCertificatePassword] = useState(
        client.certificatePassword
    );
    const [isVip, setIsVip] = useState(client.isVip);
    const [isActivated, setIsActivated] = useState(client.isActivated);
    const [isBlocked, setIsBlocked] = useState(client.isBlocked);
    const [loading, setLoading] = useState<boolean>(false);

    const handleUpdateClient = async () => {
        setLoading(true);
        const response = await updateClient(client.clientID, {
            fullName,
            companyName,
            businessCategory,
            emailUsedForComms,
            emailUsedForLogin,
            platform,
            phoneNumber,
            address,
            dateOnBoarded: dateOnBoarded?.toDate(),
            tin,
            vrn,
            certificatePassword,
            isVip,
            isActivated,
            isBlocked,
        });
        if (response.status === 200) {
            toast.success("Client has been updated", {
                position: "top-right",
                duration: 1500,
            });
            window.location.reload();
        } else {
            setLoading(false);
            toast.error("Failed to updated a client", {
                position: "top-right",
                duration: 1500,
            });
        }
    };

    return (
        <>
            <div className="flex flex-wrap gap-x-5 gap-y-4 ">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Flag className="w-4 h-4 mr-2" />
                            Update Client Info
                        </Button>
                    </DialogTrigger>
                    <DialogContent size="5xl" overlayClass=" bg-gradient-to-b from-background/60 to-primary/30" className="overflow-y-auto h-[800px]  max-h-screen p-0 no-scrollbar">
                        <div className="flex-1 overflow-y-auto">
                            <div className="px-4 sm:px-6">
                                <div className="mt-1">
                                    <form className="mt-6 grid grid-cols-2 gap-5">
                                        <Input
                                            disabled={loading}
                                            label="Full Name"
                                            type="text"
                                            value={fullName}
                                            placeholder="Full name"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setFullName(e.target.value)
                                            }
                                            required
                                        />

                                        <Input
                                            required
                                            disabled={loading}
                                            label="Company Name"
                                            type="text"
                                            value={companyName}
                                            placeholder="Company Name"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setCompanyName(e.target.value)
                                            }
                                        />
                                        <Input
                                            required
                                            disabled={loading}
                                            label="Business Category"
                                            type="text"
                                            value={String(businessCategory)}
                                            placeholder="Business Category"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setBusinessCategory(e.target.value)
                                            }
                                        />
                                        <Input
                                            required
                                            disabled={loading}
                                            label="Email Used For Comms"
                                            type="email"
                                            value={String(emailUsedForComms)}
                                            placeholder="Email Used For Comms"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setEmailUsedForComms(e.target.value)
                                            }
                                        />
                                        <Input
                                            required
                                            disabled={loading}
                                            label="Email Used For Login"
                                            type="email"
                                            value={String(emailUsedForLogin)}
                                            placeholder="Email Used For Login"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setEmailUsedForLogin(e.target.value)
                                            }
                                        />

                                        <UpdateClientDateInput dateOnBoarded={dateOnBoarded?.toDate() || null}
                                            setDateOnBoarded={(date) =>
                                                setDateOnBoarded(date ? dayjs(date) : null)
                                            } />
                                        <Input
                                            required
                                            disabled={loading}
                                            label="Phone Number"
                                            type="text"
                                            value={String(phoneNumber)}
                                            placeholder="Phone Number"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setPhoneNumber(e.target.value)
                                            }
                                        />
                                        <Input
                                            label="Address"
                                            type="text"
                                            disabled={loading}
                                            value={String(address)}
                                            placeholder="Address"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setAddress(e.target.value)
                                            }
                                        />
                                        <Input
                                            label="Platform"
                                            type="text"
                                            disabled={loading}
                                            value={platform}
                                            placeholder="Platform"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setPlatform(e.target.value)
                                            }
                                        />
                                        <Input
                                            required
                                            label="TIN"
                                            type="text"
                                            value={String(tin)}
                                            disabled={loading}
                                            placeholder="TIN"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setTin(e.target.value)
                                            }
                                        />
                                        <Input
                                            label="VRN"
                                            type="number"
                                            value={String(vrn)}
                                            disabled={loading}
                                            placeholder="VRN"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setVrn(e.target.value)
                                            }
                                        />
                                        <Input
                                            required
                                            label="Certificate Password"
                                            type="text"
                                            disabled={loading}
                                            value={String(certificatePassword)}
                                            placeholder="Certificate Password"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setCertificatePassword(e.target.value)
                                            }
                                        />

                                        <div className="col-span-2 flex flex-row items-center justify-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <Switch
                                                    checked={isActivated}
                                                    onCheckedChange={(checked: boolean) =>
                                                        setIsActivated(checked)
                                                    }
                                                />

                                                <p className="mx-3 text-gray-500">Account Active</p>
                                            </div>

                                            <div className="flex flex-col items-center justify-center">
                                                <Switch
                                                    checked={isBlocked}
                                                    onCheckedChange={(checked: boolean) =>
                                                        setIsBlocked(checked)
                                                    }
                                                />

                                                <p className="mx-3 text-gray-500">Client Blocked</p>
                                            </div>

                                            <div className="flex flex-col items-center justify-center">
                                                <Switch
                                                    checked={isVip === "Yes"}
                                                    onCheckedChange={(checked: boolean) =>
                                                        setIsVip(checked ? "Yes" : "No")
                                                    }
                                                />

                                                <p className="mx-3 text-gray-500">VIP</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-center col-span-2 items-center my-3">
                                            {loading ? (
                                                <HashLoader />
                                            ) : (
                                                <Button
                                                    onClick={handleUpdateClient}
                                                >
                                                    <span>Update Client Information</span>
                                                </Button>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};

export default UpdateClientForm;
