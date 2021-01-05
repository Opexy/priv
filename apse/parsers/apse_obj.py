class Apse:
  def __init__(self):
    self.systems = {}
    self.interfaces = {}

def test(**kwargs):
  for key, val in kwargs.items():
    print("{0} = {1}".format(key, value))

def main():
  test({hello:"world"}, {hello:"hello"});

if __name__ == "__main__":
    main()