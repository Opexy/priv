/usr/bin/cmake --no-warn-unused-cli -DCMAKE_EXPORT_COMPILE_COMMANDS:BOOL=TRUE -DCMAKE_BUILD_TYPE:STRING=Debug -DCMAKE_C_COMPILER:FILEPATH=/bin/clang-11 -DCMAKE_CXX_COMPILER:FILEPATH=/bin/clang++-11 -B./build -G Ninja
/usr/bin/cmake --build ./build --config Debug --target all -- -j 26

/usr/bin/cmake --no-warn-unused-cli -DCMAKE_EXPORT_COMPILE_COMMANDS:BOOL=TRUE -DCMAKE_BUILD_TYPE:STRING=Release -DCMAKE_C_COMPILER:FILEPATH=/bin/clang-11 -DCMAKE_CXX_COMPILER:FILEPATH=/bin/clang++-11 -B./build/release -G Ninja
/usr/bin/cmake --build ./build/release --config Release --target all -- -j 26

