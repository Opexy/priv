#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <linux/ioctl.h>
#include <linux/types.h>
#include <linux/v4l2-common.h>
#include <linux/v4l2-controls.h>
#include <linux/videodev2.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/ioctl.h>
#include <sys/mman.h>
#include <string.h>
#include <fstream>
#include <string>
#include "mediarec_video.hh"
#include <vector>
typedef std::string Rstr;
struct VideoDevice {
  std::string uri;
};

struct flagmap {
  void addFlag(const char * name, uint64_t val) {
    flags.push_back(std::make_pair(name, val));
  }
  std::vector<std::pair<const char *, uint64_t>> flags;
  std::string decode(uint64_t flag) {
    std::string ret = "";
    ret = "[";
    for(auto [str, bit]: flags) {
      if((flag & bit) == bit){
        if(ret[1]){
          ret += ",";
        }
        ret += str;
      }
    }
    ret += "]";
    return ret;
  }
};
#define BEGIN_FLAGMAP(xname) struct xname:flagmap {xname(){
#define DEF_FLAG(flagname) addFlag(#flagname, flagname);
#define END_FLAGMAP(...) }};
BEGIN_FLAGMAP(V4L2_CAPS)
DEF_FLAG(V4L2_CAP_VIDEO_CAPTURE)
DEF_FLAG(V4L2_CAP_VIDEO_OUTPUT)
DEF_FLAG(V4L2_CAP_VIDEO_OVERLAY)
DEF_FLAG(V4L2_CAP_VBI_CAPTURE)
DEF_FLAG(V4L2_CAP_VBI_OUTPUT)
DEF_FLAG(V4L2_CAP_SLICED_VBI_CAPTURE)
DEF_FLAG(V4L2_CAP_SLICED_VBI_OUTPUT)
DEF_FLAG(V4L2_CAP_RDS_CAPTURE)
DEF_FLAG(V4L2_CAP_VIDEO_OUTPUT_OVERLAY)
DEF_FLAG(V4L2_CAP_HW_FREQ_SEEK)
DEF_FLAG(V4L2_CAP_RDS_OUTPUT)
END_FLAGMAP(V4L2_CAPS)


struct VideoDeviceV4L2: VideoDevice {
  VideoDeviceV4L2(const char *v4l2Path = "/dev/video0"){uri = v4l2Path;}
  v4l2_capability capability;
};

