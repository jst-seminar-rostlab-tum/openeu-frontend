"use client";

import React from "react";
import { useCalendar } from "../CalendarHeader/calendarContext";
import {motion} from "framer-motion";
import {transition, fadeIn} from "@/domain/animations";
import { CalendarMonthView } from "../MonthViewCalendar/MonthViewCalendar";
import {isSameDay, parseISO} from "date-fns";
import { useFilteredEvents } from "@/operations/meeting/calendarHelpers";

export function CalendarBody() {
    const {view} = useCalendar();

    const singleDayEvents = useFilteredEvents().filter((event) => {
        const startDate = parseISO(event.meeting_start_datetime);
        const endDate = parseISO(event.meeting_end_datetime);
        return isSameDay(startDate, endDate);
    });

    const multiDayEvents = useFilteredEvents().filter((event) => {
        const startDate = parseISO(event.meeting_start_datetime);
        const endDate = parseISO(event.meeting_end_datetime);
        return !isSameDay(startDate, endDate);
    });

    return (
            <div className='h-[80vh] w-full overflow-scroll relative]'>
                <motion.div
                    key={view}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={fadeIn}
                    transition={transition}
                >
                    {view === "month" && (
                        <CalendarMonthView
                            singleDayEvents={singleDayEvents}
                            multiDayEvents={multiDayEvents}
                        />
                    )}
                    
                </motion.div>
            </div>
    );
}