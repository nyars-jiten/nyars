import sanitizeHtml from "sanitize-html";

export function bbCodesProcess(rawText) {
  const htmlText = rawText
    .replace(/\[i\](.*?)\[\/i\]/gim, "<em>$1</em>")
    .replace(/\[p\](.*?)\[\/p\]/gim, "<em>$1</em>")
    .replace(/\\([\n,;])/gim, "$1")
    .replace(/⌈/gim, '')
    .replace(/\[ref=?\](.*?)\[\/ref\]/gim, "<a href='/search?r=$1'>$1</a>")
    .replace(/\[ref=([a-zA-Z\d]{4,7})\](.*?)\[\/ref\]/gim, "<a href='/dict/jp/$1'>$2</a>")
    .replace(/\[sub\](.*?)\[\/sub\]/gim, "<sub>$1</sub>")
    .replace(/\[sup\](.*?)\[\/sup\]/gim, "<sup>$1</sup>")
    .replace(/{~(.*?)}/gim, "<em><strong>～$1</strong></em>") // {～する}
    .replace(/{\.\.\.(.*?)~(.*?)}/gim, "<em><strong>…$1～$2</strong></em>") // {…to～shite}
    .replace(/(.\u0301)/gim, "<span style=\"font-family: 'Noto Sans',Arial;\">$1</span>")
    .replace(/\['\](.*?)\[\/'\]/gim, "<span style=\"font-family: 'Noto Sans',Arial;\">$1&#x301;</span>");

  return cleanHtml(htmlText);
}

export function examplesBbCodesProcess(rawText) {
  var htmlText = rawText
    .replace(/([一-龯]+)《(.+?)》/gim, "<ruby>$1<rt>$2</rt></ruby>");

  htmlText = htmlText.replace(/\[([^|]*)\|([^\]]*)\]/gim, furiganaReplacerBracketsToRuby);

  return cleanHtml(htmlText);
}

function furiganaReplacerBracketsToRuby(match, p1, p2) {
  var ruby = '';
  let readings = p2.split('|');
  if (readings.length === 1) {
    ruby = `<ruby>${p1}<rp>（</rp><rt>${readings[0]}</rt><rp>）</rp></ruby>`;
  } else {
    for (var i = 0; i < p1.length; i++) {
      let currentKanji = p1.charAt(i);
      let currentReading = i < readings.length ? readings[i] : '';
      ruby += `<ruby>${currentKanji}<rp>（</rp><rt>${currentReading}</rt><rp>）</rp></ruby>`;
    }
  }
  return ruby;
}

function cleanHtml(html) {
  return sanitizeHtml(html.trim(), {
    allowedTags: ["em", "a", "sub", "sup", "strong", "span", "rt", "ruby", "rp"],
    allowedAttributes: {
      a: ["href"], span: ["style"], rt: ["style"]
    },
    allowedStyles: {
      '*': {
        'font-family': [/^[\s\S]*$/]
      }
    }
  });
}
