import numpy as np;
import matplotlib.pyplot as plt;
import cv2;
import math;
import os;
#import imutils
from matplotlib.widgets import RectangleSelector, Slider, Button, RadioButtons, TextBox

v = type('test', (object,), {})()

def resize(img, height=800):
    """ Resize image to given height """
    rat = height / img.shape[0];
    return cv2.resize(img, (int(rat * img.shape[1]), height))

def detect_ang(image):
    img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    img_edges = cv2.Canny(img_gray, 100, 100, apertureSize=3)
    lines = cv2.HoughLinesP(img_edges, 1, math.pi / 7200.0, 100, minLineLength=100, maxLineGap=5)
    angles = []

    for x1, y1, x2, y2 in lines[0]:
        cv2.line(image, (x1, y1), (x2, y2), (255, 0, 0), 3)
        angle = math.degrees(math.atan2(y2 - y1, x2 - x1))
        angles.append(angle)
    median_angle = np.median(angles)
    return median_angle

def line_select_callback(eclick, erelease):
    'eclick and erelease are the press and release events'
    x1, y1 = eclick.xdata, eclick.ydata
    x2, y2 = erelease.xdata, erelease.ydata
    v.select_start = (x1, y1)
    v.select_end = (x2, y2)
    print("(%3.2f, %3.2f) --> (%3.2f, %3.2f)" % (x1, y1, x2, y2))
    print(" The button you used were: %s %s" % (eclick.button, erelease.button))

    center = orig_point(x1+(x2-x1)/2, y1+(y2-y1)/2)
    sel_w = x2 - x1
    sel_h = y2 - y1

    sel_w_inch = sel_w / v.thumb_dpi
    sel_h_inch = sel_h / v.thumb_dpi
    #ratio = v.thumb.shape[0] / v.image.shape[0] *  min(sel_w_inch / v.w_inch, v.h_inch / sel_h_inch)
    ratio = v.thumb.shape[0] /  v.image.shape[0] * 144 / v.thumb_dpi# / (sel_h_inch / v.h_inch)
    #min(sel_w / v.thumb.shape[1], sel_h / v.thumb.shape[0])

    if sel_w_inch > 13.3:
        w_ratio = sel_w_inch / 13.3
        sel_w_inch = 13.3
        sel_h_inch = sel_h_inch / w_ratio 
        ratio = ratio / w_ratio
    if sel_h_inch > 7.4:
        h_ratio = sel_h_inch / 7.4
        sel_h_inch = 7.4
        sel_w_inch = sel_w_inch / h_ratio
        ratio = ratio / h_ratio

    out_h = sel_h_inch * 144
    out_w = sel_w_inch * 144
    if out_w < 1600 and out_h < 900:
        nratio = max(out_w / 1600, out_h / 900)
        out_w = out_w / nratio
        out_h = out_h / nratio
        ratio = ratio / nratio
    print(f"ratio = {ratio}")
    v.imgdst = extract(v.image, center, v.rot_val, ratio, out_h, out_w)

    v.ax_dst.imshow(v.imgdst)
    v.fig.canvas.draw_idle()

    

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

    v.M = M
    v.inv_M = cv2.invertAffineTransform(M)

    # perform the actual rotation and return the image
    return cv2.warpAffine(image, M, (nW, nH), borderMode=cv2.BORDER_CONSTANT, borderValue=(255,255,255))

def orig_point(x, y):
    point = np.array([[(x, y)]])
    orig_point = np.reshape(cv2.transform(point, v.inv_M), (2))
    
    orig_point[0] = orig_point[0] / v.thumb_dpi * 600
    orig_point[1] = orig_point[1] / v.thumb_dpi * 600
    return orig_point

def extract(image, center, angle, ratio, canvas_height, canvas_width):
    (orig_height, orig_width) = image.shape[:2]
    M = cv2.getRotationMatrix2D((center[0], center[1]), -angle, ratio)
    new_center_x = canvas_width / 2
    new_center_y = canvas_height / 2
    M[0, 2] += new_center_x - center[0]
    M[1, 2] += new_center_y - center[1]
    newimg = cv2.warpAffine(image, M, (int(canvas_width), int(canvas_height)), borderMode=cv2.BORDER_CONSTANT, borderValue=(255,255,255))
    #newimg_yuv = cv2.cvtColor(newimg, cv2.COLOR_RGB2YUV)
    #newimg_yuv[:,:,0] = cv2.equalizeHist(newimg_yuv[:,:,0])
    #newimg = cv2.cvtColor(newimg_yuv, cv2.COLOR_YUV2RGB)
    top = int((1080 - newimg.shape[0])/ 2)
    bottom = 1080 - newimg.shape[0] - top
    left = int((1920 - newimg.shape[1]) / 2)
    right = 1920 - newimg.shape[1] - left
    image = cv2.copyMakeBorder( newimg, top, bottom, left, right, cv2.BORDER_CONSTANT, value=(255,255,255))
    return image
    




def rot_update():
    print(f"old rotation: {v.old_rot_val}")
    print(f"new rotation: {v.rot_val}")
    v.dst_rot = rotate_bound(v.thumb, v.rot_val)
    v.ax_src.imshow(v.dst_rot)

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
    v.imgdst = None
    v.old_rot_val = 0.0
    v.rot_val = 0.0
    v.image = cv2.cvtColor(cv2.imread(imgfilename), cv2.COLOR_BGR2RGB);
    v.image_dpi = 600
    v.thumb = resize(v.image)
    v.init_angle = -detect_ang(v.thumb)
    if(v.init_angle) > 45:
        v.init_angle -= 90
    if(v.init_angle) < 0:
        v.init_angle += 360
    print(f"init_angle = {v.init_angle}")
    v.thumb_dpi = v.thumb.shape[0] / v.image.shape[0]  * v.image_dpi
    v.w_inch = v.thumb.shape[1] / v.thumb_dpi
    v.h_inch = v.thumb.shape[0] / v.thumb_dpi

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
    
    rot_update()

    #plt.connect('key_press_event', toggle_selector)
    
    plt.show()

    if v.imgdst is not None:
        cv2.imwrite(os.path.splitext(imgfilename)[0] + ".1080.jpg", cv2.cvtColor(v.imgdst, cv2.COLOR_RGB2BGR))