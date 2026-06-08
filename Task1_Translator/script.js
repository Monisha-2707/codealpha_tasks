// Logic


// ═══════════════════════════════════════════
// HINDI transliteration table (Devanagari)
// ═══════════════════════════════════════════
function toHindi(t) {
  const map = [
    // 3-char combos
    ['ksh','क्ष'],['gya','ज्ञ'],['shh','ष'],['nch','ञ्च'],
    // 2-char vowels
    ['aa','आ'],['ii','ई'],['uu','ऊ'],['ee','ई'],['oo','ऊ'],
    ['ai','ऐ'],['au','औ'],['ou','औ'],['oe','ओ'],['ae','ऐ'],
    // 2-char consonants
    ['kh','ख'],['gh','घ'],['ch','च'],['chh','छ'],['jh','झ'],
    ['th','थ'],['dh','ध'],['ph','फ'],['bh','भ'],['sh','श'],
    ['ng','ङ'],['ny','ञ'],['tr','त्र'],['pr','प्र'],['br','ब्र'],
    ['kr','क्र'],['gr','ग्र'],['dr','द्र'],['fr','फ्र'],['sr','स्र'],
    // single vowels (standalone)
    ['a','अ'],['i','इ'],['u','उ'],['e','ए'],['o','ओ'],
    // single consonants
    ['k','क'],['g','ग'],['c','क'],['j','ज'],['t','ट'],['d','ड'],
    ['n','न'],['p','प'],['b','ब'],['m','म'],['y','य'],['r','र'],
    ['l','ल'],['v','व'],['w','व'],['s','स'],['h','ह'],['f','फ'],
    ['z','ज'],['q','क'],['x','क्स'],
  ];
  const matra = {
    'अ':'','आ':'ा','इ':'ि','ई':'ी','उ':'ु','ऊ':'ू','ए':'े','ऐ':'ै','ओ':'ो','औ':'ौ'
  };
  const vowelSet = new Set(['अ','आ','इ','ई','उ','ऊ','ए','ऐ','ओ','औ']);
  const consonantSet = new Set(['क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण',
    'त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह',
    'क्ष','ज्ञ','त्र','प्र','ब्र','क्र','ग्र','द्र','फ्र','स्र','क्स']);

  const words = t.toLowerCase().split(/\s+/);
  return words.map(word => {
    const tokens = [];
    let i = 0;
    while (i < word.length) {
      let matched = false;
      for (const [rom, dev] of map) {
        if (word.slice(i).startsWith(rom)) {
          tokens.push(dev);
          i += rom.length;
          matched = true;
          break;
        }
      }
      if (!matched) { tokens.push(word[i]); i++; }
    }
    let result = '';
    for (let j = 0; j < tokens.length; j++) {
      const cur = tokens[j];
      const next = tokens[j+1];
      if (consonantSet.has(cur)) {
        if (next === undefined) {
          result += cur + '';
        } else if (vowelSet.has(next)) {
          result += cur + (matra[next] || '');
          j++;
        } else if (consonantSet.has(next)) {
          result += cur + '्';
        } else {
          result += cur;
        }
      } else if (vowelSet.has(cur)) {
        result += cur;
      } else {
        result += cur;
      }
    }
    return result;
  }).join(' ');
}

// ═══════════════════════════════════════════
// TELUGU
// ═══════════════════════════════════════════
function toTelugu(t) {
  const map = [
    ['ksh','క్ష'],['shh','ష'],['dha','ధ'],['tha','థ'],['bha','భ'],['pha','ఫ'],
    ['nna','న్న'],['lla','ల్ల'],['rra','ర్ర'],
    ['aa','ా'],['ii','ీ'],['uu','ూ'],['ee','ే'],['oo','ో'],['ai','ై'],['au','ౌ'],['ou','ౌ'],
    ['kh','ఖ'],['gh','ఘ'],['ch','చ'],['jh','ఝ'],['th','థ'],['dh','ధ'],['ph','ఫ'],['bh','భ'],['sh','శ'],
    ['ng','ఙ'],['ny','ఞ'],
    ['a','అ'],['aa','ఆ'],['i','ఇ'],['ii','ఈ'],['u','ఉ'],['uu','ఊ'],
    ['e','ఎ'],['ee','ఏ'],['o','ఒ'],['oo','ఓ'],
    ['k','క'],['g','గ'],['c','క'],['j','జ'],['t','ట'],['d','డ'],
    ['n','న'],['p','ప'],['b','బ'],['m','మ'],['y','య'],['r','ర'],
    ['l','ల'],['v','వ'],['w','వ'],['s','స'],['h','హ'],['f','ఫ'],['z','జ'],
  ];
  const vowels = new Set(['అ','ఆ','ఇ','ఈ','ఉ','ఊ','ఎ','ఏ','ఒ','ఓ','ఐ','ఔ']);
  const matras = {'అ':'','ఆ':'ా','ఇ':'ి','ఈ':'ీ','ఉ':'ు','ఊ':'ూ','ఎ':'ె','ఏ':'ే','ఒ':'ొ','ఓ':'ో','ఐ':'ై','ఔ':'ౌ'};
  const consonants = new Set(['క','ఖ','గ','ఘ','ఙ','చ','ఛ','జ','ఝ','ఞ','ట','ఠ','డ','ఢ','ణ',
    'త','థ','ద','ధ','న','ప','ఫ','బ','భ','మ','య','ర','ల','వ','శ','ష','స','హ','క్ష']);
  const words = t.toLowerCase().split(/\s+/);
  return words.map(word => {
    const tokens = [];
    let i = 0;
    while (i < word.length) {
      let matched = false;
      for (const [rom, tel] of map) {
        if (word.slice(i).startsWith(rom)) {
          tokens.push(tel); i += rom.length; matched = true; break;
        }
      }
      if (!matched) { tokens.push(word[i]); i++; }
    }
    let result = '';
    for (let j = 0; j < tokens.length; j++) {
      const cur = tokens[j], next = tokens[j+1];
      if (consonants.has(cur)) {
        if (vowels.has(next)) { result += cur + (matras[next]||''); j++; }
        else if (next && consonants.has(next)) { result += cur + '్'; }
        else { result += cur; }
      } else if (vowels.has(cur)) { result += cur; }
      else { result += cur; }
    }
    return result;
  }).join(' ');
}

