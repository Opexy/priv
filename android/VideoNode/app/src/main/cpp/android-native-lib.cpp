#include <jni.h>
#include <string>
#include "fmt/format.h"
extern "C" JNIEXPORT jstring JNICALL
Java_com_demo_videonode_MainActivity_stringFromJNI(
        JNIEnv *env,
        jobject /* this */) {
  env->NewByteArray(1024);
  std::string hello = fmt::format("Hello from {}", "C++");
  return env->NewStringUTF(hello.c_str());
}
//https://github.com/android/ndk-samples/blob/master/native-media/app/src/main/cpp/native-media-jni.c