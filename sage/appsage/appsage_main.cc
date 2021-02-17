// Copyright (c) 2020 Mi Chen. All rights reserved.
#include <vector>
#include "PxPhysicsAPI.h"

#include "libsage.hh"
#include "cinder/app/App.h"
#include "cinder/app/RendererGl.h"
#include "cinder/gl/gl.h"
#include "cinder/gl/Fbo.h"
#include "cinder/gl/Batch.h"
#include "cinder/CinderImGui.h"
#include "cinder/Log.h"

#include "sage_resources.h"
using namespace std;
using namespace ci;
using namespace ci::app;


/*GEN++
let spec = `
ViewPort:class {
  mCam:CType(CameraPersp);
};

`;
*/
//GEN--

typedef int32_t WmId;
typedef uint16_t PosId;
typedef uint16_t MatId;
typedef uint16_t ModelId;
typedef uint32_t VtxId;
typedef uint32_t VtxId;
TriMesh mesh;
struct WorldModelElem{
  
};
#define fatalError(msg) CI_ASSERT_MSG(false,msg)
using namespace physx;
static PxDefaultErrorCallback gDefaultErrorCallback;
static PxDefaultAllocator gDefaultAllocatorCallback;
struct Phy{
  physx::PxFoundation *mFoundation;
  physx::PxPvd *mPvd;
  physx::PxPhysics *mPhysics;
  physx::PxCooking *mCooking;
  physx::PxDefaultCpuDispatcher *mCpuDispatcher;
  PxScene  *mScene;
  PxU32 mNbThreads = 6;
  
  Phy(){
    mFoundation = PxCreateFoundation(PX_PHYSICS_VERSION, gDefaultAllocatorCallback,
    gDefaultErrorCallback);
    if(!mFoundation)
      fatalError("PxCreateFoundation failed!");

    bool recordMemoryAllocations = true;
    mPvd = PxCreatePvd(*mFoundation);
    PxPvdTransport* transport = PxDefaultPvdSocketTransportCreate("127.0.0.1", 5425, 10);
    mPvd->connect(*transport,PxPvdInstrumentationFlag::eALL);

    PxTolerancesScale scale;
    scale.length = 100;//100;        // typical length of an object
    scale.speed = 1;//981;         // typical speed of an object, gravity*1s is a reasonable choice

    mPhysics = PxCreatePhysics(PX_PHYSICS_VERSION, *mFoundation,
        PxTolerancesScale(), recordMemoryAllocations, mPvd);
    if(!mPhysics)
        fatalError("PxCreatePhysics failed!");

    mCooking = PxCreateCooking(PX_PHYSICS_VERSION, *mFoundation, PxCookingParams(scale));
    if (!mCooking)
      fatalError("PxCreateCooking failed!");

    PxSceneDesc sceneDesc(mPhysics->getTolerancesScale());
    mCpuDispatcher = PxDefaultCpuDispatcherCreate(mNbThreads);
    if(!mCpuDispatcher)
      fatalError("PxDefaultCpuDispatcherCreate failed!");
    sceneDesc.cpuDispatcher = mCpuDispatcher;
    sceneDesc.filterShader = PxDefaultSimulationFilterShader;
    mScene = mPhysics->createScene(sceneDesc);
    // configuring pvd
    PxPvdSceneClient* pvdClient = mScene->getScenePvdClient();
    if(pvdClient)
    {
      pvdClient->setScenePvdFlag(PxPvdSceneFlag::eTRANSMIT_CONSTRAINTS, true);
      pvdClient->setScenePvdFlag(PxPvdSceneFlag::eTRANSMIT_CONTACTS, true);
      pvdClient->setScenePvdFlag(PxPvdSceneFlag::eTRANSMIT_SCENEQUERIES, true);
    }
    // create actors
  }
  ~Phy(){
    mPhysics->release();
    mFoundation->release();
  }
};

// Framework duty:
// 1. Organize and execute all flows
// 2. Provide Variable accessors to ftn called

// Event Vector
// virtual user, virtual app
// System Flow Layer -- 
// virtual event -- when drawing/calling ftn,
//  it is generating and consuming events on the fly.
// SnapTo: Time 


