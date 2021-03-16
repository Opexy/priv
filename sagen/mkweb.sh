cmake -DCMAKE_TOOLCHAIN_FILE=/home/diamond/emsdk/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake -DCMAKE_BUILD_TYPE=Release -B./build/web/release
make --directory ./build/web/release
cmake -DCMAKE_TOOLCHAIN_FILE=/home/diamond/emsdk/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake -DCMAKE_BUILD_TYPE=Debug -B./build/web
make --directory ./build/web
