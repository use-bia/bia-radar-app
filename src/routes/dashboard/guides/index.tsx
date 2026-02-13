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
import { useMemo, useState } from "react";
import type { VideoNode } from "./-VideoTimeline";
import VideoTimeline from "./-VideoTimeline";

export const Route = createFileRoute("/dashboard/guides/")({
  component: RouteComponent,
});

// --- DATA & TYPES ---

type SectionId = "basic" | "attachments" | "modules" | "advanced";

interface SubModule {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface Section {
  id: SectionId;
  label: string;
  icon: React.ElementType;
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
      { id: "wireless1", label: "Wireless A", icon: Wifi },
      { id: "wireless2", label: "Wireless B", icon: Wifi },
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
      {
        id: "a2",
        title: "Instalação da Luz",
        description: "Como acoplar o módulo de luz noturna.",
        duration: "1:45",
        thumb:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=60",
      },
      {
        id: "a3",
        title: "Instalação da Luz",
        description: "Como acoplar o módulo de luz noturna.",
        duration: "1:45",
        thumb:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=60",
      },
      {
        id: "a4",
        title: "Instalação da Luz",
        description: "Como acoplar o módulo de luz noturna.",
        duration: "1:45",
        thumb:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=60",
      },
      {
        id: "a5",
        title: "Instalação da Luz",
        description: "Como acoplar o módulo de luz noturna.",
        duration: "1:45",
        thumb:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=60",
      },
      {
        id: "a6",
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

// --- MAIN COMPONENT ---

function RouteComponent() {
  const [activeSection, setActiveSection] = useState<string>("basic");
  const [activeSubModule, setActiveSubModule] = useState<string>("default");
  const [viewedVideos, setViewedVideos] = useState<Set<string>>(new Set());

  // Handle Main Tab Change
  const handleSectionChange = (key: React.Key) => {
    const sectionId = key as string;
    setActiveSection(sectionId);

    // Logic: If new section has submodules, pick the first one. Otherwise 'default'.
    const sectionData = SECTIONS.find((s) => s.id === sectionId);
    if (sectionData?.subModules && sectionData.subModules.length > 0) {
      setActiveSubModule(sectionData.subModules[0].id);
    } else {
      setActiveSubModule("default");
    }
  };

  // Get current videos based on BOTH section and submodule
  const currentVideos = useMemo(() => {
    return VIDEOS[activeSection]?.[activeSubModule] || [];
  }, [activeSection, activeSubModule]);

  return (
    <div className="animate-in fade-in duration-500 flex flex-col gap-8 items-center w-full min-h-screen">
      {/* --- MAIN TABS --- */}
      <Tabs
        selectedKey={activeSection}
        onSelectionChange={handleSectionChange}
        className="items-center w-full top-0 py-4"
      >
        <Tabs.ListContainer className="w-full sm:w-auto">
          <Tabs.List
            aria-label="Options"
            className={cn(
              "rounded-4xl sm:rounded-full p-1 sm:p-2 gap-2 border",
              // Semantic Colors: Surface for card-like bg, Border for outline
              "bg-surface border-border",
              // Text colors handling
              "*:data-[selected=true]:text-accent-foreground text-muted",
            )}
          >
            {SECTIONS.map((section) => (
              <Tabs.Tab
                key={section.id}
                id={section.id}
                className="flex flex-col sm:flex-row items-center min-w-16 sm:min-w-auto gap-2 h-full rounded-3xl sm:rounded-full py-3 sm:py-4 px-4 sm:px-6 lg:px-8 transition-all"
              >
                {section.icon && (
                  <section.icon
                    className="w-5 h-5 sm:w-4 sm:h-4"
                    aria-hidden="true"
                  />
                )}
                {section.label}
                <Tabs.Indicator className="bg-accent rounded-3xl sm:rounded-full" />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>

        {/* --- PANELS --- */}
        {SECTIONS.map((section) => (
          <Tabs.Panel
            key={section.id}
            id={section.id}
            className="w-full px-4 pt-4"
          >
            {/* SUBMODULE TABS (Only if present) */}
            {section.subModules && section.subModules.length > 0 ? (
              <div className="flex justify-center mb-8">
                <Tabs
                  selectedKey={activeSubModule}
                  onSelectionChange={(k) => setActiveSubModule(k as string)}
                  hideSeparator
                >
                  <Tabs.ListContainer>
                    <Tabs.List
                      className={cn(
                        "w-fit grid grid-cols-2 md:grid-cols-5 gap-3 bg-transparent",
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
                          className={cn(
                            "flex flex-col items-center h-26 w-26 justify-center p-0 rounded-4xl border transition-all",
                            // Inactive borders use the semantic 'border' variable
                            "border-border",
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-full w-full rounded-t-4xl justify-center items-center pt-3 transition-all",
                              // Toggle between Surface (card) and Background (canvas)
                              activeSubModule === sub.id
                                ? "bg-surface"
                                : "bg-background",
                            )}
                          >
                            <sub.icon className="w-8 h-8" aria-hidden="true" />
                          </div>

                          <div
                            className={cn(
                              "w-full rounded-b-4xl p-1 text-center text-sm",
                              activeSubModule === sub.id
                                ? "text-foreground"
                                : "text-foreground border-t border-border",
                            )}
                          >
                            {sub.label}
                          </div>
                          <Tabs.Indicator className="rounded-4xl bg-accent opacity-10" />
                        </Tabs.Tab>
                      ))}
                    </Tabs.List>
                  </Tabs.ListContainer>
                </Tabs>
              </div>
            ) : null}

            {/* --- VIDEO ROADMAP RENDERED HERE --- */}
            <VideoTimeline
              videos={currentVideos}
              viewedVideos={viewedVideos}
              onVideoClick={(id) => {
                const newSet = new Set(viewedVideos);
                newSet.add(id);
                setViewedVideos(newSet);
                console.log("Open video", id);
              }}
            />
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}
