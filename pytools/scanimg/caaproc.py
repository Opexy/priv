import sys, glob
import imgpedit as ipe
import os

if __name__ == "__main__":
    if len(sys.argv)>1:
        imgdir = sys.argv[1]
    else:
        imgdir = "."
    dirfiles = glob.glob(f"{imgdir}/*.jpg")
    #dirfiles = [os.path.join(imgdir, dirfile) for dirfile in os.listdir('.')]
    for dirfile in dirfiles:
        if (dirfile.endswith("1080.jpg")):
            continue
        if (os.path.splitext(dirfile)[0] + ".1080.jpg") in dirfiles:
            print (f"already processed {dirfile}")
            continue
        print(f"processing {dirfile}")
        ipe.procimg(dirfile)
    