#ifndef ReToken
#define ReToken(...)
#endif
ReToken(comment, R"__(\/\*.*\*\/)__")
ReToken(spaces,  R"__([[:space:]]+)__")
ReToken(puncts,  R"__([,:.])__")
ReToken(word,    R"__([a-zA-Z0-9]+)__")
ReToken(scopes,  R"__([\(\)\[\]\{\}])__")
