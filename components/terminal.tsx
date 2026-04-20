"use client";

import { useState, useEffect } from "react";
import { Ephemeris, getCategoryIcon, getCategoryColor } from "@/lib/ephemerides";

interface TerminalProps {
  ephemeris: Ephemeris | null;
  fallbackEphemeris: Ephemeris;
}

export function Terminal({ ephemeris, fallbackEphemeris }: TerminalProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  const data = ephemeris || fallbackEphemeris;
  const isToday = !!ephemeris;
  
  const bootSequence = [
    "Inicializando dev://history v1.0.0...",
    "Cargando módulos históricos...",
    "Conectando a la base de conocimiento...",
    "Sistema listo.",
    "",
  ];

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let fullText = "";
    
    const typeChar = () => {
      if (currentLine < bootSequence.length) {
        const line = bootSequence[currentLine];
        if (currentChar < line.length) {
          fullText += line[currentChar];
          setDisplayedText(fullText);
          currentChar++;
          setTimeout(typeChar, 15 + Math.random() * 25);
        } else {
          fullText += "\n";
          setDisplayedText(fullText);
          currentLine++;
          currentChar = 0;
          setTimeout(typeChar, 200);
        }
      } else {
        setIsTyping(false);
        setTimeout(() => setShowContent(true), 300);
      }
    };
    
    setTimeout(typeChar, 500);
  }, []);

  const formatDate = (dateStr: string, year: number) => {
    const [month, day] = dateStr.split("-");
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
  };

  const today = new Date();
  const currentDateStr = today.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center crt-flicker">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="w-full h-1 bg-foreground/50 scanline" />
      </div>
      
      {/* CRT border glow */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      
      <main className="w-full max-w-3xl">
        {/* Terminal window */}
        <div className="border border-border rounded-sm overflow-hidden shadow-[0_0_30px_rgba(0,255,100,0.1)]">
          {/* Terminal header */}
          <div className="bg-secondary/50 border-b border-border px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-muted-foreground text-sm ml-2">
              dev://history — bash
            </span>
          </div>
          
          {/* Terminal content */}
          <div className="p-4 md:p-6 bg-background min-h-[400px]">
            {/* Boot sequence */}
            <pre className="text-sm text-muted-foreground whitespace-pre-wrap mb-4">
              {displayedText}
              {isTyping && <span className="cursor-blink text-primary">█</span>}
            </pre>
            
            {/* Main content */}
            {showContent && (
              <div className="space-y-6 animate-in fade-in duration-500">
                {/* Prompt */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">guest@dev-history</span>
                  <span className="text-primary">~</span>
                  <span className="text-muted-foreground">$</span>
                  <span className="text-foreground ml-1">cat efemeride_del_dia.txt</span>
                </div>
                
                {/* Date header */}
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {isToday ? "Efeméride de hoy" : "Efeméride aleatoria"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {currentDateStr}
                  </p>
                </div>
                
                {/* Ephemeris card */}
                <div className="border border-border rounded-sm p-4 md:p-6 bg-card/50">
                  {/* Category badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-sm ${getCategoryColor(data.category)}`}>
                      [{getCategoryIcon(data.category)}]
                    </span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {data.category}
                    </span>
                  </div>
                  
                  {/* Year */}
                  <div className="text-5xl md:text-7xl font-bold text-primary/80 mb-2">
                    {data.year}
                  </div>
                  
                  {/* Date */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {formatDate(data.date, data.year)}
                  </p>
                  
                  {/* Title */}
                  <h1 className="text-xl md:text-2xl font-bold text-foreground mb-4 text-pretty">
                    {data.title}
                  </h1>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-pretty">
                    {data.description}
                  </p>
                </div>
                
                {/* Footer prompt */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">guest@dev-history</span>
                  <span className="text-primary">~</span>
                  <span className="text-muted-foreground">$</span>
                  <span className="cursor-blink text-primary ml-1">█</span>
                </div>
                
                {/* Instructions */}
                <div className="text-xs text-muted-foreground/50 text-center pt-4 border-t border-border/30">
                  <p>Vuelve mañana para descubrir una nueva efeméride</p>
                  <p className="mt-1">// Recarga la página para ver una efeméride aleatoria si no hay una para hoy</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* ASCII art footer */}
        <div className="mt-4 text-center text-muted-foreground/30 text-xs">
          <pre className="inline-block">
{`
 ___  ____ _  _    _  _ _ ____ ___ ____ ____ _   _ 
 |  \\ |___  \\/     |__| | [__   |  |  | |__/  \\_/  
 |__/ |___ _/\\_    |  | | ___]  |  |__| |  \\   |   

`}
          </pre>
        </div>

        {/* Copyright footer */}
        <div className="mt-2 text-center text-muted-foreground/40 text-xs">
          <p>
            © 2026{" "}
            <a
              href="https://sites.google.com/view/millanpeiro/work"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/50 hover:text-primary transition-colors"
            >
              Millán
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
