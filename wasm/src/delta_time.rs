use wasm_bindgen::prelude::*;
use web_sys::{window, Performance};

#[wasm_bindgen]
pub struct Ticker {
    last_time: f64,
    performance: Performance,
}

#[wasm_bindgen]
impl Ticker {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Result<Ticker, JsValue> {
        let window =
            window().ok_or_else(|| JsValue::from_str("Failed to get the window object"))?;
        let performance = window
            .performance()
            .ok_or_else(|| JsValue::from_str("Failed to get the performance object"))?;

        let last_time = performance.now();

        Ok(Ticker {
            last_time,
            performance,
        })
    }

    pub fn delta(&mut self) -> f64 {
        let current_time = self.performance.now();
        let delta = (current_time - self.last_time) / 1000.0; // Convert from milliseconds to seconds
        self.last_time = current_time;
        delta
    }
}
