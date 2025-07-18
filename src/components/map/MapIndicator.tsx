import L, { LatLngExpression } from 'leaflet';
import { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Marker, useMapEvents } from 'react-leaflet';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface MapIndicatorProps {
  position: LatLngExpression;
  count: number;
  baseZoom?: number;
  isHighlighted: boolean;
  label?: string;
  isCity?: boolean;
  onClick?: () => void;
}

export function MapIndicator({
  position,
  count,
  baseZoom = 5,
  isHighlighted = false,
  label,
  isCity = false,
  onClick,
}: MapIndicatorProps) {
  const [scale, setScale] = useState(1);

  const bgClass =
    count === 0
      ? 'bg-gray-500'
      : count < 6
        ? 'bg-lime-500'
        : count > 10
          ? 'bg-red-500'
          : 'bg-orange-400';

  useMapEvents({
    zoomend(e) {
      const z = e.target.getZoom();
      setScale(1.5 ** (z - baseZoom));
    },
  });

  const borderClass = isHighlighted
    ? 'border-none'
    : 'border-[3px] border-black/30';

  const avatarHtml = ReactDOMServer.renderToString(
    isCity ? (
      <div className="relative flex flex-col items-center">
        {/* Pin head */}
        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white">
          {count}
        </div>

        {/* Pin tail */}
        <div className="flex justify-center items-center -mt-1 h-1">
          <div className="w-2 h-2 bg-blue-600 rotate-45 absolute" />
          <div className="w-2 h-2 bg-blue-600 -rotate-45 absolute" />
        </div>

        {label && (
          <div className="text-xs mt-1 text-white text-center drop-shadow">
            {label}
          </div>
        )}
      </div>
    ) : (
      <Avatar
        className="w-8 h-8 transform origin-center"
        style={{ transform: `scale(${scale})` }}
      >
        <AvatarFallback
          className={`flex items-center justify-center text-sm text-white ${bgClass} ${borderClass}`}
        >
          {count}
        </AvatarFallback>
      </Avatar>
    ),
  );

  const icon = L.divIcon({
    className: '',
    html: avatarHtml,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  const eventHandlers = onClick
    ? {
        click: onClick,
      }
    : {};

  return (
    <Marker position={position} icon={icon} eventHandlers={eventHandlers} />
  );
}
