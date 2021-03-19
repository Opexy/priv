package com.demo.videonode;

import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.view.ScrollingView;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.content.Context;
import android.content.res.Configuration;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.os.Bundle;
import android.os.SystemClock;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.Surface;
import android.view.SurfaceControl;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import java.lang.reflect.Array;
import java.util.List;
import java.util.Map;
import java.util.Vector;

public class MainActivity extends AppCompatActivity{
  public class VideoNodeLink {
    public Map<String, String> config;
    public VideoNode src;
    public VideoNode dest;
  }
  public class VideoNode{
    Map<String, String> config;
    Map<String, VideoNodeLink> links;
  };
  public boolean isLandscape(){
    return getResources().getConfiguration().orientation == Configuration.ORIENTATION_LANDSCAPE;
  }
  public boolean isPortrait(){
    return !isLandscape();
  }
  private static final int[] COLOR_LIST = {Color.RED, Color.MAGENTA, Color.BLUE};
  private static int nextColor = 0;

  public PresentationNode selectedPresentationNode;
  public class PresentationView extends SurfaceView implements Runnable{
    private Context mContext;
    private Thread mThread;
    TextPaint textPaint;
    private int mBackground;
    private void init(Context context){
      mContext = context;
      textPaint = new TextPaint();
      textPaint.setAntiAlias(true);
      textPaint.setTextSize(16 * getResources().getDisplayMetrics().density);
      textPaint.setColor(0xFF000000);
      //String procVersionStr = readLine( FILENAME_PROC_VERSION);
    }
    public PresentationView(Context context) {
      super(context);
      init(context);
    }
    public PresentationView(Context context, AttributeSet attrs) {
      super(context, attrs);
      init(context);
    }

    public PresentationView(Context context, AttributeSet attrs, int defStyleAttr) {
      super(context, attrs, defStyleAttr);
      init(context);
    }

    @Override
    public void run(){
      int i = 0;
      while (true) {
        if(i == 1 ) {
          SystemClock.sleep(100);
          i = 0;
        } else {
          SurfaceHolder holder = this.getHolder();

          Canvas canvas = holder.lockCanvas();
          if(canvas != null) {
            canvas.drawColor(mBackground);

            String text = "Hello";
            int width = (int) textPaint.measureText(text);
            StaticLayout.Builder builder = StaticLayout.Builder.obtain(text, 0, text.length(), textPaint, width);
            StaticLayout myStaticLayout = builder.build();
            myStaticLayout.draw(canvas);

            //canvas.drawCircle(10,10,10);
            //canvas.drawBitmap(mBitmap, mDrawLeft, mDrawTop,prFramePaint);
            holder.unlockCanvasAndPost(canvas);
          }
          i = 1;
        }
      }
    }
    public void start(){
      mThread = new Thread(this);
      mThread.start();
    }
  };
  public class PresentationNode extends VideoNode {
    private final FrameLayout frame;
    private PresentationView surfaceView;
    private void resetLayout(){
      int width = dpToPixels(getResources().getConfiguration().screenWidthDp);
      int height = dpToPixels(getResources().getConfiguration().screenHeightDp);
      if(isPortrait())
        height = width * 9 / 16;
      frame.setLayoutParams(new RelativeLayout.LayoutParams(
              RelativeLayout.LayoutParams.MATCH_PARENT,
              RelativeLayout.LayoutParams.MATCH_PARENT));
      surfaceView.setLayoutParams(new FrameLayout.LayoutParams(width, height));
    }
    // Color cycle is not so pretty
    public PresentationNode(){
      frame = new FrameLayout(MainActivity.this);
      surfaceView = new PresentationView(MainActivity.this);
      surfaceView.mBackground = COLOR_LIST[nextColor];
      //surfaceView.setBackgroundColor(COLOR_LIST[nextColor]);
      //surfaceView.setAlpha(0.5f);
      nextColor = (nextColor + 1) % 3;
      frame.addView(surfaceView);
      resetLayout();
      surfaceView.start();
    }
  }
  public int dpToPixels(int dp) {
    return (int)(dp * getResources().getDisplayMetrics().density);
  }
  public class VideoManager {
    private List<PresentationNode> nodes = new Vector<PresentationNode>();
    public void addVideo(){
      PresentationNode newNode = new PresentationNode();
      nodes.add(newNode);
      selectedPresentationNode = newNode;
      refreshTo(newNode);
      beginEdit(newNode, true);
    }
    public void beginEdit(PresentationNode node, boolean isCreate){
      node.frame.post(new Runnable(){
        @Override
        public void run(){
          if(isPortrait()){
            int y = (int)node.frame.getTop();
            videoListScrollView.smoothScrollTo(0, y);
            //videoListScrollView.scrollToDescendant(node.frame);
          }
          // Fading in for begin edit.
          videoEditFrameLayout.setAlpha(0.0f);
          // Initial position -- to the bottom
          videoEditFrameLayout.setTranslationY(400.0f);
          videoEditFrameLayout.setVisibility(View.VISIBLE);
          videoListAddButton.setVisibility(View.INVISIBLE);
          videoEditFrameLayout.animate().alpha(1.0f).translationY(0.0f).setDuration(300)
                  .setListener(new AnimatorListenerAdapter() {
                    @Override
                    public void onAnimationEnd(Animator animation) {
                      super.onAnimationEnd(animation);
                      videoEditFrameLayout.clearAnimation();
                    }
          });
        }
      });
    }
    void refresh(){
      videoListLinearLayout.removeAllViews();
      nodes.forEach(presentationNode -> {
        videoListLinearLayout.addView(presentationNode.frame);
      });
      videoListLinearLayout.addView((View) videoListAddButton.getParent());
    }
    void refreshTo(PresentationNode node){
      refresh();
      videoListScrollView.scrollToDescendant(node.frame);
    }
  }

