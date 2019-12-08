if grep -q cppdbg\.sh $1; then
	filename=$1
else
	filename=scrsvr.cc
fi
pwd
echo $filename
`grep cppdbg.sh $filename | sed "s/.*cppdbg.sh //"`
mv /tmp/output.binexe $2
