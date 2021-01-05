from textx import metamodel_from_str, get_children_of_type
teststr = """
name:root, 
  {system name:server},
  {system name:client},
  {client:connect to:server /*... policy */} { 
    on:established(myconnection){
      {client:s end hollyloyah}
    },
  },
  {system:any on:established(myconnection) client:send:Helloloyah}
"""
teststr2 = """
    struct Monk{int a; string b; string c;};
    struct Monk{int a; string b; string c;};

"""

parser = """
  
"""
qualifiers = ["{}", "()", "[]"];
connectors = [[","], [":"], [" "]];


# language precedence: colon, space (for concatenation), comma, 
def apse_lang_parse(str):
    print(str);

def main():
    apse_lang_parse(teststr);

if __name__ == "__main__":
    main()