'use client';

import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface EventTicketCardProps {
  event: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    image: string;
    type: 'online' | 'in-person' | 'workshop';
    spotsLeft?: number;
    totalSpots?: number;
    isNew?: boolean;
    isFeatured?: boolean;
  };
  className?: string;
}

export function EventTicketCard({ event, className }: EventTicketCardProps) {
  const availabilityPercentage = event.spotsLeft && event.totalSpots 
    ? ((event.totalSpots - event.spotsLeft) / event.totalSpots) * 100 
    : 0;

  return (
    <Link href={`/events/${event.id}`} className="block group">
      <div className={cn(
        "relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
        "border-2 border-periwinkle-light dark:border-periwinkle-dark/30",
        className
      )}>
        {/* Ticket style decoration */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-periwinkle-dark rounded-bl-full opacity-10" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-mint-dark rounded-tr-full opacity-10" />
        
        {/* Perforated edge effect */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-transparent via-gray-100 to-transparent dark:via-gray-800 opacity-50">
          <div className="h-full flex flex-col justify-around py-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-white dark:bg-gray-950 rounded-full mx-auto" />
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Event Image */}
          <div className="relative w-full md:w-1/3 h-48 md:h-auto">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {event.isNew && (
              <Badge className="absolute top-2 left-2 bg-mint-dark text-navy-dark border-0">
                New
              </Badge>
            )}
            {event.isFeatured && (
              <Badge className="absolute top-2 right-2 bg-purple-dark text-white border-0">
                Featured
              </Badge>
            )}
          </div>

          {/* Event Details */}
          <div className="flex-1 p-6 pr-12">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-navy-dark dark:text-white group-hover:text-purple-dark transition-colors">
                  {event.title}
                </h3>
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
            </div>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-periwinkle-dark" />
                <span className="font-medium">{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-periwinkle-dark" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-periwinkle-dark" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* Availability */}
            {event.spotsLeft !== undefined && event.totalSpots && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {event.spotsLeft} spots left
                  </span>
                  {event.spotsLeft < 10 && (
                    <Badge variant="destructive" className="text-xs">
                      Almost Full
                    </Badge>
                  )}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-dark to-periwinkle-dark transition-all duration-300"
                    style={{ width: `${availabilityPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}