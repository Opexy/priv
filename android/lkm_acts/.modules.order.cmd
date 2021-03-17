cmd_/home/diamond/priv/android/lkm_acts/modules.order := {   echo /home/diamond/priv/android/lkm_acts/lkm_acts.ko; :; } | awk '!x[$$0]++' - > /home/diamond/priv/android/lkm_acts/modules.order
