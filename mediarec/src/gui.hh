#include "imgui.h"
struct VkGui
{
  const char *windowName;
  ImVec4 clear_color = ImVec4(0.45f, 0.55f, 0.60f, 1.00f);
  virtual void onFrame(){};
  virtual void render() {
    ImGui::NewFrame();
    onFrame();
    ImGui::Render();
  };
  void init();
  void run();
};