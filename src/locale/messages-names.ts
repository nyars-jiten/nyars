const enum _Names {
	HeaderHome,
	HeaderEdits,
	HeaderBugTracker,
	HeaderDownload,

	SearchInput,
	SearchInfo,
	SearchShortLangName,

	ArticleTagName,
	ArticleAbbr,

	EditsType,
	EditsStatus,
	EditsDictName,
}

export class MessagesNames {
	static readonly HeaderHome = String(_Names.HeaderHome);
	static readonly HeaderEdits = String(_Names.HeaderEdits);
	static readonly HeaderBugTracker = String(_Names.HeaderBugTracker);
	static readonly HeaderDownload = String(_Names.HeaderDownload);

	static readonly SearchInput = String(_Names.SearchInput);
	static readonly SearchInfo = String(_Names.SearchInfo);
	static readonly SearchShortLangName = String(_Names.SearchShortLangName);

	static readonly ArticleTagName = String(_Names.ArticleTagName);
	static readonly ArticleAbbr = String(_Names.ArticleAbbr);

	static readonly EditsType = String(_Names.EditsType);
	static readonly EditsStatus = String(_Names.EditsStatus);
	static readonly EditsDictName = String(_Names.EditsDictName);
}
