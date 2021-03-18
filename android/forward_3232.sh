#!/usr/bin/expect
set keyfile $env(HOME)/.emulator_console_auth_token
exec echo reading key from $keyfile
set key [exec cat $keyfile]
spawn telnet 127.0.0.1 5554
expect "OK\r"
send "auth $key\r"
expect "OK\r"
send "redir add udp:3232:3232\r"
expect "OK\r"
send "redir add tcp:3232:3232\r"
expect "OK\r"
send "quit\r"
interact
