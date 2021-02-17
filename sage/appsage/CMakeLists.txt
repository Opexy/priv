
#add_executable(appsage appsage_main.cc)

#add_custom_command(TARGET apse
#    PRE_BUILD DEPENDS apse_py WORKING_DIRECTORY
#    COMMAND cog -r -c -I \"${CMAKE_SOURCE_DIR}:${CMAKE_BINARY_DIR}/parsers\" -p \"from gencode import codeout;\"
#        ${CMAKE_CURRENT_SOURCE_DIR}/gena.hh
#)
get_filename_component( CINDER_PATH "~/Cinder" ABSOLUTE )
get_filename_component( APP_PATH "${CMAKE_CURRENT_SOURCE_DIR}" ABSOLUTE )

SET(PHYSX_ROOT_DIR ~/physx)
SET(PHYSX_INSTALL_DIR ${PHYSX_ROOT_DIR}/install/linux)
SET(PHYSX_INSTALL_BIN_DIR ${PHYSX_INSTALL_DIR}/PhysX/bin/linux.clang/checked)
SET(PHYSX_INCLUDE_DIR ${PHYSX_INSTALL_DIR}/PhysX/include ${PHYSX_INSTALL_DIR}/PxShared/include)

SET(PHYSX_LIBRARIES 
libPhysXCommon_static_64.a libPhysX_static_64.a libPhysXFoundation_static_64.a 
libPhysXPvdSDK_static_64.a libPhysXExtensions_static_64.a 
libPhysXCooking_static_64.a)

#target_include_directories(appsage PRIVATE ${PHYSX_INCLUDE_DIR})
link_directories(${PHYSX_INSTALL_BIN_DIR})


include( "${CINDER_PATH}/proj/cmake/modules/cinderMakeApp.cmake" )

ci_make_app(
    APP_NAME    "appsage"
    CINDER_PATH ${CINDER_PATH}
    SOURCES     ${APP_PATH}/appsage_main.cc
    LIBRARIES   libsage ${PHYSX_LIBRARIES}
    INCLUDES ${PHYSX_INCLUDE_DIR}
    LINK_DIRECTORIES PRIVATE ${PHYSX_INSTALL_BIN_DIR}
)


#target_link_libraries(appsage PRIVATE libsage)