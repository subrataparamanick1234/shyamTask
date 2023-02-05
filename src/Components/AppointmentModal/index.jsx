import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, getSlotList } from "../../redux/dashboardSlice";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

export const AppointmentModal = ({ setOpenModal, openModal, clinicID }) => {
  const dispatch = useDispatch();
  const { getAllSlotList, isSlotMsg } = useSelector((store) => store.dashboard);
  const [slotDate, setSlotDate] = useState(null);
  const [valueSelect, setValueSelect] = useState(null);
  const [selectSlot, setSelectSlot] = useState(null);
  const [selectMember, setSelectMember] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getAllSlot() {
      let formData = new FormData();
      formData.append("doctor_id", 14);
      formData.append("date", dayjs(slotDate).format("YYYY-MM-DD"));
      formData.append("clinic_id", clinicID);
      dispatch(getSlotList(formData));
    }
    getAllSlot();
  }, [clinicID, slotDate, dispatch]);
  const handleChangeSelect = (event) => {
    setValueSelect(event.target.value);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectMember(0);
    setSelectSlot(null);
    setValueSelect(null);
    setSlotDate(null);
  };
  const createBookingFormData = () => {
    setIsLoading(true);
    dispatch(
      createBooking({
        doctor_id: 14,
        date: dayjs(slotDate).format("YYYY-MM-DD"),
        clinic_id: clinicID,
        self: valueSelect,
        family_member_id: selectMember,
        slot: selectSlot,
      })
    )
      .then((res) => {
        if (res?.payload?.status) {
          toast(res?.payload?.message, { type: "success" });
          handleClose();
          setIsLoading(false);
        } else {
          toast("Something went worng!", { type: "error" });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth>
      <DialogTitle>Book Appointment</DialogTitle>
      <DialogContent>
        <RadioGroup
          sx={{ width: "100%" }}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={valueSelect}
          onChange={handleChangeSelect}
        >
          <FormControlLabel value={1} control={<Radio />} label="For self" />
          <FormControlLabel value={2} control={<Radio />} label="For family" />
        </RadioGroup>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Choose Date"
            value={slotDate}
            onChange={(newValue) => {
              setSlotDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>

        {valueSelect === "2" && (
          <FormControl fullWidth sx={{ mt: 4 }}>
            <InputLabel id="demo-simple-select-label">
              Select Members
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectMember}
              label="Select member"
              onChange={(e) => setSelectMember(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <MenuItem value={i} key={i}>
                  {i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {getAllSlotList?.length > 0 ? (
          <FormControl fullWidth sx={{ mt: 4 }}>
            <InputLabel id="demo-simple-select-label">Slot</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectSlot}
              label="Slot"
              onChange={(e) => setSelectSlot(e.target.value)}
            >
              {getAllSlotList?.map((item, i) => (
                <MenuItem value={item} key={i}>
                  {item?.start_time} - {item?.end_time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {" "}
                {isSlotMsg}. Please select a date.
              </InputLabel>
            </FormControl>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenModal(false)} color="error">
          Cancel
        </Button>
        <Button onClick={createBookingFormData} disabled={isLoading}>
          {isLoading ? <CircularProgress /> : "Create Booking"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