// ═══════════════════════════════════════════
// TAMIL
// ═══════════════════════════════════════════
function toTamil(t) {
  const map = [
    ['aa','ா'],['ii','ீ'],['uu','ூ'],['ee','ே'],['oo','ோ'],['ai','ை'],['au','ௌ'],
    ['sh','ஷ'],['ch','ச'],['th','த'],['ph','ப'],['bh','ப'],['dh','த'],['gh','க'],
    ['ng','ங'],['ny','ஞ'],['nj','ஞ'],['nd','ந'],
    ['kk','க்க'],['cc','ச்ச'],['tt','ட்ட'],['nn','ன்ன'],['pp','ப்ப'],['mm','ம்ம'],['ll','ல்ல'],['rr','ற்ற'],
    ['a','அ'],['i','இ'],['u','உ'],['e','எ'],['o','ஒ'],
    ['k','க'],['g','க'],['c','ச'],['j','ஜ'],['t','ட'],['d','ட'],
    ['n','ந'],['p','ப'],['b','ப'],['m','ம'],['y','ய'],['r','ர'],
    ['l','ல'],['v','வ'],['w','வ'],['s','ச'],['h','ஹ'],['f','ஃப'],['z','ழ'],
  ];
  const vowels = new Set(['அ','இ','உ','எ','ஒ','ஆ','ஈ','ஊ','ஏ','ஓ','ஐ','ஔ']);
  const matras = {'அ':'','ஆ':'ா','இ':'ி','ஈ':'ீ','உ':'ு','ஊ':'ூ','எ':'ெ','ஏ':'ே','ஒ':'ொ','ஓ':'ோ','ஐ':'ை','ஔ':'ௌ'};
  const consonants = new Set(['க','ங','ச','ஞ','ட','ண','த','ந','ப','ம','ய','ர','ல','வ','ழ','ள','ற','ன','ஜ','ஷ','ஸ','ஹ']);
  const words = t.toLowerCase().split(/\s+/);
  return words.map(word => {
    const tokens = [];
    let i = 0;
    while (i < word.length) {
      let matched = false;
      for (const [rom, tam] of map) {
        if (word.slice(i).startsWith(rom)) { tokens.push(tam); i += rom.length; matched = true; break; }
      }
      if (!matched) { tokens.push(word[i]); i++; }
    }
    let result = '';
    for (let j = 0; j < tokens.length; j++) {
      const cur = tokens[j], next = tokens[j+1];
      if (consonants.has(cur)) {
        if (vowels.has(next)) { result += cur + (matras[next]||''); j++; }
        else if (next && consonants.has(next)) { result += cur + '்'; }
        else { result += cur; }
      } else { result += cur; }
    }
    return result;
  }).join(' ');
}

// ═══════════════════════════════════════════
// KANNADA
// ═══════════════════════════════════════════
function toKannada(t) {
  const map = [
    ['aa','ಆ'],['ii','ಈ'],['uu','ಊ'],['ee','ಏ'],['oo','ಓ'],['ai','ಐ'],['au','ಔ'],
    ['ksh','ಕ್ಷ'],['sh','ಶ'],['ch','ಚ'],['th','ಥ'],['dh','ಧ'],['ph','ಫ'],['bh','ಭ'],
    ['ng','ಙ'],['ny','ಞ'],['kh','ಖ'],['gh','ಘ'],['jh','ಝ'],
    ['a','ಅ'],['i','ಇ'],['u','ಉ'],['e','ಎ'],['o','ಒ'],
    ['k','ಕ'],['g','ಗ'],['c','ಕ'],['j','ಜ'],['t','ಟ'],['d','ಡ'],
    ['n','ನ'],['p','ಪ'],['b','ಬ'],['m','ಮ'],['y','ಯ'],['r','ರ'],
    ['l','ಲ'],['v','ವ'],['w','ವ'],['s','ಸ'],['h','ಹ'],['f','ಫ'],['z','ಜ'],
  ];
  const vowels = new Set(['ಅ','ಆ','ಇ','ಈ','ಉ','ಊ','ಎ','ಏ','ಒ','ಓ','ಐ','ಔ']);
  const matras = {'ಅ':'','ಆ':'ಾ','ಇ':'ಿ','ಈ':'ೀ','ಉ':'ು','ಊ':'ೂ','ಎ':'ೆ','ಏ':'ೇ','ಒ':'ೊ','ಓ':'ೋ','ಐ':'ೈ','ಔ':'ೌ'};
  const consonants = new Set(['ಕ','ಖ','ಗ','ಘ','ಙ','ಚ','ಛ','ಜ','ಝ','ಞ','ಟ','ಠ','ಡ','ಢ','ಣ',
    'ತ','ಥ','ದ','ಧ','ನ','ಪ','ಫ','ಬ','ಭ','ಮ','ಯ','ರ','ಲ','ವ','ಶ','ಷ','ಸ','ಹ']);
  const words = t.toLowerCase().split(/\s+/);
  return words.map(word => {
    const tokens = [];
    let i = 0;
    while (i < word.length) {
      let matched = false;
      for (const [rom, kan] of map) {
        if (word.slice(i).startsWith(rom)) { tokens.push(kan); i += rom.length; matched = true; break; }
      }
      if (!matched) { tokens.push(word[i]); i++; }
    }
    let result = '';
    for (let j = 0; j < tokens.length; j++) {
      const cur = tokens[j], next = tokens[j+1];
      if (consonants.has(cur)) {
        if (vowels.has(next)) { result += cur + (matras[next]||''); j++; }
        else if (next && consonants.has(next)) { result += cur + '್'; }
        else { result += cur; }
      } else { result += cur; }
    }
    return result;
  }).join(' ');
}

