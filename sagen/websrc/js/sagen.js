import {SagenRuntime} from './sagen_runtime.js';

export const sr = globalThis.sr = SagenRuntime();

export function sagen_test(){
  let test_str = 
`
data class -- identified by categorization of data
data object -- identified by id
User(name:'Hello') -- identifies User whose name is Hello

event EVENT_NAME consumes EVENT_NAME when DOING WHAT

under certain scope, instead of doing X do Y instead
System
Role
Thread
Thread Group
Action
Action Case
`
}
sagen_test();