/usr/bin/cmake --no-warn-unused-cli -DCMAKE_EXPORT_COMPILE_COMMANDS:BOOL=TRUE -DCMAKE_BUILD_TYPE:STRING=Debug -B./build -G Ninja
/usr/bin/cmake --build build --config Debug --target all -- -j 26 &

/usr/bin/cmake --no-warn-unused-cli -DCMAKE_EXPORT_COMPILE_COMMANDS:BOOL=TRUE -DCMAKE_BUILD_TYPE:STRING=RelWithDebInfo -B./build/Release -G Ninja
/usr/bin/cmake --build ./build/Release --config RelWithDebInfo --target all -- -j 26
wait
