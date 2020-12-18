import sanitizeHtml from "sanitize-html";

function bbCodesProcess(rawText) {
  const htmlText = rawText
    .replace(/\[i\](.*?)\[\/i\]/gim, "<em>$1</em>")
    .replace(/\[p\](.*?)\[\/p\]/gim, "<em>$1</em>")
    .replace(/\[ref=?\](.*?)\[\/ref\]/gim, "<a href='/search?r=$1'>$1</a>")
    .replace(/\[ref=([a-zA-Z\d]{4,7})\](.*?)\[\/ref\]/gim, "<a href='/jp/$1'>$2</a>")
    .replace(/\[sub\](.*?)\[\/sub\]/gim, "<sub>$1</sub>")
    .replace(/\[sup\](.*?)\[\/sup\]/gim, "<sup>$1</sup>")
    .replace(/{~(.*?)}/gim, "<em><strong>～$1</strong></em>"); // {～する}

  const clean = sanitizeHtml(htmlText.trim(), {
    allowedTags: ["em", "a", "sub", "sup", "strong"],
    allowedAttributes: {
      a: ["href"],
    },
  });
  return sanitizeHtml(clean);
}

export default { bbCodesProcess };
