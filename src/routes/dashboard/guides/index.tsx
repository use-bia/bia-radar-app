import { GlassButton, GlassCard } from "@/components/GlassCard";
import { m } from "@/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { InfoIcon, PlayIcon, YoutubeIcon } from "lucide-react";
import { cn } from "@heroui/react";

export const Route = createFileRoute("/dashboard/guides/")({
  component: RouteComponent,
});

// Mock Data - In a real app, this would come from your loader or API
const TUTORIALS = [
  {
    id: "1",
    title: "Unboxing e Montagem",
    duration: "1:20",
    category: "Básico",
    thumb:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80",
  },
  {
    id: "2",
    title: "Primeira Configuração",
    duration: "2:15",
    category: "Setup",
    thumb:
      "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=400&q=80",
  },
  {
    id: "3",
    title: "Calibração dos Sensores",
    duration: "3:40",
    category: "Avançado",
    thumb:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80",
  },
  {
    id: "4",
    title: "Dicas de Uso Diário",
    duration: "1:55",
    category: "Dicas",
    thumb:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=80",
  },
];

function RouteComponent() {
  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <header className="flex justify-between items-end pb-2 border-b border-border/10">
        <div className="space-y-1">
          <h1 className="text-muted uppercase tracking-[0.4em] text-sm">
            {m.guides?.() ?? "Guias"}
          </h1>
          <p className="text-2xl font-medium text-foreground">
            {m.learn_to_use?.() ?? "Aprenda a usar sua BIA"}
          </p>
        </div>
        <div
          className="p-3 bg-red-500/10 rounded-full text-red-500"
          aria-hidden="true"
        >
          <YoutubeIcon size={24} />
        </div>
      </header>

      {/* Video Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        role="list"
        aria-label="Lista de vídeos tutoriais"
      >
        {TUTORIALS.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Info Footer */}
      <GlassCard className="flex items-center gap-5 py-6 bg-accent/5 border-accent/10">
        <div
          className="p-3 bg-accent/10 rounded-full shrink-0"
          aria-hidden="true"
        >
          <InfoIcon size={24} className="text-accent" />
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {m.guides_info?.() ??
            "Todos os vídeos são otimizados para serem curtos e diretos, garantindo um aprendizado rápido e eficiente."}
        </p>
      </GlassCard>
    </div>
  );
}

// --- Sub-Components ---

interface VideoCardProps {
  video: (typeof TUTORIALS)[0];
}

function VideoCard({ video }: VideoCardProps) {
  return (
    <GlassButton
      onClick={() => console.log(`Play video: ${video.id}`)}
      // A11y: Combine title and duration for screen readers
      aria-label={`Assistir vídeo: ${video.title}. Duração: ${video.duration}`}
      className="group p-4 flex gap-4 items-center h-full hover:bg-surface/80"
      role="listitem"
    >
      {/* Thumbnail Container */}
      <div className="relative w-32 h-24 sm:w-40 sm:h-28 rounded-2xl overflow-hidden shrink-0 shadow-md bg-surface-secondary">
        {/* Image: Grayscale by default, Color on Hover */}
        <img
          src={video.thumb}
          alt="" // Decorative, the button label handles context
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            "grayscale opacity-80", // Default: B&W and slightly dimmed
            "group-hover:grayscale-0 group-hover:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:opacity-100", // Hover/Focus: Color and Bright
          )}
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
            <PlayIcon size={18} className="text-white fill-current ml-1" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-1 right-1 bg-black/80 text-[10px] px-2 py-0.5 rounded-md text-white font-mono border border-white/10 backdrop-blur-sm">
          {video.duration}
        </div>
      </div>

      {/* Text Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-2">
        <h3 className="text-lg font-medium leading-tight group-hover:text-accent transition-colors truncate">
          {video.title}
        </h3>

        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
            {video.category}
          </p>
        </div>
      </div>
    </GlassButton>
  );
}
