<script>
import { writable } from "svelte/store"
import { NestedStore } from "./stores"

const simple_store = new NestedStore(writable("hi"))
simple_store.subscribe(val => {
  console.log("simple_store.subscribe", val)
})
simple_store.update(val => {
  return "hello"
})

const my_store = new NestedStore(writable({ foo: "foo value", bar: { baz: "baz value" } }))
my_store.subscribe((val) => {
  console.log("my_store.subscribe", JSON.stringify(val, null, 2))
})
const accessed_foo = my_store.access("foo")
accessed_foo.update((val) => {
  return "updated foo value through accessed_foo"
})
const accessed_bar = my_store.access("bar")
accessed_bar.update(val => {
  val.goo = "updated new key goo added through accessed_bar"
  return val
})
const accessed_baz = my_store.access("bar").access("baz")
accessed_baz.update(val => {
  console.log("accessed_baz.update ... old value", val)
  return "Updated baz value through accessed_baz"
})
accessed_foo.set("Set foo value through accessed_foo")
accessed_bar.set({ goo: "set goo value through accessed_bar", baz: "set baz value through accessed_bar" })
accessed_baz.set("set baz value through accessed_baz")

const arr_obj = new NestedStore(writable([{ foo: 123 }, { bar: 456 }]))
arr_obj.subscribe(val => {
  console.log("arr_obj.subscribe", JSON.stringify(val, null, 2))
})
const accessed0 = arr_obj.access(0)
accessed0.update(val => {
  return "updated 0-th element through accessed0"
})
const accessed1 = arr_obj.access(1)
accessed1.update(val => {
  val.baz = "updated added new key baz through accessed1"
  return val
})
const accessed1_bar = arr_obj.access(1).access("bar")
accessed1_bar.update(val => {
  console.log("accessed1_bar.update ... old value", val)
  return "Updated bar value through accessed1_bar"
})
</script>

<main>
  <div>{JSON.stringify($my_store, null, 2)}</div>
  <div>{JSON.stringify($arr_obj, null, 2)}</div>
</main>

<style>

</style>