import { getSupabase } from "@/lib/supabase"

export interface Ephemeris {
  date: string; // MM-DD format
  year: number;
  title: string;
  description: string;
  category: "language" | "hardware" | "software" | "internet" | "person" | "company";
}

// Static data used as fallback when Supabase is unavailable
const staticEphemerides: Ephemeris[] = [
  // Enero
  { date: "01-01", year: 1983, title: "Nace ARPANET/Internet", description: "ARPANET adopta oficialmente TCP/IP, marcando el nacimiento técnico de Internet.", category: "internet" },
  { date: "01-03", year: 1977, title: "Apple Computer se incorpora", description: "Steve Jobs, Steve Wozniak y Ronald Wayne incorporan oficialmente Apple Computer Company.", category: "company" },
  { date: "01-08", year: 1942, title: "Nace Stephen Hawking", description: "Nace el físico teórico que revolucionó nuestra comprensión del universo y utilizó tecnología de síntesis de voz.", category: "person" },
  { date: "01-12", year: 1906, title: "Nace Grace Hopper", description: "Nace la pionera de la programación que desarrolló el primer compilador y popularizó el término 'debugging'.", category: "person" },
  { date: "01-19", year: 1983, title: "Apple Lisa", description: "Apple presenta el Lisa, el primer ordenador personal con interfaz gráfica de usuario.", category: "hardware" },
  { date: "01-24", year: 1984, title: "Macintosh original", description: "Apple lanza el Macintosh original, revolucionando la computación personal.", category: "hardware" },
  
  // Febrero
  { date: "02-04", year: 2004, title: "Facebook es fundado", description: "Mark Zuckerberg lanza 'TheFacebook' desde su dormitorio en Harvard.", category: "company" },
  { date: "02-08", year: 1996, title: "Declaración de Independencia del Ciberespacio", description: "John Perry Barlow publica la Declaración de Independencia del Ciberespacio.", category: "internet" },
  { date: "02-11", year: 1847, title: "Nace Thomas Edison", description: "Nace el inventor que patentó el fonógrafo y contribuyó al desarrollo de la tecnología eléctrica.", category: "person" },
  { date: "02-14", year: 2005, title: "YouTube es fundado", description: "Chad Hurley, Steve Chen y Jawed Karim fundan YouTube.", category: "company" },
  { date: "02-19", year: 1473, title: "Nace Nicolás Copérnico", description: "Nace el astrónomo que formuló la teoría heliocéntrica, base del pensamiento científico moderno.", category: "person" },
  { date: "02-24", year: 1955, title: "Nace Steve Jobs", description: "Nace el cofundador de Apple que transformó la industria de la computación personal.", category: "person" },
  
  // Marzo
  { date: "03-08", year: 1990, title: "Primer servidor web", description: "Tim Berners-Lee pone en funcionamiento el primer servidor web de la historia.", category: "internet" },
  { date: "03-12", year: 1989, title: "Propuesta de la World Wide Web", description: "Tim Berners-Lee presenta su propuesta para la World Wide Web al CERN.", category: "internet" },
  { date: "03-14", year: 1879, title: "Nace Albert Einstein", description: "Nace el físico cuyas teorías revolucionaron la física y sentaron bases para la computación cuántica.", category: "person" },
  { date: "03-15", year: 1985, title: "Primer dominio .com", description: "Se registra symbolics.com, el primer dominio .com de la historia.", category: "internet" },
  { date: "03-21", year: 2006, title: "Primer tweet", description: "Jack Dorsey publica el primer tweet: 'just setting up my twttr'.", category: "internet" },
  { date: "03-31", year: 1993, title: "Mosaic liberado", description: "NCSA Mosaic, el navegador que popularizó la web, es liberado al público.", category: "software" },
  
  // Abril
  { date: "04-01", year: 1976, title: "Apple Computer es fundada", description: "Steve Jobs y Steve Wozniak fundan Apple Computer en el garaje de la familia Jobs.", category: "company" },
  { date: "04-03", year: 1973, title: "Primera llamada móvil", description: "Martin Cooper de Motorola realiza la primera llamada desde un teléfono móvil.", category: "hardware" },
  { date: "04-04", year: 1975, title: "Microsoft es fundada", description: "Bill Gates y Paul Allen fundan Microsoft en Albuquerque, Nuevo México.", category: "company" },
  { date: "04-07", year: 1964, title: "IBM System/360", description: "IBM anuncia el System/360, revolucionando la industria de mainframes.", category: "hardware" },
  { date: "04-12", year: 1981, title: "Primer vuelo del Space Shuttle", description: "El Columbia despega, con software de computadora controlando sistemas críticos.", category: "software" },
  { date: "04-20", year: 1958, title: "ALGOL propuesto", description: "Se propone ALGOL, lenguaje que influenció C, Pascal y muchos otros.", category: "language" },
  { date: "04-22", year: 1997, title: "Deep Blue vs Kasparov", description: "Deep Blue de IBM se convierte en el primer ordenador en ganar un match contra un campeón mundial de ajedrez.", category: "software" },
  { date: "04-30", year: 1993, title: "Web de dominio público", description: "El CERN declara que la tecnología de la World Wide Web será de dominio público.", category: "internet" },
  
  // Mayo
  { date: "05-01", year: 1964, title: "BASIC creado", description: "John Kemeny y Thomas Kurtz crean BASIC en Dartmouth College.", category: "language" },
  { date: "05-11", year: 1997, title: "Deep Blue derrota a Kasparov", description: "IBM Deep Blue gana el match histórico contra Garry Kasparov.", category: "software" },
  { date: "05-15", year: 1985, title: "Excel lanzado", description: "Microsoft lanza Excel 1.0 para Macintosh.", category: "software" },
  { date: "05-23", year: 1995, title: "Java anunciado", description: "Sun Microsystems anuncia oficialmente el lenguaje de programación Java.", category: "language" },
  { date: "05-24", year: 1844, title: "Primer mensaje de telégrafo", description: "'What hath God wrought' - Samuel Morse envía el primer mensaje telegráfico de larga distancia.", category: "hardware" },
  
  // Junio
  { date: "06-07", year: 1954, title: "Muerte de Alan Turing", description: "Fallece Alan Turing, padre de la computación teórica y la inteligencia artificial.", category: "person" },
  { date: "06-16", year: 1911, title: "IBM fundada", description: "Se funda la Computing-Tabulating-Recording Company, que se convertiría en IBM.", category: "company" },
  { date: "06-21", year: 1948, title: "Manchester Baby ejecuta primer programa", description: "La Manchester Baby ejecuta el primer programa almacenado en memoria.", category: "software" },
  { date: "06-23", year: 1912, title: "Nace Alan Turing", description: "Nace Alan Turing, considerado el padre de la ciencia de la computación.", category: "person" },
  { date: "06-28", year: 1971, title: "Huffman coding publicado", description: "David Huffman publica su algoritmo de compresión que revolucionaría el almacenamiento de datos.", category: "software" },
  { date: "06-29", year: 2007, title: "iPhone lanzado", description: "Apple lanza el iPhone original, transformando la industria móvil para siempre.", category: "hardware" },
  
  // Julio
  { date: "07-01", year: 1979, title: "Sony Walkman lanzado", description: "Sony lanza el Walkman TPS-L2, pionero en dispositivos de audio portátil.", category: "hardware" },
  { date: "07-08", year: 1994, title: "Netscape fundada", description: "Se funda Netscape Communications, que lideraría la primera era de navegadores web.", category: "company" },
  { date: "07-12", year: 2004, title: "Mozilla Firefox", description: "Se lanza Firefox 0.9, desafiando el dominio de Internet Explorer.", category: "software" },
  { date: "07-16", year: 1969, title: "Apollo 11 despega", description: "El Apollo 11 despega con computadoras de guiado que tenían menos poder que una calculadora moderna.", category: "software" },
  { date: "07-20", year: 1969, title: "Alunizaje del Apollo 11", description: "El código de Margaret Hamilton permite el alunizaje del Apollo 11.", category: "software" },
  { date: "07-29", year: 1958, title: "NASA fundada", description: "Se funda la NASA, impulsando el desarrollo de software espacial.", category: "company" },
  
  // Agosto
  { date: "08-06", year: 1991, title: "Primera página web", description: "Tim Berners-Lee publica la primera página web de la historia.", category: "internet" },
  { date: "08-09", year: 1995, title: "IPO de Netscape", description: "Netscape sale a bolsa, marcando el inicio del boom de las puntocom.", category: "company" },
  { date: "08-12", year: 1981, title: "IBM PC lanzado", description: "IBM lanza el Personal Computer, estableciendo el estándar para PCs.", category: "hardware" },
  { date: "08-17", year: 1998, title: "Google incorporado", description: "Larry Page y Sergey Brin incorporan oficialmente Google Inc.", category: "company" },
  { date: "08-24", year: 1995, title: "Windows 95 lanzado", description: "Microsoft lanza Windows 95, con el famoso botón de Inicio.", category: "software" },
  { date: "08-25", year: 1991, title: "Anuncio de Linux", description: "Linus Torvalds anuncia el proyecto Linux en un newsgroup de Usenet.", category: "software" },
  
  // Septiembre
  { date: "09-01", year: 1969, title: "Primera conexión ARPANET", description: "Se instala el primer nodo de ARPANET en UCLA.", category: "internet" },
  { date: "09-04", year: 1998, title: "Google fundado", description: "Larry Page y Sergey Brin fundan Google en un garaje de Menlo Park.", category: "company" },
  { date: "09-09", year: 1947, title: "Primer bug documentado", description: "Grace Hopper documenta el primer 'bug' real: una polilla en el Mark II.", category: "software" },
  { date: "09-12", year: 1958, title: "Circuito integrado demostrado", description: "Jack Kilby de Texas Instruments demuestra el primer circuito integrado.", category: "hardware" },
  { date: "09-17", year: 1991, title: "Linux 0.01 liberado", description: "Linus Torvalds libera la versión 0.01 del kernel Linux.", category: "software" },
  { date: "09-21", year: 1983, title: "GNU anunciado", description: "Richard Stallman anuncia el proyecto GNU, iniciando el movimiento del software libre.", category: "software" },
  
  // Octubre
  { date: "10-01", year: 1969, title: "ARPANET primer mensaje", description: "Se envía el primer mensaje por ARPANET de UCLA a Stanford.", category: "internet" },
  { date: "10-06", year: 2010, title: "Instagram lanzado", description: "Kevin Systrom y Mike Krieger lanzan Instagram.", category: "company" },
  { date: "10-13", year: 1983, title: "Ameritech lanza servicio celular", description: "Se realiza la primera llamada comercial de telefonía celular en EE.UU.", category: "hardware" },
  { date: "10-22", year: 1999, title: "Napster lanzado", description: "Shawn Fanning lanza Napster, revolucionando la distribución de música digital.", category: "software" },
  { date: "10-28", year: 1955, title: "Nace Bill Gates", description: "Nace Bill Gates, cofundador de Microsoft.", category: "person" },
  { date: "10-29", year: 1969, title: "Primera comunicación ARPANET", description: "Se envía el primer mensaje entre computadoras por ARPANET.", category: "internet" },
  
  // Noviembre
  { date: "11-01", year: 1993, title: "Unión Europea creada", description: "El Tratado de Maastricht entra en vigor, impulsando la conectividad digital europea.", category: "internet" },
  { date: "11-10", year: 1983, title: "Windows anunciado", description: "Microsoft anuncia Windows, aunque no se lanzaría hasta 1985.", category: "software" },
  { date: "11-15", year: 1971, title: "Intel 4004 anunciado", description: "Intel anuncia el 4004, el primer microprocesador comercial.", category: "hardware" },
  { date: "11-20", year: 1985, title: "Windows 1.0 lanzado", description: "Microsoft lanza Windows 1.0 después de dos años de desarrollo.", category: "software" },
  { date: "11-24", year: 1859, title: "El Origen de las Especies publicado", description: "Darwin publica su obra que inspiraría los algoritmos evolutivos.", category: "person" },
  { date: "11-30", year: 1993, title: "Tim Berners-Lee", description: "El CERN libera el código fuente de la World Wide Web bajo dominio público.", category: "internet" },
  
  // Diciembre
  { date: "12-03", year: 1992, title: "Primer SMS enviado", description: "Neil Papworth envía el primer mensaje de texto: 'Merry Christmas'.", category: "hardware" },
  { date: "12-04", year: 1996, title: "Mars Pathfinder lanzado", description: "Se lanza Mars Pathfinder con software que incluía manejo de errores revolucionario.", category: "software" },
  { date: "12-09", year: 1906, title: "Nace Grace Hopper", description: "Nace Grace Hopper, pionera de la programación y creadora del COBOL.", category: "person" },
  { date: "12-10", year: 1815, title: "Nace Ada Lovelace", description: "Nace Augusta Ada King, considerada la primera programadora de la historia.", category: "person" },
  { date: "12-21", year: 1937, title: "Blancanieves estrenada", description: "Disney estrena Blancanieves, pionera en animación asistida por tecnología.", category: "software" },
  { date: "12-23", year: 1947, title: "Transistor inventado", description: "Bell Labs anuncia la invención del transistor, base de toda la electrónica moderna.", category: "hardware" },
  { date: "12-25", year: 1990, title: "Primera página web editada", description: "Tim Berners-Lee edita la primera página web de la historia.", category: "internet" },
  { date: "12-28", year: 1903, title: "Nace John von Neumann", description: "Nace John von Neumann, creador de la arquitectura de computadoras que lleva su nombre.", category: "person" },
];

