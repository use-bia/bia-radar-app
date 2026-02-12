import { cn, Tabs } from "@heroui/react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BoxIcon,
  CpuIcon,
  Fingerprint,
  GitCompare,
  Lightbulb,
  Settings2Icon,
  Vibrate,
  Wifi,
  ZapIcon,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/guides/")({
  component: RouteComponent,
});

// --- DATA & TYPES ---

type SectionId = "basic" | "attachments" | "modules" | "advanced";

interface VideoNode {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumb: string;
}

interface SubModule {
  id: string;
  label: string;
  icon: React.ElementType; // Added icon for the grid buttons
}

interface Section {
  id: SectionId;
  label: string;
  icon: React.ElementType; // Optional icon for the main section tab
  subModules?: SubModule[];
}

const SECTIONS: Section[] = [
  { id: "basic", label: "Início", icon: BoxIcon },
  {
    id: "attachments",
    label: "Acessórios",
    icon: ZapIcon,
    subModules: [
      { id: "light", label: "Luz Auxiliar", icon: Lightbulb },
      { id: "motor", label: "Motor Tátil", icon: Vibrate },
    ],
  },
  {
    id: "modules",
    label: "Módulos",
    icon: CpuIcon,
    subModules: [
      { id: "index", label: "Módulo Index", icon: Fingerprint },
      { id: "differential", label: "Diferencial", icon: GitCompare },
      { id: "wireless", label: "Wireless", icon: Wifi },
      { id: "wireless1", label: "Wireless", icon: Wifi },
      { id: "wireless2", label: "Wireless", icon: Wifi },
      { id: "wireless3", label: "Wireless", icon: Wifi },
      { id: "wireless4", label: "Wireless", icon: Wifi },
    ],
  },
  { id: "advanced", label: "Pro", icon: Settings2Icon },
];

const VIDEOS: Record<string, Record<string, VideoNode[]>> = {
  basic: {
    default: [
      {
        id: "b1",
        title: "Unboxing & Montagem",
        description: "O que vem na caixa e como preparar seu dispositivo.",
        duration: "1:20",
        thumb:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=60",
      },
      {
        id: "b2",
        title: "Primeira Carga",
        description: "Cuidados essenciais com a bateria.",
        duration: "0:45",
        thumb:
          "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=60",
      },
      {
        id: "b3",
        title: "Configuração Inicial",
        description: "Conectando ao app e primeiros passos.",
        duration: "2:10",
        thumb:
          "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=800&q=60",
      },
    ],
  },
  attachments: {
    light: [
      {
        id: "a1",
        title: "Instalação da Luz",
        description: "Como acoplar o módulo de luz noturna.",
        duration: "1:45",
        thumb:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=60",
      },
    ],
    motor: [
      {
        id: "a2",
        title: "Feedback Tátil",
        description: "Entendendo os padrões de vibração.",
        duration: "2:30",
        thumb:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=60",
      },
    ],
  },
  modules: {
    index: [
      {
        id: "m1",
        title: "Instalação Index",
        description: "Acoplando o sensor principal.",
        duration: "3:10",
        thumb:
          "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=60",
      },
      {
        id: "m2",
        title: "Calibração Index",
        description: "Ajuste fino para precisão máxima.",
        duration: "2:00",
        thumb:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=60",
      },
    ],
    differential: [
      {
        id: "m3",
        title: "Modo Diferencial",
        description: "Como funciona a navegação relativa.",
        duration: "4:15",
        thumb:
          "https://images.unsplash.com/photo-1581092921461-eab62e97a783?w=800&q=60",
      },
    ],
    wireless: [
      {
        id: "m4",
        title: "Pareamento",
        description: "Conectando sem fios.",
        duration: "1:30",
        thumb:
          "https://images.unsplash.com/photo-1591405351990-4726e331f141?w=800&q=60",
      },
    ],
  },
  advanced: {
    default: [
      {
        id: "pro1",
        title: "Menu de Desenvolvedor",
        description: "Acessando recursos ocultos.",
        duration: "4:20",
        thumb:
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=60",
      },
    ],
  },
};

