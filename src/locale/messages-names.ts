const enum _Names {
	HeaderHome,
	HeaderBugTracker,
	HeaderDownload,

	SearchInput,
	SearchInfo,
	SearchShortLangName,

	ArticleTagName,
}

export class MessagesNames {
	static readonly HeaderHome = String(_Names.HeaderHome);
	static readonly HeaderBugTracker = String(_Names.HeaderBugTracker);
	static readonly HeaderDownload = String(_Names.HeaderDownload);

	static readonly SearchInput = String(_Names.SearchInput);
	static readonly SearchInfo = String(_Names.SearchInfo);
	static readonly SearchShortLangName = String(_Names.SearchShortLangName);
	static readonly ArticleTagName = String(_Names.ArticleTagName);
}
