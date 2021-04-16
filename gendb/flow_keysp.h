#pragma once
#include "flow_common_defs.h"

namespace flow {
keysp keysp_str(strarg key_name, keysp owner = NULL);
keysp keysp_component(strarg key_name, args_keysp subkeys, keysp owner = NULL);

}