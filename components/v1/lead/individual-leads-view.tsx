'use client';

import React, { useEffect, useState } from "react";
import { getUserFullNameFromCookie } from "@/utils/cookies";
import MuiPhoneNumber from "mui-phone-number";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
    actionTakenOptions,
    clientRequestOptions,
    iSVipOptions,
    internalReferralOptions,
    locationOptions,
    platformOptions,
    progressOptions,
    reasonOptions,
    socialMediaOptions,
    statusOptions,
    zonesOptions,
} from "@/data/option";

import { LeadResponseType } from "@/types/lead";
import { updateALead } from "@/utils/queries/lead/updateQueries";
import { MenuProps, getStyles } from "@/utils/inputOptions";
import { FormControl, InputLabel, SelectChangeEvent, MenuItem, Select, useTheme } from "@mui/material";
import theme from "quill/core/theme";

interface FormData {
    fullName: string;
    company: string;
    tin: string;
    email: string;
    phone: string;
    location: string;
    leadZone: string;
    clientRequest: string;
    reasons: string;
    actionTaken: string;
    progress: string;
    status: string;
    platform: string;
    socials: string;
    iSVip: string;
    internalReferral: string;
    externalReferral: string;
    event: string;
}

const IndividualLeadView = ({ lead }: { lead: LeadResponseType }) => {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        company: "",
        tin: "",
        email: "",
        phone: "",
        location: "",
        leadZone: "",
        clientRequest: "",
        reasons: "",
        actionTaken: "",
        progress: "",
        status: "",
        platform: "",
        socials: "",
        iSVip: "",
        internalReferral: "",
        externalReferral: "",
        event: "",
    });

    useEffect(() => {
        if (lead) {
            setFormData({
                fullName: lead.fullName || "",
                company: lead.companyName || "",
                tin: lead.tin || "",
                email: lead.emailAddress || "",
                phone: lead.phoneNumber || "",
                location: lead.location || "",
                leadZone: lead.zone || "",
                clientRequest: lead.clientRequest || "",
                reasons: lead.reasons || "",
                actionTaken: lead.actionTaken || "",
                progress: lead.progress || "",
                status: lead.status || "",
                platform: lead.platform || "",
                socials: lead.specificPlatform || "",
                iSVip: lead.vip || "",
                internalReferral: "",
                externalReferral: "",
                event: "",
            });
        }
    }, [lead]);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const onPhoneNumberChanged = (value: string | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const phoneNumber = typeof value === 'string' ? value : value.target.value;
        handleInputChange('phone', phoneNumber);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await updateALead({
                leadID: lead.leadID,
                fullName: formData.fullName,
                companyName: formData.company,
                tin: formData.tin,
                emailAddress: formData.email,
                phoneNumber: formData.phone,
                location: formData.location,
                clientRequest: formData.clientRequest,
                reasons: formData.reasons,
                actionTaken: formData.actionTaken,
                progress: formData.progress,
                status: formData.status,
                platform: formData.platform,
                zone: formData.leadZone,
                specificPlatform: getPlatformSpecificValue(),
                vip: formData.iSVip,
                updatedBy: getUserFullNameFromCookie(),
            });

            if (response.status === 200) {
                toast.success("Lead has been successfully updated", {
                    position: "top-right",
                    duration: 1500,
                });
                window.location.reload();
            } else {
                throw new Error("Failed to update lead");
            }
        } catch (error) {
            toast.error("Lead could not be updated", {
                position: "top-right",
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    const getPlatformSpecificValue = () => {
        switch (formData.platform) {
            case "Social Media":
                return formData.socials;
            case "Internal Referral":
                return formData.internalReferral;
            case "External Referral":
                return formData.externalReferral;
            case "Events":
                return formData.event;
            default:
                return "";
        }
    };

    const renderPlatformSpecificField = () => {
        switch (formData.platform) {
            case "Social Media":
                return (
                    <div>
                        <FormControl>
                            <InputLabel className="form-label" htmlFor="socials">
                                Social Media Platform
                            </InputLabel>
                            <Select
                                fullWidth
                                value={formData.socials}
                                label="Social Media Platform"
                                onChange={(e: SelectChangeEvent) => {
                                    handleInputChange('socials', e.target.value);
                                }}
                                id="socials"
                                MenuProps={MenuProps}
                            >
                                {socialMediaOptions.map((socials) => (
                                    <MenuItem
                                        key={socials}
                                        value={socials}
                                        style={getStyles(socials, socialMediaOptions, theme)}
                                    >
                                        {socials}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                );

            case "Internal Referral":
                return (
                    <div>
                        <FormControl>
                            <InputLabel
                                className="form-label"
                                htmlFor="internalReferral"
                            >
                                Internal Referral
                            </InputLabel>
                            <Select
                                fullWidth
                                value={formData.internalReferral}
                                label="Internal Referral"
                                onChange={(e: SelectChangeEvent) => {
                                    handleInputChange("internalReferral", e.target.value);
                                }}
                                id="internalReferral"
                                MenuProps={MenuProps}
                            >
                                {internalReferralOptions.map((internal) => (
                                    <MenuItem
                                        key={internal}
                                        value={internal}
                                        style={getStyles(
                                            internal,
                                            internalReferralOptions,
                                            theme
                                        )}
                                    >
                                        {internal}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                );

            case "External Referral":
                return (
                    <Input
                        id="externalReferral"
                        label="External Referral"
                        value={formData.externalReferral}
                        onChange={(e) => handleInputChange("externalReferral", e.target.value)}
                    />
                );

            case "Events":
                return (
                    <Input
                        id="event"
                        label="Event"
                        value={formData.event}
                        onChange={(e) => handleInputChange("event", e.target.value)}
                    />
                );

            default:
                return null;
        }
    };


    return (
        <div className="content-box">
            <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 h-fit grid-cols-1 gap-3 md:gap-5 pt-5 my-0 md:mb-10">
                    <Input
                        label="Name"
                        type="text"
                        placeholder="Full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        required
                    />

                    <Input
                        label="Company"
                        type="text"
                        placeholder="Company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                    />

                    <Input
                        label="TIN"
                        type="number"
                        placeholder="TIN"
                        value={formData.tin}
                        onChange={(e) => handleInputChange("tin", e.target.value)}
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                    />

                    <MuiPhoneNumber
                        defaultCountry="tz"
                        regions={"africa"}
                        variant="outlined"
                        label="Phone Number"
                        focused
                        value={formData.phone}
                        onChange={onPhoneNumberChanged}
                    />

                    <FormControl>
                        <InputLabel className="form-label" htmlFor="clientLocation">
                            Client Location
                        </InputLabel>
                        <Select
                            fullWidth
                            label="Client Location"
                            value={formData.location}
                            onChange={(e: SelectChangeEvent) => {
                                handleInputChange('location', e.target.value);
                            }}
                            id="clientLocation"
                            MenuProps={MenuProps}
                        >
                            {locationOptions.map((location) => (
                                <MenuItem
                                    key={location}
                                    value={location}
                                    style={getStyles(location, locationOptions, theme)}
                                >
                                    {location}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                    <FormControl>
                        <InputLabel className="form-label" htmlFor="leadZone">
                            Lead Zone
                        </InputLabel>
                        <Select
                            fullWidth
                            label="Lead Zone"
                            value={formData.leadZone}
                            onChange={(e: SelectChangeEvent) => {
                                handleInputChange('leadZone', e.target.value);
                            }}
                            id="leadZone"
                            MenuProps={MenuProps}
                        >
                            {zonesOptions.map((zone) => (
                                <MenuItem
                                    key={zone}
                                    value={zone}
                                    style={getStyles(zone, zonesOptions, theme)}
                                >
                                    {zone}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel className="form-label" htmlFor="clientRequest">
                            Client Request
                        </InputLabel>
                        <Select
                            required
                            fullWidth
                            value={formData.clientRequest}
                            label="Client Request"
                            onChange={(e: SelectChangeEvent) => {
                                handleInputChange('clientRequest',e.target.value);
                            }}
                            id="clientRequest"
                            MenuProps={MenuProps}
                        >
                            {clientRequestOptions.map((request) => (
                                <MenuItem
                                    key={request}
                                    value={request}
                                    style={getStyles(request, clientRequestOptions, theme)}
                                >
                                    {request}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel className="form-label" htmlFor="reasons">
                            Reasons
                        </InputLabel>
                        <Select
                            required
                            fullWidth
                            value={formData.reasons}
                            label="Reasons"
                            onChange={(e: SelectChangeEvent) => {
                                handleInputChange('reasons',e.target.value);
                            }}
                            id="reasons"
                            MenuProps={MenuProps}
                        >
                            {reasonOptions.map((reasons) => (
                                <MenuItem
                                    key={reasons}
                                    value={reasons}
                                    style={getStyles(reasons, reasonOptions, theme)}
                                >
                                    {reasons}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel className="form-label" htmlFor="actionTaken">
                            Action Taken
                        </InputLabel>
                        <Select
                            required
                            fullWidth
                            value={formData.actionTaken}
                            label="Action Taken"
                            onChange={(e: SelectChangeEvent) => {
                                handleInputChange('actionTaken',e.target.value);
                            }}
                            id="actionTaken"
                            MenuProps={MenuProps}
                        >
                            {actionTakenOptions.map((actionTaken) => (
                                <MenuItem
                                    key={actionTaken}
                                    value={actionTaken}
                                    style={getStyles(actionTaken, actionTakenOptions, theme)}
                                >
                                    {actionTaken}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel className="form-label" htmlFor="progress">
                            Progress
                        </InputLabel>
                        <Select
                            fullWidth
                            value={formData.progress}
                            label="Progress"
                            onChange={(e: SelectChangeEvent) => {
                                handleInputChange('progress',e.target.value);
                            }}
                            id="progress"
                            MenuProps={MenuProps}
                        >
                            {progressOptions.map((progress) => (
                                <MenuItem
                                    key={progress}
                                    value={progress}
                                    style={getStyles(progress, progressOptions, theme)}
                                >
                                    {progress}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel className="form-label" htmlFor="status">
                            Status
                        </InputLabel>
                        <Select
                            fullWidth
                            value={formData.status}
                            label="Status"
                            onChange={(e: SelectChangeEvent) => {
                                handleInputChange('status',e.target.value);
                            }}
                            id="status"
                            MenuProps={MenuProps}
                        >
                            {statusOptions.map((status) => (
                                <MenuItem
                                    key={status}
                                    value={status}
                                    style={getStyles(status, statusOptions, theme)}
                                >
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel className="form-label" htmlFor="platform">
                            Platform
                        </InputLabel>
                        <Select
                            fullWidth
                            required
                            value={formData.platform}
                            label="Platform"
                            onChange={(e: SelectChangeEvent) => {
                                handleInputChange('platform',e.target.value);
                            }}
                            id="platform"
                            MenuProps={MenuProps}
                        >
                            {platformOptions.map((platform) => (
                                <MenuItem
                                    key={platform}
                                    value={platform}
                                    style={getStyles(platform, platformOptions, theme)}
                                >
                                    {platform}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {renderPlatformSpecificField()}

                    <FormControl>
                        <InputLabel className="form-label" htmlFor="vip">
                            VIP
                        </InputLabel>
                        <Select
                            fullWidth
                            required
                            value={formData.iSVip}
                            label="VIP"
                            onChange={(e: SelectChangeEvent) => {
                                handleInputChange('iSVip',e.target.value);
                            }}
                            id="vip"
                            MenuProps={MenuProps}
                        >
                            {iSVipOptions.map((isvip) => (
                                <MenuItem
                                    key={isvip}
                                    value={isvip}
                                    style={getStyles(isvip, iSVipOptions, theme)}
                                >
                                    {isvip}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className="flex justify-end pt-5">
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <HashLoader size={30} />
                        </div>
                    ) : (
                        <Button type="submit">
                            <span>Update Lead</span>
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default IndividualLeadView;