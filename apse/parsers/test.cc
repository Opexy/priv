struct x{
  int a;
};
struct y{
  int b;
  struct {a};
};

int main(){
  y yy;
  return yy.a;
}