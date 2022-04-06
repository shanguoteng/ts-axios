import { CancelExecutor, CancelTokenSource, Canceler } from './../types/index'
import Cancel from './Cancel'
interface ResolvePromise {
  (reason: Cancel): void
}
export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  constructor(excutor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })
    excutor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }
  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(excutor => {
      cancel = excutor
    })
    return {
      cancel,
      token
    }
  }
  throwIfRequest() {
    if (this.reason) {
      throw this.reason
    }
  }
}
