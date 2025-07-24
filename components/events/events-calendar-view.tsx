'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';
import { format, isSameDay, addMonths, subMonths } from 'date-fns';
import { cn } from '@/lib/utils';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  type: 'online' | 'in-person' | 'workshop';
}

interface EventsCalendarViewProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
}

export function EventsCalendarView({ events, onEventClick }: EventsCalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  // Get all dates that have events
  const eventDates = events.map(event => event.date);

  // Events for selected date
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Calendar */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Event Calendar</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium w-32 text-center">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            className="rounded-md"
            modifiers={{
              hasEvents: eventDates
            }}
            modifiersStyles={{
              hasEvents: {
                backgroundColor: 'rgb(155 46 131)',
                color: 'white',
                borderRadius: '50%',
                fontWeight: 'bold'
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Selected Date Events */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-purple-dark" />
            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDate ? (
            selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-dark dark:hover:border-purple-dark transition-colors cursor-pointer"
                    onClick={() => onEventClick?.(event)}
                  >
                    <h4 className="font-medium text-navy-dark dark:text-white mb-2">
                      {event.title}
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "mt-2",
                        event.type === 'online' && "border-blue text-blue",
                        event.type === 'in-person' && "border-purple-dark text-purple-dark",
                        event.type === 'workshop' && "border-periwinkle-dark text-periwinkle-dark"
                      )}
                    >
                      {event.type === 'online' ? 'Online Event' : event.type === 'in-person' ? 'In Person' : 'Workshop'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No events scheduled for this date
              </p>
            )
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              Click on a date to view events
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}