// ═══════════════════════════════════════════
// MALAYALAM
// ═══════════════════════════════════════════
function toMalayalam(t) {
  const map = [
    ['aa','ആ'],['ii','ഈ'],['uu','ഊ'],['ee','ഏ'],['oo','ഓ'],['ai','ഐ'],['au','ഔ'],
    ['ksh','ക്ഷ'],['sh','ശ'],['ch','ച'],['th','ത'],['dh','ധ'],['ph','ഫ'],['bh','ഭ'],
    ['ng','ങ'],['ny','ഞ'],['kh','ഖ'],['gh','ഘ'],['jh','ഝ'],
    ['a','അ'],['i','ഇ'],['u','ഉ'],['e','എ'],['o','ഒ'],
    ['k','ക'],['g','ഗ'],['c','ക'],['j','ജ'],['t','ട'],['d','ഡ'],
    ['n','ന'],['p','പ'],['b','ബ'],['m','മ'],['y','യ'],['r','ര'],
    ['l','ല'],['v','വ'],['w','വ'],['s','സ'],['h','ഹ'],['f','ഫ'],['z','ജ'],
  ];
  const vowels = new Set(['അ','ആ','ഇ','ഈ','ഉ','ഊ','എ','ഏ','ഒ','ഓ','ഐ','ഔ']);
  const matras = {'അ':'','ആ':'ാ','ഇ':'ി','ഈ':'ീ','ഉ':'ു','ഊ':'ൂ','എ':'െ','ഏ':'േ','ഒ':'ൊ','ഓ':'ോ','ഐ':'ൈ','ഔ':'ൗ'};
  const consonants = new Set(['ക','ഖ','ഗ','ഘ','ങ','ച','ഛ','ജ','ഝ','ഞ','ട','ഠ','ഡ','ഢ','ണ',
    'ത','ഥ','ദ','ധ','ന','പ','ഫ','ബ','ഭ','മ','യ','ര','ല','വ','ശ','ഷ','സ','ഹ']);
  const words = t.toLowerCase().split(/\s+/);
  return words.map(word => {
    const tokens = [];
    let i = 0;
    while (i < word.length) {
      let matched = false;
      for (const [rom, mal] of map) {
        if (word.slice(i).startsWith(rom)) { tokens.push(mal); i += rom.length; matched = true; break; }
      }
      if (!matched) { tokens.push(word[i]); i++; }
    }
    let result = '';
    for (let j = 0; j < tokens.length; j++) {
      const cur = tokens[j], next = tokens[j+1];
      if (consonants.has(cur)) {
        if (vowels.has(next)) { result += cur + (matras[next]||''); j++; }
        else if (next && consonants.has(next)) { result += cur + '്'; }
        else { result += cur; }
      } else { result += cur; }
    }
    return result;
  }).join(' ');
}

// ═══════════════════════════════════════════
// BENGALI
// ═══════════════════════════════════════════
function toBengali(t) {
  const map = [
    ['aa','আ'],['ii','ঈ'],['uu','ঊ'],['ee','এ'],['oo','ও'],['ai','ঐ'],['au','ঔ'],
    ['ksh','ক্ষ'],['sh','শ'],['ch','চ'],['th','থ'],['dh','ধ'],['ph','ফ'],['bh','ভ'],
    ['ng','ঙ'],['ny','ঞ'],['kh','খ'],['gh','ঘ'],['jh','ঝ'],
    ['a','অ'],['i','ই'],['u','উ'],['e','এ'],['o','ও'],
    ['k','ক'],['g','গ'],['c','ক'],['j','জ'],['t','ট'],['d','ড'],
    ['n','ন'],['p','প'],['b','ব'],['m','ম'],['y','য'],['r','র'],
    ['l','ল'],['v','ভ'],['w','ও'],['s','স'],['h','হ'],['f','ফ'],['z','জ'],
  ];
  const vowels = new Set(['অ','আ','ই','ঈ','উ','ঊ','এ','ও','ঐ','ঔ']);
  const matras = {'অ':'','আ':'া','ই':'ি','ঈ':'ী','উ':'ু','ঊ':'ূ','এ':'ে','ও':'ো','ঐ':'ৈ','ঔ':'ৌ'};
  const consonants = new Set(['ক','খ','গ','ঘ','ঙ','চ','ছ','জ','ঝ','ঞ','ট','ঠ','ড','ঢ','ণ',
    'ত','থ','দ','ধ','ন','প','ফ','ব','ভ','ম','য','র','ল','ব','শ','ষ','স','হ']);
  const words = t.toLowerCase().split(/\s+/);
  return words.map(word => {
    const tokens = [];
    let i = 0;
    while (i < word.length) {
      let matched = false;
      for (const [rom, ben] of map) {
        if (word.slice(i).startsWith(rom)) { tokens.push(ben); i += rom.length; matched = true; break; }
      }
      if (!matched) { tokens.push(word[i]); i++; }
    }
    let result = '';
    for (let j = 0; j < tokens.length; j++) {
      const cur = tokens[j], next = tokens[j+1];
      if (consonants.has(cur)) {
        if (vowels.has(next)) { result += cur + (matras[next]||''); j++; }
        else if (next && consonants.has(next)) { result += cur + '্'; }
        else { result += cur; }
      } else { result += cur; }
    }
    return result;
  }).join(' ');
}

// ═══════════════════════════════════════════
// MARATHI (same base as Hindi/Devanagari)
// ═══════════════════════════════════════════
function toMarathi(t) { return toHindi(t); }

// ═══════════════════════════════════════════
// JAPANESE: Romaji → Hiragana
// ═══════════════════════════════════════════
function toJapanese(text) {
  const tbl = [
    ['kya','きゃ'],['kyu','きゅ'],['kyo','きょ'],
    ['sha','しゃ'],['shi','し'],['shu','しゅ'],['sho','しょ'],['si','し'],
    ['chi','ち'],['cha','ちゃ'],['chu','ちゅ'],['cho','ちょ'],['tchi','っち'],['cchi','っち'],
    ['tsu','つ'],['tsi','つ'],
    ['nya','にゃ'],['nyu','にゅ'],['nyo','にょ'],['ni','に'],
    ['hya','ひゃ'],['hyu','ひゅ'],['hyo','ひょ'],
    ['mya','みゃ'],['myu','みゅ'],['myo','みょ'],
    ['rya','りゃ'],['ryu','りゅ'],['ryo','りょ'],
    ['gya','ぎゃ'],['gyu','ぎゅ'],['gyo','ぎょ'],
    ['ja','じゃ'],['ji','じ'],['ju','じゅ'],['jo','じょ'],['jya','じゃ'],['jyu','じゅ'],['jyo','じょ'],
    ['bya','びゃ'],['byu','びゅ'],['byo','びょ'],
    ['pya','ぴゃ'],['pyu','ぴゅ'],['pyo','ぴょ'],
    ['dzu','づ'],['dji','ぢ'],['dya','ぢゃ'],['dyu','ぢゅ'],['dyo','ぢょ'],
    ['ka','か'],['ki','き'],['ku','く'],['ke','け'],['ko','こ'],
    ['sa','さ'],['su','す'],['se','せ'],['so','そ'],
    ['ta','た'],['te','て'],['to','と'],['ti','ち'],['tu','つ'],
    ['na','な'],['nu','ぬ'],['ne','ね'],['no','の'],
    ['ha','は'],['hi','ひ'],['fu','ふ'],['hu','ふ'],['he','へ'],['ho','ほ'],
    ['ma','ま'],['mi','み'],['mu','む'],['me','め'],['mo','も'],
    ['ya','や'],['yu','ゆ'],['yo','よ'],
    ['ra','ら'],['ri','り'],['ru','る'],['re','れ'],['ro','ろ'],
    ['wa','わ'],['wi','ゐ'],['we','ゑ'],['wo','を'],
    ['ga','が'],['gi','ぎ'],['gu','ぐ'],['ge','げ'],['go','ご'],
    ['za','ざ'],['zu','ず'],['ze','ぜ'],['zo','ぞ'],['zi','じ'],
    ['da','だ'],['di','ぢ'],['du','づ'],['de','で'],['do','ど'],
    ['ba','ば'],['bi','び'],['bu','ぶ'],['be','べ'],['bo','ぼ'],
    ['pa','ぱ'],['pi','ぴ'],['pu','ぷ'],['pe','ぺ'],['po','ぽ'],
    ['a','あ'],['i','い'],['u','う'],['e','え'],['o','お'],
    ['n','ん'],
  ];
  const words = text.toLowerCase().trim().split(/\s+/);
  return words.map(w => {
    let res = '', i = 0;
    while (i < w.length) {
      if (i+1 < w.length && w[i] === w[i+1] && !'aiueon'.includes(w[i])) {
        res += 'っ'; i++; continue;
      }
      let matched = false;
      for (const [rom, kana] of tbl) {
        if (w.slice(i).startsWith(rom)) { res += kana; i += rom.length; matched = true; break; }
      }
      if (!matched) { res += w[i]; i++; }
    }
    return res;
  }).join(' ');
}

