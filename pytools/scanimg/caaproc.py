import sys, glob
import imgpedit as ipe

if __name__ == "__main__":
    if len(sys.argv)>1:
        imgdir = sys.argv[1]
    else:
        imgdir = "."
    dirfiles = glob.glob(f"{imgdir}/*.jpg")
    #dirfiles = [os.path.join(imgdir, dirfile) for dirfile in os.listdir('.')]
    for dirfile in dirfiles:
        print(f"processing {dirfile}")
        ipe.procimg(dirfile)
    