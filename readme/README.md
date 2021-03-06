НЯРС (Новый Японско-Русский Словарь) - открытый редактируемый японско-русский словарь. НЯРС создавался как словарь для практической работы с японским языком, преимущественно современным.

Самое главное при редактировании словаря — указать верный перевод, оформление вторично.

За основу правил оформления брались некоторые принципы, которые лежат в основе электронного словаря Warodai

## Основы

### Структура статьи

1 - заголовок статьи
В квадратных 【скобках】 указывается написание, далее за ними следуют чтения, соответствующие этому написанию. Если написание и чтение идентичны (т.е. в написании отсутствуют кандзи), то указывается только чтение. В одной словарной статье могут быть объединены несколько слов с разными написаниями/чтениями при условии, что они полностью синонимичны и взаимозаменяемы.

2 - содержание статьи
Тело статьи имеет древовидную структуру, сначала происходит деление по частям речи, затем деление по языкам, и уже для каждого языка указываются соответствующие значения и примечания (заметки).

В статье может быть использовано 4 языка: японский, английский, русский и латынь. Основным языком является русский. Латынь используется для указания научной номенклатуры (например, названий биологических видов). Английский и японский языки используются для черновых статей, содержание которых в будущем должно быть продублировано на русском языке.

В значении окромя основного текста могут быть дополнительно указаны следующие виды тегов:
- тематика, указывает, к какой области знаний относится термин
- диалект, указывает, для какого диалекта характерно данное определение
- общие теги, к ним относятся, например, стилистические пометы и другие уточнения касательно употребимости термина

### Создание простейшей статьи

Для создания статьи нужно нажать кнопку "Добавить статью" в меню слева. По умолчанию у статьи проставлена часть речи UNC (не классифицировано). Если вам не известна часть речи, то лучше оставить UNC, чем указать неверную.

Кнопка "+ чтение/написание" добавляет дополнительное слово (чтение + написание) в заголовок, в шаблоне по умолчанию уже есть одно слово (оно обозначено скобками 【】), для того, чтобы указать написание и чтение надо нажать на карандаш справа от него. В написании указывается запись слова с иероглифами или другими символами (например, с латиницей), в чтении указывается только чтение каной.

Для того, чтобы добавить язык, нажмите кнопку "+ язык". На выбор будет предложено 4 языка: русский, английский, японский, латинский. После добавления языка для него можно будет добавить значение или указать заметку. Чтобы добавить значение надо нажать кнопку "+ значение", а затем нажать карандаш сбоку от созданного значения, чтобы отредактировать его.

## Оформление статей

### Заголовок

#### Чтение

Обязательная часть заголовка, записывается каной. Для канго и ваго чтение даётся хираганой, для гайрайго и васэй-эйго чтение даётся катаканой. Чтения в словаре хранятся в виде латиницы, поэтому предпочтительнее использовать сразу формат записи чтения латиницей, однако можно дать чтения и на кане, тогда они сконвертируются автоматически (но возможны неточности конвертации в спорных ситуациях, например, при конвертации おう -> o: либо ou). Подробнее см. в главе “конвертация латиница - кана”