// ═══════════════════════════════════════════
// KOREAN: Syllable-block composer
// ═══════════════════════════════════════════
function toKorean(text) {
    const common = {
  "annyeonghaseyo": "안녕하세요",
  "saranghae": "사랑해",
  "gamsahamnida": "감사합니다",
  "jeoneun haksaengimnida": "저는 학생입니다",
  "naeil hakgyoe gayo": "내일 학교에 가요",
  "eodi gayo": "어디 가요",
  "mannaseo bangapseumnida": "만나서 반갑습니다",
  "jeongmal gamsahamnida": "정말 감사합니다"
};

const lower = text.toLowerCase().trim();

if (common[lower]) {
  return common[lower];
}

  const ONSET = [
    ['gg','ㄲ'],['dd','ㄸ'],['bb','ㅂ'],['ss','ㅆ'],['jj','ㅉ'],
    ['ch','ㅊ'],
    ['g','ㄱ'],['n','ㄴ'],['d','ㄷ'],['r','ㄹ'],['l','ㄹ'],
    ['m','ㅁ'],['b','ㅂ'],['s','ㅅ'],['j','ㅈ'],
    ['k','ㅋ'],['t','ㅌ'],['p','ㅍ'],['h','ㅎ'],
  ];
  const VOWEL = [
    ['yae','ㅒ'],['yeo','ㅕ'],['wae','ㅙ'],['yai','ㅒ'],
    ['ae','ㅐ'],['ya','ㅑ'],['ye','ㅖ'],['wa','ㅘ'],['oe','ㅚ'],
    ['yo','ㅛ'],['wo','ㅝ'],['we','ㅞ'],['wi','ㅟ'],['yu','ㅠ'],
    ['eu','ㅡ'],['ui','ㅢ'],['eo','ㅓ'],
    ['a','ㅏ'],['e','ㅔ'],['i','ㅣ'],['o','ㅗ'],['u','ㅜ'],
  ];
  const CODA = [
    ['ngs','ㅇ'],['lgs','ㄺ'],['lbs','ㄼ'],['lts','ㄽ'],['lps','ㄿ'],
    ['nj','ㄵ'],['nh','ㄶ'],['lg','ㄺ'],['lm','ㄻ'],['lb','ㄼ'],
    ['lt','ㄽ'],['lp','ㄿ'],['lh','ㄾ'],['bs','ㄼ'],
    ['gg','ㄲ'],['ss','ㅆ'],['ng','ㅇ'],
    ['g','ㄱ'],['n','ㄴ'],['d','ㄷ'],['l','ㄹ'],['r','ㄹ'],
    ['m','ㅁ'],['b','ㅂ'],['s','ㅅ'],['ng','ㅇ'],
    ['j','ㅈ'],['ch','ㅊ'],['k','ㅋ'],['t','ㅌ'],['p','ㅍ'],['h','ㅎ'],
  ];

  const ONSET_LIST  = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
  const VOWEL_LIST  = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
  const CODA_LIST   = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㄼ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

  function syllable(o, v, c) {
    const oi = ONSET_LIST.indexOf(o);
    const vi = VOWEL_LIST.indexOf(v);
    const ci = CODA_LIST.indexOf(c);
    if (oi < 0 || vi < 0 || ci < 0) return null;
    return String.fromCodePoint(0xAC00 + (oi * 21 + vi) * 28 + ci);
  }

  function matchAt(str, i, list) {
    for (const [rom, jamo] of list) {
      if (str.slice(i).startsWith(rom)) return [jamo, rom.length];
    }
    return [null, 0];
  }

  function hasVowelAt(str, i, vlist) {
    for (const [rom] of vlist) {
      if (str.slice(i).startsWith(rom)) return true;
    }
    return false;
  }

  const words = text.toLowerCase().trim().split(/\s+/);
  return words.map(word => {
    let result = '';
    let i = 0;
    while (i < word.length) {
      let onset = 'ㅇ', onsetLen = 0;
      for (const [rom, jamo] of ONSET) {
        if (word.slice(i).startsWith(rom)) {
          const afterOnset = i + rom.length;
          if (hasVowelAt(word, afterOnset, VOWEL)) {
            onset = jamo; onsetLen = rom.length; break;
          }
        }
      }
      i += onsetLen;

      let [vowel, vowelLen] = matchAt(word, i, VOWEL);
      if (!vowel) {
        result += word[i] || '';
        i++;
        continue;
      }
      i += vowelLen;

      let coda = '', codaLen = 0;
      for (const [rom, jamo] of CODA) {
        if (!rom) continue;
        if (word.slice(i).startsWith(rom)) {
          const afterCoda = i + rom.length;
          if (afterCoda >= word.length) { coda = jamo; codaLen = rom.length; break; }
          let nextHasOnsetVowel = false;
          for (const [orom] of ONSET) {
            if (word.slice(afterCoda).startsWith(orom)) {
              if (hasVowelAt(word, afterCoda + orom.length, VOWEL)) { nextHasOnsetVowel = true; break; }
            }
          }
          if (!nextHasOnsetVowel && hasVowelAt(word, afterCoda, VOWEL)) {
            break;
          }
          if (!nextHasOnsetVowel) { coda = jamo; codaLen = rom.length; break; }
          break;
        }
      }
      i += codaLen;

      const syl = syllable(onset, vowel, coda);
      result += syl !== null ? syl : (onset + vowel + coda);
    }
    return result || word;
  }).join(' ');
}

