
var latList = ["*tu", "kya", "kyu", "kyo", "gya", "gyu", "gyo", "kwa", "kwi", "kwu", "kwe", "kwo", "shi", "je", "sha", "shu", "sho", "she", "chi", "tsu", "dji", "tsa", "tsi", "tse", "tso", "cha", "chu", "cho", "dja", "dju", "djo", "dya", "dyu", "dyo", "che", "nya", "nyu", "nyo", "hya", "hyu", "hyo", "bya", "byu", "byo", "pya", "pyu", "pyo", "fya", "fyu", "fyo", "mya", "myu", "myo", "rya", "ryu", "ryo", "vya", "vyu", "vyo", "ka", "ki", "ku", "ke", "ko", "ga", "gi", "gu", "ge", "go", "sa", "su", "se", "so", "za", "ji", "zu", "ze", "zo", "ja", "ju", "jo", "si", "ta", "te", "to", "da", "du", "de", "do", "ti", "tu", "di", "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ba", "bi", "bu", "be", "bo", "pa", "pi", "pu", "pe", "po", "fa", "fi", "fe", "fo", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wo", "wi", "we", "va", "vi", "vu", "ve", "vo", "a", "i", "u", "e", "o", "n", "n'", "*a", "*i", "*u", "*e", "*o", "*ha", "*ya", "*yu", "*yo"];
var hirList = ["っ", "きゃ", "きゅ", "きょ", "ぎゃ", "ぎゅ", "ぎょ", "くぁ", "くィ", "くぅ", "くぇ", "くぉ", "し", "じぇ", "しゃ", "しゅ", "しょ", "しェ", "ち", "つ", "ぢ", "つぁ", "つぃ", "つぇ", "つぉ", "ちゃ", "ちゅ", "ちょ", "ぢゃ", "ぢゅ", "ぢょ", "でゃ", "でゅ", "でょ", "ちぇ", "にゃ", "にゅ", "にょ", "ひゃ", "ひゅ", "ひょ", "びゃ", "びゅ", "びょ", "ぴゃ", "ぴゅ", "ぴょ", "ふゃ", "ふゅ", "ふょ", "みゃ", "みゅ", "みょ", "りゃ", "りゅ", "りょ", "ゔゃ", "ゔゅ", "ゔょ", "か", "き", "く", "け", "こ", "が", "ぎ", "ぐ", "げ", "ご", "さ", "す", "せ", "そ", "ざ", "じ", "ず", "ぜ", "ぞ", "じゃ", "じゅ", "じょ", "しぃ", "た", "て", "と", "だ", "づ", "で", "ど", "てぃ", "トぅ", "でぃ", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ば", "び", "ぶ", "べ", "ぼ", "ぱ", "ぴ", "ぷ", "ぺ", "ぽ", "ふぁ", "ふぃ", "ふぇ", "ふぉ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "うぃ", "うぇ", "ゔぁ", "ゔぃ", "ゔ", "ゔぇ", "ゔぉ", "あ", "い", "う", "え", "お", "ん", "ん", "ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "は", "ゃ", "ゅ", "ょ"];
var katList = ["ッ", "キャ", "キュ", "キョ", "ギャ", "ギュ", "ギョ", "クァ", "クィ", "クゥ", "クェ", "クォ", "シ", "ジェ", "シャ", "シュ", "ショ", "シィ", "チ", "ツ", "ヂ", "ツァ", "ツィ", "ツェ", "ツォ", "チャ", "チュ", "チョ", "ヂャ", "ヂュ", "ヂョ", "デャ", "デュ", "デョ", "チェ", "ニャ", "ニュ", "ニョ", "ヒャ", "ヒュ", "ヒョ", "ビャ", "ビュ", "ビョ", "ピャ", "ピュ", "ピョ", "フャ", "フュ", "フョ", "ミャ", "ミュ", "ミョ", "リャ", "リュ", "リョ", "ヴャ", "ヴュ", "ヴョ", "カ", "キ", "ク", "ケ", "コ", "ガ", "ギ", "グ", "ゲ", "ゴ", "サ", "ス", "セ", "ソ", "ザ", "ジ", "ズ", "ゼ", "ゾ", "ジャ", "ジュ", "ジョ", "シィ", "タ", "テ", "ト", "ダ", "ヅ", "デ", "ド", "ティ", "トゥ", "ディ", "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ", "バ", "ビ", "ブ", "ベ", "ボ", "パ", "ピ", "プ", "ペ", "ポ", "ファ", "フィ", "フェ", "フォ", "マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ", "ラ", "リ", "ル", "レ", "ロ", "ワ", "ヲ", "ウィ", "ウェ", "ヴァ", "ヴィ", "ヴ", "ヴェ", "ヴォ", "ア", "イ", "ウ", "エ", "オ", "ン", "ン", "ァ", "ィ", "ゥ", "ェ", "ォ", "ハ", "ャ", "ュ", "ョ"];

function scriptConvert(raw) {
  let notChanged = raw;
  raw = raw.toLowerCase();
  let type = 0;
  var result = "";
  let excludedStrs = ["-", " ", "'"];
  let transaltionList = [];

  switch (type) {
    case 0:
      transaltionList = hirList;
      break;

    case 1:
      transaltionList = katList;
      break;

    default:
      transaltionList = hirList;
      break;
  }

  for (let i = 0; i <= raw.length; i++) {
    let chunk = "";
    let j = 4;
    for (; j > 0; j--) {
      if (i + j > raw.length) continue;

      chunk = raw.substr(i, j);
      let chunkIndex = latList.indexOf(chunk);

      if (chunkIndex != -1) {
        result += transaltionList[chunkIndex];
        i += chunk.length - 1;
        break;
      }
    }

    if (j == 0) {
      if (!chunk) continue;

      if (chunk == ":" && i > 0) {
        if (type == 0) {
          switch (raw[i - 1]) {
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
        type = type == 0 ? 1 : 0;
        switch (type) {
          case 0:
            transaltionList = hirList;
            break;

          case 1:
            transaltionList = katList;
            break;

          default:
            transaltionList = hirList;
            break;
        }
      } else if (i + 1 < raw.length && chunk == "\\") {
        i++;
        result += notChanged[i];
      } else if (
        i + 1 < raw.length &&
        ((chunk[0] == raw[i + 1] && "qwrtpsdfghkljzxcvbnm".includes(chunk[0])) || (chunk[0] == "t" && raw[i + 1] == "c"))
      ) {
        result += transaltionList[0];
      } else if (excludedStrs.indexOf(chunk) != -1) {
        //
      } else {
        result += chunk;
      }
    }
  }

  return result;
}

export default { scriptConvert };
