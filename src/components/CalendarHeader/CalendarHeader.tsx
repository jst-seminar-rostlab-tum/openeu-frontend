"use client"

import { Toggle } from "@/components/ui/toggle"
import * as React from "react"
import { ButtonGroup } from "../ui/button-group";
import { CalendarRange, Columns, Grid2X2, Grid3X3, LayoutList, List } from "lucide-react";
import { motion } from "framer-motion";
import { buttonHover, slideFromLeft, slideFromRight, transition } from "../../domain/animations";
import { TodayButton } from "./TodayButton";
import { Button } from "../ui/button";
import { useCalendar } from "./calendarContext";
import { DateNavigator } from "./DateNavigator";
import { dummyMeetings } from "@/operations/meeting/MeetingOperations";


export const MotionButton = motion.create(Button);

export function CalendarHeader() {
   const events = dummyMeetings;
    
    const {
        view,
        setView,
    } = useCalendar();

    return (
        <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
            <motion.div
                className="flex items-center gap-3"
                variants={slideFromLeft}
                initial="initial"
                animate="animate"
                transition={transition}
            >
                <TodayButton/>
                <DateNavigator view={view} event={events} />
                
            </motion.div>

            <motion.div
                className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-1.5"
                variants={slideFromRight}
                initial="initial"
                animate="animate"
                transition={transition}
            >
                <div className="options flex-wrap flex items-center gap-4 md:gap-2">
                
                    <MotionButton
                        variant="outline"
                        onClick={() => setView("agenda")}
                        asChild
                        variants={buttonHover}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Toggle className='relative'>
                            {view === "agenda" ? (
                                <>
                                    <CalendarRange/>
                                    <span className="absolute -top-1 -right-1 size-3 rounded-full bg-green-400"></span>
                                </>
                            ) : <LayoutList/>}
                        </Toggle>
                    </MotionButton>
                    <ButtonGroup className="flex">
                        <MotionButton
                            variant={view === "day" ? "default" : "outline"}
                            aria-label="View by day"
                            onClick={() => {
                                setView("day");
                            }}
                            variants={buttonHover}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <List className="h-4 w-4"/>
                        </MotionButton>

                        <MotionButton
                            variant={view === "week" ? "default" : "outline"}
                            aria-label="View by week"
                            onClick={() => setView("week")}
                            variants={buttonHover}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Columns className="h-4 w-4"/>
                        </MotionButton>

                        <MotionButton
                            variant={view === "month" ? "default" : "outline"}
                            aria-label="View by month"
                            onClick={() => setView("month")}
                            variants={buttonHover}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Grid3X3 className="h-4 w-4"/>
                        </MotionButton>
                        <MotionButton
                            variant={view === "year" ? "default" : "outline"}
                            aria-label="View by year"
                            onClick={() => setView("year")}
                            variants={buttonHover}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Grid2X2 className="h-4 w-4"/>
                        </MotionButton>
                    </ButtonGroup>
                </div>
            </motion.div>
        </div>
    );
}