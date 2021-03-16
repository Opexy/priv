import sys
from PyQt6 import QtCore, QtGui
from PyQt6.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QToolBar;
class AppForm(QMainWindow):
  def __init__(form, parent=None):
    super(AppForm, form).__init__(parent)
    layout = QVBoxLayout()
    form.setLayout(layout)
    toolbar = form.toolbar = QToolBar(form)
    iconRect = toolbar.addAction("Rect")
    iconRect.setCheckable(True)
    iconRect.triggered.connect(form.startDrawRect)
    form.resize(form.sizeHint())
    
  @QtCore.Slot()
  def startDrawRect(form):
    app.resize(1,2);
  def keyPressEvent(form, event):
    if form.matches(QtGui.QKeySequence.Quit):
        form.main.quit()

def startApp():
  app = QApplication(sys.argv)
  form = app.form = AppForm()
  form.show()
  sys.exit(app.exec())

if __name__ == '__main__':
  startApp()