export async function getTodayEphemeris(): Promise<Ephemeris | null> {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayString = `${month}-${day}`;

  try {
    const { data, error } = await getSupabase()
      .from("ephemerides")
      .select("date, year, title, description, category")
      .eq("date", todayString)
      .limit(1)
      .single();

    if (!error && data) return data as Ephemeris;
  } catch {
    // Supabase unavailable, fall through to static data
  }

  return staticEphemerides.find(e => e.date === todayString) || null;
}

export async function getRandomEphemeris(): Promise<Ephemeris> {
  try {
    const { count } = await getSupabase()
      .from("ephemerides")
      .select("*", { count: "exact", head: true });

    if (count && count > 0) {
      const offset = Math.floor(Math.random() * count);
      const { data, error } = await getSupabase()
        .from("ephemerides")
        .select("date, year, title, description, category")
        .range(offset, offset)
        .single();

      if (!error && data) return data as Ephemeris;
    }
  } catch {
    // Supabase unavailable, fall through to static data
  }

  return staticEphemerides[Math.floor(Math.random() * staticEphemerides.length)];
}

export function getCategoryIcon(category: Ephemeris["category"]): string {
  const icons: Record<Ephemeris["category"], string> = {
    language: "{ }",
    hardware: "[#]",
    software: "</>",
    internet: "@",
    person: "usr",
    company: "org"
  };
  return icons[category];
}

export function getCategoryColor(category: Ephemeris["category"]): string {
  const colors: Record<Ephemeris["category"], string> = {
    language: "text-yellow-400",
    hardware: "text-cyan-400",
    software: "text-green-400",
    internet: "text-blue-400",
    person: "text-pink-400",
    company: "text-orange-400"
  };
  return colors[category];
}
