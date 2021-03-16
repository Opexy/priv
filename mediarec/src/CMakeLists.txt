add_executable(mediarec 
  mediarec_main.cc 
  mediarec_ctrl.cc
  be_glfw_vulkan.cc 
  mediarec_pipeline.cc
  mediarec_video_linux.cc
  ${IMGUI_DIR}/backends/imgui_impl_glfw.cpp 
  ${IMGUI_DIR}/backends/imgui_impl_vulkan.cpp 
  ${IMGUI_DIR}/imgui.cpp 
  ${IMGUI_DIR}/imgui_draw.cpp 
  ${IMGUI_DIR}/imgui_demo.cpp 
  ${IMGUI_DIR}/imgui_tables.cpp 
  ${IMGUI_DIR}/imgui_widgets.cpp
)

target_include_directories(mediarec PRIVATE ${GLFW_INC_DIR} ${IMGUI_DIR} ${IMGUI_DIR}/backends)
find_package(Vulkan REQUIRED)

target_link_libraries(mediarec PRIVATE ${GLFW_LIB} Vulkan::Vulkan X11)
