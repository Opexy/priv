plugins {
  id "org.jetbrains.kotlin.multiplatform" version "1.6.0-RC"
}

kotlin {
  // macosX64("native") { // on macOS
  linuxX64("native") // on Linux
  // mingwX64("native") // on Windows
    binaries {
      sharedLib {
        baseName = envio
      }
      executable(envio)
    }
  }
}

tasks.withType<Wrapper> {
  gradleVersion = "6.7.1"
  distributionType = Wrapper.DistributionType.ALL
}
