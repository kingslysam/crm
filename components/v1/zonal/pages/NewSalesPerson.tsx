import { zonesOptions } from "@/data/option";
import { salesPersonSchema } from "@/schema/salesPerson";
import { MenuProps, getStyles } from "@/utils/inputOptions";
import { createASalesPerson } from "@/utils/queries/users/createQueries";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import MuiPhoneNumber from "mui-phone-number";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import { getUserFullNameFromCookie } from "@/utils/cookies";

interface NewSalesPersonInterface {
  fullName: string;
  emailAddress: string;
  phoneNumber?: string | null;
  nida: string;
  target: number;
  address?: string | null;
}

const NewSalesPerson = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue: setFormValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(salesPersonSchema),
  });
  const theme = useTheme();
  const [date, setDate] = useState<Dayjs>(dayjs(new Date()));
  const [leadZone, setLeadZone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)
    const [isManager, setIsManager] = useState(false);


  const onPhoneNumberChanged = (phoneNumber: any) => {
    setFormValue("phoneNumber", phoneNumber);
  };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsManager(event.target.checked);
    };

  const onSubmit = async (data: NewSalesPersonInterface) => {
    setLoading(true)
    const response = await createASalesPerson({
      fullName: watch("fullName"),
      email: watch("emailAddress"),
      phoneNumber: watch("phoneNumber"),
      nida: watch("nida"),
      addedBy: getUserFullNameFromCookie(),
      target: Number(watch("target")),
      zone: leadZone,
      address: watch("address"),
      dateOfBirth: date.toISOString(),
      isActivated: true,
      isManager: false,
    });
    if (response.status === 200) {
      window.alert(`Sales person has been successfully registered this is your passkey ${response.data.data.passkey} it will be used to login form now on`)
      
       toast.success("Sales Person has been successfully added", {
         position: "top-right",
         autoClose: 1500,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
       setLoading(false)
      //  window.location.reload();
    } else {
      toast.error("Sales Person could not be added", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="content-box">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 h-fit grid-cols-1 gap-3 md:gap-5 pt-5 my-0 md:mb-10">
              <DatePicker
                label="Date of Birth"
                className="w-full"
                value={date}
                onChange={(newDate: any) => setDate(newDate)}
                slotProps={{ textField: { size: "medium" } }}
              />
              <TextField
                label="Full Name"
                type="text"
                placeholder="Full name"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                {...register("fullName")}
              />
              <TextField
                label="Address"
                type="text"
                placeholder="address"
                error={!!errors.address}
                helperText={errors.address?.message}
                {...register("address")}
              />
              <TextField
                label="NIDA"
                type="text"
                placeholder="NIDA"
                error={!!errors.nida}
                helperText={errors.nida?.message}
                {...register("nida")}
              />
              <TextField
                label="Email"
                type="email"
                placeholder="Email"
                error={!!errors.emailAddress}
                helperText={errors.emailAddress?.message}
                {...register("emailAddress")}
              />
              <TextField
                label="Target"
                type="number"
                placeholder="Target"
                error={!!errors.target}
                helperText={errors.target?.message}
                {...register("target")}
              />
              <div>
                <InputLabel className="form-label" htmlFor="leadZone">
                  Lead Zone
                </InputLabel>
                <Select
                  fullWidth
                  label="Lead Zone"
                  value={leadZone}
                  onChange={(e: SelectChangeEvent) => {
                    setLeadZone(e.target.value);
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
              </div>
              <MuiPhoneNumber
                defaultCountry="tz"
                regions={"africa"}
                variant="outlined"
                label="Phone Number"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                onChange={onPhoneNumberChanged}
              />
              <div>
                <FormControlLabel
                  value="end"
                  control={
                    <Checkbox
                      checked={isManager}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Make Manager"
                  labelPlacement="end"
                />
              </div>
            </div>
            <LoadingButton
              endIcon={<SendIcon />}
              type="submit"
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Save</span>
            </LoadingButton>
          </form>
        </div>
      </div>
    </>
  );
};
export default NewSalesPerson;
