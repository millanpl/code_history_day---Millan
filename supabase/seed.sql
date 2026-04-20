-- Create the ephemerides table
CREATE TABLE IF NOT EXISTS ephemerides (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  date TEXT NOT NULL,          -- MM-DD format
  year INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('language', 'hardware', 'software', 'internet', 'person', 'company')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for fast date lookups
CREATE INDEX IF NOT EXISTS idx_ephemerides_date ON ephemerides (date);

-- Enable Row Level Security
ALTER TABLE ephemerides ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON ephemerides
  FOR SELECT USING (true);

-- Seed data
INSERT INTO ephemerides (date, year, title, description, category) VALUES
  -- Enero
  ('01-01', 1983, 'Nace ARPANET/Internet', 'ARPANET adopta oficialmente TCP/IP, marcando el nacimiento técnico de Internet.', 'internet'),
  ('01-03', 1977, 'Apple Computer se incorpora', 'Steve Jobs, Steve Wozniak y Ronald Wayne incorporan oficialmente Apple Computer Company.', 'company'),
  ('01-08', 1942, 'Nace Stephen Hawking', 'Nace el físico teórico que revolucionó nuestra comprensión del universo y utilizó tecnología de síntesis de voz.', 'person'),
  ('01-12', 1906, 'Nace Grace Hopper', 'Nace la pionera de la programación que desarrolló el primer compilador y popularizó el término ''debugging''.', 'person'),
  ('01-19', 1983, 'Apple Lisa', 'Apple presenta el Lisa, el primer ordenador personal con interfaz gráfica de usuario.', 'hardware'),
  ('01-24', 1984, 'Macintosh original', 'Apple lanza el Macintosh original, revolucionando la computación personal.', 'hardware'),

  -- Febrero
  ('02-04', 2004, 'Facebook es fundado', 'Mark Zuckerberg lanza ''TheFacebook'' desde su dormitorio en Harvard.', 'company'),
  ('02-08', 1996, 'Declaración de Independencia del Ciberespacio', 'John Perry Barlow publica la Declaración de Independencia del Ciberespacio.', 'internet'),
  ('02-11', 1847, 'Nace Thomas Edison', 'Nace el inventor que patentó el fonógrafo y contribuyó al desarrollo de la tecnología eléctrica.', 'person'),
  ('02-14', 2005, 'YouTube es fundado', 'Chad Hurley, Steve Chen y Jawed Karim fundan YouTube.', 'company'),
  ('02-19', 1473, 'Nace Nicolás Copérnico', 'Nace el astrónomo que formuló la teoría heliocéntrica, base del pensamiento científico moderno.', 'person'),
  ('02-24', 1955, 'Nace Steve Jobs', 'Nace el cofundador de Apple que transformó la industria de la computación personal.', 'person'),

  -- Marzo
  ('03-08', 1990, 'Primer servidor web', 'Tim Berners-Lee pone en funcionamiento el primer servidor web de la historia.', 'internet'),
  ('03-12', 1989, 'Propuesta de la World Wide Web', 'Tim Berners-Lee presenta su propuesta para la World Wide Web al CERN.', 'internet'),
  ('03-14', 1879, 'Nace Albert Einstein', 'Nace el físico cuyas teorías revolucionaron la física y sentaron bases para la computación cuántica.', 'person'),
  ('03-15', 1985, 'Primer dominio .com', 'Se registra symbolics.com, el primer dominio .com de la historia.', 'internet'),
  ('03-21', 2006, 'Primer tweet', 'Jack Dorsey publica el primer tweet: ''just setting up my twttr''.', 'internet'),
  ('03-31', 1993, 'Mosaic liberado', 'NCSA Mosaic, el navegador que popularizó la web, es liberado al público.', 'software'),

  -- Abril
  ('04-01', 1976, 'Apple Computer es fundada', 'Steve Jobs y Steve Wozniak fundan Apple Computer en el garaje de la familia Jobs.', 'company'),
  ('04-03', 1973, 'Primera llamada móvil', 'Martin Cooper de Motorola realiza la primera llamada desde un teléfono móvil.', 'hardware'),
  ('04-04', 1975, 'Microsoft es fundada', 'Bill Gates y Paul Allen fundan Microsoft en Albuquerque, Nuevo México.', 'company'),
  ('04-07', 1964, 'IBM System/360', 'IBM anuncia el System/360, revolucionando la industria de mainframes.', 'hardware'),
  ('04-12', 1981, 'Primer vuelo del Space Shuttle', 'El Columbia despega, con software de computadora controlando sistemas críticos.', 'software'),
  ('04-20', 1958, 'ALGOL propuesto', 'Se propone ALGOL, lenguaje que influenció C, Pascal y muchos otros.', 'language'),
  ('04-22', 1997, 'Deep Blue vs Kasparov', 'Deep Blue de IBM se convierte en el primer ordenador en ganar un match contra un campeón mundial de ajedrez.', 'software'),
  ('04-30', 1993, 'Web de dominio público', 'El CERN declara que la tecnología de la World Wide Web será de dominio público.', 'internet'),

  -- Mayo
  ('05-01', 1964, 'BASIC creado', 'John Kemeny y Thomas Kurtz crean BASIC en Dartmouth College.', 'language'),
  ('05-11', 1997, 'Deep Blue derrota a Kasparov', 'IBM Deep Blue gana el match histórico contra Garry Kasparov.', 'software'),
  ('05-15', 1985, 'Excel lanzado', 'Microsoft lanza Excel 1.0 para Macintosh.', 'software'),
  ('05-23', 1995, 'Java anunciado', 'Sun Microsystems anuncia oficialmente el lenguaje de programación Java.', 'language'),
  ('05-24', 1844, 'Primer mensaje de telégrafo', '''What hath God wrought'' - Samuel Morse envía el primer mensaje telegráfico de larga distancia.', 'hardware'),

  -- Junio
  ('06-07', 1954, 'Muerte de Alan Turing', 'Fallece Alan Turing, padre de la computación teórica y la inteligencia artificial.', 'person'),
  ('06-16', 1911, 'IBM fundada', 'Se funda la Computing-Tabulating-Recording Company, que se convertiría en IBM.', 'company'),
  ('06-21', 1948, 'Manchester Baby ejecuta primer programa', 'La Manchester Baby ejecuta el primer programa almacenado en memoria.', 'software'),
  ('06-23', 1912, 'Nace Alan Turing', 'Nace Alan Turing, considerado el padre de la ciencia de la computación.', 'person'),
  ('06-28', 1971, 'Huffman coding publicado', 'David Huffman publica su algoritmo de compresión que revolucionaría el almacenamiento de datos.', 'software'),
  ('06-29', 2007, 'iPhone lanzado', 'Apple lanza el iPhone original, transformando la industria móvil para siempre.', 'hardware'),

  -- Julio
  ('07-01', 1979, 'Sony Walkman lanzado', 'Sony lanza el Walkman TPS-L2, pionero en dispositivos de audio portátil.', 'hardware'),
  ('07-08', 1994, 'Netscape fundada', 'Se funda Netscape Communications, que lideraría la primera era de navegadores web.', 'company'),
  ('07-12', 2004, 'Mozilla Firefox', 'Se lanza Firefox 0.9, desafiando el dominio de Internet Explorer.', 'software'),
  ('07-16', 1969, 'Apollo 11 despega', 'El Apollo 11 despega con computadoras de guiado que tenían menos poder que una calculadora moderna.', 'software'),
  ('07-20', 1969, 'Alunizaje del Apollo 11', 'El código de Margaret Hamilton permite el alunizaje del Apollo 11.', 'software'),
  ('07-29', 1958, 'NASA fundada', 'Se funda la NASA, impulsando el desarrollo de software espacial.', 'company'),

  -- Agosto
  ('08-06', 1991, 'Primera página web', 'Tim Berners-Lee publica la primera página web de la historia.', 'internet'),
  ('08-09', 1995, 'IPO de Netscape', 'Netscape sale a bolsa, marcando el inicio del boom de las puntocom.', 'company'),
  ('08-12', 1981, 'IBM PC lanzado', 'IBM lanza el Personal Computer, estableciendo el estándar para PCs.', 'hardware'),
  ('08-17', 1998, 'Google incorporado', 'Larry Page y Sergey Brin incorporan oficialmente Google Inc.', 'company'),
  ('08-24', 1995, 'Windows 95 lanzado', 'Microsoft lanza Windows 95, con el famoso botón de Inicio.', 'software'),
  ('08-25', 1991, 'Anuncio de Linux', 'Linus Torvalds anuncia el proyecto Linux en un newsgroup de Usenet.', 'software'),

  -- Septiembre
  ('09-01', 1969, 'Primera conexión ARPANET', 'Se instala el primer nodo de ARPANET en UCLA.', 'internet'),
  ('09-04', 1998, 'Google fundado', 'Larry Page y Sergey Brin fundan Google en un garaje de Menlo Park.', 'company'),
  ('09-09', 1947, 'Primer bug documentado', 'Grace Hopper documenta el primer ''bug'' real: una polilla en el Mark II.', 'software'),
  ('09-12', 1958, 'Circuito integrado demostrado', 'Jack Kilby de Texas Instruments demuestra el primer circuito integrado.', 'hardware'),
  ('09-17', 1991, 'Linux 0.01 liberado', 'Linus Torvalds libera la versión 0.01 del kernel Linux.', 'software'),
  ('09-21', 1983, 'GNU anunciado', 'Richard Stallman anuncia el proyecto GNU, iniciando el movimiento del software libre.', 'software'),

  -- Octubre
  ('10-01', 1969, 'ARPANET primer mensaje', 'Se envía el primer mensaje por ARPANET de UCLA a Stanford.', 'internet'),
  ('10-06', 2010, 'Instagram lanzado', 'Kevin Systrom y Mike Krieger lanzan Instagram.', 'company'),
  ('10-13', 1983, 'Ameritech lanza servicio celular', 'Se realiza la primera llamada comercial de telefonía celular en EE.UU.', 'hardware'),
  ('10-22', 1999, 'Napster lanzado', 'Shawn Fanning lanza Napster, revolucionando la distribución de música digital.', 'software'),
  ('10-28', 1955, 'Nace Bill Gates', 'Nace Bill Gates, cofundador de Microsoft.', 'person'),
  ('10-29', 1969, 'Primera comunicación ARPANET', 'Se envía el primer mensaje entre computadoras por ARPANET.', 'internet'),

  -- Noviembre
  ('11-01', 1993, 'Unión Europea creada', 'El Tratado de Maastricht entra en vigor, impulsando la conectividad digital europea.', 'internet'),
  ('11-10', 1983, 'Windows anunciado', 'Microsoft anuncia Windows, aunque no se lanzaría hasta 1985.', 'software'),
  ('11-15', 1971, 'Intel 4004 anunciado', 'Intel anuncia el 4004, el primer microprocesador comercial.', 'hardware'),
  ('11-20', 1985, 'Windows 1.0 lanzado', 'Microsoft lanza Windows 1.0 después de dos años de desarrollo.', 'software'),
  ('11-24', 1859, 'El Origen de las Especies publicado', 'Darwin publica su obra que inspiraría los algoritmos evolutivos.', 'person'),
  ('11-30', 1993, 'Tim Berners-Lee', 'El CERN libera el código fuente de la World Wide Web bajo dominio público.', 'internet'),

  -- Diciembre
  ('12-03', 1992, 'Primer SMS enviado', 'Neil Papworth envía el primer mensaje de texto: ''Merry Christmas''.', 'hardware'),
  ('12-04', 1996, 'Mars Pathfinder lanzado', 'Se lanza Mars Pathfinder con software que incluía manejo de errores revolucionario.', 'software'),
  ('12-09', 1906, 'Nace Grace Hopper', 'Nace Grace Hopper, pionera de la programación y creadora del COBOL.', 'person'),
  ('12-10', 1815, 'Nace Ada Lovelace', 'Nace Augusta Ada King, considerada la primera programadora de la historia.', 'person'),
  ('12-21', 1937, 'Blancanieves estrenada', 'Disney estrena Blancanieves, pionera en animación asistida por tecnología.', 'software'),
  ('12-23', 1947, 'Transistor inventado', 'Bell Labs anuncia la invención del transistor, base de toda la electrónica moderna.', 'hardware'),
  ('12-25', 1990, 'Primera página web editada', 'Tim Berners-Lee edita la primera página web de la historia.', 'internet'),
  ('12-28', 1903, 'Nace John von Neumann', 'Nace John von Neumann, creador de la arquitectura de computadoras que lleva su nombre.', 'person');
