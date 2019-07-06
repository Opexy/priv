import pyqt5gui as mgui;

if __name__ == "__main__":
    mpos = mgui.mousePos();
    print(mpos);
    print(mpos.x(), mpos.y());
    