// ═══════════════════════════════════════════
// RUSSIAN: Latin → Cyrillic
// ═══════════════════════════════════════════
function toRussian(text) {
  const tbl = [
    ['shch','щ'],['sch','щ'],['tch','ч'],['kh','х'],['zh','ж'],
    ['ts','ц'],['ch','ч'],['sh','ш'],['yu','ю'],['ya','я'],
    ['yo','ё'],['ye','е'],['yо','ё'],
    ['iy','ий'],['ыy','ый'],
    ['a','а'],['b','б'],['v','в'],['g','г'],['d','д'],
    ['e','е'],['z','з'],['i','и'],['j','й'],['k','к'],
    ['l','л'],['m','м'],['n','н'],['o','о'],['p','п'],
    ['r','р'],['s','с'],['t','т'],['u','у'],['f','ф'],
    ['h','х'],['c','к'],['y','ы'],['q','к'],['x','кс'],['w','в'],
  ];
  return text.split(/\s+/).map(w => {
    const lower = w.toLowerCase();
    let res = '', i = 0;
    while (i < lower.length) {
      let matched = false;
      for (const [rom, cyr] of tbl) {
        if (lower.slice(i).startsWith(rom)) {
          const up = w[i] === w[i].toUpperCase() && /[a-zA-Z]/.test(w[i]);
          res += up ? cyr[0].toUpperCase() + cyr.slice(1) : cyr;
          i += rom.length; matched = true; break;
        }
      }
      if (!matched) { res += w[i]; i++; }
    }
    return res;
  }).join(' ');
}

// ═══════════════════════════════════════════
// ARABIC: Transliteration → Arabic
// ═══════════════════════════════════════════
function toArabic(text) {
  const phrases = {
    'assalamu alaikum':'السلام عليكم','wa alaikum salam':'وعليكم السلام',
    'assalam alaikum':'السلام عليكم','ahlan wa sahlan':'أهلاً وسهلاً',
    'sabah al khayr':'صباح الخير','sabah alnoor':'صباح النور',
    'masa al khayr':'مساء الخير','masa alnoor':'مساء النور',
    'maa salama':'مع السلامة','ma salama':'مع السلامة',
    'kayfa halak':'كيف حالك','kayf halak':'كيف حالك',
    'inshallah':'إن شاء الله','alhamdulillah':'الحمد لله',
    'bismillah':'بسم الله','allahu akbar':'الله أكبر',
    'subhanallah':'سبحان الله','mashallah':'ما شاء الله',
    'ana uhibbuka':'أنا أحبك','ana uhibbuki':'أنا أحبك',
    'shukran jazilan':'شكراً جزيلاً',
    'min fadlak':'من فضلك','min fadlik':'من فضلك',
  };
  const words = {
    'marhaba':'مرحبا','marhaban':'مرحباً','ahlan':'أهلاً','salam':'سلام',
    'shukran':'شكراً','afwan':'عفواً','naam':'نعم','la':'لا',
    'ana':'أنا','anta':'أنتَ','anti':'أنتِ','huwa':'هو','hiya':'هي',
    'habibi':'حبيبي','habibti':'حبيبتي',
    'sabah':'صباح','masa':'مساء','layl':'ليل',
    'jamil':'جميل','jamila':'جميلة','kabir':'كبير','saghir':'صغير',
    'bayt':'بيت','madrasa':'مدرسة','kitab':'كتاب',
    'allah':'الله','inshallah':'إن شاء الله','alhamdulillah':'الحمد لله',
    'ismi':'اسمي','ism':'اسم','maa':'مع','min':'من','ila':'إلى',
    'fi':'في','ala':'على','wa':'و',
    'zain':'زين','tamam':'تمام','khalas':'خلاص','yalla':'يلا',
    'tayeb':'طيب','helwa':'حلوة','helw':'حلو',
  };
  const tbl = [
    ['kh','خ'],['gh','غ'],['sh','ش'],['th','ث'],['dh','ذ'],['dh','ظ'],
    ['aa','ا'],['ee','ي'],['oo','و'],['ii','ي'],['uu','و'],
    ['\'','ع'],["'",'ع'],['\`','ء'],
    ['a','ا'],['b','ب'],['t','ت'],['j','ج'],['h','ح'],['d','د'],
    ['r','ر'],['z','ز'],['s','س'],['f','ف'],['q','ق'],['k','ك'],
    ['l','ل'],['m','م'],['n','ن'],['w','و'],['y','ي'],['e','ع'],
    ['i','إ'],['u','أ'],['o','و'],
  ];
  const low = text.toLowerCase().trim();
  if (phrases[low]) return phrases[low];
  const parts = low.split(/\s+/);
  return parts.map(w => {
    if (words[w]) return words[w];
    let res = '', i = 0;
    while (i < w.length) {
      let matched = false;
      for (const [rom, ar] of tbl) {
        if (w.slice(i).startsWith(rom)) { res += ar; i += rom.length; matched = true; break; }
      }
      if (!matched) { res += w[i]; i++; }
    }
    return res;
  }).join(' ');
}

