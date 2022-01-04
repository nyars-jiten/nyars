
// var latList = ["*tu", "kya", "kyu", "kyo", "gya", "gyu", "gyo", "kwa", "kwi", "kwu", "kwe", "kwo", "shi", "je", "sha", "shu", "sho", "she", "chi", "tsu", "dji", "tsa", "tsi", "tse", "tso", "cha", "chu", "cho", "dja", "dju", "djo", "dya", "dyu", "dyo", "che", "nya", "nyu", "nyo", "hya", "hyu", "hyo", "bya", "byu", "byo", "pya", "pyu", "pyo", "fya", "fyu", "fyo", "mya", "myu", "myo", "rya", "ryu", "ryo", "vya", "vyu", "vyo", "ka", "ki", "ku", "ke", "ko", "ga", "gi", "gu", "ge", "go", "sa", "su", "se", "so", "za", "ji", "zu", "ze", "zo", "ja", "ju", "jo", "si", "ta", "te", "to", "da", "du", "de", "do", "ti", "tu", "di", "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ba", "bi", "bu", "be", "bo", "pa", "pi", "pu", "pe", "po", "fa", "fi", "fe", "fo", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wo", "wyi", "wye", "wi", "we", "va", "vi", "vu", "ve", "vo", "a", "i", "u", "e", "o", "n", "n'", "*a", "*i", "*u", "*e", "*o", "*ha", "*ya", "*yu", "*yo"];
// var hirList = ["っ", "きゃ", "きゅ", "きょ", "ぎゃ", "ぎゅ", "ぎょ", "くぁ", "くィ", "くぅ", "くぇ", "くぉ", "し", "じぇ", "しゃ", "しゅ", "しょ", "しェ", "ち", "つ", "ぢ", "つぁ", "つぃ", "つぇ", "つぉ", "ちゃ", "ちゅ", "ちょ", "ぢゃ", "ぢゅ", "ぢょ", "でゃ", "でゅ", "でょ", "ちぇ", "にゃ", "にゅ", "にょ", "ひゃ", "ひゅ", "ひょ", "びゃ", "びゅ", "びょ", "ぴゃ", "ぴゅ", "ぴょ", "ふゃ", "ふゅ", "ふょ", "みゃ", "みゅ", "みょ", "りゃ", "りゅ", "りょ", "ゔゃ", "ゔゅ", "ゔょ", "か", "き", "く", "け", "こ", "が", "ぎ", "ぐ", "げ", "ご", "さ", "す", "せ", "そ", "ざ", "じ", "ず", "ぜ", "ぞ", "じゃ", "じゅ", "じょ", "しぃ", "た", "て", "と", "だ", "づ", "で", "ど", "てぃ", "トぅ", "でぃ", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ば", "び", "ぶ", "べ", "ぼ", "ぱ", "ぴ", "ぷ", "ぺ", "ぽ", "ふぁ", "ふぃ", "ふぇ", "ふぉ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "ゐ", "ゑ", "うぃ", "うぇ", "ゔぁ", "ゔぃ", "ゔ", "ゔぇ", "ゔぉ", "あ", "い", "う", "え", "お", "ん", "ん", "ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "は", "ゃ", "ゅ", "ょ"];
// var katList = ["ッ", "キャ", "キュ", "キョ", "ギャ", "ギュ", "ギョ", "クァ", "クィ", "クゥ", "クェ", "クォ", "シ", "ジェ", "シャ", "シュ", "ショ", "シィ", "チ", "ツ", "ヂ", "ツァ", "ツィ", "ツェ", "ツォ", "チャ", "チュ", "チョ", "ヂャ", "ヂュ", "ヂョ", "デャ", "デュ", "デョ", "チェ", "ニャ", "ニュ", "ニョ", "ヒャ", "ヒュ", "ヒョ", "ビャ", "ビュ", "ビョ", "ピャ", "ピュ", "ピョ", "フャ", "フュ", "フョ", "ミャ", "ミュ", "ミョ", "リャ", "リュ", "リョ", "ヴャ", "ヴュ", "ヴョ", "カ", "キ", "ク", "ケ", "コ", "ガ", "ギ", "グ", "ゲ", "ゴ", "サ", "ス", "セ", "ソ", "ザ", "ジ", "ズ", "ゼ", "ゾ", "ジャ", "ジュ", "ジョ", "シィ", "タ", "テ", "ト", "ダ", "ヅ", "デ", "ド", "ティ", "トゥ", "ディ", "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ", "バ", "ビ", "ブ", "ベ", "ボ", "パ", "ピ", "プ", "ペ", "ポ", "ファ", "フィ", "フェ", "フォ", "マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ", "ラ", "リ", "ル", "レ", "ロ", "ワ", "ヲ", "ヰ", "ヱ", "ウィ", "ウェ", "ヴァ", "ヴィ", "ヴ", "ヴェ", "ヴォ", "ア", "イ", "ウ", "エ", "オ", "ン", "ン", "ァ", "ィ", "ゥ", "ェ", "ォ", "ハ", "ャ", "ュ", "ョ"];
var excludedStrs = ['-', ' ', "'", '(',')','^'];

