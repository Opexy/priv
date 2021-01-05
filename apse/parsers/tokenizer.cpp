#include <boost/tokenizer.hpp>
#include <string>
#include <iostream>

int main()
{
  typedef boost::tokenizer<boost::char_separator<char>> tokenizer;
  std::string s = "Boost C++ \"this is a string\" Libraries";
  boost::char_separator<char> sep{" "};
  tokenizer tok{s, sep};
  for (const auto &t : tok)
    std::cout << t << '\n';
}

