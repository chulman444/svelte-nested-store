import { get, writable } from "svelte/store";

export class NestedStore {
  constructor(store, accessor) {
    this.store = store
    this.accessor = accessor
  }

  subscribe(subscription) {
    if(this.accessor == undefined) {
      return this.store.subscribe(...arguments)
    }

    return this.store.subscribe(val => {
      subscription(val[this.accessor])
    })
  }

  update(run) {
    if(this.accessor == undefined) {
      return this.store.update(...arguments)
    }

    return this.store.update(val => {
      const new_val = run(val[this.accessor])
      val[this.accessor] = new_val
      return val
    })
  }

  set(new_val) {
    if(this.accessor == undefined) {
      return this.store.set(...arguments)
    }
    
    return this.store.update(val => {
      val[this.accessor] = new_val
      return val
    })
  }

  access(accessor) {
    return new NestedStore(this, accessor)
  }
}