/**
 * Critically-damped spring — reaches target without overshoot.
 * Frame-rate independent via explicit delta integration.
 */
export class CriticallyDampedSpring {
  value: number;
  velocity: number;
  target: number;
  omega: number; // stiffness (rad/s)

  constructor(initial = 0, omega = 6) {
    this.value = initial;
    this.velocity = 0;
    this.target = initial;
    this.omega = omega;
  }

  /** Advance by `dt` seconds. */
  update(dt: number): number {
    const x = this.value - this.target;
    const v = this.velocity;
    const w = this.omega;

    // Critically-damped: zeta = 1
    // x(t) = (C1 + C2*t) * e^(-w*t)
    const exp = Math.exp(-w * dt);
    this.value = this.target + (x + (v + w * x) * dt) * exp;
    this.velocity = (v - w * (v + w * x) * dt) * exp;

    return this.value;
  }

  /** Apply an instant velocity impulse. */
  impulse(force: number) {
    this.velocity += force;
  }

  /** Snap immediately to a value. */
  snap(val: number) {
    this.value = val;
    this.target = val;
    this.velocity = 0;
  }
}