export function transcriptionConvert(raw, type, table) {

  if (type === 'hiragana') return scriptConvert(raw, table)
  if (type === 'katakana') return scriptConvert('!' + raw, table)

  let notChanged = raw;
  raw = raw.toLowerCase().trim();
  var result = '';

  for (let i = 0; i <= raw.length; i++) {
    let chunk = "";
    let j = 4;
    for (; j > 0; j--) {
      if (i + j > raw.length) continue;

      chunk = raw.substr(i, j);

      if (Object.prototype.hasOwnProperty.call(table, chunk)) {
        break;
      }
    }

    // result += transaltionList[chunkIndex];
    // i += chunk.length - 1;

    if (j != 0 && Object.prototype.hasOwnProperty.call(table, chunk)) {
      if (i + 1 < raw.Length && chunk == "n" && "bpm".includes(raw[i + 1]) && type === 2)
      {
          result += "м";
      }
      else
      {
          result += table[chunk][type];
      }
      i += chunk.length - 1;

    } else {
      if (!chunk) continue;

      if (chunk == ":" && i > 0) {
        // знак удлинения
        result += chunk;

      } else if (chunk == "!") {
        // смена хирагана - катакана
        if (result.length > 0 && result[i - 1] != ' ')
        {
          result += " ";
        }

      } else if (i + 1 < raw.length && chunk == "\\") {
        i++;
        result += notChanged[i];

      } else if (
        i + 1 < raw.length &&
        ((chunk[0] == raw[i + 1] && "qwrtpsdfghkljzxcvbnm".includes(chunk[0])) || (chunk[0] == "t" && raw[i + 1] == "c"))
      ) {
        for (let jTemp = 4; jTemp > 0; jTemp--)
        {
            if (i + 1 + jTemp > raw.Length) continue;

            let nextChunk = raw.substr(i + 1, jTemp);

            if (Object.prototype.hasOwnProperty.call(table, nextChunk))
            {
                let nextTranslChunk = table[nextChunk][type];
                if (nextTranslChunk[0] == 'ц')
                    result += 'т';
                else
                    result += nextTranslChunk[0];
                break;
            }
        }
      } else if (excludedStrs.indexOf(chunk) != -1) {
        //
      } else {
        result += chunk;
      }
    }
  }

  return result;
}


function scriptConvert(raw, table) {
  let notChanged = raw;
  raw = raw.toLowerCase();
  let type = 'hiragana';
  var result = "";
  // let transaltionList = [];

  // latList = table.literal;
  // hirList = table.hiragana;
  // katList = table.katakana;

  // switch (type) {
  //   case 0:
  //     transaltionList = hirList;
  //     break;

  //   case 1:
  //     transaltionList = katList;
  //     break;

  //   default:
  //     transaltionList = hirList;
  //     break;
  // }

  for (let i = 0; i <= raw.length; i++) {
    let chunk = "";
    let j = 4;
    for (; j > 0; j--) {
      if (i + j > raw.length) continue;

      chunk = raw.substr(i, j);
      // let chunkIndex = latList.indexOf(chunk);

      if (Object.prototype.hasOwnProperty.call(table, chunk)) {
        result += table[chunk][type];
        i += chunk.length - 1;
        break;
      }
    }

    if (j == 0) {
      if (!chunk) continue;

      let skipI = 1;
      if (chunk == ":" && i >= skipI) {
        if (excludedStrs.indexOf(raw[i - 1]) != -1) skipI++;

        if (type == 'hiragana') {
          switch (raw[i - skipI]) {
            case 'o':
              result += "う";
              break;

            case 'u':
              result += "う";
              break;

            case 'a':
              result += "あ";
              break;

            case 'i':
              result += "い";
              break;

            case 'e':
              result += "え";
              break;

            default:
              result += ":";
              break;
          }

        } else {
          result += "ー";
        }
      } else if (chunk == "!") {
        type = type === 'hiragana' ? 'katakana' : 'hiragana';
      } else if (i + 2 < raw.length && chunk[0] == raw[i + 2] && raw[i + 1] == '!') {
        result += table['*tu'][type];
      } else if (i + 1 < raw.length && chunk == "\\") {
        i++;
        result += notChanged[i];
      } else if (
        i + 1 < raw.length &&
        ((chunk[0] == raw[i + 1] && "qwrtpsdfghkljzxcvbnm".includes(chunk[0])) || (chunk[0] == "t" && raw[i + 1] == "c"))
      ) {
        result += table['*tu'][type];
      } else if (excludedStrs.indexOf(chunk) != -1) {
        //
      } else {
        result += chunk;
      }
    }
  }

  return result;
}