// ═══════════════════════════════════════════
// CHINESE: Pinyin → Hanzi (common words)
// ═══════════════════════════════════════════
function toChinese(text) {
  const phrases = {
    'ni hao':'你好','nin hao':'您好','ni hao ma':'你好吗',
    'zaoshang hao':'早上好','wanshang hao':'晚上好','wan an':'晚安',
    'xie xie':'谢谢','bu ke qi':'不客气','mei guan xi':'没关系',
    'dui bu qi':'对不起','wo ai ni':'我爱你','zai jian':'再见',
    'sheng ri kuai le':'生日快乐','xin nian kuai le':'新年快乐',
    'gong xi fa cai':'恭喜发财','ni chi le ma':'你吃了吗',
    'wo bu zhi dao':'我不知道','wo zhi dao':'我知道',
    'mei you':'没有','you mei you':'有没有','ke yi':'可以',
    'zen me yang':'怎么样','zen me le':'怎么了',
    'hao de':'好的','dui dui dui':'对对对',
    'wo men':'我们','ni men':'你们','ta men':'他们',
    'yi qi':'一起','he shui':'喝水','chi fan':'吃饭',
    'ni hao ma':'你好吗',
  };
  const words = {
    'wo':'我','ni':'你','ta':'他','women':'我们','nimen':'你们','tamen':'他们',
    'hao':'好','bu':'不','shi':'是','dui':'对','you':'有','zai':'在',
    'da':'大','xiao':'小','duo':'多','shao':'少','kuai':'快','man':'慢',
    'chi':'吃','he':'喝','qu':'去','lai':'来','shuo':'说','kan':'看',
    'ma':'妈','ba':'爸','ge':'哥','jie':'姐','di':'弟','mei':'妹',
    'pengyou':'朋友','laoshi':'老师','xuesheng':'学生',
    'zhongguo':'中国','meiguo':'美国','yingguo':'英国','riben':'日本',
    'shenme':'什么','zenme':'怎么','nali':'哪里','shei':'谁','shui':'谁',
    'duoshao':'多少','weishenme':'为什么',
    'yi':'一','er':'二','san':'三','si':'四','wu':'五',
    'liu':'六','qi':'七','ba':'八','jiu':'九','shi':'十',
    'xiexie':'谢谢','zaijian':'再见','nihao':'你好',
    'wanan':'晚安','hen':'很','tai':'太','zhen':'真',
    'xiang':'想','yao':'要','neng':'能','hui':'会',
    'le':'了','de':'的','ne':'呢','ma':'吗','ba':'吧',
    'kuaile':'快乐','shengri':'生日','gaoxing':'高兴',
    'meili':'美丽','haochi':'好吃','haohe':'好喝',
    'mingzi':'名字','wenti':'问题','huida':'回答',
  };
  const low = text.toLowerCase().trim();
  if (phrases[low]) return phrases[low];
  let result = low;
  const sorted = Object.keys(phrases).sort((a,b)=>b.length-a.length);
  for (const p of sorted) {
    if (result.includes(p)) result = result.split(p).join(phrases[p]);
  }
  if (result !== low) return result;
  return low.split(/\s+/).map(w => words[w] || w).join('');
}

// ═══════════════════════════════════════════
// DISPATCH
// ═══════════════════════════════════════════

async function transliterate(text, lang) {
  const map = {
    hi: "hi-t-i0-und",
    mr: "mr-t-i0-und",
    te: "te-t-i0-und",
    ta: "ta-t-i0-und",
    kn: "kn-t-i0-und",
    ml: "ml-t-i0-und",
    bn: "bn-t-i0-und",
    ja: "ja-t-i0-und",
    ko: "ko-hangul",
    ru: "ru-t-i0-und",
    ar: "ar-t-i0-und",
    "zh-CN": "zh-t-i0-pinyin"
  };

  try {
    const url =
      `https://inputtools.google.com/request?text=${encodeURIComponent(text)}&itc=${map[lang]}&num=1`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(lang);
    console.log(data);
    if (data[0] === "SUCCESS") {
      return data[1][0][1][0];
    }
  } catch (e) {
    console.error(e);
  }

  return text;
}

async function convertScript(text, lang) {
  if(['hi','mr','te','ta','kn','ml','bn'].includes(lang)) {
    return await transliterate(text, lang);
  }
  switch(lang) {
    case 'ja':
      return await transliterate(text,'ja');
    case 'ru':
      return await transliterate(text,'ru');
    case 'ar':
      return await transliterate(text,'ar');
    case 'ko':
      return toKorean(text);
    case 'zh-CN':
      return await transliterate(text,'zh-CN');
    default:
      return text;
  }
}

// ═══════════════════════════════════════════
// AUTO-DETECT: use Google Translate detect
// ═══════════════════════════════════════════
const LANG_NAMES = {
  'af':'Afrikaans','sq':'Albanian','am':'Amharic','ar':'Arabic','hy':'Armenian',
  'az':'Azerbaijani','eu':'Basque','be':'Belarusian','bn':'Bengali','bs':'Bosnian',
  'bg':'Bulgarian','ca':'Catalan','ceb':'Cebuano','ny':'Chichewa',
  'zh-CN':'Chinese (Simplified)','zh-TW':'Chinese (Traditional)',
  'co':'Corsican','hr':'Croatian','cs':'Czech','da':'Danish','nl':'Dutch',
  'en':'English','eo':'Esperanto','et':'Estonian','tl':'Filipino','fi':'Finnish',
  'fr':'French','fy':'Frisian','gl':'Galician','ka':'Georgian','de':'German',
  'el':'Greek','gu':'Gujarati','ht':'Haitian Creole','ha':'Hausa','haw':'Hawaiian',
  'iw':'Hebrew','hi':'Hindi','hmn':'Hmong','hu':'Hungarian','is':'Icelandic',
  'ig':'Igbo','id':'Indonesian','ga':'Irish','it':'Italian','ja':'Japanese',
  'jw':'Javanese','kn':'Kannada','kk':'Kazakh','km':'Khmer','rw':'Kinyarwanda',
  'ko':'Korean','ku':'Kurdish','ky':'Kyrgyz','lo':'Lao','la':'Latin',
  'lv':'Latvian','lt':'Lithuanian','lb':'Luxembourgish','mk':'Macedonian',
  'mg':'Malagasy','ms':'Malay','ml':'Malayalam','mt':'Maltese','mi':'Maori',
  'mr':'Marathi','mn':'Mongolian','my':'Myanmar (Burmese)','ne':'Nepali',
  'no':'Norwegian','or':'Odia','ps':'Pashto','fa':'Persian','pl':'Polish',
  'pt':'Portuguese','pa':'Punjabi','ro':'Romanian','ru':'Russian','sm':'Samoan',
  'gd':'Scots Gaelic','sr':'Serbian','st':'Sesotho','sn':'Shona','sd':'Sindhi',
  'si':'Sinhala','sk':'Slovak','sl':'Slovenian','so':'Somali','es':'Spanish',
  'su':'Sundanese','sw':'Swahili','sv':'Swedish','tg':'Tajik','ta':'Tamil',
  'tt':'Tatar','te':'Telugu','th':'Thai','tr':'Turkish','tk':'Turkmen',
  'uk':'Ukrainian','ur':'Urdu','ug':'Uyghur','uz':'Uzbek','vi':'Vietnamese',
  'cy':'Welsh','xh':'Xhosa','yi':'Yiddish','yo':'Yoruba','zu':'Zulu'
};

