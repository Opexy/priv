#include <ctype.h>
template <typename ARGV_ARRAY>
inline static 
bool str_argv(char *str, int strlen, ARGV_ARRAY & argv, int &argc){
  int argmax = argc;
  if(sizeof(ARGV_ARRAY) > sizeof(char *)) {
    argmax = sizeof(ARGV_ARRAY) / sizeof(char *);
  }
  char **arg = NULL;
  char escaper = ' ';
  char in_quote = '\0';
  char cur;
  argc = 0;
  for(int idx = 0; idx < strlen; idx++) {
    cur = str[idx];
    if(escaper == '\\'){
      escaper = ' ';
      continue;
    }
    else if(cur == '\\') {
      escaper = '\\';
    }
    if(in_quote) {
      if(cur == in_quote){
        in_quote = '\0';
        continue;
      }
      else {}
    } else {
      if(cur == '\0' || std::isspace(cur)) {
        str[idx] = '\0';
        arg = NULL;
      }
      else {
        if(arg == NULL) {
          if(argc == argmax) {
            return false;
          }
          arg = &argv[argc++];
          *arg = str+idx;
        }
        if(cur == '"' || cur == '\'') {
          in_quote = cur;
        }
      }
    }
  }
  return true;
}