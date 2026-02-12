import { GlassButton } from "@/components/GlassCard";
import { cn } from "@heroui/react";
import { CheckCircle2, PlayIcon } from "lucide-react";
import type { FunctionComponent } from "react";

export interface VideoNode {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumb: string;
}

interface VideoTimelineProps {
  videos: VideoNode[];
  viewedVideos: Set<string>;
  onVideoClick: (id: string) => void;
}

const VideoTimeline: FunctionComponent<VideoTimelineProps> = ({
  videos,
  viewedVideos,
  onVideoClick,
}) => {
  if (!videos?.length)
    return (
      <div className="text-center py-20 opacity-50 text-muted italic">
        Select a module to view guides.
      </div>
    );

  return (
    <div className="relative w-full mx-auto py-8">
      {/* 1. THE ROADMAP LINE 
        Changed to a gradient to fade in/out at the ends for a smoother look.
      */}
      <div
        className="absolute top-0 bottom-0 md:left-1/2 w-0.5 -translate-x-1/2 bg-linear-to-b from-transparent via-border to-transparent"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-4 md:gap-0">
        {videos.map((video, idx) => {
          const isEven = idx % 2 === 0;
          const isViewed = viewedVideos.has(video.id);

          return (
            <div
              key={video.id}
              className={cn(
                "relative flex items-center w-full",
                // Desktop: Alternate sides
                isEven ? "md:flex-row-reverse" : "md:flex-row",
              )}
            >
              {/* 2. THE CONNECTOR & DOT
                A horizontal line connecting the central axis to the card.
              */}
              <div
                className={cn(
                  "absolute left-8 md:left-1/2 w-6 h-px bg-border -z-10",
                  // Flip connector direction on desktop based on side
                  isEven ? "md:-translate-x-full" : "md:translate-x-0",
                )}
              />

              {/* The Central Dot */}
              <div
                className={cn(
                  "absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-2 z-10 transition-all duration-300 shadow-sm -translate-x-1/2",
                  isViewed
                    ? "bg-accent border-accent shadow-[0_0_10px_rgba(var(--accent),0.5)] scale-110"
                    : "bg-surface border-border",
                )}
              >
                {/* Inner dot for unread state */}
                {!isViewed && (
                  <div className="absolute inset-1 rounded-full bg-muted/50" />
                )}
              </div>

              {/* 3. THE GLASS VIDEO CARD 
                Using GlassButton for interactivity and style.
                We add margin to push it away from the central line.
              */}
              <div
                className={cn(
                  "w-full", // Mobile: Space for line on left
                  isEven
                    ? "md:pr-6 md:mr-auto md:w-1/2"
                    : "md:pl-6 md:ml-auto md:w-1/2",
                )}
              >
                <GlassButton
                  onClick={() => onVideoClick(video.id)}
                  className={cn(
                    "w-full p-5 group h-auto", // Override p-6 if too large, ensure height adapts
                    isViewed ? "opacity-80 hover:opacity-100" : "",
                  )}
                >
                  <div className="flex flex-col lg:flex-row gap-5 items-start sm:items-center w-full">
                    {/* Thumbnail Section */}
                    <div className="relative w-full lg:w-40 aspect-video rounded-4xl overflow-hidden shrink-0 bg-black/10 border border-white/5 shadow-inner">
                      <img
                        src={video.thumb}
                        alt={video.title}
                        className={cn(
                          "w-full h-full object-cover transition-all duration-500",
                          "group-hover:scale-110 group-hover:opacity-60", // Zoom and dim on hover
                        )}
                      />

                      {/* Play Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div
                          className={cn(
                            "flex items-center justify-center w-12 h-12 rounded-full",
                            "backdrop-blur-md bg-white/10 border border-white/20 shadow-xl",
                            "transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:border-accent",
                          )}
                        >
                          <PlayIcon className="w-5 h-5 text-white ml-0.5 fill-white" />
                        </div>
                      </div>

                      <span className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-medium px-1.5 py-0.5 rounded-xl border border-white/10">
                        {video.duration}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col gap-1 w-full min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3
                          className={cn(
                            "font-semibold text-lg leading-tight truncate pr-2",
                            isViewed
                              ? "text-muted-foreground decoration-line-through decoration-border"
                              : "text-foreground",
                          )}
                        >
                          {video.title}
                        </h3>
                        {isViewed && (
                          <CheckCircle2 className="w-5 h-5 text-accent shrink-0 animate-in zoom-in spin-in-12" />
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </GlassButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoTimeline;
