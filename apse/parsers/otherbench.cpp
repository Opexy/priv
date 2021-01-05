#include <iostream>
#include <regex>
#include <boost/regex.hpp>
#include <boost/xpressive/xpressive_static.hpp>
#define NONIUS_RUNNER
#include <nonius/benchmark.h++>
#include <nonius/main.h++>

template <typename Re>
void test(Re const& re) {
    regex_match("abcd_ed123.t12y@haha.com", re);
}

static const std::regex std_normal("^[\\w._]+@\\w+\\.[a-zA-Z]+$");
static const std::regex std_optimized("^[\\w._]+@\\w+\\.[a-zA-Z]+$", std::regex::ECMAScript | std::regex::optimize);
static const boost::regex boost_normal("^[\\w._]+@\\w+\\.[a-zA-Z]+$");
static const boost::regex boost_optimized("^[\\w._]+@\\w+\\.[a-zA-Z]+$", static_cast<boost::regex::flag_type>(boost::regex::ECMAScript | boost::regex::optimize));

static const auto boost_xpressive = []{
    using namespace boost::xpressive;
    return cregex { bos >> +(_w | '.' | '_') >> '@' >> +_w >> '.' >> +alpha >> eos };
}();

NONIUS_BENCHMARK("std_normal",      [] { test(std_normal);      })
NONIUS_BENCHMARK("std_optimized",   [] { test(std_optimized);   })
NONIUS_BENCHMARK("boost_normal",    [] { test(boost_normal);    })
NONIUS_BENCHMARK("boost_optimized", [] { test(boost_optimized); })
NONIUS_BENCHMARK("boost_xpressive", [] { test(boost_xpressive); })
