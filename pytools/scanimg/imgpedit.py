import numpy as np;
import matplotlib.pyplot as plt;
import cv2;
import math;
#import imutils
from matplotlib.widgets import RectangleSelector, Slider, Button, RadioButtons, TextBox

v = type('test', (object,), {})()

def resize(img, height=800):
    """ Resize image to given height """
    rat = height / img.shape[0];
    return cv2.resize(img, (int(rat * img.shape[1]), height))

def line_select_callback(eclick, erelease):
    'eclick and erelease are the press and release events'
    x1, y1 = eclick.xdata, eclick.ydata
    x2, y2 = erelease.xdata, erelease.ydata
    v.select_start = (x1, y1)
    v.select_end = (x2, y2)
    print("(%3.2f, %3.2f) --> (%3.2f, %3.2f)" % (x1, y1, x2, y2))
    print(" The button you used were: %s %s" % (eclick.button, erelease.button))

def slider_rot_update(newrot):
    if v.rot_val != newrot:
        v.rot_val = newrot
        v.text_rot.set_val(newrot)
        rot_update()

def text_rot_on_submit(val):
    newrot = float(val)
    if v.rot_val != newrot:
        v.rot_val = newrot
        v.slider_rot.set_val(newrot)
        rot_update()

def rotate_bound(image, angle):
    # grab the dimensions of the image and then determine the
    # center
    (h, w) = image.shape[:2]
    (cX, cY) = (w / 2, h / 2)

    # grab the rotation matrix (applying the negative of the
    # angle to rotate clockwise), then grab the sine and cosine
    # (i.e., the rotation components of the matrix)
    M = cv2.getRotationMatrix2D((cX, cY), -angle, 1.0)
    cos = np.abs(M[0, 0])
    sin = np.abs(M[0, 1])

    # compute the new bounding dimensions of the image
    nW = int((h * sin) + (w * cos))
    nH = int((h * cos) + (w * sin))

    # adjust the rotation matrix to take into account translation
    M[0, 2] += (nW / 2) - cX
    M[1, 2] += (nH / 2) - cY

    # perform the actual rotation and return the image
    return cv2.warpAffine(image, M, (nW, nH), borderMode=cv2.BORDER_CONSTANT, borderValue=(255,255,255))

def rot_update():
    print(f"old rotation: {v.old_rot_val}")
    print(f"new rotation: {v.rot_val}")
    v.dst_rot = rotate_bound(v.thumb, -v.rot_val)
    v.ax_dst.imshow(v.dst_rot)

    v.old_rot_val = v.rot_val
    v.fig.canvas.draw_idle()

def button_rot_clicked(newrot):
    def button_rot_on_clicked(event):
        if v.rot_val != newrot:
            v.rot_val = newrot
            v.slider_rot.set_val(newrot)
            v.text_rot.set_val(newrot)
            rot_update()
    return button_rot_on_clicked
    
def procimg(imgfilename):
    v.old_rot_val = 0.0
    v.rot_val = 0.0
    v.image = cv2.cvtColor(cv2.imread(imgfilename), cv2.COLOR_BGR2RGB);
    v.thumb = resize(v.image)

    v.fig = plt.figure(figsize=(16,9), dpi=100)
    v.ax_src = plt.subplot(221)
    v.ax_src.imshow(v.thumb, cmap= 'gray')
    v.ax_src.set_title('Source'), v.ax_src.set_xticks([]), v.ax_src.set_yticks([])
    
    v.ax_dst = plt.subplot(222)
    v.ax_dst.imshow(v.thumb, cmap= 'gray')
    v.ax_dst.set_title('Target'), v.ax_dst.set_xticks([]), v.ax_dst.set_yticks([])

    v.ax_slider_rot = plt.axes([0.25, 0.1, 0.6, 0.03], facecolor='lightgoldenrodyellow')
    v.slider_rot = Slider(v.ax_slider_rot, 'Rotation', 0, 360, valinit=0, valstep=0.05)
    v.slider_rot.on_changed(slider_rot_update)

    v.ax_text_rot = plt.axes([0.9, 0.1, 0.05, 0.03], facecolor='lightgoldenrodyellow')
    v.text_rot = TextBox(v.ax_text_rot, '', '0')
    v.text_rot.on_submit(text_rot_on_submit)

    v.ax_button_rot_0 = plt.axes([0.25, 0.07, 0.03, 0.03], facecolor='lightgoldenrodyellow')
    v.button_rot_0 = Button(v.ax_button_rot_0, 0)
    v.button_rot_0.on_clicked(button_rot_clicked(0.0))

    v.ax_button_rot_90 = plt.axes([0.29, 0.07, 0.03, 0.03], facecolor='lightgoldenrodyellow')
    v.button_rot_90 = Button(v.ax_button_rot_90, 90)
    v.button_rot_90.on_clicked(button_rot_clicked(90.0))
    
    v.ax_button_rot_180 = plt.axes([0.33, 0.07, 0.03, 0.03], facecolor='lightgoldenrodyellow')
    v.button_rot_180 = Button(v.ax_button_rot_180, 180)
    v.button_rot_180.on_clicked(button_rot_clicked(180.0))
    
    v.ax_button_rot_270 = plt.axes([0.37, 0.07, 0.03, 0.03], facecolor='lightgoldenrodyellow')
    v.button_rot_270 = Button(v.ax_button_rot_270, 270)
    v.button_rot_270.on_clicked(button_rot_clicked(270.0))
    
    #s1, s2 = plt.subplots()
    v.rectangle_selector = RectangleSelector(v.ax_src, line_select_callback,
                                       drawtype='box', useblit=True,
                                       button=[1, 3],  # don't use middle button
                                       minspanx=5, minspany=5,
                                       spancoords='pixels',
                                       interactive=True)
    
    #plt.connect('key_press_event', toggle_selector)
    
    plt.show()