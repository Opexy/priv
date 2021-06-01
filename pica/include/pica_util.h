#pragma once
#include <cstddef>
#include <cstdint>
#include <atomic>
#include <thread>
#include <chrono>
#include <cassert>
using namespace std::chrono_literals;
#define mk_atomic(r) (*(std::atomic<typename std::remove_reference<decltype(r)>::type> *)(&r))
#define align_up(num, base) (((num) + base - 1) / base * base)