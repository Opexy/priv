# 1 Building
## 1.1 Image
https://source.android.com/setup/start
### 1.1.1 Download
```bash
mkdir aosp
cd aosp
repo init -u https://android.googlesource.com/platform/manifest
repo sync -j16
```
### 1.1.2 Build
```bash
source build/envsetup.sh
lunch aosp_cf_x86_64_phone-userdebug
m
```
Expect the first build to take hours. Subsequent builds take significantly less time.
## 1.2 Kernel
