timestamp=$(date +"%b %d %H:%M:%S")
pid=$(pgrep -f $1)
cpu_mem_usage=$(top -b -n 1 -p $pid| tail -n 1 | awk '{print $9 "," $10}')
tcp_cons=$(lsof -i -a -p $pid -w | tail -n +2 | wc -l)
tcount=$(ps -o nlwp h $pid | tr -d ' ')
while true; do sleep 0.1;
echo "$timestamp,$cpu_mem_usage,$tcp_cons,$tcount"; done;