  private VideoManager videoMgr;

  // Used to load the 'native-lib' library on application startup.
  static {
    System.loadLibrary("native-lib");
  }

  private FrameLayout videoEditFrameLayout;
  private Button videoEditButtonCancel;

  private Button videoListAddButton;
  private ScrollView videoListScrollView;
  private LinearLayout videoListLinearLayout;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    videoEditFrameLayout = findViewById(R.id.videoEditFrameLayout);
    videoEditButtonCancel = findViewById(R.id.videoEditButtonCancel);
    videoEditButtonCancel.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        videoListAddButton.setVisibility(View.INVISIBLE);
        videoEditButtonCancel.animate().translationX(800.0f).setDuration(300);
        videoEditFrameLayout.animate().alpha(0.0f).setDuration(300).
                setListener(new AnimatorListenerAdapter() {
          @Override
          public void onAnimationEnd(Animator animation) {
            super.onAnimationEnd(animation);
            videoListAddButton.setVisibility(View.VISIBLE);
            videoEditFrameLayout.setVisibility(View.GONE);
            videoEditFrameLayout.setTranslationY(0.0f);
            videoEditButtonCancel.setTranslationX(0.0f);
          }
        });

      }
    });

    videoListLinearLayout = findViewById(R.id.videoListLinearLayout);
    videoListScrollView = findViewById(R.id.videosListScrollView);
    videoListAddButton = findViewById(R.id.videoListAddButton);
    videoListAddButton.setOnClickListener(new View.OnClickListener(){
      @Override
      public void onClick(View v) {
        videoMgr.addVideo();
      }
    });

    videoMgr = new VideoManager();


    // Initializing component

    // Example of a call to a native method
    TextView tv = findViewById(R.id.sample_text);
    tv.setText(stringFromJNI());
  }
  //https://www.youtube.com/watch?v=BMTNaPcPjdw

  /**
   * A native method that is implemented by the 'native-lib' native library,
   * which is packaged with this application.
   */
  public native String stringFromJNI();
}