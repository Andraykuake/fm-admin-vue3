module.exports = {
	semi: false, // 指定是否在语句末尾添加分号，默认为 true
	printWidth: 120, // 指定每行代码的最大字符宽度
	useTabs: true, // 指定是否使用制表符进行缩进
	tabWidth: 2, // 指定一个制表符等于多少个空格，默认为 2。
	bracketSpacing: true, // 指定是否在对象字面量的括号之间添加空格，默认为 true。
	arrowParens: 'always', // 箭头函数参数是否使用括号,// 在单独的箭头函数参数周围包括括号 always：(x) => x \ avoid：x => x
	// 在JSX中使用单引号而不是双引号
	jsxSingleQuote: false,
	// jsx 标签的反尖括号需要换行
	jsxBracketSameLine: false,
	// 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
	rangeStart: 0,
	rangeEnd: Infinity,
	// 指定HTML文件的全局空格敏感度 css\strict\ignore
	htmlWhitespaceSensitivity: 'css',
	//在 windows 操作系统中换行符通常是回车 (CR) 加换行分隔符 (LF)，也就是回车换行(CRLF)，
	//然而在 Linux 和 Unix 中只使用简单的换行分隔符 (LF)。
	//对应的控制字符为 "\n" (LF) 和 "\r\n"(CRLF)。auto意为保持现有的行尾
	// 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
	endOfLine: 'auto',

	// 开始标签的右尖括号是否跟随在最后一行属性末尾，默认false
	bracketSameLine: false,
	// 是否格式化一些文件中被嵌入的代码片段的风格(auto|off;默认auto)
	embeddedLanguageFormatting: 'auto',
	// 当文件已经被 Prettier 格式化之后，是否会在文件顶部插入一个特殊的 @format 标记，默认false
	insertPragma: false,
	// 每行最多字符数量，超出换行(默认80)
	printWidth: 120,
	// 超出打印宽度 (always | never | preserve )
	proseWrap: 'preserve',
	// 对象属性是否使用引号(as-needed | consistent | preserve;默认as-needed:对象的属性需要加引号才添加;)
	quoteProps: 'as-needed',
	// 是否只格式化在文件顶部包含特定注释(@prettier| @format)的文件，默认false
	requirePragma: false,
	// 使用单引号 (true:单引号;false:双引号)
	singleQuote: true,
	// 元素末尾是否加逗号，默认es5: ES5中的 objects, arrays 等会添加逗号，TypeScript 中的 type 后不加逗号
	trailingComma: 'none',
	// vue 文件中是否缩进 <style> 和 <script> 标签，默认 false
	vueIndentScriptAndStyle: false
}
