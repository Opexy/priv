# Structured Automatic Generator


## Code Generator
* Feature
  * Individual feature set
  * Maps to String and Global Integer
* Runnable Method
  * Running Where (Running Specifier -- Runner in Server, specified by URL)
    * Channel, etc
  * Running Code (Specifying Slot X, Y, Z as param) (May have a resolver )
    * Stack-Jit (For recursive)
      * * No Need for recursive if it is a read-only variable. 
    * Stack-PreAlloc
  * Slot may have individual types.

## Reflection
* Class Information
  * Usage Information (Relation)
* Field Information (Field -> Class)
  * Each Field has its own TypeInfo
  * Element is of Granularity of Information
  * 
## Runtime Framework
* Looper
  * Fetch One Message (of type: Flow Context Information)
  * Anything that needs Async completion, if it is truly async (Async Point)
    * Spent too much time executing (task switching)
      * not implemented as of phase 1 for now
    * Belongs to a different root context
      * and the root context is not available for immediate lockage
    * May still try to execute the rest of the program
      * Collect what has been asynchronous (Info-Async)
  * Allocate information.
  * Flexible Parametric Overlaying System
  * 

### Compilation
#### MicroCodes: InlineArray
* {ms:MetaSchema, dw:Int8, Code:8 bytes, Args()}

### Actor
* Contains a TaskQueue to do things.
* TaskQueue shall be 
* 

### Program
### 


