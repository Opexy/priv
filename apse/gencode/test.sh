if [ "Gena.g4" -nt /tmp/java/lastbuilt ]; then
  java -Xmx4G org.antlr.v4.Tool Gena.g4 -o /tmp/java
  javac /tmp/java/*.java
  touch /tmp/java/lastbuilt
fi;
java -Xmx4G -cp "$CLASSPATH:/tmp/java" org.antlr.v4.gui.TestRig Gena $@