function detectRomanizedLanguage(text){

    const t = text.toLowerCase().trim();

    if(t.includes("annyeong")) return "ko";
    if(t.includes("saranghae")) return "ko";
    if(t.includes("gamsahamnida")) return "ko";

    if(t.includes("ni hao")) return "zh-CN";
    if(t.includes("xie xie")) return "zh-CN";
    if(t.includes("zai jian")) return "zh-CN";

    if(t.includes("konnichiwa")) return "ja";
    if(t.includes("arigatou")) return "ja";
    if(t.includes("ohayou")) return "ja";

    if(t.includes("privet")) return "ru";
    if(t.includes("spasibo")) return "ru";

    if(t.includes("marhaba")) return "ar";
    if(t.includes("shukran")) return "ar";

    return null;
}

async function detectLanguage(text) {

    // First check romanized patterns
    const romanized = detectRomanizedLanguage(text);
    if (romanized) return romanized;

    try {
        const url =
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`;

        const r = await fetch(url);
        const d = await r.json();

        let detected = d?.[2] || null;

        const supported = [
            'te','hi','ta','kn','ml','bn','mr',
            'en','fr','de','es','pt','it',
            'ja','zh-CN','ko','ar','ru'
        ];

        if (supported.includes(detected)) {
            return detected;
        }

        return 'en'; // fallback only to English
    }
    catch(e){
        console.error(e);
        return 'en';
    }
}

function showDetectedBadge(langCode) {
  const badge = document.getElementById('detectedBadge');
  const name = LANG_NAMES[langCode] || langCode;
  badge.textContent = '🌐 Detected: ' + name;
  badge.classList.add('show');
}

function hideDetectedBadge() {
  const badge = document.getElementById('detectedBadge');
  badge.classList.remove('show');
  badge.textContent = '';
}

// ═══════════════════════════════════════════
// APP LOGIC
// ═══════════════════════════════════════════
const TRANSLIT_LANGS = new Set(['hi','mr','te','ta','kn','ml','bn','ja','ko','ru','ar','zh-CN']);
const NON_ENGLISH = ['te','hi','ta','kn','ml','bn','mr','ja','zh-CN','ko','ar','ru'];
const VOICE_LOCALES = {
  te:['te-IN'],hi:['hi-IN'],ta:['ta-IN'],kn:['kn-IN'],
  ml:['ml-IN'],bn:['bn-IN'],mr:['mr-IN'],
  en:['en-US','en-GB'],fr:['fr-FR'],de:['de-DE'],
  es:['es-ES','es-MX'],pt:['pt-BR','pt-PT'],it:['it-IT'],
  ja:['ja-JP'],'zh-CN':['zh-CN','zh-TW'],ko:['ko-KR'],
  ar:['ar-SA','ar-EG'],ru:['ru-RU']
};

let translatedText = '';
let convertedScript = '';
let debounceTimer = null;
let liveTranslateTimer = null;
let detectTimer = null;
let lastDetectedLang = null;
let allVoices = [];

function loadVoices(){ allVoices = speechSynthesis.getVoices(); }
loadVoices();
speechSynthesis.onvoiceschanged = loadVoices;
function setStatus(html){ document.getElementById('status').innerHTML = html; }
function showPreview(text){ const p=document.getElementById('translitPreview'); p.textContent='→ '+text; p.classList.add('show'); }
function hidePreview(){ const p=document.getElementById('translitPreview'); p.textContent=''; p.classList.remove('show'); }
function isEnglishInput(text){ return /^[a-zA-Z\s.,!?'"0-9\-]+$/.test(text.trim()); }

function onInput(){
  clearTimeout(debounceTimer);
  clearTimeout(detectTimer);
  document.getElementById('resultText').value = '';
  translatedText = '';
  const raw = document.getElementById('inputText').value.trim();
  const src = document.getElementById('srcLang').value;

  // ── AUTO-DETECT logic ──
  if (src === 'auto') {
    if (raw.length >= 2) {
      detectTimer = setTimeout(async () => {
        let detected = detectRomanizedLanguage(raw);

if(!detected){
    detected = await detectLanguage(raw);
}
        if (detected) {
          lastDetectedLang = detected;
          showDetectedBadge(detected);
        } else {
          hideDetectedBadge();
          lastDetectedLang = null;
        }
      }, 500);
    } else {
      hideDetectedBadge();
      lastDetectedLang = null;
    }
    // In auto mode: skip transliteration badge/preview, just handle live translate below
    document.getElementById('badge').style.display = 'none';
    hidePreview();
    convertedScript = '';
  } else {
    // ── Normal (non-auto) mode — exactly as before ──
    hideDetectedBadge();
    lastDetectedLang = null;
    if(NON_ENGLISH.includes(src) && raw && isEnglishInput(raw)){
      document.getElementById('badge').style.display='inline-block';
      debounceTimer = setTimeout(async ()=>{
        const result = await convertScript(raw, src);
        if(result && result !== raw){ convertedScript=result; showPreview(result); }
        else { hidePreview(); convertedScript=''; }
      }, 200);
    } else {
      document.getElementById('badge').style.display='none';
      hidePreview(); convertedScript='';
    }
  }

  // ── Live translation ──
  const liveBox = document.getElementById('liveTranslate');
  if(liveBox && liveBox.checked){
    clearTimeout(liveTranslateTimer);
    liveTranslateTimer = setTimeout(() => {
      const txt = document.getElementById('inputText').value.trim();
      const tgt = document.getElementById('tgtLang').value;
      if(txt && tgt){
        doTranslate();
      }
    }, 1000);
  }
}
document.getElementById('tgtLang').addEventListener('change', () => {
  const liveBox = document.getElementById('liveTranslate');

  if (liveBox && liveBox.checked) {
    const txt = document.getElementById('inputText').value.trim();

    if (txt) {
      doTranslate();
    }
  }
});

document.getElementById('srcLang').addEventListener('change', () => {
  const liveBox = document.getElementById('liveTranslate');

  if (liveBox && liveBox.checked) {
    const txt = document.getElementById('inputText').value.trim();

    if (txt) {
      doTranslate();
    }
  }
});
async function doTranslate(){
  const raw = document.getElementById('inputText').value.trim();
  if(!raw){ setStatus('⚠️ Please enter some text first.'); return; }
  const src = document.getElementById('srcLang').value;
  const tgt = document.getElementById('tgtLang').value;
  
  if(!tgt){ setStatus('⚠️ Please select a target language.'); return; }

  document.getElementById('translateBtn').disabled=true;
  setStatus('<span class="spinner"></span> Translating…');

  let textToTranslate = raw;
  let effectiveSrc = src;

  if (src === 'auto') {

    if (!lastDetectedLang) {
        const detected = await detectLanguage(raw);

        if (detected) {
            lastDetectedLang = detected;
            showDetectedBadge(detected);
        }
    }

    effectiveSrc = lastDetectedLang || 'auto';

    if (
        lastDetectedLang &&
        TRANSLIT_LANGS.has(lastDetectedLang) &&
        isEnglishInput(raw)
    ) {

        const script = await convertScript(raw, lastDetectedLang);

        console.log("SCRIPT:", script);

        if (script && script !== raw) {
            textToTranslate = script;
            convertedScript = script;
            showPreview(script);
        } else {
            textToTranslate = raw;
        }

    } else {
        textToTranslate = raw;
    }
}
   else {
    // Normal mode: transliterate if needed (unchanged)
    if(NON_ENGLISH.includes(src) && isEnglishInput(raw) && TRANSLIT_LANGS.has(src)){
      const script = convertedScript || await convertScript(raw, src);
      if(script && script !== raw){ textToTranslate=script; convertedScript=script; showPreview(script); }
    }
  }

  console.log("SOURCE:", effectiveSrc);
  console.log("TEXT:", textToTranslate);
  let result = null;
 
  try{ result = await googleGTX(textToTranslate, effectiveSrc, tgt); }catch(e){}
  if(!result){ try{ result = await googleGTX(textToTranslate,'auto',tgt); }catch(e){} }
  if(!result){ try{ result = await myMemory(textToTranslate, effectiveSrc, tgt); }catch(e){} }

  document.getElementById('translateBtn').disabled=false;
  if(result){ translatedText=result; document.getElementById('resultText').value=result; setStatus('✅ Translation complete!'); }
  else { setStatus('❌ Translation failed. Please check your internet connection and try again.'); }
}

async function googleGTX(text, src, tgt){
  const url=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${src}&tl=${tgt}&dt=t&q=${encodeURIComponent(text)}`;
  const r=await fetch(url); if(!r.ok) throw new Error('HTTP '+r.status);
  const d=await r.json(); if(!d[0]) throw new Error('No data');
  // When sl=auto, d[2] holds detected language — update badge
  if (src === 'auto' && d[2]) {
    lastDetectedLang = d[2];
    showDetectedBadge(d[2]);
  }
  const out=d[0].map(i=>(i[0]||'')).join('').trim(); if(!out) throw new Error('Empty');
  return out;
}

async function myMemory(text, src, tgt){
  const s=src==='zh-CN'?'zh':src==='auto'?'':src;
  const t=tgt==='zh-CN'?'zh':tgt;
  const pair = s ? `${s}|${t}` : `|${t}`;
  const url=`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${pair}`;
  const r=await fetch(url); if(!r.ok) throw new Error('HTTP '+r.status);
  const d=await r.json();
  const out=(d?.responseData?.translatedText||'').trim();
  if(!out||out.toUpperCase().includes('PLEASE SELECT')||out.toLowerCase()===text.toLowerCase()) throw new Error('Bad');
  return out;
}

function doCopy(){
  const t = document.getElementById('resultText').value;
  if(!t){ setStatus('⚠️ Nothing to copy yet.'); return; }
  navigator.clipboard.writeText(t).then(()=>setStatus('📋 Copied!')).catch(()=>{
    const el=document.getElementById('resultText'); el.select(); document.execCommand('copy'); setStatus('📋 Copied!');
  });
}
function googleTTSAudio(text, locale) {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${locale}&client=tw-ob`;
  const a = new Audio(url);
  a.onplay  = () => setStatus('🔊 Speaking via Google TTS…');
  a.onended = () => setStatus('✅ Done speaking.');
  a.onerror = () => setStatus('⚠️ Voice not available. Try Chrome for best support.');
  a.play().catch(() => setStatus('⚠️ Could not play audio. Use Chrome for best language voice support.'));
}

function findVoice(langCode) {
  if (!allVoices.length) allVoices = speechSynthesis.getVoices();

  const locales = VOICE_LOCALES[langCode] || [langCode];

  for (const loc of locales) {
    const v = allVoices.find(
      x => x.lang.toLowerCase() === loc.toLowerCase()
    );

    if (v) return v;
  }

  const prefix = langCode.split('-')[0].toLowerCase();

  return allVoices.find(
    x => x.lang.toLowerCase().startsWith(prefix)
  ) || null;
}

function doSpeak(){
  const tgt = document.getElementById('tgtLang').value;
  const text = document.getElementById('resultText').value;

  if(!text){
    setStatus('⚠️ Nothing to speak yet.');
    return;
  }

  if(!window.speechSynthesis){
    setStatus('❌ Speech not supported.');
    return;
  }

  speechSynthesis.cancel();

  const utt = new SpeechSynthesisUtterance(text);

  const voice = findVoice(tgt);

  console.log("Target:", tgt);
  console.log("Voice found:", voice);

  if(!voice){
    googleTTSAudio(text, tgt);
    return;
  }

  utt.voice = voice;
  utt.lang = voice.lang;

  setStatus('🔊 Speaking…');

  utt.onend = () => setStatus('✅ Done speaking.');

  speechSynthesis.speak(utt);
}

function doClear(){
  document.getElementById('inputText').value='';
  document.getElementById('resultText').value='';
  document.getElementById('badge').style.display='none';
  hidePreview(); hideDetectedBadge();
  translatedText=''; convertedScript=''; lastDetectedLang=null;
  setStatus('');
}

function swapLangs(){
  const src = document.getElementById('srcLang');
  const tgt = document.getElementById('tgtLang');
  if(src.value === 'auto'){ setStatus('⚠️ Cannot swap when Auto Detect is selected. Please choose a source language first.'); return; }
  const tmp = src.value;
  const tgtVal = tgt.value;
  const srcHasTgt = [...src.options].some(o=>o.value===tgtVal);
  const tgtHasSrc = [...tgt.options].some(o=>o.value===tmp);
  if(srcHasTgt) src.value = tgtVal;
  if(tgtHasSrc) tgt.value = tmp;
  const inText = document.getElementById('inputText').value;
  const outText = document.getElementById('resultText').value;
  if(outText){ document.getElementById('inputText').value=outText; document.getElementById('resultText').value=''; translatedText=''; }
  hidePreview(); hideDetectedBadge(); convertedScript=''; lastDetectedLang=null;
}

document.addEventListener('keydown', e=>{
  if(e.ctrlKey && e.key==='Enter') doTranslate();
});
