#include <cstdlib>
#include <thread>
#include <chrono>
#include <csignal>
#include <iostream>

#include <wx/wx.h>

//cppdbg.sh clang -O0 -g -std=c++2a -lstdc++ -pthread -lm -I/usr/lib/x86_64-linux-gnu/wx/include/gtk3-unicode-3.1-unofficial3 -I/usr/include/wx-3.1-unofficial -D_FILE_OFFSET_BITS=64 -DWXUSINGDLL -D__WXGTK__ scrsvr.cc -L/usr/lib/x86_64-linux-gnu   -lwx_gtk3u_unofficial3_xrc-3.1 -lwx_gtk3u_unofficial3_html-3.1 -lwx_gtk3u_unofficial3_qa-3.1 -lwx_gtk3u_unofficial3_core-3.1 -lwx_baseu_unofficial3_xml-3.1 -lwx_baseu_unofficial3_net-3.1 -lwx_baseu_unofficial3-3.1 -o /tmp/output.binexe
class MyApp: public wxApp
{
public:
    virtual bool OnInit();
};
class MyFrame: public wxFrame
{
public:
    MyFrame(const wxString& title, const wxPoint& pos, const wxSize& size);
private:
    void OnHello(wxCommandEvent& event);
    void OnExit(wxCommandEvent& event);
    void OnAbout(wxCommandEvent& event);
    wxDECLARE_EVENT_TABLE();
};
enum
{
    ID_Hello = 1
};
wxBEGIN_EVENT_TABLE(MyFrame, wxFrame)
    EVT_MENU(ID_Hello,   MyFrame::OnHello)
    EVT_MENU(wxID_EXIT,  MyFrame::OnExit)
    EVT_MENU(wxID_ABOUT, MyFrame::OnAbout)
wxEND_EVENT_TABLE()
wxIMPLEMENT_APP(MyApp);
bool MyApp::OnInit()
{
    MyFrame *frame = new MyFrame( "Hello World", wxPoint(50, 50), wxSize(450, 340) );
    frame->Show( true );
    return true;
}
MyFrame::MyFrame(const wxString& title, const wxPoint& pos, const wxSize& size)
        : wxFrame(NULL, wxID_ANY, title, pos, size, wxFRAME_SHAPED)
{
    wxMenu *menuFile = new wxMenu;
    menuFile->Append(ID_Hello, "&Hello...\tCtrl-H",
                     "Help string shown in status bar for this menu item");
    menuFile->AppendSeparator();
    menuFile->Append(wxID_EXIT);
    wxMenu *menuHelp = new wxMenu;
    menuHelp->Append(wxID_ABOUT);
    wxMenuBar *menuBar = new wxMenuBar;
    menuBar->Append( menuFile, "&File" );
    menuBar->Append( menuHelp, "&Help" );
    //SetMenuBar( menuBar );
    CreateStatusBar();
    SetStatusText( "Welcome to wxWidgets!" );
}
void MyFrame::OnExit(wxCommandEvent& event)
{
    Close( true );
}
void MyFrame::OnAbout(wxCommandEvent& event)
{
    wxMessageBox( "This is a wxWidgets' Hello world sample",
                  "About Hello World", wxOK | wxICON_INFORMATION );
}
void MyFrame::OnHello(wxCommandEvent& event)
{
    wxLogMessage("Hello world from wxWidgets!");
}


#if 0
#include "vroot.h"

using namespace std::literals;
void signal_callback_handler(int signum) {
   std::cout << "Caught signal " << signum << std::endl;
   // Terminate program
   exit(signum);
}

int main ()
{
  Display *dpy;
  Window root;
  GC g;
  signal(SIGABRT, signal_callback_handler);

  /* open the display (connect to the X server) */
  dpy = XOpenDisplay (getenv ("DISPLAY"));

  auto scr = DefaultScreenOfDisplay(dpy);


  /* get the root window */
  root = VirtualRootWindowOfScreen (scr);


  /* create a GC for drawing in the window */
  g = XCreateGC (dpy, root, 0, NULL);


  /* set foreground color */
  XSetForeground(dpy, g, WhitePixelOfScreen(scr) );


  int loop = 0;
  /* draw something */
  while (loop < 1000)
    {
      /* draw a square */
      XFillRectangle (dpy, root, g, random()%500, random()%500, 50, 40);


      /* once in a while, clear all */
      if( random()%500<1 )
        XClearWindow(dpy, root);


      /* flush changes and sleep */
      XFlush(dpy);
      std::this_thread::sleep_for(30ms);
      loop++;
    }


  XCloseDisplay (dpy);
  return 0;
}
#endif