![](https://cdn.discordapp.com/attachments/564320204771819521/784409409719762953/unknown.png)

#### Написание

Данная часть может отсутствовать, если у слова нет написания, включающего кандзи. Если у слова есть вариант, включающий любые другие знаки, кроме хираганы (например, латиницу), то такая запись тоже включается в написание.

```
【ＧＰＴ】ジーピーティー
【ＵＴＦ８・ＵＴＦ-８】ユーティーエフはち・ユーティーエフエイト
```

#### Несамостоятельные слова

Если слово самостоятельно не употребляется и является компонентом более сложных слов, то это указывается при помощи многоточия `…` (U+2026, Horizontal Ellipsis). Многоточие должно указываться как в чтении, так и в написании.

```
【…上がり】…agari
noun, used as a suffix
1) бывший
2) после
```

#### Употребимость

По умолчанию считается, что написания/чтения относится ко всем значениям, перечисленным в статье.

Если для значения используются написания/чтения, не перечисленные в заголовке, они указываются дополнительно при помощи помет. См. значения->>

##### Помета `[p]тк.[/p]` (только)

Помета `[p]тк.[/p]` указывает, что значение употребляется _только_ с указанным написанием/чтением. Если указанное написание/чтение употребляется только в некоторых значениях, то в заголовок оно не включается. Также перед пометой `тк.` может быть дан краткий комментарий касательно употребимости такого написания/чтения.

#### Объединение слов в статье

В одной словарной статье могут быть объединены несколько слов с разными написаниями/чтениями при условии, что они полностью синонимичны и взаимозаменяемы (полное совпадение всех значений, переводов, производных и словосочетаний в них).

### Тело статьи

### Значение

Значение в статье пишется со строчной буквы. Точка или точка с запятой в конце не ставится.

#### Запятая и точка с запятой

Запятой разделяются синонимичные и очень близкие по значению переводы. Точкой с запятой разделяются более отдалённые по значению переводы, в совокупности передающие одно значение японского слова или словосочетания.

Иногда в одном значении могут встретиться группы переводов с близким значением, тогда переводы будут разделены запятой, а группы таких переводов точкой с запятой.

#### Круглые скобки

В круглые скобки заключается перевод, являющийся вариантом предыдущего слова или части словосочетания. В скобках может указываться как синоним, так и просто однородный вариант для данной ситуации.

> `спасательный (плавательный) круг`
> идентична следующей записи:
> `спасательный круг; плавательный круг`

#### Квадратные скобки

В квадратные скобки заключаются опциональные части перевода.

> `неприкосновенный запас [продовольствия]`
> идентична следующей записи:
> `неприкосновенный запас, неприкосновенный запас продовольствия`

#### Курсив (ББ-код `[i][/i]`)

Курсивом при переводе могут даваться пояснения, помогающие раскрыть смысл перевода, но сами по себе в него не входящие.

#### Сокращение/помета (ББ-код `[p][/p]`)

ББ-код `[p][/p]` используется для указания сокращений. Визуально они при этом будут выделены курсивом.

##### Управление глагола и производные слова (ББ-код `{~ }`)

Производные слова в рамках одной статьи образуются добавлением вспомогательных элементов (например, ～する, ～なる, ～と, ～な и других). При помощи ББ-кода `{~ }` в значении может быть обозначен перевод для производного слова. В ББ-коде для указания вспомгательного элемента используется обязательно латиница, например, так: {~suru}, а сам элемент ставится перед переводом.

#### Дополнительные написания/чтения

Если в данном значении у слова могут использоваться написания/чтения, отсутствующие в заголовке, то они могут быть указаны при помощи следующих помет:
- `[p]тж.[/p]` - дополнительное написания/чтения
- `[p]уст.[/p]` - устаревшее написания/чтения
- `[p]неправ.[/p]` -  ошибочные написания, получившие широкое распространение
- `[p]редко[/p]` - редко употребляемые написания, не являющиеся устаревшими или неверными

Для одного значения могут быть указаны как дополнительные написания/чтения, так и исключительные (помета `[p]тк.[/p]`).

```
【備わる・具わる】そなわる
[i][p]редко[/p] 供わる, о себе [p]тк.[/p] 具わる[/i]
```

#### Буквальный перевод

При переводе сложных образных, переносных и связанных значений, особенно часто — пословиц и поговорок, в качестве пояснений в скобках даётся буквальный перевод, обозначенный пометой `[p]букв.[/p]`

#### Отсутствие перевода

Если слово невозможно перевести (это касается, например, многих специфичных для Японии вещей — одежды, предметов обихода, названий блюд и т.д.), то в таком случае вместо перевода указывается транслитерация слова, сопровождаемая пояснением.

Если слово невозможно перевести, поскольку оно является, например, служебным компонентом или ономатопеей, то вместо перевода даётся пояснение, выделенное курсивом `[i][/i]`.

#### Ссылки (ББ-код `[ref][/ref]`)

Ссылки нужны для указания других статей, помогающих в понимании значения. Ссылки могут ссылаться как на абстрактную статью (при переходе по ссылке будет открыта страница поиска), так и на конкретную (в этом случае будет открыта указанная статья.) Чтобы создать ссылку на статью используется ББ-код `[ref=id][/ref]`, где вместо `id` указывается идентификатор статьи (можно посмотреть его в адресной строке).

Перед ссылкой должна стоять помета-пояснение, указывающая на тип связи между статьями:

- `[p]см.[/p]` - указывает на синонимичное слово
- `[p]ср.[/p]` - указывает на связанную статью (производная, часть списка и т.п.)
- `[p]ант.[/p]` - указывает на антоним
- `[p]сокр.[/p]` - указывает на полную форму слова

Если отсутствует помета, должно находиться другое объяснение, определяющее ссылку.

Ссылка указывается в конце значения и отделяется от перевода точкой с запятой.

```
【市議】shigi
1) городской (муниципальный) совет, мэрия; [p]сокр.[/p] [ref]市会議[/ref]
2) член муниципального совета, депутат мэрии; [p]сокр.[/p] [ref]市会議員[/ref]
```

#### Заимствованные слова

Заимствованное слово указывается в начале перевода, при этом оформляется как пояснение (курсивом), а язык выделяется ББ-кодом `[p][/p]`. Указывается язык, откуда слово непосредственно вошло в японский язык, а не на тот, в котором оно возникло. Если заимствованное слово и перевод совпадают, то слово в скобках не указывается (актуально для английского языка, из которого заимствовано много лексики).

Заимствования указываются только для гайрайго и поздних заимствований из китайского. Для слов из языков без кириллической/латинской письменности слово даётся в авторитетной системе латинской транслитерации.

Заимствования не указываются для географических названий, их производных, а также для сложных/составных слов, части которых присутствуют в словаре.

#### Биологическая номенклатура

При переводе названий видов, родов и семейств растений, грибов и животных в перевод в качестве одного из вариантов включается их латинское обозначение.

По возможности используется название, зафиксированное в японских толковых и переводных словарях и соответствующее современным кодексам биологической номенклатуры. Если заглавное слово не называет точно один конкретный биологический вид, семейство, род и т.д., то в переводе может быть дано несколько названий через запятую.

Для видовых названий используется биноминальная (бинарная) номенклатура, включающая в себя название рода (с прописной буквы), название вида или видовой эпитет (со строчной буквы) и принятое в современных кодексах указание первоописателя (курсивом).

Для названий рода и выше используется униноминальная номенклатура, в которой название таксона пишется всегда с прописной буквы.

#### Тематики

Тематика проставляется в следующих случаях:

1. если слово в русском переводе многозначно и нужно его конкретизировать:

```
пример
```

2. японское слово является специальным термином (не является разговорным), тогда как русский перевод нейтрален

```
【胃部】ibu
[анатомия] желудок
```

3. если русский перевод является малоизвестным термином. В частности, тематика для биологических видов указывается в том случае, если название не является бытовым названием вида

```
пример
```

4. в переводе даны несколько значений из разных сфер. Указание тематики в данном случае облегчит навигацию

```
пример
```


#### Диалекты
#### Теги
#### Стилистические пометы

блаблабла теги

расписать про заметки, применямые ко всем значениям

канго гайрайго в одной статье
