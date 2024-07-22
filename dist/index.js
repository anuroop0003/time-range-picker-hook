"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTimeRange = void 0;
const react_1 = require("react");
const useTimeRange = (startDate, endDate, onChange) => {
    const today = new Date();
    let startTime = new Date();
    let endTime = new Date();
    if (new Date(startDate).toDateString() !== today.toDateString()) {
        startTime = new Date(startDate);
    }
    if (new Date(endDate).toDateString() !== today.toDateString()) {
        endTime = new Date(endDate);
    }
    const startTimeHour = startTime.getHours();
    const startTimeMinute = startTime.getMinutes();
    const endTimeHour = endTime.getHours();
    const endTimeMinute = endTime.getMinutes();
    const [selectedHourStart, setSelectedHourStart] = (0, react_1.useState)(startTimeHour);
    const [selectedMinuteStart, setSelectedMinuteStart] = (0, react_1.useState)(startTimeMinute);
    const [selectedHourEnd, setSelectedHourEnd] = (0, react_1.useState)(endTimeHour);
    const [selectedMinuteEnd, setSelectedMinuteEnd] = (0, react_1.useState)(endTimeMinute);
    const [valueStart, setValueStart] = (0, react_1.useState)("");
    const [valueEnd, setValueEnd] = (0, react_1.useState)(new Date());
    const isSameDay = new Date(startDate).toDateString() === new Date(endDate).toDateString();
    const isDisabledHourStart = (hour) => hour < startTime.getHours();
    const isDisabledHourEnd = (hour) => {
        if (isSameDay) {
            return hour < selectedHourStart; // Disable hours before the selected start hour if on the same day
        }
        return false; // Allow all hours on different days
    };
    const isDisabledMinuteStart = (minute) => selectedHourStart === startTime.getHours() &&
        minute < startTime.getMinutes();
    const isDisabledMinuteEnd = (minute) => {
        if (isSameDay) {
            return (selectedHourEnd === selectedHourStart && minute <= selectedMinuteStart); // Disable minutes before the start minute if on the same day
        }
        return false; // Allow all minutes on different days
    };
    const handleHourChangeStart = (hour) => {
        if (!isDisabledHourStart(hour)) {
            setSelectedHourStart(hour);
            if (hour !== startTimeHour) {
                setSelectedMinuteStart(0); // Reset minutes when hour changes to unrestricted hour
            }
            else if (selectedMinuteStart < startTimeMinute) {
                setSelectedMinuteStart(startTimeMinute); // Adjust minute when changing back to startTime hour
            }
        }
    };
    const handleMinuteChangeStart = (minute) => {
        if (!isDisabledMinuteStart(minute)) {
            setSelectedMinuteStart(minute);
        }
    };
    const handleMinuteChangeEnd = (minute) => {
        if (!isDisabledMinuteEnd(minute)) {
            setSelectedMinuteEnd(minute);
        }
    };
    const handleHourChangeEnd = (hour) => {
        if (!isDisabledHourEnd(hour)) {
            setSelectedHourEnd(hour);
            if (hour !== endTimeHour) {
                setSelectedMinuteEnd(0); // Reset minutes when hour changes to unrestricted hour
            }
            else if (selectedMinuteEnd < endTimeMinute) {
                setSelectedMinuteEnd(endTimeMinute); // Adjust minute when changing back to endTime hour
            }
        }
    };
    const handleOkClickStart = () => {
        const date = new Date();
        date.setHours(selectedHourStart);
        date.setMinutes(selectedMinuteStart);
        date.setSeconds(0);
        setValueStart(date);
        onChange(date, "start");
    };
    const handleOkClickEnd = () => {
        const date = new Date();
        date.setHours(selectedHourEnd);
        date.setMinutes(selectedMinuteEnd);
        date.setSeconds(0);
        setValueEnd(date);
        onChange(date, "end");
    };
    // Generate arrays for available hours and minutes
    const renderHoursStart = (0, react_1.useMemo)(() => Array.from({ length: 24 }, (_, i) => i).filter((hour) => !isDisabledHourStart(hour)), [isDisabledHourStart]);
    const renderMinutesStart = (0, react_1.useMemo)(() => Array.from({ length: 60 }, (_, i) => i).filter((minute) => !isDisabledMinuteStart(minute)), [isDisabledMinuteStart]);
    const renderHoursEnd = (0, react_1.useMemo)(() => Array.from({ length: 24 }, (_, i) => i).filter((hour) => !isDisabledHourEnd(hour)), [isDisabledHourEnd]);
    const renderMinutesEnd = (0, react_1.useMemo)(() => Array.from({ length: 60 }, (_, i) => i).filter((minute) => !isDisabledMinuteEnd(minute)), [isDisabledMinuteEnd]);
    function resetTime(key) {
        if (key === "start") {
            setValueStart("");
        }
        else if (key === "end") {
            setValueEnd("");
        }
        else {
            setValueStart("");
            setValueEnd("");
        }
    }
    return {
        resetTime,
        renderHoursStart,
        renderMinutesStart,
        renderHoursEnd,
        renderMinutesEnd,
        selectedMinuteStart,
        selectedMinuteEnd,
        selectedHourStart,
        selectedHourEnd,
        valueStart,
        valueEnd,
        isDisabledStart: !startDate,
        isDisabledEnd: !endDate,
        handleMinuteChangeStart,
        handleMinuteChangeEnd,
        handleHourChangeStart,
        handleHourChangeEnd,
        handleOkClickStart,
        handleOkClickEnd,
    };
};
exports.useTimeRange = useTimeRange;
