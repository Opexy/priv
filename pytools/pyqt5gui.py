from PyQt5.QtGui import *;
from PyQt5.QtCore import *;
from PyQt5.QtWidgets import QApplication, QWidget;

class App:
    app=None

Point2 = QPoint;
def appInit():
    if App.app is None:
        App.app = QApplication([]);
    return App.app;

def mousePos():
    appInit();
    QCursor_pos = QCursor.pos();
    ret = Point2(QCursor_pos.x(), QCursor_pos.y());
    return ret;

class ImageWin(QWidget):
    def __init__(self, title='Untitled', image='nonexist'):
        self.title = title;
        self.image = image;
        self.left = 10;
        self.top = 10;
        self.width = 640;
        self.height = 480;
        self.initUI()

    def initUI(self):
        self.setWindowTitle(self.title)
        self.setGeometry(self.left, self.top, self.width, self.height)
        # Create widget
        label = QLabel(self)
        pixmap = QPixmap('image.jpeg')
        label.setPixmap(pixmap)
        self.resize(pixmap.width(),pixmap.height())
        self.show()
        
def screenShot(start_x, start_y, end_x, end_y):
    appInit();
    left=min(start_x, end_x);
    top=min(start_y, end_y);
    right=max(start.x,end.x);
    bottom=max(start.y,end.y);
    return app.primaryScreen().grabWindow(0, left, top, right - left + 1, bottom - top + 1);;
