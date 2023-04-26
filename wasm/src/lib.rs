use wasm_bindgen::prelude::*;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct World {
    pub width: usize,
    pub height: usize,
    snake: Snake,
}

#[wasm_bindgen]
impl World {
    pub fn new(width: usize, height: usize) -> World {
        World {
            width,
            height,
            snake: Snake::new(10),
        }
    }

    pub fn snake_head_idx(&self) -> usize {
        self.snake.body[0].0
    }
}

struct SnakeCell(usize);

#[wasm_bindgen]
// this struct has to stay private because the SnakeCell struct (tuple)
struct Snake {
    body: Vec<SnakeCell>,
}

impl Snake {
    fn new(spawn_idx: usize) -> Snake {
        Snake {
            body: vec![SnakeCell(spawn_idx)],
        }
    }
}

#[wasm_bindgen]
pub fn add(x: i32, y: i32) -> i32 {
    x + y
}

#[cfg(test)]
mod tests {
    use super::add;

    #[test]
    fn _add() {
        assert_eq!(add(2, 2), 4);
    }
}
