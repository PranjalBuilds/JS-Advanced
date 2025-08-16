// What is a closure?
// A function that remembers variables from its outer scope, even after that scope is gone.

/*

* Real-Life Analogy:

Think of a 'locker key'. You give your friend the key (function), 
and even if you leave the building (scope ends), your friend can 
still access the locker (variable).

*/



// Easy Example:

function outer() {
    let secret = "I am hidden!";
    return function inner() {
      console.log(secret);
    }
  }
  
  const fn = outer();
  fn(); // "I am hidden!"



// Intermediate Example:

function counter() {
    let count = 0;
    return {
      inc: () => ++count,
      dec: () => --count
    }
  }
  
  const c = counter();
  console.log(c.inc()); // 1
  console.log(c.inc()); // 2
  console.log(c.dec()); // 1
  


// Real Life Examples : 
// 1 . Login Attempt Tracker

function loginSystem() {
    let attempts = 0;
    const maxAttempts = 3;
  
    return function(password) {
      if (attempts >= maxAttempts) return "Account locked!";
      if (password === "secret123") return "Login successful!";
      attempts++;
      return `Wrong password! ${maxAttempts - attempts} tries left`;
    }
  }
  
  const login = loginSystem();
  console.log(login("test"));     // Wrong password! 2 tries left
  console.log(login("wrong"));    // Wrong password! 1 tries left
  console.log(login("wrong"));    // Account locked!



  // 'attempts' is private — cannot be hacked externally.
// Only the closure function can modify it.
// Even if you try from outside, attempts is hidden forever.
// This is how closures secure logic.



// 2. E-commerce Discount System

/* 
We want to create a discount calculator for an e-commerce site.
Different products might have different discount rules.
Discounts should be locked in when we configure them (not exposed globally).
Each calculator should remember its discount rate.
*/


function createDiscountCalculator(discountRate) {
    // discountRate is captured by closure
    
    return function(price) {
        const finalPrice = price - (price * discountRate);
        return `Original: $${price}, Final: $${finalPrice}`;
    }
}


// Create different calculators
const studentDiscount = createDiscountCalculator(0.15); // 15%
const festiveDiscount = createDiscountCalculator(0.25); // 25%
const vipDiscount = createDiscountCalculator(0.40);     // 40%

// Use them
console.log(studentDiscount(100)); // Original: $100, Final: $85
console.log(festiveDiscount(200)); // Original: $200, Final: $150
console.log(vipDiscount(500));     // Original: $500, Final: $300



// 3.Coupon Code System

// We want to implement coupon codes where:
// Each coupon has a fixed discount value.
// A coupon can be used only a limited number of times.
// Once it’s expired, it should reject further use.


function createCoupon(code, discount, maxUses) {
    let uses = 0;  // private state
  
    return function(price) {
      if (uses >= maxUses) {
        return `❌ Coupon "${code}" expired!`;
      }
  
      uses++; // track usage
      const finalPrice = price - discount;
      return `✅ Coupon "${code}" applied! Final price: $${finalPrice} (Remaining uses: ${maxUses - uses})`;
    }
  }

const newUserCoupon = createCoupon("WELCOME50", 50, 2);  // $50 off, 2 uses
const festiveCoupon = createCoupon("FESTIVE20", 20, 3); // $20 off, 3 uses

// Apply coupons
console.log(newUserCoupon(200)); // ✅ WELCOME50 applied! Final price: $150 (Remaining uses: 1)
console.log(newUserCoupon(100)); // ✅ WELCOME50 applied! Final price: $50 (Remaining uses: 0)
console.log(newUserCoupon(300)); // ❌ Coupon "WELCOME50" expired!

console.log(festiveCoupon(120)); // ✅ FESTIVE20 applied! Final price: $100 (Remaining uses: 2)



// Why Closures Matter Here?

// Every coupon is a self-contained system.
// No global variables needed to track counts.
// Super easy to add new coupons by just calling createCoupon