function RouteComponent() {
  // Navigation State
  const [activeSubModule, setActiveSubModule] = useState<string>("default");
  const [viewedVideos, setViewedVideos] = useState<Set<string>>(new Set());

  // Handle Tab Change (Reset SubModule logic)
  const handleTabChange = (key: React.Key) => {
    const section = SECTIONS.find((s) => s.id === key);
    if (section?.subModules && section.subModules.length > 0) {
      setActiveSubModule(section.subModules[0].id);
    } else {
      setActiveSubModule("default");
    }
  };

  const handleVideoClick = (videoId: string) => {
    const newViewed = new Set(viewedVideos);
    newViewed.add(videoId);
    setViewedVideos(newViewed);
    console.log("Playing:", videoId);
  };

  return (
    <div className="animate-in fade-in duration-500 flex flex-col gap-8 items-center w-full">
      <Tabs className="w-full items-center">
        <Tabs.ListContainer>
          <Tabs.List
            aria-label="Options"
            className="*:data-[selected=true]:text-black h-16 rounded-full p-2 w-fit mx-auto"
          >
            {SECTIONS.map((section) => (
              <Tabs.Tab
                key={section.id}
                id={section.id}
                onClick={() => handleTabChange(section.id)}
                className="flex items-center gap-2 h-full rounded-full px-8"
              >
                {section.icon && (
                  <section.icon className="w-4 h-4" aria-hidden="true" />
                )}
                {section.label}
                <Tabs.Indicator className="bg-accent rounded-full" />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="pt-4" id="overview">
          <p>View your project overview and recent activity.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="analytics">
          <p>Track your metrics and analyze performance data.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="reports">
          <p>Generate and download detailed reports.</p>
        </Tabs.Panel>
        {SECTIONS.map((section) => (
          <Tabs.Panel key={section.id} className="" id={section.id}>
            {section.subModules && section.subModules.length > 0 ? (
              <div className="flex justify-center">
                <Tabs hideSeparator>
                  <Tabs.ListContainer>
                    <Tabs.List
                      className={cn(
                        "w-fit grid grid-cols-5 gap-3 mb-6 bg-transparent",
                        "*:data-[selected=true]:text-accent",
                        "*:data-[selected=true]:border-accent",
                        "*:data-[selected=true]:shadow-md",
                        "*:data-[selected=true]:border-2",
                      )}
                    >
                      {section.subModules.map((sub) => (
                        <Tabs.Tab
                          key={sub.id}
                          id={sub.id}
                          onClick={() => setActiveSubModule(sub.id)}
                          className="flex flex-col items-center h-26 w-26 justify-center p-0 rounded-4xl border"
                        >
                          <div
                            className={cn(
                              "flex h-full w-full rounded-t-4xl justify-center items-center pt-3 transition-all",
                              activeSubModule === sub.id
                                ? "bg-surface"
                                : "bg-background",
                            )}
                          >
                            <sub.icon className="w-8 h-8" aria-hidden="true" />
                          </div>

                          <div
                            className={cn(
                              "w-full rounded-b-4xl p-1",
                              activeSubModule === sub.id
                                ? " text-accent-foreground"
                                : " text-surface-foreground border-t",
                            )}
                          >
                            {sub.label}
                          </div>
                          <Tabs.Indicator className="rounded-4xl bg-accent" />
                        </Tabs.Tab>
                      ))}
                    </Tabs.List>
                  </Tabs.ListContainer>
                </Tabs>
              </div>
            ) : null}
            {/* {VIDEOS[section.id]["default"]?.map((video) => (
              <div
                key={video.id}
                className={cn(
                  "flex items-center gap-4 p-4 border rounded-lg cursor-pointer",
                  viewedVideos.has(video.id) ? "bg-green-50" : "bg-white",
                )}
                onClick={() => handleVideoClick(video.id)}
              >
                <img
                  src={video.thumb}
                  alt={`${video.title} thumbnail`}
                  className="w-24 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{video.title}</h3>
                  <p className="text-sm text-muted">{video.description}</p>
                  <span className="text-xs text-muted">{video.duration}</span>
                </div>
              </div>
            ))} */}
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}
