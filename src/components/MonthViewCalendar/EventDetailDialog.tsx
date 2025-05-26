"use client";

import {format, parseISO} from "date-fns";
import {Calendar, Clock, Text, User} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import {ScrollArea} from "@/components/ui/scroll-area";

import type { MeetingData } from "@/domain/entities/calendar/MeetingData";
import {ReactNode} from "react";
import { useCalendar } from "../CalendarHeader/calendarContext";
import { formatTime } from "@/domain/hooks/calendarHelpers";
import {Button} from "@/components/ui/button";
import {toast} from "sonner"

interface IProps {
    event: MeetingData;
    children: ReactNode;
}

export function EventDetailsDialog({event, children}: IProps) {
    const startDate = parseISO(event.meeting_start_datetime);
    const endDate = parseISO(event.meeting_end_datetime);
    console.log("DEBUG: Event Details Dialog", event);
   


    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{event.title}</DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[80vh]">
                    <div className="space-y-4 p-4">
                        <div className="flex items-start gap-2">
                            <User className="mt-1 size-4 shrink-0 text-muted-foreground"/>
                            <div>
                                <p className="text-sm font-medium">Responsible</p>
                                <p className="text-sm text-muted-foreground">
                                    {event.description ?? "Unknown"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <Calendar className="mt-1 size-4 shrink-0 text-muted-foreground"/>
                            <div>
                                <p className="text-sm font-medium">Start Date</p>
                                <p className="text-sm text-muted-foreground">
                                    {format(startDate, "EEEE dd MMMM")}
                                    <span className="mx-1">
                                        at
                                    </span>
                                    {formatTime(parseISO(event.meeting_start_datetime),true)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <Clock className="mt-1 size-4 shrink-0 text-muted-foreground"/>
                            <div>
                                <p className="text-sm font-medium">End Date</p>
                                <p className="text-sm text-muted-foreground">
                                    {format(endDate, "EEEE dd MMMM")}
                                    <span className="mx-1">
                                        at
                                    </span>
                                    {formatTime(parseISO(event.meeting_end_datetime), true)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <Text className="mt-1 size-4 shrink-0 text-muted-foreground"/>
                            <div>
                                <p className="text-sm font-medium">Description</p>
                                <p className="text-sm text-muted-foreground">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
                <DialogClose asChild>
                    <Button variant="outline" className="mt-4 w-full">
                        Close
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