// A state within a event processing happens as part of the event.
// An event happens in a state called the event is being processed.
// calculate earth movement
// Immediate expiration mode -- associated with hierarchy stages.
// Delayed event mode -- Snap to ... at time...
// Let's be reasonably dynamic.
// Each keyboard is paired with a mouse.
// User Kbm Handler
// User poses as
// Updating of Presentation
// Drawing of screen

    // Input is an event. Data Input, drag and drop, with hotkey command
    // ctrl + dragstart -> x.dragcopyin, etc.
    // Find focus is optional. 
    // Render Cursor, Render World Position, Render 

/*GEN++
  //gen = gf.parseSource().evalAll().genaCpp();
  gen = gf.
*/
//GEN--


class UiView{
};

class ViewObj{

};
struct Mesh:PxBase{
  TriMeshRef mMesh;
  PxBVH34TriangleMesh *mPxMesh;
};

PxBVH34TriangleMesh* Sphere(int subdiv=10){
  PxBVH34TriangleMesh *ret;
  auto sphere = geom::Sphere().center({0,0,0})
    .radius(1.0f).subdivisions(subdiv).colors(true);
  return ret;
};

/*
class Fbo{
  gl::FboRef mFboRef;
public:
  void setup(int width, int height){
    gl::Fbo::Format format;
    mFboRef = gl::Fbo::create(width, height, format.depthTexture());
  }
  template <typename Ftn>
  void render(Ftn ftn){
    	gl::ScopedFramebuffer fbScp( mObjectFbo );

    gl::clear( Color( 0.2, 0.2, 0.2 ) );
  	gl::ScopedViewport scpVp( ivec2( 0 ), mObjectFbo->getSize() );
    ftn();
  }
};*/


class SageApp: public App{
  public:
  void setup() override;
  void update() override;
  void draw() override;
  sage::flow::Actor &Fa = sage::flow::FaCreate();
  static void prepareSettings ( Settings* settings );

  private:
    Phy mPhy;
    
  vector<string> mObjectNames;
  int mObjectSelection;
  size_t mCurrObject;
  float mDrawFps;
  float mUpdateFps;
  vec3 mEyePoint, mLookAt;
  void setDefaultValues();
};

void SageApp::setup(){
  //setWindowSize()
  setWindowPos(1920, 50);
  setDefaultValues();
  ImGui::Initialize();
}



void SageApp::update(){
  //sage::Event(eSageAppUpdateBegin); 
  //Fa.SetVar("Hello");
  
  
  ImGui::Begin( "SageApp" );
  if( ImGui::Combo( "Object", &mObjectSelection, mObjectNames ) ) {
    mCurrObject = (size_t)mObjectSelection;
  }
  ImGui::Separator();
  ImGui::LabelText("Draw Fps", "%f", mDrawFps);
  ImGui::LabelText("Update Fps", "%f", mUpdateFps);
  ImGui::Separator();
  ImGui::DragFloat3( "Eye Point", &mEyePoint, 0.01f );
  ImGui::DragFloat3( "Look At", &mLookAt, 0.01f );
  //ImGui::DragFloat( "FOV", &mFov, 1.0f, 1.0f, 179.0f );
  //ImGui::DragFloat( "Near Plane", &mNearPlane, 0.02f, 0.1f, FLT_MAX );
  //ImGui::DragFloat( "Far Plane", &mFarPlane, 0.02f, 0.1f, FLT_MAX );
  //ImGui::DragFloat2( "Lens Shift X", &mLensShift, 0.01f );
  ImGui::Separator();
  if( ImGui::Button( "Reset Defaults" ) ) {
    setDefaultValues();
  }

  //sage::Event(eSageAppUpdateEnd);
  ImGui::End();
}

void SageApp::draw(){
  gl::clear( Color( 0.2, 0.2, 0.2 ) );
}

void SageApp::setDefaultValues(){
  mObjectNames = {"Box", "Ball", "Teapot", "Pyramid"};
  mCurrObject = mObjectSelection  = 0;
  mEyePoint			= vec3( -2.2f, -1.6f, 7.0f );
  mLookAt				= vec3( 0.0f );
}

void SageApp::prepareSettings(Settings *settings){
  settings->setMultiTouchEnabled(false);
}
CINDER_APP( SageApp, RendererGl( RendererGl::Options().msaa( 16 ) ), SageApp::prepareSettings )
